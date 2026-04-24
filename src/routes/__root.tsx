import * as React from 'react'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  return (
    <React.Fragment>
      <ResizablePanelGroup orientation="horizontal" className="min-h-max">
        <ResizablePanel defaultSize="25%">
          <div className="flex h-full items-center">
            Sidebar
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize="75%">
          <div className="flex h-full items-center justify-center p-6">
            <Outlet />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
      <TanStackRouterDevtools />
    </React.Fragment>
  )
}
