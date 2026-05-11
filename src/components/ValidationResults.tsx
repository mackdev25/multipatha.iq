import React, { useMemo, useState } from 'react';
import type { ValidationResult } from '../types';
import { ExcelUtils } from '../utils/excelUtils';
import {
    FiAlertTriangle,
    FiCheckCircle,
    FiChevronDown,
    FiChevronRight,
    FiDownload,
    FiFilter,
    FiSearch,
    FiUpload,
    FiXCircle
} from 'react-icons/fi';

interface ValidationResultsProps {
    results: ValidationResult[];
    summary: {
        total: number;
        good: number;
        fabABad: number;
        fabBBad: number;
        bothBad: number;
        percentageGood: number;
        originalEntries: number;
        duplicatesRemoved: number;
        uniqueEntries: number;
    };
    onReset: () => void;
}

const ValidationResults: React.FC<ValidationResultsProps> = ({ results, summary, onReset }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [fabAFilter, setFabAFilter] = useState<string>('all');
    const [fabBFilter, setFabBFilter] = useState<string>('all');
    const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
    const [expandedWWNs, setExpandedWWNs] = useState<Set<string>>(new Set());

    const filteredResults = useMemo(() => {
        return results.filter(result => {
            const matchesSearch = result.host.toLowerCase().includes(searchTerm.toLowerCase());

            let matchesStatus = true;
            if (statusFilter === 'errors') {
                matchesStatus = result.finalValidation !== 'Good';
            } else if (statusFilter !== 'all') {
                matchesStatus = result.finalValidation === statusFilter;
            }

            const matchesFabA = fabAFilter === 'all' || result.validationA === fabAFilter;
            const matchesFabB = fabBFilter === 'all' || result.validationB === fabBFilter;

            return matchesSearch && matchesStatus && matchesFabA && matchesFabB;
        });
    }, [results, searchTerm, statusFilter, fabAFilter, fabBFilter]);

    const toggleWWNExpansion = (hostName: string) => {
        const newExpanded = new Set(expandedWWNs);
        if (newExpanded.has(hostName)) {
            newExpanded.delete(hostName);
        } else {
            newExpanded.add(hostName);
        }
        setExpandedWWNs(newExpanded);
    };

    const getServerType = (wwnCount: number): string => {
        if (wwnCount >= 8) return 'AIX';
        if (wwnCount >= 2) return 'RHEL/ESXi';
        return 'Unknown';
    };

    const handleExport = () => {
        const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
        const dataToExport = selectedRows.size > 0
            ? filteredResults.filter((_, index) => selectedRows.has(index))
            : filteredResults;
        ExcelUtils.exportToExcel(dataToExport, `fabric_validation_report_${timestamp}.xlsx`);
    };

    const handleSelectAll = () => {
        if (selectedRows.size === filteredResults.length) {
            setSelectedRows(new Set());
        } else {
            setSelectedRows(new Set(filteredResults.map((_, index) => index)));
        }
    };

    const handleRowSelect = (index: number) => {
        const newSelectedRows = new Set(selectedRows);
        if (newSelectedRows.has(index)) {
            newSelectedRows.delete(index);
        } else {
            newSelectedRows.add(index);
        }
        setSelectedRows(newSelectedRows);
    };

    const clearFilters = () => {
        setSearchTerm('');
        setStatusFilter('all');
        setFabAFilter('all');
        setFabBFilter('all');
        setSelectedRows(new Set());
        setExpandedWWNs(new Set());
    };

    const getValidationBadgeClasses = (validation: 'OK' | 'Error'): string => {
        return validation === 'OK'
            ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.1)]'
            : 'bg-rose-500/10 text-rose-600 border border-rose-500/20 shadow-[0_0_10px_rgba(244,63,94,0.1)]';
    };

    const getFinalStatusBadgeClasses = (status: ValidationResult['finalValidation']): string => {
        if (status === 'Good') return 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.1)]';
        if (status === 'Both FABs Are BAD') return 'bg-rose-500/10 text-rose-600 border border-rose-500/20 shadow-[0_0_10px_rgba(244,63,94,0.1)]';
        return 'bg-amber-500/10 text-amber-600 border border-amber-500/20 shadow-[0_0_10px_rgba(245,158,11,0.1)]';
    };

    const partialIssues = summary.fabABad + summary.fabBBad;

    const summaryCards = [
        {
            label: 'Total',
            value: summary.total,
            icon: <FiFilter className="text-indigo-500" size={14} />,
            bgClass: 'bg-indigo-500/10',
            ringClass: 'ring-indigo-500/20'
        },
        {
            label: 'Good',
            value: summary.good,
            icon: <FiCheckCircle className="text-emerald-500" size={14} />,
            bgClass: 'bg-emerald-500/10',
            ringClass: 'ring-emerald-500/20'
        },
        {
            label: 'Partial',
            value: partialIssues,
            icon: <FiAlertTriangle className="text-amber-500" size={14} />,
            bgClass: 'bg-amber-500/10',
            ringClass: 'ring-amber-500/20'
        },
        {
            label: 'Both Bad',
            value: summary.bothBad,
            icon: <FiXCircle className="text-rose-500" size={14} />,
            bgClass: 'bg-rose-500/10',
            ringClass: 'ring-rose-500/20'
        },
        {
            label: 'Dups Removed',
            value: summary.duplicatesRemoved,
            icon: <FiFilter className="text-cyan-500" size={14} />,
            bgClass: 'bg-cyan-500/10',
            ringClass: 'ring-cyan-500/20'
        }
    ];

    const inputClasses = "w-full rounded-xl border border-slate-200/60 bg-white/50 px-4 py-2.5 text-sm text-slate-700 outline-none backdrop-blur-sm transition-all focus:border-indigo-500/50 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 placeholder:text-slate-400";
    const glassCardClasses = "rounded-3xl border border-white/60 bg-white/40 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)]";

    return (
        <div className="space-y-4 pb-8">
            {/* Unified Toolbar: Header, Actions, Stats, and Filters */}
            <section className={`${glassCardClasses} p-4 md:p-5`}>
                <div className="flex flex-col gap-4">
                    {/* Header & Stats Row */}
                    <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                        {/* Header & Actions */}
                        <div className="flex flex-wrap items-center justify-between gap-4 xl:justify-start">
                            <div className="flex items-center gap-3">
                                <h3 className="text-lg font-bold tracking-tight text-slate-800">Results</h3>
                                <div className="flex items-center gap-2 rounded-full bg-white/60 px-2.5 py-0.5 shadow-sm ring-1 ring-black/5 backdrop-blur-md">
                                    <span className="text-xs font-semibold text-slate-600">{filteredResults.length} / {results.length}</span>
                                </div>
                                {selectedRows.size > 0 && (
                                    <div className="flex items-center gap-2 rounded-full bg-indigo-500/10 px-2.5 py-0.5 ring-1 ring-indigo-500/20">
                                        <span className="text-xs font-semibold text-indigo-700">{selectedRows.size} selected</span>
                                    </div>
                                )}
                            </div>
                            
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={onReset}
                                    className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-white/60 px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm ring-1 ring-inset ring-slate-200/60 transition-all hover:bg-white hover:text-slate-900"
                                >
                                    <FiUpload size={14} className="text-slate-400" />
                                    New File
                                </button>
                                <button
                                    onClick={handleExport}
                                    className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white shadow-md shadow-indigo-500/20 transition-all hover:bg-indigo-700 hover:shadow-indigo-500/30 active:scale-95"
                                >
                                    <FiDownload size={14} />
                                    Export {selectedRows.size > 0 ? 'Selected' : 'All'}
                                </button>
                            </div>
                        </div>

                        {/* Compact Stats */}
                        <div className="flex flex-wrap items-center gap-2 xl:ml-auto">
                            {summaryCards.map((card) => (
                                <div key={card.label} className={`flex items-center gap-2 rounded-xl bg-white/50 px-2.5 py-1 ring-1 ring-inset border border-white/60 shadow-sm ${card.ringClass}`}>
                                    <div className={`flex h-6 w-6 items-center justify-center rounded-lg ${card.bgClass}`}>
                                        {card.icon}
                                    </div>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-sm font-bold text-slate-800">{card.value}</span>
                                        <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">{card.label}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-200/60 to-transparent" />

                    {/* Filters Row */}
                    <div className="flex flex-wrap lg:flex-nowrap gap-3">
                        <div className="relative w-full lg:w-2/5">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <FiSearch className="text-slate-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search host name..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className={`${inputClasses} py-2 pl-9`}
                            />
                        </div>

                        <div className="relative w-full sm:w-auto flex-1">
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className={`${inputClasses} py-2 appearance-none pr-9`}
                            >
                                <option value="all">All Statuses</option>
                                <option value="errors">All Errors</option>
                                <option value="Good">Good</option>
                                <option value="FAB-A Is BAD">FAB-A Is BAD</option>
                                <option value="FAB-B Is BAD">FAB-B Is BAD</option>
                                <option value="Both FABs Are BAD">Both FABs Are BAD</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                <FiChevronDown className="text-slate-400" />
                            </div>
                        </div>

                        <div className="relative w-full sm:w-auto flex-1">
                            <select
                                value={fabAFilter}
                                onChange={(e) => setFabAFilter(e.target.value)}
                                className={`${inputClasses} py-2 appearance-none pr-9`}
                            >
                                <option value="all">FAB-A: All</option>
                                <option value="OK">FAB-A: OK</option>
                                <option value="Error">FAB-A: Error</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                <FiChevronDown className="text-slate-400" />
                            </div>
                        </div>

                        <div className="relative w-full sm:w-auto flex-1">
                            <select
                                value={fabBFilter}
                                onChange={(e) => setFabBFilter(e.target.value)}
                                className={`${inputClasses} py-2 appearance-none pr-9`}
                            >
                                <option value="all">FAB-B: All</option>
                                <option value="OK">FAB-B: OK</option>
                                <option value="Error">FAB-B: Error</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                <FiChevronDown className="text-slate-400" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Data Table */}
            <section className={`${glassCardClasses} overflow-hidden`}>
                {filteredResults.length > 0 ? (
                    <div className="max-h-[60vh] overflow-auto">
                        <table className="w-full min-w-[1240px] border-collapse text-sm">
                            <thead className="sticky top-0 z-10 bg-white/80 backdrop-blur-md">
                                <tr className="border-b border-slate-200/60 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">
                                    <th className="w-10 px-3 py-2.5 text-center">
                                        <input
                                            type="checkbox"
                                            checked={selectedRows.size === filteredResults.length && filteredResults.length > 0}
                                            onChange={handleSelectAll}
                                            className="h-4 w-4 rounded border-slate-300 bg-white/50 text-indigo-600 transition-all focus:ring-indigo-500/30"
                                        />
                                    </th>
                                    <th className="px-3 py-2.5">Host</th>
                                    <th className="px-3 py-2.5">WWNs</th>
                                    <th className="px-3 py-2.5 text-center">FAB-A In</th>
                                    <th className="px-3 py-2.5 text-center">FAB-A Out</th>
                                    <th className="px-3 py-2.5 text-center">FAB-A Status</th>
                                    <th className="px-3 py-2.5 text-center">FAB-B In</th>
                                    <th className="px-3 py-2.5 text-center">FAB-B Out</th>
                                    <th className="px-3 py-2.5 text-center">FAB-B Status</th>
                                    <th className="px-3 py-2.5 text-center">Final Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100/60 bg-white/20">
                                {filteredResults.map((result, index) => (
                                    <tr key={index} className="transition-colors hover:bg-white/40">
                                        <td className="px-3 py-2.5 text-center align-top">
                                            <input
                                                type="checkbox"
                                                checked={selectedRows.has(index)}
                                                onChange={() => handleRowSelect(index)}
                                                className="mt-1 h-4 w-4 rounded border-slate-300 bg-white/50 text-indigo-600 transition-all focus:ring-indigo-500/30"
                                            />
                                        </td>
                                        <td className="px-3 py-2.5 align-top">
                                            <span className="font-semibold text-slate-800">{result.host}</span>
                                        </td>

                                        <td className="min-w-[320px] px-3 py-2.5 align-top">
                                            <div className="max-w-[420px]">
                                                <button
                                                    onClick={() => toggleWWNExpansion(result.host)}
                                                    className="mb-1.5 flex items-center gap-2 rounded-xl bg-white/60 px-2.5 py-1 text-xs font-semibold text-slate-700 shadow-sm ring-1 ring-inset ring-slate-200/60 transition-all hover:bg-white hover:text-indigo-600"
                                                >
                                                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-100/80">
                                                        {expandedWWNs.has(result.host) ? <FiChevronDown size={14} /> : <FiChevronRight size={14} />}
                                                    </span>
                                                    {result.wwns.length} WWN{result.wwns.length !== 1 ? 's' : ''} <span className="text-slate-400">({getServerType(result.wwns.length)})</span>
                                                </button>

                                                <div className="flex flex-wrap gap-1.5">
                                                    {(expandedWWNs.has(result.host) ? result.wwns : result.wwns.slice(0, 1)).map((wwnInfo, wwnIndex) => (
                                                        <div
                                                            key={wwnIndex}
                                                            className={`inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${
                                                                wwnInfo.isLoggedIn 
                                                                    ? 'bg-emerald-500/5 text-emerald-700 ring-emerald-500/20' 
                                                                    : 'bg-rose-500/5 text-rose-700 ring-rose-500/20'
                                                            }`}
                                                        >
                                                            <div className={`h-1.5 w-1.5 rounded-full ${wwnInfo.isLoggedIn ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                                                            {wwnInfo.wwn}
                                                            <span className="opacity-60">({wwnInfo.fabric})</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-3 py-2.5 text-center align-top font-semibold text-slate-700">{result.fabA_LoggedInYes}</td>
                                        <td className="px-3 py-2.5 text-center align-top font-semibold text-slate-700">{result.fabA_LoggedInNo}</td>
                                        <td className="px-3 py-2.5 text-center align-top">
                                            <span className={`inline-flex items-center justify-center rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${getValidationBadgeClasses(result.validationA)}`}>
                                                {result.validationA}
                                            </span>
                                        </td>
                                        <td className="px-3 py-2.5 text-center align-top font-semibold text-slate-700">{result.fabB_LoggedInYes}</td>
                                        <td className="px-3 py-2.5 text-center align-top font-semibold text-slate-700">{result.fabB_LoggedInNo}</td>
                                        <td className="px-3 py-2.5 text-center align-top">
                                            <span className={`inline-flex items-center justify-center rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${getValidationBadgeClasses(result.validationB)}`}>
                                                {result.validationB}
                                            </span>
                                        </td>
                                        <td className="px-3 py-2.5 text-center align-top">
                                            <div className="flex flex-col items-center gap-1.5">
                                                <span className={`inline-flex items-center justify-center rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${getFinalStatusBadgeClasses(result.finalValidation)}`}>
                                                    {result.finalValidation}
                                                </span>
                                                {result.isReliableMultipath && (
                                                    <span className="inline-flex items-center justify-center gap-1 rounded-md bg-indigo-500/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-indigo-700 ring-1 ring-inset ring-indigo-500/20 shadow-sm shadow-indigo-500/10">
                                                        <FiCheckCircle size={10} /> Reliable Multipath
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center gap-4 px-6 py-20 text-center">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100/50 shadow-inner ring-1 ring-slate-200">
                            <FiSearch className="text-3xl text-slate-400" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-slate-800">No results found</h3>
                            <p className="mt-1 text-sm text-slate-500">Try adjusting your filters or search term to find results.</p>
                        </div>
                        <button 
                            onClick={clearFilters}
                            className="mt-2 rounded-xl bg-white/60 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm ring-1 ring-inset ring-slate-200/60 transition-all hover:bg-white hover:text-indigo-600"
                        >
                            Clear All Filters
                        </button>
                    </div>
                )}
            </section>
        </div>
    );
};

export default ValidationResults;