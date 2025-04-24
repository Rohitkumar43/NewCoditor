"use client";

import { useEffect, useState } from "react";

export function EditorPanelSkeleton() {
  // Use state to hold our width values, initializing with null
  const [widths, setWidths] = useState<string[] | null>(null);

  // Generate the widths on the client-side only after initial render
  useEffect(() => {
    // Generate consistent placeholder widths
    const generatedWidths = [
      "32%", "35%", "68%", "76%", "69%", 
      "62%", "54%", "31%", "67%", "72%", 
      "73%", "40%", "45%", "28%", "65%"
    ];
    
    setWidths(generatedWidths);
  }, []);

  // If widths aren't set yet, render a simple loading state
  if (!widths) {
    return (
      <div className="relative">
        <div className="relative bg-[#12121a]/90 backdrop-blur rounded-xl border border-white/[0.05] p-6">
          <div className="h-[600px] animate-pulse">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="relative bg-[#12121a]/90 backdrop-blur rounded-xl border border-white/[0.05] p-6">
        {/* Header skeleton */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white/5"></div>
            <div>
              <div className="w-24 h-4 bg-white/5 rounded mb-1"></div>
              <div className="w-36 h-3 bg-white/5 rounded"></div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-24 h-8 bg-white/5 rounded-lg"></div>
            <div className="w-8 h-8 bg-white/5 rounded-lg"></div>
            <div className="w-20 h-8 bg-white/5 rounded-lg"></div>
          </div>
        </div>

        {/* Editor skeleton */}
        <div className="relative rounded-xl overflow-hidden ring-1 ring-white/[0.05]">
          <div className="h-[600px] flex flex-col gap-3 p-4 bg-[#1e1e2e]">
            {/* Generate skeleton lines with predetermined widths */}
            {widths.map((width, index) => (
              <div className="flex items-center gap-2" key={index}>
                <div className="w-6 h-4 bg-white/10 rounded"></div>
                <div
                  className="h-4 bg-white/5 rounded"
                  style={{ width }}
                ></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}