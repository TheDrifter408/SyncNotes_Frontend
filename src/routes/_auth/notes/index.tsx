import { useGlobalStore } from '@/store/store';
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/notes/')({
  loader: () => {
    const state = useGlobalStore.getState();
    const { notesMap, insertNote } = state;

    if (notesMap.size > 0) {
      const firstNoteId = notesMap.keys().next().value;
      if (firstNoteId) {
        throw redirect({
          to: '/notes/$noteId',
          params: {
            noteId: firstNoteId,
          }
        });
      }
    } else {
      const newNoteId = crypto.randomUUID();
      insertNote({
        id: newNoteId,
        title: "Untitled",
        content: "",
        lastUpdated: new Date().toISOString(),
      });
      throw redirect({
        to: "/notes/$noteId",
        params: {
          noteId: newNoteId,
        }
      })
    }

  },
  component: RouteComponent,
})

function RouteComponent() {

  return (
    <div className="w-full">
      <p>Loading...</p>
    </div>
  )
}
