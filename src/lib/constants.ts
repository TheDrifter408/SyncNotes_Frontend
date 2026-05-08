export const INITIAL_EDITOR_STATE = JSON.stringify({
  root: {
    children: [
      {
        children: [],
        direction: "ltr",
        format: "",
        indent: 0,
        type: "paragraph",
        version: 1,
      },
    ],
    direction: "ltr",
    format: "",
    indent: 0,
    type: "root",
    version: 1,
  },
});

export const EDITOR_THEME = {
  // Theme styling goes here
  ltr: "text-left",
  rtl: "text-right",
  placeholder:
    "text-muted-foreground absolute top-4 left-4 pointer-events-none select-none",
  paragraph: "relative m-0 mb-2 last:mb-0",
  quote: "border-l-4 border-primary pl-4 italic text-muted-foreground my-4",
  list: {
    nested: {
      listitem: "list-none",
    },
    ol: "list-decimal ml-4 mb-2",
    ul: "list-disc ml-4 mb-2",
    listitem: "ml-4",
  },
  image: "max-w-full h-auto rounded-lg",
  link: "text-primary underline underline-offset-4 cursor-pointer hover:text-primary/80",
  text: {
    bold: "font-bold",
    italic: "italic",
    underline: "underline",
    strikethrough: "line-through",
    underlineStrikethrough: "underline line-through",
    code: "bg-muted px-1.5 py-0.5 rounded-sm font-mono text-sm text-foreground",
  },
  code: "bg-muted block font-mono text-sm p-4 rounded-md overflow-x-auto border border-border my-4",
  codeHighlight: {
    atrule: "text-primary",
    attr: "text-primary",
    boolean: "text-destructive",
    builtin: "text-chart-1",
    cdata: "text-muted-foreground",
    char: "text-chart-2",
    class: "text-chart-3",
    "class-name": "text-chart-3",
    comment: "text-muted-foreground italic",
    constant: "text-destructive",
    deleted: "text-destructive",
    doctype: "text-muted-foreground",
    entity: "text-accent-foreground",
    function: "text-primary",
    important: "font-bold text-primary",
    inserted: "text-chart-1",
    keyword: "text-primary",
    namespace: "text-primary",
    number: "text-chart-2",
    operator: "text-foreground",
    prolog: "text-muted-foreground",
    property: "text-primary",
    punctuation: "text-muted-foreground",
    regex: "text-chart-4",
    selector: "text-chart-1",
    string: "text-chart-2",
    symbol: "text-chart-1",
    tag: "text-primary",
    url: "text-primary underline",
    variable: "text-chart-5",
  },
};

export const EMPTY_CONTENT = "(An empty Note)";
