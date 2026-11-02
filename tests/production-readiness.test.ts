import { describe, it, expect, beforeEach } from "bun:test";
import { checkRateLimit, resetRateLimit } from "@/lib/rate-limit";
import { captureError } from "@/lib/observability";
import { POST } from "@/app/api/contact/route";
import nextConfig from "@/next.config.mjs";

describe("Milestone M8 — Production Readiness & Observability", () => {
  describe("Rate Limiting (lib/rate-limit.ts)", () => {
    const testIp = "test-ip-123";

    beforeEach(() => {
      resetRateLimit(testIp);
    });

    it("allows requests under the configured threshold", () => {
      const result1 = checkRateLimit(testIp, { limit: 3, windowMs: 10_000 });
      expect(result1.allowed).toBe(true);
      expect(result1.remaining).toBe(2);

      const result2 = checkRateLimit(testIp, { limit: 3, windowMs: 10_000 });
      expect(result2.allowed).toBe(true);
      expect(result2.remaining).toBe(1);
    });

    it("blocks requests that exceed the limit", () => {
      checkRateLimit(testIp, { limit: 2, windowMs: 10_000 });
      checkRateLimit(testIp, { limit: 2, windowMs: 10_000 });

      const blocked = checkRateLimit(testIp, { limit: 2, windowMs: 10_000 });
      expect(blocked.allowed).toBe(false);
      expect(blocked.remaining).toBe(0);
      expect(blocked.resetMs).toBeGreaterThan(0);
    });

    it("resets limits when resetRateLimit is called", () => {
      checkRateLimit(testIp, { limit: 1, windowMs: 10_000 });
      expect(checkRateLimit(testIp, { limit: 1, windowMs: 10_000 }).allowed).toBe(false);

      resetRateLimit(testIp);
      expect(checkRateLimit(testIp, { limit: 1, windowMs: 10_000 }).allowed).toBe(true);
    });
  });

  describe("Observability & Error Capturing (lib/observability.ts)", () => {
    it("safely captures exceptions without crashing caller", () => {
      expect(() => {
        captureError(new Error("Simulated test error"), {
          route: "/test-route",
          digest: "err-12345",
          extra: { detail: "unit-test" },
        });
      }).not.toThrow();
    });

    it("handles non-Error objects gracefully", () => {
      expect(() => {
        captureError("string error event", { route: "/test-string" });
      }).not.toThrow();
    });
  });

  describe("Contact API Rate Limiting Enforcement", () => {
    const spamIp = "192.168.1.99";

    beforeEach(() => {
      resetRateLimit(`contact:${spamIp}`);
    });

    it("rate limits rapid requests to /api/contact with 429", async () => {
      const makeReq = () =>
        new Request("http://localhost:3000/api/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-forwarded-for": spamIp,
          },
          body: JSON.stringify({
            name: "Spammy Spammer",
            email: "spam@example.com",
            message: "Testing rate limit threshold",
          }),
        });

      // Exhaust 5 allowed attempts
      for (let i = 0; i < 5; i++) {
        const res = await POST(makeReq());
        expect(res.status).toBe(200);
      }

      // 6th attempt must be rejected with 429
      const blockedRes = await POST(makeReq());
      expect(blockedRes.status).toBe(429);
      expect(blockedRes.headers.get("Retry-After")).toBeDefined();
      const body = await blockedRes.json();
      expect(body.error).toContain("Too many contact requests");
    });
  });

  describe("Security Headers (next.config.mjs)", () => {
    it("configures essential production security headers", async () => {
      if (typeof nextConfig.headers !== "function") {
        throw new Error("headers() is not defined on nextConfig");
      }

      const headersConfig = await nextConfig.headers();
      expect(headersConfig.length).toBeGreaterThan(0);

      const globalHeaders = headersConfig.find((h: { source: string }) => h.source === "/:path*");
      expect(globalHeaders).toBeDefined();

      const headerMap = new Map(
        (globalHeaders?.headers || []).map((item: { key: string; value: unknown }) => [
          item.key,
          String(item.value),
        ]),
      );

      expect(headerMap.has("Content-Security-Policy")).toBe(true);
      expect(headerMap.get("Content-Security-Policy")).toContain("default-src 'self'");
      expect(headerMap.has("Strict-Transport-Security")).toBe(true);
      expect(headerMap.get("X-Frame-Options")).toBe("DENY");
      expect(headerMap.get("X-Content-Type-Options")).toBe("nosniff");
      expect(headerMap.get("Referrer-Policy")).toBe("strict-origin-when-cross-origin");
      expect(headerMap.has("Permissions-Policy")).toBe(true);
    });
  });
});
