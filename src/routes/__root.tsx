import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import type { TAuthContext } from '@/types/AuthContext';

interface AuthenticatedRouterContext {
  auth: TAuthContext;
}

export const Route = createRootRouteWithContext<AuthenticatedRouterContext>()({
  component: () => (
    <>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});


