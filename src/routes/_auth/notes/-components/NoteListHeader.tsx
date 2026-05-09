import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNotesFilterContext } from "@/hooks/useNotesFilterContext";
import { CheckCircle, Ellipsis, Plus } from "lucide-react";
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
    useNotesFilterContext();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  function onClickSelectionDone(event: MouseEvent) {
    event.preventDefault();
    setIsMultiSelect(false);
    setSelectedNoteIds(new Set());
  }

  function onClickSelect() {
    setIsMultiSelect(true);
  }

  return (
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold">{title}</h1>
      <div className="flex items-center gap-4">
        <Button
          className={`${isMultiSelect ? "visible w-auto" : "invisible size-0 pointer-events-none"}`}
          onClick={onClickSelectionDone}
        >
          <CheckCircle />
        </Button>
        <div
          className={`${isMultiSelect ? "invisible size-0" : "visible size-auto"} flex items-center gap-4`}
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
              <DropdownMenuContent>
                <DropdownMenuItem onSelect={onClickSelect}>
                  <CheckCircle /> Select Notes
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
