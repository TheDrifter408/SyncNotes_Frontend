import { Button } from "@/components/ui/button";
import { useNotesFilterContext } from "@/hooks/useNotesFilterContext";
import { Trash } from "lucide-react";

export function FilterFloatingBar() {
  const filterContext = useNotesFilterContext();

  const selectedNoteIds = filterContext.selectedNoteIds;

  const selectedSome = selectedNoteIds.size > 0;

  return (
    <div
      className={`duration-100 ${selectedSome ? "-translate-y-10" : "translate-y-full"} fixed w-4/5 mx-auto bottom-0 rounded left-0 right-0 border bg-white shadow-lg`}
    >
      <div className="flex items-center justify-center p-4 gap-2">
        <Button onClick={filterContext.onSelectAll}>Select All</Button>
        <Button
          variant="outline"
          className="text-red-600"
          onClick={filterContext.onDeleteSelected}
        >
          <Trash />
          Delete Selected
        </Button>
      </div>
    </div>
  );
}
