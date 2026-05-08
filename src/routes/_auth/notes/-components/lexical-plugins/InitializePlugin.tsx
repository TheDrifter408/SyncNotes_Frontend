import { useEffect, useRef } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

export function InitializePlugin({ json }: { json: string | null }) {
  const [editor] = useLexicalComposerContext();
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Only run the on receiving valid JSON
    if (json && isFirstRender.current) {
      const editorState = editor.parseEditorState(json);
      editor.setEditorState(editorState);
      isFirstRender.current = false;
    }
  }, [json, editor]);

  return null;
}
