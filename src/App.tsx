import { createRouter, RouterProvider } from '@tanstack/react-router';
import { useAuth } from './hooks/useAuth';
import { routeTree } from './routeTree.gen';
import { useGlobalStore } from './store/store';

const router = createRouter({
  routeTree,
  context: {
    user: null,
  }
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router,
  }
}

export function App() {
  const user = useGlobalStore((state) => state.user);

  return <RouterProvider router={router} context={{ user }} />;
}