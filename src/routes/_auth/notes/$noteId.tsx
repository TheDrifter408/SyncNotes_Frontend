import { createFileRoute, useParams } from "@tanstack/react-router";
import { Note } from "./-components/noteId";

export const Route = createFileRoute("/_auth/notes/$noteId")({
  component: NoteRouteComponent,
});

function NoteRouteComponent() {
  const params = useParams({ from: "/_auth/notes/$noteId" });
  return <Note key={params.noteId} />;
}
