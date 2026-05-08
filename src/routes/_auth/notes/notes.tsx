import { createFileRoute } from "@tanstack/react-router";
import { Notes } from "./-components/notes";

export const Route = createFileRoute("/_auth/notes/notes")({
  component: Notes,
});
