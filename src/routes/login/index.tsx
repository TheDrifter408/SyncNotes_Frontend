import { createFileRoute, redirect } from "@tanstack/react-router";
import { Login } from "./-components/login";
import { authQueryOptions } from "@/lib/auth-query";

export const Route = createFileRoute("/login/")({
    beforeLoad: async ({ context }) => {
        const data =
            await context.queryClient.ensureQueryData(authQueryOptions);
        if (!data?.id) {
            throw redirect({
                to: "/login",
            });
        }
        return data;
    },
    component: Login,
});
