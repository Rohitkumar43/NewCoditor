/**
 * SnippetCard Component
 * A React component that displays a single code snippet in a card format.
 * Features:
 * - Animated hover effects
 * - Delete functionality for snippet owners
 * - Star/favorite system
 * - Code preview
 * - Language identification
 * - Creation time display
 */

"use client";

import { Snippet } from "@/types";
import { useAuth } from "@clerk/nextjs";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Clock, Trash2, User } from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";
import { snippetApi } from "@/services/snippetApi";
import StarButton from "@/Components/StarButton";
import { useRouter } from "next/navigation";

function SnippetCard({ snippet }: { snippet: Snippet }) {
  const { userId } = useAuth();
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this snippet?")) {
      return;
    }

    setIsDeleting(true);
    try {
      const success = await snippetApi.deleteSnippet(snippet._id);
      if (success) {
        router.refresh(); // Refresh the page to update the list
      }
    } catch (error) {
      console.error("Error deleting snippet:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <motion.div
      layout
      className="group relative"
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <Link href={`/snippets/${snippet._id}`} className="h-full block">
        <div className="relative h-full bg-[#1e1e2e]/80 backdrop-blur-sm rounded-xl 
          border border-[#313244]/50 hover:border-[#313244] 
          transition-all duration-300 overflow-hidden">
          <div className="p-6">
            {/* Card Header Section */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-20 
                    group-hover:opacity-30 transition-all duration-500"
                    aria-hidden="true"
                  />
                  <div className="relative p-2 rounded-lg bg-gradient-to-br from-blue-500/10 to-purple-500/10 
                    group-hover:from-blue-500/20 group-hover:to-purple-500/20 transition-all duration-500">
                    <Image
                      src={`/${snippet.language}.png`}
                      alt={`${snippet.language} logo`}
                      className="w-6 h-6 object-contain relative z-10"
                      width={24}
                      height={24}
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <span className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-lg text-xs font-medium">
                    {snippet.language}
                  </span>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Clock className="size-3" />
                    {new Date(snippet.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <StarButton snippetId={snippet._id} />
                {userId === snippet.userId && (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleDelete();
                    }}
                    disabled={isDeleting}
                    className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 
                      transition-colors duration-200"
                  >
                    <Trash2 className="size-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Snippet Title */}
            <h3 className="text-lg font-semibold text-gray-200 mb-2">
              {snippet.title}
            </h3>

            {/* Author Info */}
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <User className="size-4" />
              <span>{snippet.userName}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default SnippetCard;