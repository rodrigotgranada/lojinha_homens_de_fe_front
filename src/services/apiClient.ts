export function getApiBase(): string {
  if (typeof window !== "undefined") {
    const useLocalApi = window.localStorage.getItem("use_local_api") === "true";
    const localApiUrl = window.localStorage.getItem("local_api_url");
    if (useLocalApi && localApiUrl) {
      return localApiUrl;
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
      ...options,
      headers: {
        "Content-Type": "application/json",
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
