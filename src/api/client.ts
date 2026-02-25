const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

export async function apiFetch(
  path: string,
  options: RequestInit = {}
): Promise<Response> {
  const url = `${API_URL}/api/v1${path}`;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...options.headers,
  };

  return fetch(url, {
    ...options,
    headers,
  });
}
