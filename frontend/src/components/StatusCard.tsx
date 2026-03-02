import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatusCardProps {
    title: string;
    value: string;
    icon: LucideIcon;
    trend?: {
        value: string;
        isUp: boolean;
    };
    colorClass: string;
}

export default function StatusCard({ title, value, icon: Icon, trend, colorClass }: StatusCardProps) {
    return (
        <div className="relative overflow-hidden transition-all bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md hover:border-slate-200 group">
            <div className="p-6">
                <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl ${colorClass}`}>
                        <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                        <p className="text-sm font-medium text-slate-500">{title}</p>
                        <div className="flex items-baseline gap-2 mt-1">
                            <h3 className="text-2xl font-bold tracking-tight text-slate-900">{value}</h3>
                            {trend && (
                                <span className={`text-sm font-medium ${trend.isUp ? 'text-emerald-600' : 'text-red-600'}`}>
                                    {trend.isUp ? '↑' : '↓'} {trend.value}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {/* Decorative gradient blur */}
            <div className={`absolute -bottom-6 -right-6 w-24 h-24 ${colorClass.replace('bg-', 'bg-').replace('100', '200')} rounded-full blur-2xl opacity-40 group-hover:opacity-60 transition-opacity`} />
        </div>
    );
}
