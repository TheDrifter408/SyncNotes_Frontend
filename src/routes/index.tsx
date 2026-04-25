import { Header } from '@/components/header'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex flex-col items-center">
      <Header>
        <img src={""} />
        <button>Login</button>
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
