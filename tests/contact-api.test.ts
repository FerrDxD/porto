import { describe, it, expect } from "bun:test";
import { POST } from "@/app/api/contact/route";

describe("Contact API validation & security", () => {
  it("rejects honeypot bots with 400", async () => {
    const req = new Request("http://localhost:3000/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Bot User",
        email: "bot@spam.com",
        message: "Spam content here",
        honeypot: "i-am-a-bot",
      }),
    });

    const res = await POST(req);
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toBe("Spam detected.");
  });

  it("rejects requests with invalid names", async () => {
    const req = new Request("http://localhost:3000/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "A",
        email: "valid@email.com",
        message: "Valid message content",
        honeypot: "",
      }),
    });

    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it("rejects invalid email formats", async () => {
    const req = new Request("http://localhost:3000/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Real Human",
        email: "not-an-email",
        message: "Valid message content",
        honeypot: "",
      }),
    });

    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it("rejects empty or very short messages", async () => {
    const req = new Request("http://localhost:3000/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Real Human",
        email: "human@test.com",
        message: "hi",
        honeypot: "",
      }),
    });

    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it("accepts valid submissions gracefully", async () => {
    const req = new Request("http://localhost:3000/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Alex Designer",
        email: "alex@studio.com",
        message: "Let's build a new product together.",
        honeypot: "",
      }),
    });

    const res = await POST(req);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.success).toBe(true);
  });
});
