"use client";
<<<<<<< HEAD
=======

>>>>>>> 1aa82f4 (make the change in the price page)
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/stores';
import { setLanguage } from '@/stores/features/editorSlice';
import { useEffect, useRef, useState } from "react";
import { LANGUAGE_CONFIG } from "../_constant";
import { motion, AnimatePresence } from "framer-motion";
<<<<<<< HEAD
import Image from "next/image";
import { ChevronDownIcon, Lock, Sparkles } from "lucide-react";

function LanguageSelector({ hasAccess }: { hasAccess: boolean }) {
    const dispatch = useDispatch();
    const language = useSelector((state: RootState) => state.editor.language);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
  const currentLanguageObj = LANGUAGE_CONFIG[language];

  // Debug logging
  useEffect(() => {
    console.log('Available Languages:', Object.keys(LANGUAGE_CONFIG));
    console.log('Current Language:', language);
    console.log('Current Language Object:', currentLanguageObj);
  }, [language]);
=======
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
>>>>>>> 1aa82f4 (make the change in the price page)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

<<<<<<< HEAD
  const handleLanguageSelect = (langId: string) => {
    if (!hasAccess && langId !== "javascript") return;
    dispatch(setLanguage(langId));
    setIsOpen(false);
  };


//   if (!mounted) return null;

  return (
    <div className="relative" ref={dropdownRef}>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`group relative flex items-center gap-3 px-4 py-2.5 bg-[#1e1e2e]/80 
        rounded-lg transition-all duration-200 border border-gray-800/50 hover:border-gray-700
        ${!hasAccess && language !== "javascript" ? "opacity-50 cursor-not-allowed" : ""}`}
=======
  return (
    <div className="relative" ref={dropdownRef}>
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`group relative flex items-center gap-3 px-4 py-2.5 bg-[#1e1e2e]/80 
        rounded-lg transition-all duration-200 border border-gray-800/50 hover:border-gray-700
        ${!isProUser && !['javascript', 'python', 'java', 'cpp'].includes(language) ? "opacity-50 cursor-not-allowed" : ""}`}
>>>>>>> 1aa82f4 (make the change in the price page)
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/5 
          rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
        />
<<<<<<< HEAD

        <div className="size-6 rounded-md bg-gray-800/50 p-0.5 group-hover:scale-110 transition-transform">
          <Image
            src={currentLanguageObj.logoPath}
            alt={`${currentLanguageObj.label} logo`}
            width={24}
            height={24}
            className="w-full h-full object-contain relative z-10"
          />
        </div>

        <span className="text-gray-200 min-w-[80px] text-left group-hover:text-white transition-colors">
          {currentLanguageObj.label}
        </span>

        <ChevronDownIcon
          className={`size-4 text-gray-400 transition-all duration-300 group-hover:text-gray-300
            ${isOpen ? "rotate-180" : ""}`}
        />
=======
        <LanguageIcon 
          src={currentLanguageObj?.logoPath || ''} 
          alt={`${currentLanguageObj?.label || ''} logo`} 
          className="w-6 h-6"
        />
        <span className="text-gray-300">{currentLanguageObj?.label || 'Select Language'}</span>
        <ChevronDownIcon className="w-4 h-4 text-gray-400 transition-transform group-hover:rotate-180" />
>>>>>>> 1aa82f4 (make the change in the price page)
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
<<<<<<< HEAD
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 mt-2 w-64 bg-[#1e1e2e]/95 backdrop-blur-xl
            rounded-xl border border-[#313244] shadow-2xl py-2 z-50"
          >
            <div className="px-3 pb-2 mb-2 border-b border-gray-800/50">
              <p className="text-xs font-medium text-gray-400">Select Language</p>
            </div>

            <div className="max-h-[280px] overflow-y-auto overflow-x-hidden">
              {Object.entries(LANGUAGE_CONFIG).map(([langId, lang], index) => {
                const isLocked = !hasAccess && langId !== "javascript";
=======
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 mt-2 w-full rounded-lg border border-gray-800/50 bg-[#1e1e2e] shadow-lg z-50"
          >
            <div className="max-h-[280px] overflow-y-auto overflow-x-hidden">
              {Object.entries(LANGUAGE_CONFIG).map(([langId, lang], index) => {
                const isLocked = !isProUser && !['javascript', 'python', 'java', 'cpp'].includes(langId);
>>>>>>> 1aa82f4 (make the change in the price page)

                return (
                  <motion.div
                    key={langId}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
<<<<<<< HEAD
                    className="relative group px-2"
                  >
                    <button
                      className={`
                        relative w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200
                        ${language === langId ? "bg-blue-500/10 text-blue-400" : "text-gray-300"}
                        ${isLocked ? "opacity-50 cursor-not-allowed" : "hover:bg-[#262637]"}
                      `}
                      onClick={() => handleLanguageSelect(langId)}
                      disabled={isLocked}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-lg 
                        opacity-0 group-hover:opacity-100 transition-opacity"
                      />

                      <div className={`relative size-8 rounded-lg p-1.5 group-hover:scale-110 transition-transform
                        ${language === langId ? "bg-blue-500/10" : "bg-gray-800/50"}`}
                      >
                        <div className="relative w-full h-full">
                          <Image
                            src={lang.logoPath}
                            alt={`${lang.label} logo`}
                            width={24}
                            height={24}
                            className="object-contain"
                          />
                        </div>
                      </div>

                      <span className="flex-1 text-left group-hover:text-white transition-colors">
                        {lang.label}
                      </span>

                      {language === langId && (
                        <motion.div
                          layoutId="activeBorder"
                          className="absolute inset-0 border-2 border-blue-500/30 rounded-lg"
                          transition={{
                            type: "spring",
                            bounce: 0.2,
                            duration: 0.6,
                          }}
                        />
                      )}

                      {isLocked ? (
                        <Lock className="w-4 h-4 text-gray-500" />
                      ) : (
                        language === langId && (
                          <Sparkles className="w-4 h-4 text-blue-400 animate-pulse" />
                        )
=======
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
>>>>>>> 1aa82f4 (make the change in the price page)
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
<<<<<<< HEAD
}

export default LanguageSelector;
=======
}
>>>>>>> 1aa82f4 (make the change in the price page)
