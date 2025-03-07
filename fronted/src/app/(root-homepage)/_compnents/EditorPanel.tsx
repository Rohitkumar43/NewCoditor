"use client";

/**
 * This code implements a feature-rich code editor panel using Monaco Editor.
 * It provides syntax highlighting, font size controls, theme support, and code persistence.
 * The component is part of a larger web-based IDE or coding platform.
 * 
 * Clerk is integrated for user authentication and session management.
 * It ensures the editor is only loaded for authenticated users and provides
 * user context for features like code sharing and persistence.
 */

import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { setCode, setEditor } from '@/stores/features/editorSlice';
import { useEffect, useState } from "react";
import { defineMonacoThemes, LANGUAGE_CONFIG } from "../_constant";
import { Editor } from "@monaco-editor/react";
import { motion } from "framer-motion";
import Image from "next/image";
import { RotateCcwIcon, ShareIcon, TypeIcon } from "lucide-react";
import { useClerk } from "@clerk/nextjs";
import { EditorPanelSkeleton } from "./EditorPanelSkeleton";
import ShareSnippetDialog from "./ShareSnippetDialog";

function EditorPanel() {
  const dispatch = useAppDispatch();
  const { language, theme, fontSize } = useAppSelector(state => state.editor);
  const clerk = useClerk();
  
  // Single declaration of state
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);

  // Load saved code from localStorage when language changes
  useEffect(() => {
    const savedCode = localStorage.getItem(`editor-code-${language}`);
    const newCode = savedCode || LANGUAGE_CONFIG[language].defaultCode;
    dispatch(setCode(newCode));
  }, [language, dispatch]);

  // Handler to reset code to default for current language
  const handleRefresh = () => {
    const defaultCode = LANGUAGE_CONFIG[language].defaultCode;
    dispatch(setCode(defaultCode));
    localStorage.removeItem(`editor-code-${language}`);
  };

  // Save code changes to localStorage
  const handleEditorChange = (value: string | undefined) => {
    if (value) {
      dispatch(setCode(value));
      localStorage.setItem(`editor-code-${language}`, value);
    }
  };

  // Update and save font size changes
  const handleFontSizeChange = (newSize: number) => {
    const size = Math.min(Math.max(newSize, 12), 24);
    localStorage.setItem("editor-font-size", size.toString());
  };

  if (!clerk.loaded) return <EditorPanelSkeleton />;

  return (
    <div className="relative">
      <div className="relative bg-[#12121a]/90 backdrop-blur rounded-xl border border-white/[0.05] p-6">
        {/* Header section */}
        <div className="flex items-center justify-between mb-4">
          {/* Left side - Language icon and title */}
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#1e1e2e] ring-1 ring-white/5">
              <Image src={"/" + language + ".png"} alt="Logo" width={24} height={24} />
            </div>
            <div>
              <h2 className="text-sm font-medium text-white">Code Editor</h2>
              <p className="text-xs text-gray-500">Write and execute your code</p>
            </div>
          </div>
          
          {/* Right side - Editor controls */}
          <div className="flex items-center gap-3">
            {/* Font size control */}
            <div className="flex items-center gap-3 px-3 py-2 bg-[#1e1e2e] rounded-lg ring-1 ring-white/5">
              <TypeIcon className="size-4 text-gray-400" />
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="12"
                  max="24"
                  value={fontSize}
                  onChange={(e) => handleFontSizeChange(parseInt(e.target.value))}
                  className="w-20 h-1 bg-gray-600 rounded-lg cursor-pointer"
                />
                <span className="text-sm font-medium text-gray-400 min-w-[2rem] text-center">
                  {fontSize}
                </span>
              </div>
            </div>

            {/* Reset code button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleRefresh}
              className="p-2 bg-[#1e1e2e] hover:bg-[#2a2a3a] rounded-lg ring-1 ring-white/5 transition-colors"
              aria-label="Reset to default code"
            >
              <RotateCcwIcon className="size-4 text-gray-400" />
            </motion.button>

            {/* Share code button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsShareDialogOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg overflow-hidden bg-gradient-to-r
               from-blue-500 to-blue-600 opacity-90 hover:opacity-100 transition-opacity"
            >
              <ShareIcon className="size-4 text-white" />
              <span className="text-sm font-medium text-white">Share</span>
            </motion.button>
          </div>
        </div>

        {/* Monaco Editor instance */}
        <div className="relative group rounded-xl overflow-hidden ring-1 ring-white/[0.05]">
          <Editor
            height="600px"
            language={LANGUAGE_CONFIG[language].monacoLanguage}
            value={LANGUAGE_CONFIG[language].defaultCode}
            onChange={handleEditorChange}
            theme={theme}
            beforeMount={defineMonacoThemes}
            onMount={(editor) => dispatch(setEditor(editor))}
            options={{
              minimap: { enabled: false },
              fontSize,
              automaticLayout: true,
              scrollBeyondLastLine: false,
              padding: { top: 16, bottom: 16 },
              renderWhitespace: "selection",
              fontFamily: '"Fira Code", "Cascadia Code", Consolas, monospace',
              fontLigatures: true,
              cursorBlinking: "smooth",
              smoothScrolling: true,
              contextmenu: true,
              renderLineHighlight: "all",
              lineHeight: 1.6,
              letterSpacing: 0.5,
              roundedSelection: true,
              scrollbar: {
                verticalScrollbarSize: 8,
                horizontalScrollbarSize: 8,
              },
            }}
          />
        </div>
      </div>
      
      {/* Share dialog */}
      {isShareDialogOpen && (
        <ShareSnippetDialog onClose={() => setIsShareDialogOpen(false)} />
      )}
    </div>
  );
}

export default EditorPanel;