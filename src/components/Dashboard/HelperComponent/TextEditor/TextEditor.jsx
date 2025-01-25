import JoditEditor from "jodit-react";
import { useEffect, useMemo, useState } from "react";

const TextEditor = ({ content, setContent }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme"));

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const config = useMemo(
    () => ({
      minHeight: 500,
      readonly: false,
      placeholder: "Start typing here...",
      autofocus: true,
      spellcheck: true,
      iframe: true,
      theme: theme,
      toolbarSticky: false,
      saveHeightInStorage: true,
      saveModeInStorage: true,
      showCharsCounter: false,
      showWordsCounter: false,
      showXPathInStatusbar: false,
      buttons: [
        "bold",
        "italic",
        "underline",
        "strikethrough",
        "eraser", // Basic formatting
        "ul",
        "ol",
        "font",
        "fontsize",
        "paragraph", // List and font options
        "lineHeight",
        "superscript",
        "subscript", // Line height and text modifications
        "classSpan",
        "file",
        "image",
        "video",
        "spellcheck", // Media and spellcheck
        "speechRecognize",
        "cut",
        "copy",
        "paste",
        "selectall", // Clipboard actions
        "copyformat",
        "hr",
        "table",
        "link",
        "symbols", // Formatting tools
        "indent",
        "outdent", // AI commands and indentation
        "left",
        "brush",
        "undo",
        "redo",
        "find", // Alignment, undo/redo, and search
        "source",
        "fullsize",
        "preview",
      ],
    }),
    [theme]
  );

  return (
    <JoditEditor
      value={content}
      config={config}
      tabIndex={1}
      onBlur={(newContent) => setContent(newContent)}
      onChange={(newContent) => setContent(newContent)}
    />
  );
};

export default TextEditor;
