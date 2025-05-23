import { SignInButton, useUser } from "@clerk/nextjs";
import { useState } from "react";
import toast from "react-hot-toast";
import { MessageSquare } from "lucide-react";
import Comment from "./comment";
import CommentForm from "./commentform";
import { snippetApi } from "@/services/snippetApi";
import { Comment as CommentType } from "@/types/index";

interface CommentsProps {
  snippetId: string;
<<<<<<< HEAD
  initialComments: CommentType[];
}

function Comments({ snippetId, initialComments }: CommentsProps) {
=======
  comments: CommentType[];
  onCommentAdded?: (newComment: CommentType) => void;
}

function Comments({ snippetId, comments: initialComments, onCommentAdded }: CommentsProps) {
>>>>>>> 1aa82f4 (make the change in the price page)
  const { user } = useUser();
  const [comments, setComments] = useState<CommentType[]>(initialComments);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingCommentId, setDeletingCommentId] = useState<string | null>(null);

  const handleSubmitComment = async (content: string) => {
    setIsSubmitting(true);

    try {
      const newComment = await snippetApi.addComment(snippetId, content);
<<<<<<< HEAD
      setComments(prev => [...prev, newComment]);
      toast.success("Comment added successfully");
=======
      
      if (newComment) {
        setComments(prev => [...prev, newComment]);
        
        // Call the onCommentAdded callback if provided
        if (onCommentAdded) {
          onCommentAdded(newComment);
        }
        
        toast.success("Comment added successfully");
      } else {
        toast.error("Failed to add comment");
      }
>>>>>>> 1aa82f4 (make the change in the price page)
    } catch (error) {
      console.error("Error adding comment:", error);
      toast.error("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    setDeletingCommentId(commentId);

    try {
      await snippetApi.deleteComment(commentId);
      setComments(prev => prev.filter(comment => comment._id !== commentId));
      toast.success("Comment deleted successfully");
    } catch (error) {
      console.error("Error deleting comment:", error);
      toast.error("Something went wrong");
    } finally {
      setDeletingCommentId(null);
    }
  };

  return (
    <div className="bg-[#121218] border border-[#ffffff0a] rounded-2xl overflow-hidden">
      <div className="px-6 sm:px-8 py-6 border-b border-[#ffffff0a]">
        <h2 className="text-lg font-semibold text-white flex items-center gap-2">
          <MessageSquare className="w-5 h-5" />
          Discussion ({comments.length})
        </h2>
      </div>

      <div className="p-6 sm:p-8">
        {user ? (
          <CommentForm onSubmit={handleSubmitComment} isSubmitting={isSubmitting} />
        ) : (
          <div className="bg-[#0a0a0f] rounded-xl p-6 text-center mb-8 border border-[#ffffff0a]">
            <p className="text-[#808086] mb-4">Sign in to join the discussion</p>
            <SignInButton mode="modal">
              <button className="px-6 py-2 bg-[#3b82f6] text-white rounded-lg hover:bg-[#2563eb] transition-colors">
                Sign In
              </button>
            </SignInButton>
          </div>
        )}

        <div className="space-y-6">
          {comments.map((comment) => (
            <Comment
              key={comment._id}
              comment={comment}
              onDelete={handleDeleteComment}
              isDeleting={deletingCommentId === comment._id}
              currentUserId={user?.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Comments;