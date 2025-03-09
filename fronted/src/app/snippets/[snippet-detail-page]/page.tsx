"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { snippetApi } from "@/services/snippetApi";
import { Snippet } from "@/types/index";
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
    const snippetId = params?.['snippet-id'] as string;
    const [snippet, setSnippet] = useState<Snippet | null>(null);
    const [comments, setComments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchSnippetData = async () => {
            try {
                const [snippetData, commentsData] = await Promise.all([
                    snippetApi.getSnippetById(snippetId),
                    snippetApi.getSnippetComments(snippetId)
                ]);
                setSnippet(snippetData);
                setComments(commentsData);
            } catch (err) {
                setError("Failed to load snippet");
                toast.error("Failed to load snippet");
            } finally {
                setLoading(false);
            }
        };

        fetchSnippetData();
    }, [snippetId]);

    if (loading) {
        return <SnippetLoadingSkeleton />;
    }

    if (error || !snippet) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-[#0a0a0f]">
                <div className="text-center">
                    <h2 className="text-2xl font-semibold text-white mb-2">
                        Snippet Not Found
                    </h2>
                    <p className="text-gray-400">
                        The requested snippet could not be found.
                    </p>
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
                        onCommentAdded={(newComment) => setComments(prev => [...prev, newComment])}
                    />
                </div>
            </main>
        </div>
    );
}

export default SnippetDetailPage;