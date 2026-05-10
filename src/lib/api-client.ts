import { BASE_URL } from "@/constants";

export async function apiClient(url: string, options: RequestInit = {}) {
  const defaultOptions = {
    ...options,
    credentials: "include" as const,
    headers: {
      ...options.headers,
      "Content-Type": "application/json",
    },
  };

  let response = await fetch(url, defaultOptions);

  if (response.status === 401 && !url.includes("/auth/refresh")) {
    const refreshResponse = await fetch(`${BASE_URL}/auth/refresh`, {
      method: "POST",
      credentials: "include" as const,
    });
    if (refreshResponse.ok) {
      response = await fetch(url, defaultOptions);
    } else {
      window.location.href = "/login";
      throw new Error("Failed to refresh token");
    }
  }
  return response;
}
