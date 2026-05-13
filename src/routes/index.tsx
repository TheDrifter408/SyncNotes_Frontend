import { Header } from "@/components/header";
import { createFileRoute, Link } from "@tanstack/react-router";
import IconV1 from "@/assets/variant-1.svg?react";
import LogoV1 from "@/assets/cta-icon-v1.svg?react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="[view-transition-name:main-content] dot-grid flex flex-col items-center">
      <Header
        className={
          "px-4 py-4 border border-b justify-between bg-white shadow-lg"
        }
      >
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
            preload={false}
          >
            Login
          </Link>
        </Button>
      </Header>
      <section className="h-screen grid lg:flex p-4">
        <article className="flex flex-col gap-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl capitalize font-extrabold">
            Your last note taking App{" "}
          </h1>
          <h2 className="text-2xl font-bold">For simplicity's sake</h2>
        </article>
        <article className="">
          <LogoV1 className="w-full h-auto max-w-2xl" />
        </article>
      </section>
      <footer>footer</footer>
    </div>
  );
}
