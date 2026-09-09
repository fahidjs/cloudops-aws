import { getAccessToken } from "./authService";

export async function authenticatedFetch(
  url: string,
  options: RequestInit = {},
): Promise<Response> {
  const token = await getAccessToken();

  const headers = new Headers(options.headers);

  headers.set(
    "Authorization",
    `Bearer ${token}`
  );

  return fetch(url, {
    ...options,
    headers,
  });
}