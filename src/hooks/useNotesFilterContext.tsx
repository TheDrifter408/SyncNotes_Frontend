import { useContext } from "react";
import { NoteFilterContext } from "../context/NotesFilterContext";

export const useNotesFilterContext = () => {
  const context = useContext(NoteFilterContext);
  if (!context) {
    throw new Error(
      "useNotesFilterContext must be used within a NotesFilterContext",
    );
  }
  return context;
};
