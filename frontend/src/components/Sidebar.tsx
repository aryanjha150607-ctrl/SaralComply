'use client';

import React from 'react';
import Link from 'next/link';
import {
    ShieldCheck,
    LayoutDashboard,
    FileText,
    History,
    BookOpen,
    LogOut,
    X
} from 'lucide-react';

interface SidebarProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
    const navItems = [
        { name: 'Dashboard', icon: LayoutDashboard, href: '/' },
        { name: 'Regulations', icon: BookOpen, href: '/regulations' },
        { name: 'Documents', icon: FileText, href: '/documents' },
        { name: 'History', icon: History, href: '/history' }, // Changed from Settings and href from '#' to '/history'
    ];

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 border-r border-slate-800 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                <div className="h-full flex flex-col pt-5 pb-4 overflow-y-auto">
                    <div className="flex items-center justify-between px-6 mb-8">
                        <Link href="/" className="flex items-center gap-2 text-white hover:text-indigo-400 transition-colors">
                            <ShieldCheck className="w-8 h-8 text-indigo-500" />
                            <span className="text-xl font-bold tracking-tight">SaralComply</span>
                        </Link>
                        <button
                            className="md:hidden text-slate-400 hover:text-white"
                            onClick={() => setIsOpen(false)}
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    <nav className="flex-1 px-4 space-y-1">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-all group"
                                >
                                    <Icon className="w-5 h-5 flex-shrink-0 group-hover:text-indigo-400 transition-colors" />
                                    <span className="font-medium">{item.name}</span>
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="px-4 mt-auto">
                        <button className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-slate-400 hover:text-red-400 hover:bg-slate-800 transition-all group">
                            <LogOut className="w-5 h-5 flex-shrink-0" />
                            <span className="font-medium">Logout</span>
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
}
