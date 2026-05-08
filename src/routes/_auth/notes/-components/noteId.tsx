import { Editor } from "@/components/lexical-editor";
import { Button } from "@/components/ui/button";
import { db } from "@/db/syncNotesDb";
import { useDebouncedCallback } from "@/hooks/useDebounce";
import { INITIAL_EDITOR_STATE } from "@/lib/constants";
import type { Note } from "@/types/Note";
import { Link, useParams } from "@tanstack/react-router";
import { useLiveQuery } from "dexie-react-hooks";
import { $getRoot, type EditorState } from "lexical";
import type { ChangeEvent } from "react";

export function Note() {
  const params = useParams({ from: "/_auth/notes/$noteId" });

  const note = useLiveQuery(() => db.notes.get(params.noteId), [params.noteId]);

  const updateNote = useDebouncedCallback(async (updates: Partial<Note>) => {
    await db.notes.update(params.noteId, { ...updates });
  }, 500);

  function onChangeTitle(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.currentTarget;
    updateNote({ title: value });
  }

  function onEditorChange(editorState: EditorState) {
    editorState.read(() => {
      const root = $getRoot();

      const json = root.isEmpty()
        ? INITIAL_EDITOR_STATE
        : JSON.stringify(editorState.toJSON());

      updateNote({ content: json, lastUpdated: new Date().toISOString() });
    });
  }

  const content = note?.content
    ? JSON.parse(note.content)
    : INITIAL_EDITOR_STATE;

  console.log(content);

  if (!note) {
    return (
      <div className="">
        <div className="duration-500 animate-pulse" />
        <div className="h-full duration-500 animate-pulse" />
      </div>
    );
  }

  return (
    <div key={params.noteId} className="p-4 border rounded h-full">
      <div className="flex items-center">
        <Button className="flex-0" asChild>
          <Link to="/notes">Back</Link>
        </Button>
        <div className="flex-1">Breadcrumbs</div>
      </div>
      <input
        name="title"
        className="text-3xl w-full border-none font-extrabold"
        type="text"
        placeholder="Untitled"
        defaultValue={note?.title}
        onChange={onChangeTitle}
      />
      <Editor initialContent={content} onChange={onEditorChange} />
    </div>
  );
}
