import { useRef, useEffect, forwardRef, useImperativeHandle, useCallback } from "react";
import SimpleMDE from "easymde";
import "easymde/dist/easymde.min.css";

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
      spellChecker: false,
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
  }, []); // Remove onChange from dependencies

  // Update editor value when prop changes (for external updates like form reset)
  useEffect(() => {
    if (editorInstance.current && editorInstance.current.value() !== value) {
      // Only update if the value is different to avoid cursor issues
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
    }
  }));

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        Interview Experience *
      </label>
      <div
        className={`border-2 rounded-lg overflow-hidden
                   ${
                     error
                       ? "border-red-400"
                       : "border-gray-300 dark:border-gray-600"
                   }`}
      >
        <textarea ref={editorRef} />
      </div>
      {error && (
        <p className="text-red-600 dark:text-red-400 text-xs mt-1">
          {error}
        </p>
      )}
    </div>
  );
});

MarkdownEditor.displayName = "MarkdownEditor";

export default MarkdownEditor;
