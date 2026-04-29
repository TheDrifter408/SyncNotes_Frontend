import type { Note } from '@/types/Note';
import type { User } from '@/types/User';
import { create } from 'zustand';

type GlobalState = {
  notesMap: Map<string, Note | null>;
  user: User | null;
};

type StoreActions = {
  setUser: (user: User | null) => void;
  insertNote: (note: Note) => void;
  deleteNote: (noteId: string) => void;
  updateNote: (noteId: string, note: Note) => void;
}

export const useGlobalStore = create<GlobalState & StoreActions>((set, get) => ({
  notesMap: new Map(),
  insertNote: (note: Note) => {
    const newMap = new Map(get().notesMap);
    newMap.set(note.id, note);
    set({ notesMap: newMap });
  },
  deleteNote: (noteId: string) => {
    const newMap = new Map(get().notesMap);
    newMap.delete(noteId);
    set({ notesMap: newMap });
  },
  updateNote: (noteId: string, note: Note) => {
    const newMap = new Map(get().notesMap);
    newMap.set(noteId, note);
    set({ notesMap: newMap });
  },
  user: null,
  setUser: (user: User | null) => {
    set({ user });
  }
}));

