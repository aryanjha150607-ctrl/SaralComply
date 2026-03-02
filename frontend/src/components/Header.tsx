'use client';

import React from 'react';
import { Menu, Search, Bell, User } from 'lucide-react';

interface HeaderProps {
    setSidebarOpen: (isOpen: boolean) => void;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
}

export default function Header({ setSidebarOpen, searchQuery, setSearchQuery }: HeaderProps) {
    return (
        <header className="sticky top-0 z-30 flex items-center justify-between w-full h-16 px-4 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm md:px-6">

            {/* Left section */}
            <div className="flex items-center flex-1 gap-4">
                <button
                    onClick={() => setSidebarOpen(true)}
                    className="p-2 text-slate-500 rounded-lg hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 md:hidden"
                >
                    <Menu className="w-5 h-5" />
                </button>

                {/* Global Search Bar */}
                <div className="hidden md:flex items-center max-w-md w-full relative">
                    <label htmlFor="search" className="sr-only">Search</label>
                    <div className="relative w-full">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <Search className="w-4 h-4 text-slate-400" />
                        </div>
                        <input
                            type="text"
                            id="search"
                            className="block w-full py-2 pl-10 pr-3 text-sm leading-6 placeholder-slate-400 transition-colors border-0 rounded-full bg-slate-100 text-slate-900 focus:ring-2 focus:ring-inset focus:ring-indigo-500 shadow-inner"
                            placeholder="Search tasks..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Right section */}
            <div className="flex items-center gap-2 sm:gap-4">
                <div className="md:hidden">
                    <button className="p-2 text-slate-500 rounded-full hover:bg-slate-100">
                        <Search className="w-5 h-5" />
                    </button>
                </div>

                <button className="relative p-2 text-slate-400 bg-white rounded-full hover:text-slate-500 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all">
                    <span className="sr-only">View notifications</span>
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1 right-1 block w-2.5 h-2.5 rounded-full bg-red-500 ring-2 ring-white" />
                </button>

                <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white ring-2 ring-white cursor-pointer shadow-sm hover:ring-indigo-200 transition-all">
                    <User className="w-4 h-4" />
                </div>
            </div>
        </header>
    );
}
