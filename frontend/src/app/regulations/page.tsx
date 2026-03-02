'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { BookOpen, ArrowLeft, Sparkles, Shield, Zap, Info, CheckCircle2 } from 'lucide-react';
import { regulations, Regulation } from '@/data/regulations';
import { useRouter } from 'next/navigation';

export default function RegulationsPage() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const [selectedRegulation, setSelectedRegulation] = useState<Regulation | null>(null);
    const [isExtracting, setIsExtracting] = useState(false);
    const [toastMessage, setToastMessage] = useState<string | null>(null);
    const router = useRouter();

    // Filter regulations based on search query
    const filteredRegulations = regulations.filter(reg =>
        reg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        reg.code.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleExtractTask = async () => {
        if (!selectedRegulation) return;

        setIsExtracting(true);
        setToastMessage(null);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/tasks/extract`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: selectedRegulation.fullText })
            });

            if (response.ok) {
                setToastMessage('Task successfully generated from regulation!');
                setTimeout(() => setToastMessage(null), 3000); // clear toast after 3s
            } else {
                setToastMessage('Failed to generate task. Please try again.');
            }
        } catch (error) {
            console.error('Error extracting task:', error);
            setToastMessage('An error occurred during extraction.');
        } finally {
            setIsExtracting(false);
        }
    };

    const getCategoryIcon = (category: string) => {
        switch (category) {
            case 'Safety': return <Shield className="w-5 h-5 text-emerald-500" />;
            case 'Electrical': return <Zap className="w-5 h-5 text-amber-500" />;
            default: return <Info className="w-5 h-5 text-blue-500" />;
        }
    };

    const getCategoryColor = (category: string) => {
        switch (category) {
            case 'Safety': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
            case 'Electrical': return 'bg-amber-50 text-amber-700 border-amber-200';
            default: return 'bg-blue-50 text-blue-700 border-blue-200';
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
                        {toastMessage.includes('success') ?
                            <CheckCircle2 className="w-5 h-5 text-emerald-400" /> :
                            <Info className="w-5 h-5 text-amber-400" />
                        }
                        <span className="text-sm font-medium">{toastMessage}</span>
                        {toastMessage.includes('success') && (
                            <button
                                onClick={() => router.push('/')}
                                className="ml-4 text-xs bg-white/20 hover:bg-white/30 px-2 py-1 rounded transition-colors"
                            >
                                View Dashboard
                            </button>
                        )}
                    </div>
                )}

                <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto w-full">
                    <div className="max-w-7xl mx-auto space-y-6">

                        {!selectedRegulation ? (
                            // --- LIST VIEW ---
                            <>
                                <header className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                    <div>
                                        <h1 className="text-2xl font-bold text-slate-900 tracking-tight sm:text-3xl flex items-center gap-3">
                                            <BookOpen className="w-8 h-8 text-indigo-600" />
                                            Regulations Library
                                        </h1>
                                        <p className="mt-1 text-sm text-slate-500">Browse and search through all applicable compliance regulations and standards.</p>
                                    </div>
                                </header>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {filteredRegulations.length === 0 ? (
                                        <div className="col-span-full py-12 text-center text-slate-500 bg-white rounded-xl border border-slate-200 border-dashed">
                                            No regulations found matching your search.
                                        </div>
                                    ) : (
                                        filteredRegulations.map(reg => (
                                            <div
                                                key={reg.id}
                                                onClick={() => setSelectedRegulation(reg)}
                                                className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all cursor-pointer group flex flex-col h-full"
                                            >
                                                <div className="flex items-start justify-between mb-4">
                                                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${getCategoryColor(reg.category)} flex items-center gap-1.5`}>
                                                        {getCategoryIcon(reg.category)}
                                                        {reg.category}
                                                    </span>
                                                    <span className="text-sm font-bold text-slate-400 group-hover:text-indigo-500 transition-colors uppercase tracking-wider">{reg.code}</span>
                                                </div>
                                                <h3 className="text-lg font-bold text-slate-900 mb-2 leading-tight group-hover:text-indigo-700 transition-colors">{reg.title}</h3>
                                                <p className="text-sm text-slate-500 flex-1">{reg.description}</p>
                                                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center text-sm font-medium text-indigo-600 group-hover:text-indigo-700">
                                                    Read Full Text &rarr;
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </>
                        ) : (
                            // --- DETAIL VIEW ---
                            <div className="animate-in fade-in zoom-in-95 duration-200">
                                <button
                                    onClick={() => setSelectedRegulation(null)}
                                    className="mb-6 flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-indigo-600 transition-colors"
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    Back to Library
                                </button>

                                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">

                                    {/* Detail Header & Action */}
                                    <div className="bg-slate-900 p-8 text-white relative flex flex-col md:flex-row md:items-end justify-between gap-6 overflow-hidden">
                                        <div className="absolute top-0 right-0 p-8 opacity-5">
                                            <BookOpen className="w-64 h-64 transform rotate-12" />
                                        </div>

                                        <div className="relative z-10 flex-1 max-w-3xl">
                                            <div className="flex items-center gap-3 mb-4">
                                                <span className="px-3 py-1 bg-white/10 text-white/90 text-xs font-bold uppercase tracking-widest rounded-full backdrop-blur-sm border border-white/10">
                                                    {selectedRegulation.code}
                                                </span>
                                                <span className="px-3 py-1 bg-white/10 text-white/90 text-xs font-bold uppercase tracking-widest rounded-full backdrop-blur-sm border border-white/10 flex items-center gap-1">
                                                    {selectedRegulation.category}
                                                </span>
                                            </div>
                                            <h1 className="text-3xl md:text-4xl font-bold leading-tight">{selectedRegulation.title}</h1>
                                            <p className="mt-4 text-slate-300 text-lg max-w-2xl">{selectedRegulation.description}</p>
                                        </div>

                                        <div className="relative z-10 w-full md:w-auto flex-shrink-0">
                                            <button
                                                onClick={handleExtractTask}
                                                disabled={isExtracting}
                                                className="w-full md:w-auto bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-400 hover:to-purple-400 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-75 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                            >
                                                {isExtracting ? (
                                                    <>
                                                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                        </svg>
                                                        Analyzing Text...
                                                    </>
                                                ) : (
                                                    <>
                                                        <Sparkles className="w-5 h-5" />
                                                        Smart Extract Task
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </div>

                                    {/* Document Body */}
                                    <div className="p-8 md:p-12 max-w-4xl">
                                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 border-b border-slate-100 pb-2">Full Document Text</h3>
                                        <div className="prose prose-slate max-w-none prose-p:leading-relaxed prose-p:text-slate-700">
                                            {selectedRegulation.fullText.split('\n\n').map((paragraph, index) => (
                                                <p key={index} className="mb-6">{paragraph}</p>
                                            ))}
                                        </div>
                                    </div>

                                </div>
                            </div>
                        )}

                    </div>
                </main>
            </div>
        </div>
    );
}
