import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNotesContext } from "@/hooks/useNotesContext";
import { useNotesViewContext } from "@/hooks/useNotesViewContext";
import { CheckCircle, Ellipsis, Grid, List, Plus } from "lucide-react";
import { useState, type MouseEvent } from "react";

interface NoteListHeaderProps {
    title?: string;
    onClickAddNote: (event: MouseEvent) => void;
}

export function NoteListHeader({
    title = "My Notes",
    onClickAddNote,
}: NoteListHeaderProps) {
    const { isMultiSelect, setIsMultiSelect, setSelectedNoteIds } =
        useNotesContext();
    const { view, setView } = useNotesViewContext();

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    function onClickSelectionDone(event: MouseEvent) {
        event.preventDefault();
        setIsMultiSelect(false);
        setSelectedNoteIds(new Set());
    }

    function onClickSelect() {
        setIsMultiSelect(true);
    }

    function onClickViewChange() {
        if (view === "list") {
            setView("grid");
        } else {
            setView("list");
        }
    }

    return (
        <div className="flex justify-between items-center px-4">
            <h1 className="text-2xl font-bold">{title}</h1>
            <div className="flex items-center gap-4">
                <Button
                    className={`${isMultiSelect ? "visible w-auto" : "invisible size-0 pointer-events-none"}`}
                    onClick={onClickSelectionDone}
                >
                    <CheckCircle />
                </Button>
                <div
                    className={`${isMultiSelect ? "invisible size-0" : "visible size-auto"} flex gap-4`}
                >
                    <Button type="button" onClick={onClickAddNote}>
                        <Plus className="w-4 h-4" />
                    </Button>
                    <DropdownMenu
                        open={isDropdownOpen}
                        onOpenChange={(open) => setIsDropdownOpen(open)}
                    >
                        <DropdownMenuTrigger>
                            <Ellipsis className="w-4 h-4" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-10" align="end">
                            <DropdownMenuItem onSelect={onClickSelect}>
                                <CheckCircle /> Select Notes
                            </DropdownMenuItem>
                            <DropdownMenuItem onSelect={onClickViewChange}>
                                {view === "list" ? (
                                    <>
                                        <Grid /> Grid View
                                    </>
                                ) : (
                                    <>
                                        <List /> List View
                                    </>
                                )}
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </div>
    );
}
