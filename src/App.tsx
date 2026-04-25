import { createRouter, RouterProvider } from '@tanstack/react-router';
import { useAuth } from './hooks/useAuth';
import { routeTree } from './routeTree.gen';
import type { TAuthContext } from './types/AuthContext';

const router = createRouter({
  routeTree,
  context: {
    auth: undefined! as TAuthContext,
  }
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router,
  }
}

export function App() {
  const auth = useAuth();

  return <RouterProvider router={router} context={{ auth }} />;
}