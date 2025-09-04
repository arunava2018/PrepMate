import { useRef, useEffect, forwardRef, useImperativeHandle, useCallback } from "react";
import SimpleMDE from "easymde";
import "easymde/dist/easymde.min.css";
import { FileText } from "lucide-react";

const MarkdownEditor = forwardRef(({ value, onChange, error }, ref) => {
  const editorRef = useRef(null);
  const editorInstance = useRef(null);
  const isInitialized = useRef(false);

  // Stable onChange handler that doesn't change on every render
  const handleEditorChange = useCallback(() => {
    if (editorInstance.current) {
      const newValue = editorInstance.current.value();
      onChange(newValue);
    }
  }, [onChange]);

  useEffect(() => {
    if (!editorRef.current || isInitialized.current) return;

    // Initialize the editor only once
    editorInstance.current = new SimpleMDE({
      element: editorRef.current,
      spellChecker: true,
      placeholder: `Write your interview experience...

Example:
1. Aptitude test
2. Coding challenge  
3. Technical and HR rounds
4. Final decision

Use **bold** and *italic* for emphasis!`,
      status: false,
      autofocus: false,
      toolbar: [
        "bold",
        "italic",
        "|",
        "heading-1",
        "heading-2",
        "|",
        "quote",
        "unordered-list",
        "ordered-list",
        "|",
        "link",
        "code",
        "|",
        "preview",
        "fullscreen",
      ],
    });

    // Set up change listener
    editorInstance.current.codemirror.on("change", handleEditorChange);

    // Mark as initialized
    isInitialized.current = true;

    return () => {
      if (editorInstance.current) {
        editorInstance.current.codemirror.off("change", handleEditorChange);
        editorInstance.current.toTextArea();
        editorInstance.current = null;
        isInitialized.current = false;
      }
    };
  }, []); // no onChange in deps to avoid re-init

  // Update editor value when prop changes (external updates like reset)
  useEffect(() => {
    if (editorInstance.current && editorInstance.current.value() !== value) {
      if (value === "" || value !== editorInstance.current.value()) {
        editorInstance.current.value(value || "");
      }
    }
  }, [value]);

  // Expose methods to parent component
  useImperativeHandle(ref, () => ({
    clearEditor: () => {
      if (editorInstance.current) {
        editorInstance.current.value("");
      }
    },
    focus: () => {
      if (editorInstance.current) {
        editorInstance.current.codemirror.focus();
      }
    },
    getValue: () => {
      if (editorInstance.current) {
        return editorInstance.current.value();
      }
      return "";
    },
  }));

  return (
    <div>
      {/* Label with FileText icon */}
      <label className="text-sm font-medium text-gray-300 flex items-center gap-2 mb-2">
        <FileText className="w-4 h-4 text-green-400" />
        Interview Experience *
      </label>

      <div
        className={`border-2 rounded-lg overflow-hidden ${
          error ? "border-red-400" : "border-gray-300 dark:border-gray-600"
        }`}
      >
        <textarea ref={editorRef} />
      </div>

      {error && (
        <p className="text-red-600 dark:text-red-400 text-xs mt-1">{error}</p>
      )}
    </div>
  );
});

MarkdownEditor.displayName = "MarkdownEditor";

export default MarkdownEditor;
