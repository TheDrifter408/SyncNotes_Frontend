import { BASE_URL } from "@/constants";
import { queryOptions } from "@tanstack/react-query";

export const authQueryOptions = queryOptions({
    queryKey: ["auth"],
    queryFn: async () => {
        const response = await fetch(`${BASE_URL}/auth/me`, {
            credentials: "include",
        });
        if (response.status === 401) {
            return null;
        }
        if (!response.ok) {
            throw new Error("Failed to fetch auth status");
        }
        return await response.json();
    },
    staleTime: 1000 * 60 * 5,
    retry: false,
});
