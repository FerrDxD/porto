// ponytail: lightweight logger + Sentry reporting; handles error tracking without bulky 15MB SDK
export type ErrorContext = {
  digest?: string;
  route?: string;
  userIp?: string;
  extra?: Record<string, unknown>;
};

export function captureError(error: unknown, context: ErrorContext = {}) {
  const err = error instanceof Error ? error : new Error(String(error));
  const timestamp = new Date().toISOString();

  // Structured console log for standard observability (Vercel / Datadog / CloudWatch)
  console.error(
    JSON.stringify({
      level: "error",
      timestamp,
      name: err.name,
      message: err.message,
      stack: err.stack,
      digest: context.digest,
      route: context.route,
      extra: context.extra,
    }),
  );

  // If SENTRY_DSN or NEXT_PUBLIC_SENTRY_DSN is configured, forward event via Sentry Envelope HTTP API (zero SDK overhead)
  const sentryDsn = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;
  if (sentryDsn && typeof fetch === "function") {
    sendSentryReport(sentryDsn, err, context).catch(() => {});
  }
}

async function sendSentryReport(dsn: string, err: Error, context: ErrorContext) {
  try {
    const url = new URL(dsn);
    const projectId = url.pathname.replace(/^\//, "");
    const publicKey = url.username;
    const host = url.host;
    const endpoint = `https://${host}/api/${projectId}/store/?sentry_key=${publicKey}&sentry_version=7`;

    await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        exception: {
          values: [
            {
              type: err.name,
              value: err.message,
              stacktrace: err.stack ? { frames: [] } : undefined,
            },
          ],
        },
        tags: { route: context.route || "unknown" },
        extra: { digest: context.digest, ...context.extra },
        timestamp: Math.floor(Date.now() / 1000),
        platform: "javascript",
      }),
    });
  } catch {
    // Sentry dispatch failures must never crash caller
  }
}
