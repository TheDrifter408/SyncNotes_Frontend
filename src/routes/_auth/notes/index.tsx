import { db } from "@/db/syncNotesDb";
import { createFileRoute } from "@tanstack/react-router";
import { INITIAL_EDITOR_STATE } from "@/lib/constants";
import { Card } from "@/components/ui/card";
import { useState, type ChangeEvent, type MouseEvent } from "react";
import { Header } from "@/components/header";
import { useLiveQuery } from "dexie-react-hooks";
import { NoteCard } from "./-components/NoteCard";
import { NoteListHeader } from "./-components/NoteListHeader";
import { Checkbox } from "@/components/ui/checkbox";
import { NotesFilterContextProvider } from "@/context/NotesFilterContext";
import { FilterFloatingBar } from "./-components/FilterFloatingBar";

export const Route = createFileRoute("/_auth/notes/")({
  component: Index,
});

function Index() {
  const notes = useLiveQuery(() =>
    db.notes.orderBy("lastUpdated").reverse().toArray(),
  );
  const navigate = Route.useNavigate();

  const [isMultiSelect, setIsMultiSelect] = useState(false);

  const [selectedNoteIds, setSelectedNoteIds] = useState<Set<string>>(
    new Set(),
  );

  function onCardClick(event: MouseEvent, noteId: string) {
    event.preventDefault();
    if (isMultiSelect) {
      setSelectedNoteIds((prev) => {
        const newSet = new Set(prev);
        if (newSet.has(noteId)) {
          newSet.delete(noteId);
        } else {
          newSet.add(noteId);
        }
        return newSet;
      });
      return;
    }
    navigate({
      to: "/notes/$noteId",
      params: {
        noteId,
      },
    });
  }

  async function onClickAddNote(event: MouseEvent) {
    event.preventDefault();
    const id = crypto.randomUUID();
    const count = await db.notes.count();
    await db.notes.add({
      id,
      title: `Untitled ${count}`,
      content: INITIAL_EDITOR_STATE,
      lastUpdated: new Date().toISOString(),
    });
  }

  function onCheckboxChange(
    event: ChangeEvent<HTMLButtonElement>,
    noteId: string,
  ) {
    event.preventDefault();
    setSelectedNoteIds((prev) => {
      const newSet = new Set(prev);
      if (!newSet.has(noteId)) {
        newSet.add(noteId);
      } else {
        newSet.delete(noteId);
      }
      return newSet;
    });
  }

  function onSelectAll() {
    setSelectedNoteIds(new Set(notes?.map((note) => note.id)));
  }

  async function onDeleteSelected() {
    if (selectedNoteIds.size === 0) return;
    const noteIds = Array.from(selectedNoteIds);
    await db.notes.bulkDelete(noteIds);
    setSelectedNoteIds(new Set());
  }

  return (
    <div className="w-full h-full flex flex-col gap-2 p-4 overflow-hidden">
      <Header>
        <div className="">
          <h4 className="text-sm font-bold text-primary">Sync Notes</h4>
        </div>
      </Header>
      <NotesFilterContextProvider
        value={{
          isMultiSelect,
          setIsMultiSelect,
          selectedNoteIds,
          setSelectedNoteIds,
          onCheckboxChange,
          onDeleteSelected,
          onSelectAll,
        }}
      >
        <NoteListHeader title="My Notes" onClickAddNote={onClickAddNote} />
        <div className="relative grid gap-2 h-full p-2 overflow-y-auto">
          {!notes
            ? Array.from({ length: 5 }).map((_, index) => (
                <Card
                  key={index}
                  className="min-h-10 pointer-events-none rounded-lg duration-150 hover:cursor-none animate-pulse"
                />
              ))
            : notes.map((note) => (
                <div key={note.id} className="flex items-center gap-1">
                  <Checkbox
                    className={`${isMultiSelect ? "visible size-5" : "invisible size-0 pointer-events-none"}`}
                    checked={selectedNoteIds.has(note.id)}
                    onChange={(event) => onCheckboxChange(event, note.id)}
                  />
                  <NoteCard
                    onClick={(event) => onCardClick(event, note.id)}
                    key={note.id}
                    {...note}
                    className="min-h-30 flex-2 m-0 rounded-lg duration-150 hover:cursor-pointer hover:-translate-y-1 hover:shadow-lg gap-1"
                  />
                </div>
              ))}
          <FilterFloatingBar />
        </div>
      </NotesFilterContextProvider>
    </div>
  );
}
