import { db } from "@/db/syncNotesDb";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { Index } from "./-components";
import { INITIAL_EDITOR_STATE } from "@/lib/constants";

export const Route = createFileRoute("/_auth/notes/")({
  loader: async () => {
    const lastNote = await db.notes.orderBy("lastUpdated").reverse().first();
    if (lastNote) {
      throw redirect({
        to: "/notes/$noteId",
        params: {
          noteId: lastNote.id,
        },
      });
    }
    const newNoteId = crypto.randomUUID();
    await db.notes.add({
      id: newNoteId,
      title: "Untitled",
      content: INITIAL_EDITOR_STATE,
      lastUpdated: new Date().toISOString(),
    });
    throw redirect({
      to: "/notes/$noteId",
      params: {
        noteId: newNoteId,
      },
    });
  },
  component: Index,
});
