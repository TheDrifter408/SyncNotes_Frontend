import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import type { EditorState } from "lexical";
import { InitializePlugin } from "@/routes/_auth/notes/-components/lexical-plugins/InitializePlugin";
import { EDITOR_THEME } from "@/lib/constants";

interface EditorProps {
  initialContent: string;
  onChange: (editorState: EditorState) => void;
  namespace?: string;
  className?: string;
  placeholderClassName?: string;
}

// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
function onError(error: Error): void {
  console.error(error);
}

export function Editor({
  initialContent,
  namespace,
  onChange,
  className = "",
  placeholderClassName = "",
}: EditorProps) {
  const initialConfig = {
    namespace: namespace ?? "SyncNotesEditor",
    theme: EDITOR_THEME,
    onError,
    editorState: null,
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <RichTextPlugin
        contentEditable={<ContentEditable className={className} />}
        placeholder={
          <div className={placeholderClassName}>Enter some text...</div>
        }
        ErrorBoundary={LexicalErrorBoundary}
      />
      <InitializePlugin json={initialContent} />
      <OnChangePlugin onChange={onChange} />
      <HistoryPlugin />
      <AutoFocusPlugin />
    </LexicalComposer>
  );
}
