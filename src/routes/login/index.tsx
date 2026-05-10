import { createFileRoute, redirect } from "@tanstack/react-router";
import { Login } from "./-components/login";
import { authQueryOptions } from "@/lib/auth-query";

export const Route = createFileRoute("/login/")({
  beforeLoad: async ({ context }) => {
    console.log("Running....");
    try {
      const data = await context.queryClient.ensureQueryData(authQueryOptions);
      if (data?.id) {
        throw redirect({
          to: "/notes",
        });
      }
      console.log("/me", data);
      return data;
    } catch (error) {
      if (error instanceof Error && "to" in error) throw error;
      console.error("User not authenticated", error);
      return;
    }
  },
  component: Login,
});
