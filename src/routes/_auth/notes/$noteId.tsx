import { Editor } from '@/components/lexical-editor'
import { Input } from '@/components/ui/input'
import { useGlobalStore } from '@/store/store';
import { createFileRoute, useParams } from '@tanstack/react-router'
import type { EditorState } from 'lexical';
import type { ChangeEvent } from 'react';

export const Route = createFileRoute('/_auth/notes/$noteId')({
  component: RouteComponent,
})

function RouteComponent() {

  const params = useParams({ from: "/_auth/notes/$noteId" });

  const notesMap = useGlobalStore((state) => state.notesMap);
  const updateNote = useGlobalStore((state) => state.updateNote);

  function onChangeTitle(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.currentTarget;
    updateNote(params.noteId, { title: value });
  };

  function onEditorChange(editorState: EditorState) {
    editorState.read(() => {
      const json = JSON.stringify(editorState.toJSON());
      updateNote(params.noteId, { content: json });
    })
  }

  let note = notesMap.get(params.noteId);

  return (
    <div>
      <Input type="text" placeholder="Untitled" onChange={onChangeTitle} />
      <Editor initialContent={note?.content || ""} onChange={onEditorChange} />
    </div>
  )
}
