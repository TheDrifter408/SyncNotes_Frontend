import { Button } from '@/components/ui/button'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { useGlobalStore } from '@/store/store'
import type { Note } from '@/types/Note'
import { createFileRoute, Link, Outlet } from '@tanstack/react-router'
import React from 'react'

export const Route = createFileRoute('/_auth/notes/notes')({
  component: RouteComponent,
})

function RouteComponent() {

  const notesMap = useGlobalStore((state) => state.notesMap);

  return (
    <React.Fragment>
      <ResizablePanelGroup orientation="horizontal" className="min-h-max">
        <ResizablePanel defaultSize="25%">
          <div className="grid h-full items-center">
            {
              Array.from(notesMap.values()).filter(Boolean).map((note: Note | null) => {
                if (!note) {
                  return <></>;
                }
                return (
                  <div key={note.id}>
                    <Button asChild>
                      <Link to={`/notes/$noteId`} params={{ noteId: note.id }}>
                        {note.title}
                      </Link>
                    </Button>
                  </div>
                );
              })
            }
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize="75%">
          <div className="flex h-full items-start justify-start p-6">
            <Outlet />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </React.Fragment>
  )
}
