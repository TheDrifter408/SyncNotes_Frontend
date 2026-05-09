import { createContext, type ReactNode } from "react";

interface NotesViewContextValue {
    view: "list" | "grid";
    setView: (view: "list" | "grid") => void;
}

export const NotesViewContext = createContext<NotesViewContextValue>({
    view: "list",
    setView: () => {},
});

interface NotesViewProviderProps {
    children: ReactNode;
    value: NotesViewContextValue;
}

export function NotesViewProvider({ children, value }: NotesViewProviderProps) {
    return (
        <NotesViewContext.Provider value={value}>
            {children}
        </NotesViewContext.Provider>
    );
}
