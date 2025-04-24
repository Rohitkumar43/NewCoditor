"use client";

import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { snippetApi } from "@/services/snippetApi";
import { useAuth } from "@clerk/nextjs";
<<<<<<< HEAD
=======
import toast from "react-hot-toast";
>>>>>>> 1aa82f4 (make the change in the price page)

interface StarButtonProps {
  snippetId: string;
}

function StarButton({ snippetId }: StarButtonProps) {
  const { userId } = useAuth();
  const [isStarred, setIsStarred] = useState(false);
  const [starCount, setStarCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchStarStatus = async () => {
      try {
        const [starred, count] = await Promise.all([
          snippetApi.isSnippetStarred(snippetId),
          snippetApi.getSnippetStarCount(snippetId)
        ]);
        setIsStarred(starred);
        setStarCount(count);
      } catch (error) {
        console.error("Error fetching star status:", error);
      }
    };

<<<<<<< HEAD
    if (userId) {
=======
    if (userId && snippetId) {
>>>>>>> 1aa82f4 (make the change in the price page)
      fetchStarStatus();
    }
  }, [snippetId, userId]);

<<<<<<< HEAD
  const handleStar = async () => {
    if (!userId) return;
    setIsLoading(true);

    try {
      await snippetApi.starSnippet(snippetId);
      setIsStarred(!isStarred);
      setStarCount(prev => isStarred ? prev - 1 : prev + 1);
=======
  const handleStar = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!userId) {
      toast.error("Please sign in to star snippets");
      return;
    }

    setIsLoading(true);
    try {
      const success = await snippetApi.starSnippet(snippetId);
      if (success) {
        setIsStarred(!isStarred);
        setStarCount(prev => isStarred ? prev - 1 : prev + 1);
      }
>>>>>>> 1aa82f4 (make the change in the price page)
    } catch (error) {
      console.error("Error starring snippet:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleStar}
      disabled={isLoading || !userId}
      className={`group flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all duration-200
        ${isStarred
          ? "bg-yellow-500/20 text-yellow-400"
          : "bg-gray-500/10 text-gray-400 hover:bg-yellow-500/10 hover:text-yellow-400"
        }`}
    >
      {isLoading ? (
        <div className="size-3.5 border-2 border-yellow-400/30 border-t-yellow-400 rounded-full animate-spin" />
      ) : (
        <Star className={`size-3.5 ${isStarred ? "fill-yellow-400" : ""}`} />
      )}
      <span className="text-xs font-medium">{starCount}</span>
    </button>
  );
}

export default StarButton;