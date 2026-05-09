import { createContext, type ChangeEvent, type ReactNode } from "react";

interface NotesContextValue {
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

export const NotesContext = createContext<NotesContextValue>(
  {} as NotesContextValue,
);

interface NotesContextProviderProps {
  children: ReactNode;
  value: NotesContextValue;
}

export const NotesContextProvider = ({
  children,
  value,
}: NotesContextProviderProps) => {
  return (
    <NotesContext.Provider value={value}>{children}</NotesContext.Provider>
  );
};
