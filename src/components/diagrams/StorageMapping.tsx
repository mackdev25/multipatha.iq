import React from 'react';
import { FiClock } from 'react-icons/fi';

const glassCardClasses = "rounded-3xl border border-white/60 bg-white/40 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)]";

const StorageMapping: React.FC<{ data: any[] }> = () => {
    return (
        <div className="flex h-full flex-col p-6 space-y-6 overflow-auto pb-12 items-center justify-center">
            <div className={`${glassCardClasses} p-12 max-w-lg w-full text-center relative overflow-hidden`}>
                
                {/* Decorative background elements */}
                <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-slate-100/50 to-transparent pointer-events-none" />
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-500/10 blur-3xl rounded-full pointer-events-none" />
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-emerald-500/10 blur-3xl rounded-full pointer-events-none" />
                
                {/* Grid placeholder icon */}
                <div className="relative mx-auto w-32 h-32 mb-8 pointer-events-none">
                    <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-1 opacity-20">
                        {Array.from({ length: 9 }).map((_, i) => (
                            <div key={i} className="border border-slate-400 border-dashed rounded-sm" />
                        ))}
                    </div>
                    
                    <div className="absolute top-4 left-4 right-8 bottom-12 bg-slate-700/80 backdrop-blur-md rounded-xl border border-slate-600/50 flex flex-col p-2 gap-2 shadow-lg transform -rotate-6">
                        <div className="flex gap-2 items-center">
                            <div className="w-4 h-4 bg-slate-500 rounded-md" />
                            <div className="h-1.5 w-12 bg-slate-500/50 rounded-full" />
                        </div>
                        <div className="flex gap-2 items-center pl-2">
                            <div className="h-1 w-16 bg-slate-500/50 rounded-full" />
                        </div>
                    </div>
                    
                    <div className="absolute top-10 left-8 right-4 bottom-6 bg-emerald-600/90 backdrop-blur-md rounded-xl border border-emerald-500/50 flex flex-col p-2 gap-2 shadow-xl shadow-emerald-900/20 transform rotate-3">
                        <div className="flex gap-2 items-center">
                            <div className="w-4 h-4 bg-emerald-400 rounded-md" />
                            <div className="h-1.5 w-16 bg-emerald-400/50 rounded-full" />
                        </div>
                        <div className="flex gap-2 items-center pl-2">
                            <div className="h-1 w-12 bg-emerald-400/50 rounded-full" />
                        </div>
                    </div>
                </div>

                <h3 className="text-xl font-bold text-slate-800 mb-2 relative z-10">Dependency Map coming soon</h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-8 relative z-10">
                    We're building a powerful end-to-end dependency visualization tool that will map everything from servers down to storage.
                </p>
                
                <button className="inline-flex items-center gap-2 rounded-xl bg-slate-800 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-slate-800/20 transition-all hover:bg-slate-700 active:scale-95 relative z-10 cursor-default">
                    <FiClock className="text-slate-300" />
                    Available in v1.2
                </button>
            </div>
        </div>
    );
};

export default StorageMapping;