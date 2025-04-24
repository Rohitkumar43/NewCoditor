'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useAuth } from '@clerk/nextjs';
import { Lock } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { userApi } from '@/services/userApi';

const languages = [
  { id: 'javascript', label: 'JavaScript', logoPath: '/javascript.png' },
  { id: 'typescript', label: 'TypeScript', logoPath: '/typescript.png' },
  { id: 'python', label: 'Python', logoPath: '/python.png' },
  { id: 'java', label: 'Java', logoPath: '/java.png' },
  { id: 'go', label: 'Go', logoPath: '/go.png' },
  { id: 'rust', label: 'Rust', logoPath: '/rust.png' },
  { id: 'cpp', label: 'C++', logoPath: '/cpp.png' },
  { id: 'csharp', label: 'C#', logoPath: '/csharp.png' },
  { id: 'ruby', label: 'Ruby', logoPath: '/ruby.png' },
  { id: 'swift', label: 'Swift', logoPath: '/swift.png' }
];

const FREE_LANGUAGES = ['javascript', 'python', 'java', 'cpp'];

interface LanguageSelectorProps {
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
}

export default function LanguageSelector({ selectedLanguage, onLanguageChange }: LanguageSelectorProps) {
  const { isSignedIn, userId } = useAuth();
  const [isPro, setIsPro] = useState(false);

  useEffect(() => {
    const checkProStatus = async () => {
      if (!userId) return;
      try {
        const isProUser = await userApi.checkProStatus(userId);
        setIsPro(isProUser);
      } catch (error) {
        console.error('Error checking pro status:', error);
        setIsPro(false);
      }
    };
    
    if (isSignedIn && userId) {
      checkProStatus();
    }
  }, [isSignedIn, userId]);

  const handleLanguageSelect = (languageId: string) => {
    if (!FREE_LANGUAGES.includes(languageId) && !isPro) {
      toast.error('This language is only available for Pro users');
      return;
    }
    onLanguageChange(languageId);
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
      {languages.map((lang) => {
        const isLocked = !FREE_LANGUAGES.includes(lang.id) && !isPro;
        
        return (
          <motion.button
            key={lang.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`relative group p-4 rounded-lg border ${
              selectedLanguage === lang.id
                ? 'border-blue-500 bg-blue-500/10'
                : 'border-[#313244] bg-[#1e1e2e]/50 hover:border-[#45465a]'
            } transition-all duration-200`}
            onClick={() => handleLanguageSelect(lang.id)}
          >
            <div className="flex flex-col items-center space-y-2">
              <div className="relative w-12 h-12">
                <Image
                  src={lang.logoPath}
                  alt={`${lang.label} logo`}
                  className="object-contain"
                  width={48}
                  height={48}
                  style={{ width: '100%', height: 'auto' }}
                />
                {isLocked && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg">
                    <Lock className="w-6 h-6 text-gray-400" />
                  </div>
                )}
              </div>
              <span className="text-sm font-medium text-gray-300">{lang.label}</span>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
} 