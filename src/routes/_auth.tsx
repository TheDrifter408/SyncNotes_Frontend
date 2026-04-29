import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import React from 'react';

export const Route = createFileRoute('/_auth')({
  beforeLoad: ({ context, location }) => {
    if (!context?.user) {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href,
        }
      })
    }
  },
  component: AuthLayout,
});

function AuthLayout() {
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
    </React.Fragment>
  )
}