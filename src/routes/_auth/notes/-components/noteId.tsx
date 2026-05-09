import { Editor } from "@/components/lexical-editor";
import { Button } from "@/components/ui/button";
import { db } from "@/db/syncNotesDb";
import { useDebouncedCallback } from "@/hooks/useDebounce";
import { INITIAL_EDITOR_STATE } from "@/lib/constants";
import type { Note } from "@/types/Note";
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import { useLiveQuery } from "dexie-react-hooks";
import { $getRoot, type EditorState } from "lexical";
import { Check, LoaderPinwheel, Plus } from "lucide-react";
import { useState, type ChangeEvent, type MouseEvent } from "react";

export function Note() {
    const params = useParams({ from: "/_auth/notes/$noteId" });

    const navigate = useNavigate();

    const [isSaving, setIsSaving] = useState(false);

    const note = useLiveQuery(
        () => db.notes.get(params.noteId),
        [params.noteId],
    );

    async function onClickPlusButton(event: MouseEvent) {
        event.preventDefault();
        const newNoteId = crypto.randomUUID();
        await db.notes.add({
            id: newNoteId,
            title: "Untitled",
            content: INITIAL_EDITOR_STATE,
            lastUpdated: new Date().toISOString(),
        });
        navigate({
            to: "/notes/$noteId",
            params: {
                noteId: newNoteId,
            },
        });
    }

    const updateNote = useDebouncedCallback(async (updates: Partial<Note>) => {
        await db.notes.update(params.noteId, { ...updates });
        setIsSaving(false);
    }, 500);

    function onChangeTitle(event: ChangeEvent<HTMLInputElement>) {
        const { value } = event.currentTarget;
        updateNote({ title: value });
        setIsSaving(true);
    }

    function onEditorChange(editorState: EditorState) {
        editorState.read(() => {
            const root = $getRoot();

            const json = root.isEmpty()
                ? INITIAL_EDITOR_STATE
                : JSON.stringify(editorState.toJSON());

            updateNote({
                content: json,
                lastUpdated: new Date().toISOString(),
            });
            setIsSaving(true);
        });
    }

    const content = note?.content
        ? JSON.parse(note.content)
        : INITIAL_EDITOR_STATE;

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
            <div className="flex gap-1 items-center justify-between">
                {/* Note header left side */}
                <div className="flex gap-1 items-center">
                    <Button className="flex-0" asChild>
                        <Link
                            to="/notes"
                            viewTransition={{ types: ["slide-right"] }}
                        >
                            Back
                        </Link>
                    </Button>
                </div>
                {/* Note header right side */}
                <div className="flex gap-1 items-center">
                    <div className="flex items-center gap-1">
                        {isSaving ? (
                            <>
                                <LoaderPinwheel className="text-gray-500 duration-400 animate-spin" />
                            </>
                        ) : (
                            <>
                                <Check className="text-accent-foreground" />
                            </>
                        )}
                    </div>
                    <Button type="button" onClick={onClickPlusButton}>
                        <Plus />
                    </Button>
                </div>
            </div>
            <div className="relative flex flex-col gap-2">
                <input
                    name="title"
                    className="text-3xl my-2 w-full border-none underline font-extrabold focus:outline-none"
                    type="text"
                    placeholder="Untitled"
                    defaultValue={note?.title}
                    onChange={onChangeTitle}
                />
                <h3 className="text-sm font-semibold text-gray-600">
                    Last updated on{" "}
                    {new Date(note?.lastUpdated || "").toLocaleString()}
                </h3>
                <div>
                    <Editor
                        className="px-1 focus:outline-none"
                        placeholderClassName="absolute top-22 left-1 text-gray-400"
                        initialContent={content}
                        onChange={onEditorChange}
                    />
                </div>
            </div>
        </div>
    );
}
