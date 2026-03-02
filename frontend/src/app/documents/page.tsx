'use client';

import React, { useState, useRef } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { FileText, UploadCloud, File, CheckCircle2, Info, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function DocumentsPage() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    // Upload State
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const files = e.dataTransfer.files;
        if (files && files.length > 0) {
            validateAndSetFile(files[0]);
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            validateAndSetFile(files[0]);
        }
    };

    const validateAndSetFile = (file: File) => {
        setToastMessage(null);
        if (file.type !== 'application/pdf') {
            setToastMessage({ type: 'error', text: 'Please select a valid PDF file.' });
            return;
        }
        setSelectedFile(file);
    };

    const handleUploadAndExtract = async () => {
        if (!selectedFile) return;

        setIsUploading(true);
        setToastMessage(null);

        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/tasks/upload-pdf`, {
                method: 'POST',
                body: formData, // the browser automatically sets the multipart boundary
            });

            if (response.ok) {
                setToastMessage({ type: 'success', text: 'PDF analyzed and task successfully generated!' });
                setSelectedFile(null); // reset file
            } else {
                const errorData = await response.json();
                setToastMessage({ type: 'error', text: errorData.error || 'Failed to analyze PDF.' });
            }
        } catch (error) {
            console.error('Error uploading PDF:', error);
            setToastMessage({ type: 'error', text: 'An unexpected error occurred during upload.' });
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex overflow-hidden font-sans">
            <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

            <div className="flex-1 flex flex-col min-w-0 transition-all duration-300 relative">
                <Header
                    setSidebarOpen={setIsSidebarOpen}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                />

                {/* Global Toast Notification */}
                {toastMessage && (
                    <div className="absolute top-20 right-8 z-50 bg-slate-900 text-white px-4 py-3 rounded-lg shadow-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-5 duration-300">
                        {toastMessage.type === 'success' ?
                            <CheckCircle2 className="w-5 h-5 text-emerald-400" /> :
                            <Info className="w-5 h-5 text-rose-400" />
                        }
                        <span className="text-sm font-medium">{toastMessage.text}</span>
                        {toastMessage.type === 'success' && (
                            <button
                                onClick={() => router.push('/')}
                                className="ml-4 text-xs bg-white/20 hover:bg-white/30 px-2 py-1 rounded transition-colors"
                            >
                                View Dashboard
                            </button>
                        )}
                        {toastMessage.type === 'error' && (
                            <button onClick={() => setToastMessage(null)} className="ml-2 text-slate-400 hover:text-white">
                                <X className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                )}

                <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto w-full">
                    <div className="max-w-7xl mx-auto space-y-6">
                        <header className="mb-8">
                            <h1 className="text-2xl font-bold text-slate-900 tracking-tight sm:text-3xl flex items-center gap-3">
                                <FileText className="w-8 h-8 text-indigo-600" />
                                Document Intelligence
                            </h1>
                            <p className="mt-1 text-sm text-slate-500">Upload PDF documents, such as internal policies or audits, to automatically extract actionable compliance tasks.</p>
                        </header>

                        <div className="max-w-3xl">
                            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                                <div className="p-8 md:p-12">

                                    <div
                                        className={`relative border-2 border-dashed rounded-xl p-12 text-center transition-all ${isDragging ? 'border-indigo-500 bg-indigo-50/50 scale-[1.02]' : 'border-slate-300 hover:border-indigo-400 hover:bg-slate-50'
                                            }`}
                                        onDragOver={handleDragOver}
                                        onDragLeave={handleDragLeave}
                                        onDrop={handleDrop}
                                    >
                                        <input
                                            type="file"
                                            className="hidden"
                                            ref={fileInputRef}
                                            onChange={handleFileSelect}
                                            accept="application/pdf"
                                        />

                                        {!selectedFile ? (
                                            <div className="flex flex-col items-center justify-center space-y-4">
                                                <div className="w-16 h-16 bg-indigo-50 text-indigo-500 rounded-full flex items-center justify-center mb-2">
                                                    <UploadCloud className="w-8 h-8" />
                                                </div>
                                                <div>
                                                    <p className="text-lg font-medium text-slate-900">Drag & drop your PDF document here</p>
                                                    <p className="text-sm text-slate-500 mt-1">or click to browse your files</p>
                                                </div>
                                                <button
                                                    onClick={() => fileInputRef.current?.click()}
                                                    className="mt-6 inline-flex items-center px-4 py-2 bg-white border border-slate-300 rounded-lg shadow-sm text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                                                >
                                                    Select File
                                                </button>
                                                <p className="text-xs text-slate-400 mt-4">Only PDF files up to 10MB are currently supported.</p>
                                            </div>
                                        ) : (
                                            <div className="flex flex-col items-center justify-center space-y-4 animate-in fade-in zoom-in duration-200">
                                                <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mb-2">
                                                    <File className="w-8 h-8" />
                                                </div>
                                                <div>
                                                    <p className="text-lg font-medium text-slate-900 line-clamp-1">{selectedFile.name}</p>
                                                    <p className="text-sm text-slate-500 mt-1">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB • Ready for Analysis</p>
                                                </div>
                                                <div className="flex items-center gap-3 mt-6">
                                                    <button
                                                        onClick={() => setSelectedFile(null)}
                                                        disabled={isUploading}
                                                        className="px-4 py-2 bg-white border border-slate-300 rounded-lg shadow-sm text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors disabled:opacity-50"
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button
                                                        onClick={handleUploadAndExtract}
                                                        disabled={isUploading}
                                                        className="px-6 py-2 bg-indigo-600 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 flex items-center gap-2 transition-all hover:shadow-md disabled:opacity-75 disabled:cursor-not-allowed"
                                                    >
                                                        {isUploading ? (
                                                            <>
                                                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                                </svg>
                                                                Analyzing Document...
                                                            </>
                                                        ) : (
                                                            'Upload & Extract Tasks'
                                                        )}
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                </div>
                                <div className="bg-slate-50 px-8 py-4 border-t border-slate-200">
                                    <h4 className="text-sm font-semibold text-slate-900 flex items-center gap-2 mb-2">
                                        <Info className="w-4 h-4 text-indigo-500" /> How it works
                                    </h4>
                                    <p className="text-sm text-slate-600 leading-relaxed">
                                        When you upload a document, SaralComply uses advanced OCR and LLM technology to scan the text for implicit obligations, deadlines, and requirements. It will automatically compile these findings into actionable compliance tasks for your dashboard.
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>
                </main>
            </div>
        </div>
    );
}
