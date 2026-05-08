import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/db/syncNotesDb";
import { Fragment } from "react/jsx-runtime";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Button } from "@/components/ui/button";
import type { Note } from "@/types/Note";

export const Route = createFileRoute("/_auth/notes/notes")({
  component: Notes,
});

function Notes() {
  const notes = useLiveQuery(() => db.notes.toArray());

  if (!notes) {
    return (
      <Fragment>
        <ResizablePanelGroup orientation="horizontal" className="min-h-max">
          <ResizablePanel defaultSize="25%">
            <div className="grid h-full items-center border rounded">
              {Array.from({ length: 10 }, (_, i) => i + 1).map(
                (note: number) => {
                  return (
                    <div key={note}>
                      <Button
                        variant="ghost"
                        className="duration-500 animate-pulse"
                      ></Button>
                    </div>
                  );
                },
              )}
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize="75%">
            <div className="flex h-full items-start justify-start p-6">
              <div className="animate-pulse duration-500" />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <ResizablePanelGroup orientation="horizontal" className="min-h-max">
        <ResizablePanel defaultSize="25%">
          <div className="grid h-full items-center border rounded">
            {notes.map((note: Note) => {
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
            })}
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize="75%">
          <div className="flex h-full items-start justify-start p-6">
            <Outlet />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </Fragment>
  );
}
