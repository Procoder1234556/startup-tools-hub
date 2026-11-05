export interface StirlingStatus {
  available: boolean;
  url: string;
  version?: string;
  error?: string;
}

export function getStirlingPdfUrl(): string {
  return (
    process.env.STIRLING_PDF_URL ||
    process.env.NEXT_PUBLIC_STIRLING_PDF_URL ||
    "http://localhost:8080"
  );
}

export async function checkStirlingStatus(): Promise<StirlingStatus> {
  const url = getStirlingPdfUrl();
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2000);

    const res = await fetch(`${url}/api/v1/info/status`, {
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (res.ok) {
      return { available: true, url };
    }
    return {
      available: false,
      url,
      error: `Server responded with status ${res.status}`,
    };
  } catch (err) {
    return {
      available: false,
      url,
      error: err instanceof Error ? err.message : "Connection failed",
    };
  }
}
