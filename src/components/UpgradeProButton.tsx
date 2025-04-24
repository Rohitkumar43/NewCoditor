'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';

export default function UpgradeProButton() {
  const [isHovered, setIsHovered] = useState(false);

  const handleUpgrade = () => {
    // TODO: Implement payment logic
    toast.success('Coming soon! Pro features will be available shortly.');
  };

  return (
    <motion.button
      className="relative group"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleUpgrade}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-75 
        group-hover:opacity-100 transition duration-200" />
      
      <div className="relative px-6 py-2.5 bg-black rounded-lg leading-none flex items-center">
        <motion.div
          animate={{
            rotate: isHovered ? [0, 360] : 0
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="mr-2"
        >
          <Sparkles className="w-5 h-5 text-yellow-300" />
        </motion.div>
        
        <span className="bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent font-semibold">
          Upgrade to Pro
        </span>
      </div>

      {/* Feature list tooltip on hover */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3 w-64 px-4 py-3 bg-white/10 backdrop-blur-lg 
        rounded-lg text-sm text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200
        pointer-events-none border border-white/20">
        <div className="flex flex-col gap-2">
          <div className="font-semibold text-purple-300">Pro Features:</div>
          <ul className="list-disc list-inside text-xs space-y-1 text-gray-300">
            <li>Access to all programming languages</li>
            <li>Priority code execution</li>
            <li>Advanced code analytics</li>
            <li>Custom themes and settings</li>
          </ul>
        </div>
        {/* Arrow */}
        <div className="absolute left-1/2 -translate-x-1/2 top-full border-8 border-transparent 
          border-t-white/10" />
      </div>
    </motion.button>
  );
} 