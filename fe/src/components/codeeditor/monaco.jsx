import React, { useEffect, useRef } from "react";
import MonacoEditor from "@monaco-editor/react";
import { useState } from "react";
import LanguageSelector from "../../components/codeeditor/LanguageSelector";

function CodeEditor({
  problem,
  value,
  onSolutionChange,
  onLanguageChange,
}) {
  const [language, setLanguage] = useState("java");
  const editorRef = useRef();

  useEffect(() => {
    onSolutionChange(value);
  }, [value, onSolutionChange]);

  useEffect(() => {
    onLanguageChange(language);
  }, [language, onLanguageChange]);
  
  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };
  const onSelect = (language) => {
    setLanguage(language);
    onLanguageChange(language);
  };

  return (
    <div>
      <LanguageSelector language={language} onSelect={onSelect} />
      <MonacoEditor
        height="600px"
        width="auto"
        language={language}
        defaultValue={problem?.inputFormat || ''}
        options={{
          minimap: { enabled: false },
          scrollbar: { vertical: "auto" },
          automaticLayout: true,
        }}
        theme="vs-dark"
        value={value}
        onChange={onSolutionChange}
        onMount={onMount}
      />
    </div>
  );
}

export default CodeEditor;
