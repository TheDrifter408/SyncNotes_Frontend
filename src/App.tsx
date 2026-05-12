import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { useGlobalStore } from "./store/store";
import { queryClient } from "./lib/query-client";

const router = createRouter({
    routeTree,
    defaultPreload: "intent",
    defaultStaleTime: 5000,
    scrollRestoration: true,
    defaultViewTransition: true,
    context: {
        queryClient,
        user: null,
    },
});

declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router;
    }
}

export function App() {
    const user = useGlobalStore((state) => state.user);

    return <RouterProvider router={router} context={{ user }} />;
}
