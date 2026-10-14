export function getApiBase(): string {
  if (typeof window !== "undefined") {
    const useLocalApi = window.localStorage.getItem("use_local_api") === "true";
    const localApiUrl = window.localStorage.getItem("local_api_url");
    if (useLocalApi && localApiUrl) {
      return localApiUrl;
    }

    const hostname = window.location.hostname.toLowerCase();
    const isLocalhost =
      hostname === "localhost" ||
      hostname === "127.0.0.1" ||
      hostname.endsWith(".local");

    // If running in browser on a remote/cloud domain (Vercel, custom domain, etc.)
    if (!isLocalhost) {
      if (
        process.env.NEXT_PUBLIC_API_URL &&
        !process.env.NEXT_PUBLIC_API_URL.includes("localhost")
      ) {
        return process.env.NEXT_PUBLIC_API_URL;
      }
      return "https://lojinha-homens-de-fe-back.onrender.com";
    }
  }

  const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === "true";
  return USE_MOCK
    ? (process.env.NEXT_PUBLIC_MOCK_URL || "http://localhost:5006")
    : (process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001");
}

export async function apiFetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const apiBase = getApiBase();
  const url = `${apiBase}${endpoint}`;
  try {
    const res = await fetch(url, {
      cache: "no-store",
      ...options,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        ...options?.headers,
      },
    });
    if (!res.ok) {
      let errorMsg = `API error: ${res.statusText}`;
      try {
        const jsonErr = await res.json();
        if (jsonErr && jsonErr.message) {
          errorMsg = Array.isArray(jsonErr.message) ? jsonErr.message.join(", ") : jsonErr.message;
        }
      } catch (e) {
        // ignore
      }
      throw new Error(errorMsg);
    }
    return await res.json();
  } catch (err) {
    console.warn(`Failed to fetch from API at ${url}:`, err);
    throw err;
  }
}
