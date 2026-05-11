import React, { useState } from 'react';
import type { ValidationSettings, ComplianceCondition } from '../types';
import { FiPlus, FiTrash2, FiCheck } from 'react-icons/fi';

interface SettingsPageProps {
    settings: ValidationSettings;
    onUpdateSettings: (settings: ValidationSettings) => void;
}

const glassCardClasses = "rounded-3xl border border-white/60 bg-white/40 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)]";
const inputClasses = "w-full rounded-xl border border-slate-200/60 bg-white/50 px-4 py-2.5 text-sm font-medium text-slate-800 placeholder-slate-400 outline-none transition-all focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10";

const PRESETS: Omit<ComplianceCondition, 'id'>[] = [
    { loggedIn: 1, notLoggedIn: 0, description: 'Single Path (ESXi/RHEL)' },
    { loggedIn: 2, notLoggedIn: 0, description: 'Dual Path Active' },
    { loggedIn: 2, notLoggedIn: 2, description: 'AIX Configuration' },
    { loggedIn: 4, notLoggedIn: 0, description: 'Quad Path Active' },
    { loggedIn: 1, notLoggedIn: 1, description: 'Single Active + Single Standby' },
];

const SettingsPage: React.FC<SettingsPageProps> = ({ settings, onUpdateSettings }) => {
    const [newLoggedIn, setNewLoggedIn] = useState('');
    const [newNotLoggedIn, setNewNotLoggedIn] = useState('');
    const [newDesc, setNewDesc] = useState('');

    const handleModeChange = (mode: 'multipath' | 'compliance') => {
        onUpdateSettings({ ...settings, mode });
    };

    const handleAddCondition = () => {
        const li = parseInt(newLoggedIn, 10);
        const nli = parseInt(newNotLoggedIn, 10);
        if (isNaN(li) || isNaN(nli)) return;

        const newCondition: ComplianceCondition = {
            id: `cond-${Date.now()}`,
            loggedIn: li,
            notLoggedIn: nli,
            description: newDesc.trim() || undefined
        };

        onUpdateSettings({
            ...settings,
            conditions: [...settings.conditions, newCondition]
        });

        setNewLoggedIn('');
        setNewNotLoggedIn('');
        setNewDesc('');
    };

    const handleAddPreset = (preset: Omit<ComplianceCondition, 'id'>) => {
        onUpdateSettings({
            ...settings,
            conditions: [...settings.conditions, { ...preset, id: `cond-${Date.now()}` }]
        });
    };

    const handleRemoveCondition = (id: string) => {
        onUpdateSettings({
            ...settings,
            conditions: settings.conditions.filter(c => c.id !== id)
        });
    };

    return (
        <div className="flex h-full flex-col p-6 space-y-6 overflow-auto pb-12">
            
            <section className={`${glassCardClasses} p-6`}>
                <div className="mb-6">
                    <h3 className="text-xl font-bold tracking-tight text-slate-800">Validation Mode</h3>
                    <p className="text-sm font-medium text-slate-500 mt-1">Choose how MultipathIQ validates your SAN fabrics.</p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    <button
                        onClick={() => handleModeChange('multipath')}
                        className={`flex flex-col items-start rounded-2xl border p-5 text-left transition-all ${
                            settings.mode === 'multipath' 
                                ? 'border-indigo-500 bg-indigo-50/50 shadow-[0_0_0_4px_rgba(99,102,241,0.1)]' 
                                : 'border-slate-200/60 bg-white/50 hover:border-indigo-300'
                        }`}
                    >
                        <div className="flex w-full items-center justify-between mb-2">
                            <span className={`text-base font-bold ${settings.mode === 'multipath' ? 'text-indigo-900' : 'text-slate-800'}`}>
                                Multipath Validation
                            </span>
                            {settings.mode === 'multipath' && <FiCheck className="text-indigo-600 text-lg" />}
                        </div>
                        <p className={`text-sm ${settings.mode === 'multipath' ? 'text-indigo-700/80' : 'text-slate-500'}`}>
                            Checks if both fabrics have at least 1 port logged in. Marks servers with 2+ paths per fabric as Reliable Multipath.
                        </p>
                    </button>

                    <button
                        onClick={() => handleModeChange('compliance')}
                        className={`flex flex-col items-start rounded-2xl border p-5 text-left transition-all ${
                            settings.mode === 'compliance' 
                                ? 'border-indigo-500 bg-indigo-50/50 shadow-[0_0_0_4px_rgba(99,102,241,0.1)]' 
                                : 'border-slate-200/60 bg-white/50 hover:border-indigo-300'
                        }`}
                    >
                        <div className="flex w-full items-center justify-between mb-2">
                            <span className={`text-base font-bold ${settings.mode === 'compliance' ? 'text-indigo-900' : 'text-slate-800'}`}>
                                Compliance Check
                            </span>
                            {settings.mode === 'compliance' && <FiCheck className="text-indigo-600 text-lg" />}
                        </div>
                        <p className={`text-sm ${settings.mode === 'compliance' ? 'text-indigo-700/80' : 'text-slate-500'}`}>
                            Strictly validates against your defined logged-in and standby port conditions per OS type.
                        </p>
                    </button>
                </div>
            </section>

            {settings.mode === 'compliance' && (
                <>
                    <section className={`${glassCardClasses} p-6`}>
                        <div className="mb-6">
                            <h3 className="text-xl font-bold tracking-tight text-slate-800">Add New Condition</h3>
                            <p className="text-sm font-medium text-slate-500 mt-1">Define allowed port combinations for compliance.</p>
                        </div>

                        <div className="grid gap-4 md:grid-cols-4 items-end">
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Logged In Paths</label>
                                <input type="number" min="0" value={newLoggedIn} onChange={e => setNewLoggedIn(e.target.value)} placeholder="e.g., 2" className={inputClasses} />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Not Logged In Paths</label>
                                <input type="number" min="0" value={newNotLoggedIn} onChange={e => setNewNotLoggedIn(e.target.value)} placeholder="e.g., 0" className={inputClasses} />
                            </div>
                            <div className="space-y-1.5 md:col-span-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Description (Optional)</label>
                                <div className="flex gap-3">
                                    <input type="text" value={newDesc} onChange={e => setNewDesc(e.target.value)} placeholder="e.g., Single Path Configuration" className={inputClasses} />
                                    <button 
                                        onClick={handleAddCondition}
                                        disabled={!newLoggedIn || !newNotLoggedIn}
                                        className="flex flex-shrink-0 items-center gap-2 rounded-xl bg-indigo-600 px-6 py-2.5 text-sm font-bold text-white transition-all hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <FiPlus /> Add
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 mb-4">
                            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-3">Quick Add Presets</h4>
                            <div className="space-y-2">
                                {PRESETS.map((preset, i) => (
                                    <button 
                                        key={i} 
                                        onClick={() => handleAddPreset(preset)}
                                        className="flex w-full items-center justify-between rounded-xl border border-slate-200/60 bg-white/40 px-4 py-3 text-left transition-all hover:border-indigo-300 hover:bg-white/80"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center gap-1.5 rounded-md bg-emerald-50 px-2 py-0.5 text-xs font-bold text-emerald-700 ring-1 ring-inset ring-emerald-500/20">
                                                {preset.loggedIn}✓
                                            </div>
                                            <div className="flex items-center gap-1.5 rounded-md bg-rose-50 px-2 py-0.5 text-xs font-bold text-rose-700 ring-1 ring-inset ring-rose-500/20">
                                                {preset.notLoggedIn}✗
                                            </div>
                                            <span className="text-sm font-semibold text-slate-700">{preset.description}</span>
                                        </div>
                                        <FiPlus className="text-slate-400" />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </section>

                    <section className={`${glassCardClasses} p-6`}>
                        <div className="mb-6">
                            <h3 className="text-xl font-bold tracking-tight text-slate-800">Active Conditions</h3>
                            <p className="text-sm font-medium text-slate-500 mt-1">Servers matching ANY of these conditions will pass validation.</p>
                        </div>

                        {settings.conditions.length === 0 ? (
                            <div className="flex items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white/30 py-8 text-sm font-medium text-slate-500">
                                No compliance conditions defined. All fabrics will fail validation.
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {settings.conditions.map(cond => (
                                    <div key={cond.id} className="flex items-center justify-between rounded-xl border border-slate-200/60 bg-white/60 px-4 py-3 shadow-sm">
                                        <div className="flex items-center gap-4">
                                            <div className="flex gap-2">
                                                <div className="flex items-center gap-1.5 rounded-lg bg-emerald-500 px-2.5 py-1 text-xs font-bold text-white shadow-sm shadow-emerald-500/30">
                                                    {cond.loggedIn} <FiCheck className="text-[10px]" />
                                                </div>
                                                <div className="flex items-center gap-1.5 rounded-lg bg-rose-500 px-2.5 py-1 text-xs font-bold text-white shadow-sm shadow-rose-500/30">
                                                    {cond.notLoggedIn} ✗
                                                </div>
                                            </div>
                                            <span className="text-sm font-semibold text-slate-800">{cond.description || 'Custom Condition'}</span>
                                        </div>
                                        <button 
                                            onClick={() => handleRemoveCondition(cond.id)}
                                            className="rounded-lg p-2 text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition-colors"
                                        >
                                            <FiTrash2 />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>
                </>
            )}
        </div>
    );
};

export default SettingsPage;
