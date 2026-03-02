'use client';

import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { History, FileText, CheckCircle, Clock } from 'lucide-react';

interface DocumentLog {
    id: number;
    filename: string;
    createdAt: string;
}

interface ComplianceTask {
    id: number;
    title: string;
    status: string;
    dueDate: string;
    severity: string;
}

export default function HistoryPage() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [logs, setLogs] = useState<DocumentLog[]>([]);
    const [completedTasks, setCompletedTasks] = useState<ComplianceTask[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const [logsRes, tasksRes] = await Promise.all([
                    fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/documents`),
                    fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/tasks`)
                ]);

                if (logsRes.ok) {
                    const logsData = await logsRes.json();
                    setLogs(logsData);
                }

                if (tasksRes.ok) {
                    const tasksData = await tasksRes.json();
                    setCompletedTasks(tasksData.filter((t: ComplianceTask) => t.status === 'Completed'));
                }
            } catch (error) {
                console.error('Error fetching history:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const filteredLogs = logs.filter(log =>
        log.filename.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-slate-50 flex overflow-hidden font-sans">
            <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

            <div className="flex-1 flex flex-col min-w-0 transition-all duration-300">
                <Header
                    setSidebarOpen={setIsSidebarOpen}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                />

                <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto w-full">
                    <div className="max-w-7xl mx-auto space-y-6">
                        <header className="mb-8">
                            <h1 className="text-2xl font-bold text-slate-900 tracking-tight sm:text-3xl flex items-center gap-3">
                                <History className="w-8 h-8 text-indigo-600" />
                                Audit History
                            </h1>
                            <p className="mt-1 text-sm text-slate-500">A permanent log of all processed documents and completed compliance obligations.</p>
                        </header>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                            {/* Processed Documents Ledger */}
                            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col min-h-[400px]">
                                <h3 className="text-lg font-medium text-slate-900 border-b border-slate-100 pb-4 mb-4 flex items-center gap-2">
                                    <FileText className="w-5 h-5 text-indigo-500" />
                                    Document Extraction Log
                                </h3>
                                {isLoading ? (
                                    <div className="flex-1 flex items-center justify-center text-slate-500">Loading logs...</div>
                                ) : filteredLogs.length === 0 ? (
                                    <div className="flex-1 flex items-center justify-center text-slate-500">No documents processed yet.</div>
                                ) : (
                                    <div className="space-y-4 overflow-y-auto pr-2">
                                        {filteredLogs.map(log => (
                                            <div key={log.id} className="flex items-start gap-4 p-4 rounded-xl border border-slate-100 hover:border-indigo-100 bg-slate-50/50 hover:bg-slate-50 transition-colors">
                                                <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center flex-shrink-0">
                                                    <FileText className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <p className="font-medium text-slate-900 break-all">{log.filename}</p>
                                                    <div className="flex items-center gap-2 mt-1 text-xs text-slate-500">
                                                        <Clock className="w-3.5 h-3.5" />
                                                        {new Date(log.createdAt).toLocaleString()}
                                                        <span className="w-1 h-1 rounded-full bg-slate-300 mx-1"></span>
                                                        <span className="text-emerald-600 font-medium">Processed</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Completed Tasks Archive */}
                            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col min-h-[400px]">
                                <h3 className="text-lg font-medium text-slate-900 border-b border-slate-100 pb-4 mb-4 flex items-center gap-2">
                                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                                    Completed Tasks Archive
                                </h3>
                                {isLoading ? (
                                    <div className="flex-1 flex items-center justify-center text-slate-500">Loading history...</div>
                                ) : completedTasks.length === 0 ? (
                                    <div className="flex-1 flex items-center justify-center text-slate-500">No completed tasks.</div>
                                ) : (
                                    <div className="space-y-3 overflow-y-auto pr-2">
                                        {completedTasks.map(task => (
                                            <div key={task.id} className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 bg-slate-50 opacity-75 grayscale hover:grayscale-0 transition-all">
                                                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0">
                                                    <CheckCircle className="w-4 h-4" />
                                                </div>
                                                <div>
                                                    <p className="font-medium text-slate-700 line-through">{task.title}</p>
                                                    <p className="text-xs text-slate-400 mt-1">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
