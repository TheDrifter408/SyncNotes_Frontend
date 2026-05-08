import { db } from "@/db/syncNotesDb";
import { createFileRoute } from "@tanstack/react-router";
import { EMPTY_CONTENT } from "@/lib/constants";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getTextPreview } from "@/lib/utils";
import type { ComponentProps, MouseEvent } from "react";
import type { Note } from "@/types/Note";
import { Header } from "@/components/header";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis, Trash } from "lucide-react";

export const Route = createFileRoute("/_auth/notes/")({
  loader: async () => {
    const notes = await db.notes.orderBy("lastUpdated").reverse().toArray();
    return { notes };
  },
  component: Index,
});

function Index() {
  const { notes } = Route.useLoaderData();
  const navigate = Route.useNavigate();

  function onCardClick(event: MouseEvent, noteId: string) {
    event.preventDefault();
    navigate({
      to: "/notes/$noteId",
      params: {
        noteId,
      },
    });
  }

  return (
    <div className="w-full h-full flex flex-col gap-2 p-4 overflow-hidden">
      <Header>
        <div className="">
          <h4 className="text-sm font-bold text-primary">Sync Notes</h4>
        </div>
      </Header>
      <h1 className="text-2xl font-bold">My Notes</h1>
      <div className="grid gap-4 p-2 overflow-y-auto">
        {notes.map((note) => (
          <NoteCard
            onClick={(event) => onCardClick(event, note.id)}
            key={note.id}
            {...note}
            className="rounded-lg duration-150 hover:cursor-pointer hover:-translate-y-1 hover:shadow-lg gap-1"
          />
        ))}
      </div>
    </div>
  );
}

function NoteCard({
  id,
  title,
  content,
  lastUpdated,
  ...props
}: Note & ComponentProps<typeof Card>) {
  const textPreview = getTextPreview(content);

  async function onClickDelete(event: MouseEvent, noteId: string) {
    event.preventDefault();
    await db.notes.delete(noteId);
  }

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle className="text-xl font-extrabold underline underline-offset-2">
          {title}
        </CardTitle>
        <CardAction>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Ellipsis />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-10" align="end">
              <DropdownMenuItem
                onClick={(event) => onClickDelete(event, id)}
                className="text-red-600"
              >
                <Trash /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardAction>
      </CardHeader>
      <CardContent>
        {textPreview === EMPTY_CONTENT ? (
          <h3 className="text-gray-600 text-sm">{EMPTY_CONTENT}</h3>
        ) : (
          <h3 className=" text-gray-700">{textPreview}</h3>
        )}
        <p className="text-sm font-italic  text-primary">
          Last edited on {new Date(lastUpdated).toLocaleTimeString()}
        </p>
      </CardContent>
    </Card>
  );
}
