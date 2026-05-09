import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { db } from "@/db/syncNotesDb";
import { EMPTY_CONTENT } from "@/lib/constants";
import { getTextPreview } from "@/lib/utils";
import type { Note } from "@/types/Note";
import { Ellipsis, Trash } from "lucide-react";
import type { ComponentProps, MouseEvent } from "react";

export function NoteCard({
  id,
  title,
  content,
  lastUpdated,
  ...props
}: Note & ComponentProps<typeof Card>) {
  const textPreview = getTextPreview(content);

  async function onClickDelete(event: MouseEvent, noteId: string) {
    event.preventDefault();
    event.stopPropagation();
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
