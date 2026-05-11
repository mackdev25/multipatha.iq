import React, { useMemo } from 'react';
import type { ValidationResult } from '../types';
import { FiPieChart, FiActivity, FiAlertCircle, FiCheckCircle, FiShield, FiCpu, FiTrendingUp } from 'react-icons/fi';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, Legend, CartesianGrid, AreaChart, Area } from 'recharts';

interface ObservabilityProps {
    data: ValidationResult[];
}

const glassCardClasses = "rounded-3xl border border-white/60 bg-white/40 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)]";

const Observability: React.FC<ObservabilityProps> = ({ data }) => {

    const stats = useMemo(() => {
        let perfect = 0;
        let good = 0;
        let warning = 0;
        let critical = 0;
        let totalPathsA = 0;
        let totalPathsB = 0;

        const criticalNodes: ValidationResult[] = [];
        const warningNodes: ValidationResult[] = [];

        data.forEach(node => {
            const pathsA = node.fabA_LoggedInYes || 0;
            const pathsB = node.fabB_LoggedInYes || 0;
            
            totalPathsA += pathsA;
            totalPathsB += pathsB;

            if (pathsA === 0 && pathsB === 0) {
                critical++;
                criticalNodes.push(node);
            } else if (pathsA === 0 || pathsB === 0) {
                warning++;
                warningNodes.push(node);
            } else if (pathsA >= 2 && pathsB >= 2) {
                perfect++;
            } else {
                good++;
            }
        });

        const total = data.length || 1;
        
        // Calculate score: perfect is 100%, good is 80%, warning is 40%, critical is 0%
        const scoreRaw = ((perfect * 100) + (good * 80) + (warning * 40)) / total;
        const score = Math.round(scoreRaw);

        return {
            total: data.length,
            perfect,
            good,
            warning,
            critical,
            score,
            criticalNodes,
            warningNodes,
            totalPathsA,
            totalPathsB
        };
    }, [data]);

    const pieData = [
        { name: 'Perfect (2+ Paths)', value: stats.perfect, color: '#10b981' }, // Emerald 500
        { name: 'Good (1 Path)', value: stats.good, color: '#6366f1' },       // Indigo 500
        { name: 'Warning (Single Fabric)', value: stats.warning, color: '#f59e0b' }, // Amber 500
        { name: 'Critical (Offline)', value: stats.critical, color: '#ef4444' } // Red 500
    ].filter(d => d.value > 0);

    const barData = [
        { name: 'Fabric A', paths: stats.totalPathsA, fill: '#6366f1' },
        { name: 'Fabric B', paths: stats.totalPathsB, fill: '#8b5cf6' }
    ];

    if (!data || data.length === 0) {
        return (
            <div className="flex h-full items-center justify-center p-6">
                <div className="flex flex-col items-center justify-center text-slate-400">
                    <FiActivity className="text-6xl mb-4 opacity-50" />
                    <p>No validation data available for analysis.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex h-full flex-col p-6 space-y-6 overflow-auto pb-12 max-w-[1600px] mx-auto w-full">
            
            {/* Top Score & AI Section */}
            <div className="grid grid-cols-12 gap-6">
                {/* AI Insights Card */}
                <div className={`col-span-8 ${glassCardClasses} p-6 relative overflow-hidden flex flex-col justify-between bg-gradient-to-br from-indigo-50/50 to-white/40`}>
                    <div className="absolute -right-10 -top-10 opacity-5">
                        <FiCpu className="text-[200px] text-indigo-500" />
                    </div>
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="bg-indigo-100 text-indigo-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Early Access</span>
                            <h3 className="text-sm font-bold tracking-tight text-indigo-900 flex items-center gap-2">
                                <FiCpu className="text-indigo-500" /> MultipathIQ AI Insights
                            </h3>
                        </div>
                        <p className="text-sm text-slate-600 max-w-lg leading-relaxed mt-2">
                            Our next-generation AI engine is currently analyzing your fabric topology. Once fully initialized, it will provide predictive analytics, automated anomaly detection, and actionable optimization strategies to eliminate bottlenecks before they impact your infrastructure.
                        </p>
                    </div>
                    <div className="mt-6 flex items-center gap-4">
                        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 bg-white/60 px-3 py-1.5 rounded-full border border-slate-200/50">
                            <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                            Model Training in Progress...
                        </div>
                        <span className="text-xs text-slate-400 font-medium">Full AI capabilities unlocking soon.</span>
                    </div>
                </div>

                {/* Overall Health Score Card */}
                <div className={`col-span-4 ${glassCardClasses} p-6 flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-br from-white/40 to-slate-50/50`}>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 z-10">Overall Health Score</p>
                    <div className="relative z-10 flex flex-col items-center">
                        <div className="flex items-baseline justify-center gap-1">
                            <span className="text-7xl font-black tracking-tighter" style={{ color: stats.score >= 80 ? '#10b981' : stats.score >= 50 ? '#f59e0b' : '#ef4444' }}>
                                {stats.score}
                            </span>
                            <span className="text-2xl font-bold text-slate-400">/100</span>
                        </div>
                        <div className={`mt-3 flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold ${stats.score >= 80 ? 'bg-emerald-100 text-emerald-700' : stats.score >= 50 ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>
                            {stats.score >= 80 ? <FiTrendingUp /> : <FiAlertCircle />}
                            {stats.score >= 80 ? 'Optimal Performance' : stats.score >= 50 ? 'Needs Attention' : 'Critical State'}
                        </div>
                    </div>
                    {/* Decorative Background Ring */}
                    <div className={`absolute w-48 h-48 rounded-full border-[16px] opacity-10 ${stats.score >= 80 ? 'border-emerald-500' : stats.score >= 50 ? 'border-amber-500' : 'border-red-500'}`} />
                </div>
            </div>

            {/* Micro Stats Row */}
            <div className="grid grid-cols-4 gap-4">
                <div className={`${glassCardClasses} p-5 relative overflow-hidden group hover:border-emerald-200 hover:shadow-emerald-500/10 transition-all cursor-default`}>
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Perfect Status</p>
                            <p className="text-3xl font-black tracking-tight text-slate-800">{stats.perfect}</p>
                        </div>
                        <div className="p-2 bg-emerald-50 text-emerald-500 rounded-xl">
                            <FiShield className="text-xl" />
                        </div>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-3 font-medium flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Reliable multipathing (2+ paths)
                    </p>
                </div>

                <div className={`${glassCardClasses} p-5 relative overflow-hidden group hover:border-indigo-200 hover:shadow-indigo-500/10 transition-all cursor-default`}>
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Good Status</p>
                            <p className="text-3xl font-black tracking-tight text-slate-800">{stats.good}</p>
                        </div>
                        <div className="p-2 bg-indigo-50 text-indigo-500 rounded-xl">
                            <FiCheckCircle className="text-xl" />
                        </div>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-3 font-medium flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" /> Active on both fabrics
                    </p>
                </div>

                <div className={`${glassCardClasses} p-5 relative overflow-hidden group hover:border-amber-200 hover:shadow-amber-500/10 transition-all cursor-default`}>
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Warning Level</p>
                            <p className="text-3xl font-black tracking-tight text-amber-500">{stats.warning}</p>
                        </div>
                        <div className="p-2 bg-amber-50 text-amber-500 rounded-xl">
                            <FiAlertCircle className="text-xl" />
                        </div>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-3 font-medium flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500" /> Nodes missing a fabric
                    </p>
                </div>

                <div className={`${glassCardClasses} p-5 relative overflow-hidden group hover:border-red-200 hover:shadow-red-500/10 transition-all cursor-default`}>
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Critical Issues</p>
                            <p className="text-3xl font-black tracking-tight text-red-500">{stats.critical}</p>
                        </div>
                        <div className="p-2 bg-red-50 text-red-500 rounded-xl">
                            <FiAlertCircle className="text-xl" />
                        </div>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-3 font-medium flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500" /> Nodes with 0 active paths
                    </p>
                </div>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-2 gap-6">
                <div className={`${glassCardClasses} p-6 flex flex-col`}>
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-sm font-bold tracking-tight text-slate-800 flex items-center gap-2">
                            <FiPieChart className="text-indigo-500" /> Health Distribution
                        </h3>
                        <span className="text-xs font-medium text-slate-400">{stats.total} Total Nodes</span>
                    </div>
                    <div className="flex-1 min-h-[280px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={70}
                                    outerRadius={100}
                                    paddingAngle={5}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <RechartsTooltip 
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)', background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(8px)', fontWeight: 600, color: '#1e293b' }}
                                    itemStyle={{ fontWeight: 700 }}
                                />
                                <Legend wrapperStyle={{ fontSize: '12px', fontWeight: 600, color: '#475569', paddingTop: '20px' }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className={`${glassCardClasses} p-6 flex flex-col`}>
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-sm font-bold tracking-tight text-slate-800 flex items-center gap-2">
                            <FiActivity className="text-indigo-500" /> Active Paths per Fabric
                        </h3>
                        <span className="text-xs font-medium text-slate-400">{stats.totalPathsA + stats.totalPathsB} Total Paths</span>
                    </div>
                    <div className="flex-1 min-h-[280px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={barData} margin={{ top: 20, right: 30, left: -20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }} />
                                <RechartsTooltip 
                                    cursor={{ fill: 'rgba(99, 102, 241, 0.05)' }}
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)', background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(8px)', fontWeight: 600, color: '#1e293b' }}
                                />
                                <Bar dataKey="paths" radius={[6, 6, 0, 0]} maxBarSize={80} animationDuration={1500}>
                                    {barData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.fill} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* List of Problematic Entities */}
            {(stats.critical > 0 || stats.warning > 0) && (
                <div className="grid grid-cols-2 gap-6">
                    
                    {/* Critical Nodes */}
                    <div className={`${glassCardClasses} flex flex-col overflow-hidden border-red-200/50 shadow-red-500/5`}>
                        <div className="border-b border-red-100 bg-gradient-to-r from-red-50/80 to-transparent p-5 flex items-center justify-between">
                            <h3 className="text-sm font-bold tracking-tight text-red-900 flex items-center gap-2">
                                <FiAlertCircle className="text-red-500" /> Action Required: Critical Entities
                            </h3>
                            <span className="bg-red-500 text-white shadow-lg shadow-red-500/20 text-xs font-bold px-3 py-1 rounded-full">
                                {stats.critical} Nodes
                            </span>
                        </div>
                        <div className="flex-1 overflow-auto p-2 max-h-[350px]">
                            {stats.criticalNodes.length === 0 ? (
                                <div className="p-8 text-center text-sm text-slate-500">No critical entities found.</div>
                            ) : (
                                <ul className="space-y-1 p-2">
                                    {stats.criticalNodes.map((node, i) => (
                                        <li key={i} className="p-3 rounded-xl hover:bg-slate-50/80 border border-transparent hover:border-slate-200/60 transition-all flex items-center justify-between group">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-bold text-slate-800">{node.host}</span>
                                                <span className="text-[10px] text-red-500 font-semibold uppercase tracking-wider mt-0.5">Disconnected</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="flex items-center gap-1 bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md text-xs font-mono font-medium">
                                                    FAB A: <span className="text-red-600 font-bold">{node.fabA_LoggedInYes || 0}</span>
                                                </span>
                                                <span className="flex items-center gap-1 bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md text-xs font-mono font-medium">
                                                    FAB B: <span className="text-red-600 font-bold">{node.fabB_LoggedInYes || 0}</span>
                                                </span>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>

                    {/* Warning Nodes */}
                    <div className={`${glassCardClasses} flex flex-col overflow-hidden border-amber-200/50 shadow-amber-500/5`}>
                        <div className="border-b border-amber-100 bg-gradient-to-r from-amber-50/80 to-transparent p-5 flex items-center justify-between">
                            <h3 className="text-sm font-bold tracking-tight text-amber-900 flex items-center gap-2">
                                <FiAlertCircle className="text-amber-500" /> Review Needed: Warning Entities
                            </h3>
                            <span className="bg-amber-500 text-white shadow-lg shadow-amber-500/20 text-xs font-bold px-3 py-1 rounded-full">
                                {stats.warning} Nodes
                            </span>
                        </div>
                        <div className="flex-1 overflow-auto p-2 max-h-[350px]">
                            {stats.warningNodes.length === 0 ? (
                                <div className="p-8 text-center text-sm text-slate-500">No warning entities found.</div>
                            ) : (
                                <ul className="space-y-1 p-2">
                                    {stats.warningNodes.map((node, i) => (
                                        <li key={i} className="p-3 rounded-xl hover:bg-slate-50/80 border border-transparent hover:border-slate-200/60 transition-all flex items-center justify-between group">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-bold text-slate-800">{node.host}</span>
                                                <span className="text-[10px] text-amber-600 font-semibold uppercase tracking-wider mt-0.5">Missing Redundancy</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-mono font-medium ${(node.fabA_LoggedInYes || 0) === 0 ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-emerald-50 text-emerald-700 border border-emerald-100'}`}>
                                                    FAB A: <span className="font-bold">{node.fabA_LoggedInYes || 0}</span>
                                                </span>
                                                <span className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-mono font-medium ${(node.fabB_LoggedInYes || 0) === 0 ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-emerald-50 text-emerald-700 border border-emerald-100'}`}>
                                                    FAB B: <span className="font-bold">{node.fabB_LoggedInYes || 0}</span>
                                                </span>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>

                </div>
            )}
        </div>
    );
};

export default Observability;
