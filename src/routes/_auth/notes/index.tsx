import { db } from "@/db/syncNotesDb";
import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/header";
import { useLiveQuery } from "dexie-react-hooks";
import { Notes } from "./-components/NotesList";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, User } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { BASE_URL } from "@/constants";

export const Route = createFileRoute("/_auth/notes/")({
  component: Index,
});

function Index() {
  const queryClient = useQueryClient();
  const navigate = Route.useNavigate();

  const notes = useLiveQuery(() =>
    db.notes.orderBy("lastUpdated").reverse().toArray(),
  );

  async function handleLogout() {
    try {
      await fetch(`${BASE_URL}/auth/signout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error(error);
    } finally {
      queryClient.clear();
      navigate({ to: "/login" });
    }
  }

  return (
    <div className="[view-transition-name:main-content] w-full h-full flex flex-col gap-2 p-4 overflow-hidden">
      <Header className="justify-between">
        <div className="">
          <h4 className="text-sm font-bold text-primary">Sync Notes</h4>
        </div>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <User className="hover:cursor-pointer" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-10" align="end">
              <DropdownMenuItem className="text-red-600" onClick={handleLogout}>
                <LogOut /> Log Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </Header>
      <Notes notes={notes} />
    </div>
  );
}
