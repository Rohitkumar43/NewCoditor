"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { snippetApi } from "@/services/snippetApi";
import { Snippet, Comment } from "@/types/index";
import SnippetLoadingSkeleton from "./_components/SnippetLoadingSkeleton";
import NavigationHeader from "@/Components/NavigationHeader";
import { Clock, Code, MessageSquare, User } from "lucide-react";
import { Editor } from "@monaco-editor/react";
import { defineMonacoThemes, LANGUAGE_CONFIG } from "@/app/(root-homepage)/_constant";
import CopyButton from "./_components/CopyButton";
import Comments from "./_components/comments";
import toast from "react-hot-toast";

function SnippetDetailPage() {
    const params = useParams();
    console.log("URL params:", params); // Debug the params object
    
    // Try all possible parameter names that Next.js might use
    let snippetId = '';
    if (params) {
        // Check all possible parameter names
        if ('snippet-detail-page' in params) {
            const value = params['snippet-detail-page'];
            snippetId = typeof value === 'string' ? value : Array.isArray(value) ? value[0] : '';
        } else if ('snippetDetailPage' in params) {
            const value = params.snippetDetailPage;
            snippetId = typeof value === 'string' ? value : Array.isArray(value) ? value[0] : '';
        }
    }
    
    console.log("Extracted snippet ID:", snippetId);
    
    const [snippet, setSnippet] = useState<Snippet | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [apiTimeout, setApiTimeout] = useState(false);
    
    useEffect(() => {
        // Set a timeout to show a fallback UI if the API doesn't respond in time
        const timeoutId = setTimeout(() => {
            if (loading) {
                console.log("API request timed out after 15 seconds");
                setApiTimeout(true);
            }
        }, 15000); // 15 seconds timeout
        
        const fetchSnippetData = async () => {
            console.log("Starting fetchSnippetData function with snippetId:", snippetId);
            setLoading(true);
            setError(null);
            
            // try catch
            try {
                // Check if snippetId is valid before making API calls
                if (!snippetId || snippetId === 'undefined') {
                    console.error("Invalid snippet ID detected:", snippetId);
                    setError("Invalid snippet ID");
                    toast.error("Invalid snippet ID");
                    setLoading(false);
                    return;
                }
                
                console.log("Making API calls for snippet ID:", snippetId);
                
                // Make API calls one by one to better track where the issue might be
                try {
                    console.log("Fetching snippet data...");
                    const snippetData = await snippetApi.getSnippetById(snippetId);
                    console.log("Snippet data response received:", !!snippetData);
                    
                    if (!snippetData) {
                        console.error("Snippet data is null or undefined");
                        setError("Snippet not found");
                        setLoading(false);
                        return;
                    }
                    
                    console.log("Setting snippet state with data:", snippetData);
                    setSnippet(snippetData);
                    
                    console.log("Fetching comments data...");
                    const commentsData = await snippetApi.getSnippetComments(snippetId);
                    console.log("Comments data response received:", commentsData);
                    
                    setComments(commentsData);
                    setError(null); // Clear any previous errors
                    console.log("Data fetching completed successfully");
                } catch (innerErr) {
                    console.error("Error in API calls:", innerErr);
                    throw innerErr; // Re-throw to be caught by the outer catch
                }
            } catch (err) {
                console.error("Error loading snippet:", err);
                setError("Failed to load snippet");
                toast.error("Failed to load snippet");
            } finally {
                console.log("Setting loading state to false");
                setLoading(false);
                clearTimeout(timeoutId); // Clear the timeout since we got a response
            }
        };

        if (snippetId) {
            fetchSnippetData();
        } else {
            console.warn("No snippet ID available, skipping data fetch");
            setLoading(false);
            clearTimeout(timeoutId);
        }
        
        // Cleanup function to clear the timeout if the component unmounts
        return () => clearTimeout(timeoutId);
    }, [snippetId]);

    console.log("Current component state:", { loading, error, hasSnippet: !!snippet, apiTimeout });

    // Show a fallback UI if the API request times out
    if (apiTimeout) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-[#0a0a0f]">
                <div className="text-center">
                    <h2 className="text-2xl font-semibold text-white mb-2">
                        Backend Server Not Responding
                    </h2>
                    <p className="text-gray-400 mb-6">
                        The backend server is taking too long to respond. This could be because:
                    </p>
                    <ul className="text-left text-gray-400 mb-6 max-w-md mx-auto">
                        <li className="mb-2">• The backend server is not running</li>
                        <li className="mb-2">• The server is experiencing high load</li>
                        <li className="mb-2">• There's a network issue</li>
                    </ul>
                    <div>
                        <button 
                            onClick={() => window.location.reload()}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                        >
                            Retry
                        </button>
                        <button 
                            onClick={() => window.location.href = '/snippets'}
                            className="ml-4 px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-800 transition-colors"
                        >
                            Back to Snippets
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (loading) {
        console.log("Rendering loading skeleton");
        return <SnippetLoadingSkeleton />;
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-[#0a0a0f]">
                <div className="text-center">
                    <h2 className="text-2xl font-semibold text-white mb-2">
                        {error === "Snippet not found" ? "Snippet Not Found" : "Error"}
                    </h2>
                    <p className="text-gray-400 mb-6">
                        {error === "Snippet not found" 
                            ? "The requested snippet could not be found." 
                            : error === "Invalid snippet ID"
                                ? "The snippet ID provided is invalid."
                                : "There was an error loading the snippet. Please try again."}
                    </p>
                    <div>
                        <button 
                            onClick={() => window.location.reload()}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                        >
                            Retry
                        </button>
                        <button 
                            onClick={() => window.location.href = '/snippets'}
                            className="ml-4 px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-800 transition-colors"
                        >
                            Back to Snippets
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (!snippet) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-[#0a0a0f]">
                <div className="text-center">
                    <h2 className="text-2xl font-semibold text-white mb-2">
                        No Snippet Data
                    </h2>
                    <p className="text-gray-400 mb-6">
                        No data was returned for this snippet.
                    </p>
                    <div>
                        <button 
                            onClick={() => window.location.reload()}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                        >
                            Retry
                        </button>
                        <button 
                            onClick={() => window.location.href = '/snippets'}
                            className="ml-4 px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-800 transition-colors"
                        >
                            Back to Snippets
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0a0a0f]">
            <NavigationHeader />

            <main className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
                <div className="max-w-[1200px] mx-auto">
                    {/* Header Section */}
                    <div className="bg-[#121218] border border-[#ffffff0a] rounded-2xl p-6 sm:p-8 mb-6 backdrop-blur-xl">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center justify-center size-12 rounded-xl bg-[#ffffff08] p-2.5">
                                    <img
                                        src={`/${snippet.language}.png`}
                                        alt={`${snippet.language} logo`}
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                                <div>
                                    <h1 className="text-xl sm:text-2xl font-semibold text-white mb-2">
                                        {snippet.title}
                                    </h1>
                                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                                        <div className="flex items-center gap-2 text-[#8b8b8d]">
                                            <User className="w-4 h-4" />
                                            <span>{snippet.userName}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-[#8b8b8d]">
                                            <Clock className="w-4 h-4" />
                                            <span>{new Date(snippet.createdAt).toLocaleDateString()}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-[#8b8b8d]">
                                            <MessageSquare className="w-4 h-4" />
                                            <span>{comments.length} comments</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="inline-flex items-center px-3 py-1.5 bg-[#ffffff08] text-[#808086] rounded-lg text-sm font-medium">
                                {snippet.language}
                            </div>
                        </div>
                    </div>

                    {/* Code Editor Section */}
                    <div className="mb-8 rounded-2xl overflow-hidden border border-[#ffffff0a] bg-[#121218]">
                        <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-[#ffffff0a]">
                            <div className="flex items-center gap-2 text-[#808086]">
                                <Code className="w-4 h-4" />
                                <span className="text-sm font-medium">Source Code</span>
                            </div>
                            <CopyButton code={snippet.code} />
                        </div>
                        <Editor
                            height="400px"
                            language={LANGUAGE_CONFIG[snippet.language].monacoLanguage}
                            value={snippet.code}
                            theme="vs-dark"
                            beforeMount={defineMonacoThemes}
                            options={{
                                minimap: { enabled: false },
                                fontSize: 16,
                                readOnly: true,
                                automaticLayout: true,
                                scrollBeyondLastLine: false,
                                padding: { top: 16 },
                                renderWhitespace: "selection",
                                fontFamily: '"Fira Code", "Cascadia Code", Consolas, monospace',
                                fontLigatures: true,
                            }}
                        />
                    </div>

                    {/* Comments Section */}
                    <Comments 
                        snippetId={snippet._id} 
                        comments={comments}
                        onCommentAdded={(newComment: Comment) => {
                            if (newComment) {
                                setComments(prev => [...prev, newComment]);
                            }
                        }}
                    />
                </div>
            </main>
        </div>
    );
}

export default SnippetDetailPage;