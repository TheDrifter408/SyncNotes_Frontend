import { db } from "@/db/syncNotesDb";
import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/header";
import { useLiveQuery } from "dexie-react-hooks";
import { Notes } from "./-components/NotesList";

export const Route = createFileRoute("/_auth/notes/")({
  component: Index,
});

function Index() {
  const notes = useLiveQuery(() =>
    db.notes.orderBy("lastUpdated").reverse().toArray(),
  );

  return (
    <div className="[view-transition-name:main-content] w-full h-full flex flex-col gap-2 p-4 overflow-hidden">
      <Header>
        <div className="">
          <h4 className="text-sm font-bold text-primary">Sync Notes</h4>
        </div>
      </Header>
      <Notes notes={notes} />
    </div>
  );
}
