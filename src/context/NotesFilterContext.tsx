import { createContext, type ChangeEvent, type ReactNode } from "react";

interface NotesFilterContextValue {
  selectedNoteIds: Set<string>;
  setSelectedNoteIds: (selectedNoteIds: Set<string>) => void;
  isMultiSelect: boolean;
  setIsMultiSelect: (isMultiSelect: boolean) => void;
  onCheckboxChange: (
    event: ChangeEvent<HTMLButtonElement>,
    noteId: string,
  ) => void;
  onSelectAll: () => void;
  onDeleteSelected: () => Promise<void>;
}

export const NoteFilterContext = createContext<NotesFilterContextValue>(
  {} as NotesFilterContextValue,
);

interface NotesFilterContextProviderProps {
  children: ReactNode;
  value: NotesFilterContextValue;
}

export const NotesFilterContextProvider = ({
  children,
  value,
}: NotesFilterContextProviderProps) => {
  return (
    <NoteFilterContext.Provider value={value}>
      {children}
    </NoteFilterContext.Provider>
  );
};
