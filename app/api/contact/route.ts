import { NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/rate-limit";
import { captureError } from "@/lib/observability";

export async function POST(request: Request) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      request.headers.get("x-real-ip") ||
      "127.0.0.1";

    const { allowed, resetMs } = checkRateLimit(`contact:${ip}`, {
      limit: 5,
      windowMs: 60_000,
    });

    if (!allowed) {
      return NextResponse.json(
        { error: "Too many contact requests. Please try again later." },
        {
          status: 429,
          headers: {
            "Retry-After": Math.ceil(resetMs / 1000).toString(),
            "X-RateLimit-Limit": "5",
            "X-RateLimit-Remaining": "0",
          },
        },
      );
    }

    const body = await request.json();
    const { name, email, message, honeypot } = body;

    // Honeypot anti-spam trap
    if (honeypot) {
      return NextResponse.json({ error: "Spam detected." }, { status: 400 });
    }

    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { error: "Please provide a valid name (at least 2 characters)." },
        { status: 400 },
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== "string" || !emailRegex.test(email)) {
      return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
    }

    if (!message || typeof message !== "string" || message.trim().length < 5) {
      return NextResponse.json(
        { error: "Please write a message with at least 5 characters." },
        { status: 400 },
      );
    }

    // Optional email dispatch if RESEND_API_KEY is configured
    if (process.env.RESEND_API_KEY) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.CONTACT_FROM_EMAIL || "portfolio@ferdi.dev",
          to: process.env.CONTACT_TO_EMAIL || "kaptengaming67@gmail.com",
          subject: `Portfolio Message from ${name}`,
          reply_to: email,
          text: `From: ${name} <${email}>\n\n${message}`,
        }),
      });

      if (!res.ok) {
        captureError(new Error(`Resend API dispatch error: ${await res.text()}`), {
          route: "/api/contact",
          extra: { email, name },
        });
      }
    } else {
      console.log(`[Contact Submission] from: ${name} (${email}): ${message}`);
    }

    return NextResponse.json({
      success: true,
      message: "Message sent successfully.",
    });
  } catch (err) {
    captureError(err, { route: "/api/contact" });
    return NextResponse.json({ error: "Internal server error occurred." }, { status: 500 });
  }
}
