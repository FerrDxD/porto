// ponytail: in-memory sliding-window limiter; swap to Upstash/Redis if multi-region serverless requires global state
export type RateLimitOptions = {
  windowMs?: number;
  limit?: number;
};

const trackers = new Map<string, number[]>();

export function checkRateLimit(
  identifier: string,
  options: RateLimitOptions = {},
): { allowed: boolean; remaining: number; resetMs: number } {
  const { windowMs = 60_000, limit = 5 } = options;
  const now = Date.now();
  const timestamps = (trackers.get(identifier) || []).filter((time) => now - time < windowMs);

  if (timestamps.length >= limit) {
    const oldest = timestamps[0];
    const resetMs = Math.max(0, windowMs - (now - oldest));
    trackers.set(identifier, timestamps);
    return { allowed: false, remaining: 0, resetMs };
  }

  timestamps.push(now);
  trackers.set(identifier, timestamps);
  return { allowed: true, remaining: limit - timestamps.length, resetMs: windowMs };
}

export function resetRateLimit(identifier: string): void {
  trackers.delete(identifier);
}
