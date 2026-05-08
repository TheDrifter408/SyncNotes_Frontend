import { Header } from '@/components/header'
import { createFileRoute, Link } from '@tanstack/react-router'
import IconV1 from "@/assets/variant-1.svg?react";
import { Button } from '@/components/ui/button';

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex flex-col items-center">
      <Header className={'px-4 py-4 border border-b justify-between'}>
        <div className="text-white size-10">
          <Link to="/">
            <IconV1 className="w-full h-full" />
          </Link>
        </div>
        <Button asChild>
          <Link to="/login">Login</Link>
        </Button>
      </Header>
      <section>
        Content
      </section>
      <footer>
        footer
      </footer>
    </div>
  )
}
