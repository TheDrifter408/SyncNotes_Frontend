import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import type { User } from '@/types/User';
import { Toaster } from 'sonner';

interface AuthenticatedRouterContext {
  user: User | null;
}

export const Route = createRootRouteWithContext<AuthenticatedRouterContext>()({
  component: () => (
    <>
      <Outlet />
      <Toaster />
      <TanStackRouterDevtools />
    </>
  ),
});


