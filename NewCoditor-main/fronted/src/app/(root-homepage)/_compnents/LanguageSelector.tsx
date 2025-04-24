"use client";

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/stores';
import { setLanguage } from '@/stores/features/editorSlice';
import { useEffect, useRef, useState } from "react";
import { LANGUAGE_CONFIG } from "../_constant";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDownIcon, Lock, Sparkles } from "lucide-react";
import LanguageIcon from '@/components/LanguageIcon';
import { useUser } from "@/hooks/useUser";

export default function LanguageSelector() {
  const { user } = useUser();
  const isProUser = user?.subscription?.isValid || false;
  const dispatch = useDispatch();
  const language = useSelector((state: RootState) => state.editor.language);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const currentLanguageObj = LANGUAGE_CONFIG[language];

  const handleLanguageSelect = (langId: string) => {
    if (!isProUser && !['javascript', 'python', 'java', 'cpp'].includes(langId)) {
      return;
    }
    dispatch(setLanguage(langId));
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`group relative flex items-center gap-3 px-4 py-2.5 bg-[#1e1e2e]/80 
        rounded-lg transition-all duration-200 border border-gray-800/50 hover:border-gray-700
        ${!isProUser && !['javascript', 'python', 'java', 'cpp'].includes(language) ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/5 
          rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
        />
        <LanguageIcon 
          src={currentLanguageObj?.logoPath || ''} 
          alt={`${currentLanguageObj?.label || ''} logo`} 
          className="w-6 h-6"
        />
        <span className="text-gray-300">{currentLanguageObj?.label || 'Select Language'}</span>
        <ChevronDownIcon className="w-4 h-4 text-gray-400 transition-transform group-hover:rotate-180" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 mt-2 w-full rounded-lg border border-gray-800/50 bg-[#1e1e2e] shadow-lg z-50"
          >
            <div className="max-h-[280px] overflow-y-auto overflow-x-hidden">
              {Object.entries(LANGUAGE_CONFIG).map(([langId, lang], index) => {
                const isLocked = !isProUser && !['javascript', 'python', 'java', 'cpp'].includes(langId);

                return (
                  <motion.div
                    key={langId}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="relative"
                  >
                    <button
                      onClick={() => handleLanguageSelect(langId)}
                      disabled={isLocked}
                      className={`flex items-center gap-3 px-4 py-2.5 w-full text-left transition-colors
                        ${isLocked ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#2a2a3a]/50'}`}
                    >
                      <LanguageIcon 
                        src={lang.logoPath} 
                        alt={`${lang.label} logo`} 
                        className="w-6 h-6"
                      />
                      <span className="text-gray-300">{lang.label}</span>
                      {language === langId && (
                        <Sparkles className="w-4 h-4 text-blue-400 animate-pulse" />
                      )}
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}