import { describe, it, expect } from "bun:test";
import { cn } from "@/lib/utils";

describe("cn utility", () => {
  it("merges tailwind class names correctly", () => {
    expect(cn("px-2 py-1", "bg-black")).toBe("px-2 py-1 bg-black");
  });

  it("handles conditional classes", () => {
    const isTrue = true;
    const isFalse = false;
    expect(cn("base", isTrue && "active", isFalse && "inactive")).toBe("base active");
  });

  it("resolves conflicting tailwind classes cleanly", () => {
    expect(cn("p-4", "p-2")).toBe("p-2");
    expect(cn("text-red-500", "text-blue-500")).toBe("text-blue-500");
  });

  it("handles null, undefined, and empty strings gracefully", () => {
    expect(cn(null, undefined, "", "valid")).toBe("valid");
  });
});
