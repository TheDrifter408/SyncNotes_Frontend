import { Header } from "@/components/header";
import { createFileRoute, Link, useRouterState } from "@tanstack/react-router";
import IconV1 from "@/assets/variant-1.svg?react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
    component: RouteComponent,
});

function RouteComponent() {
    const matches = useRouterState({ select: (s) => s.matches });
    console.log(
        "Current Matches:",
        matches.map((m) => m.routeId),
    );
    return (
        <div className="[view-transition-name:main-content] flex flex-col items-center">
            <Header className={"px-4 py-4 border border-b justify-between"}>
                <div className="text-white size-10">
                    <Link to="/">
                        <IconV1 className="w-full h-full" />
                    </Link>
                </div>
                <Button asChild>
                    <Link
                        to="/login"
                        viewTransition={{
                            types: ["slide-left"],
                        }}
                    >
                        Login
                    </Link>
                </Button>
            </Header>
            <section>Content</section>
            <footer>footer</footer>
        </div>
    );
}
