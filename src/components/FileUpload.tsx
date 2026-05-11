import React, { useState, useRef } from 'react';
import {
    Alert,
    Box,
    CircularProgress,
    Paper,
} from '@mui/material';
import { FiCheckCircle, FiDownload, FiFileText, FiUploadCloud } from 'react-icons/fi';

interface FileUploadProps {
    onFileUpload: (file: File) => void;
    isLoading: boolean;
    error?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload, isLoading, error }) => {
    const [dragActive, setDragActive] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
        }
    };

    const handleFile = (file: File) => {
        if (file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
            file.type === 'application/vnd.ms-excel' ||
            file.name.endsWith('.xlsx') ||
            file.name.endsWith('.xls')) {
            onFileUpload(file);
        } else {
            alert('Please upload a valid Excel file (.xlsx or .xls)');
        }
    };

    const onButtonClick = () => {
        fileInputRef.current?.click();
    };

    const handleDownloadTemplate = () => {
        const csv = [
            'Fabric,Zone Configuration Status,Alias,Alias Type,"Member WWN / D,P",Logged In,Vendor,Zone',
            'FAB-A,Effective,server01_01,WWN,10:00:00:00:c9:ab:cd:ef,Yes,IBM,server01_zone_01',
            'FAB-A,Effective,server01_02,WWN,10:00:00:00:c9:ab:cd:f0,No,IBM,server01_zone_01',
            'FAB-B,Effective,server01_01,WWN,10:00:00:00:c9:ab:cd:e1,Yes,IBM,server01_zone_02',
            'FAB-B,Effective,server01_02,WWN,10:00:00:00:c9:ab:cd:e2,No,IBM,server01_zone_02',
        ].join('\n');
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'san-fabric-template.csv';
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="space-y-3 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <Paper
                elevation={0}
                className={`rounded-3xl border bg-white/90 p-5 shadow-[0_24px_44px_-34px_rgba(15,23,42,0.5)] backdrop-blur md:p-8 ${dragActive ? 'border-blue-400 ring-4 ring-blue-100' : 'border-slate-200/90'}`}
            >
                <Box
                    className={`relative rounded-2xl border-2 border-dashed px-4 py-12 text-center transition-all duration-300 md:px-8 ${dragActive ? 'border-blue-500 bg-blue-50/80' : 'border-slate-300 bg-slate-50 hover:border-blue-400 hover:bg-blue-50/50'}`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    onClick={onButtonClick}
                >
                    <input
                        ref={fileInputRef}
                        type="file"
                        className="hidden"
                        accept=".xlsx,.xls,.csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel,text/csv"
                        onChange={handleChange}
                    />

                    <div className="pointer-events-none flex flex-col items-center gap-2">
                        {isLoading ? (
                            <>
                                <CircularProgress size={42} />
                                <h3 className="text-xl font-bold text-slate-800">Processing Excel file...</h3>
                                <p className="text-sm text-slate-500">Parsing workbook and validating SAN fabric paths.</p>
                            </>
                        ) : (
                            <>
                                <span className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-3xl text-white shadow-lg shadow-blue-300/40">
                                    <FiUploadCloud />
                                </span>
                                <h3 className="text-2xl font-bold text-slate-900">Upload SAN Fabric Data</h3>
                                <p className="max-w-2xl text-slate-600">
                                    Drag and drop your Excel file here, or <span className="font-semibold text-blue-700">click to browse</span>.
                                </p>
                                <span className="rounded-full bg-slate-200/80 px-3 py-1 text-xs font-medium text-slate-700">
                                    Supported formats: .xlsx, .xls, .csv
                                </span>
                            </>
                        )}
                    </div>
                </Box>
            </Paper>

            {error && (
                <Alert severity="error" variant="filled" className="!rounded-2xl">
                    {error}
                </Alert>
            )}

            {/* Expected Excel Format – enhanced table */}
            <div className="border-t border-slate-100 pt-5">
                <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50">
                            <FiFileText className="text-base text-emerald-600" />
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-slate-800">Expected Excel Format</h4>
                            <p className="text-[11px] text-slate-400">Match column headers exactly — letter case matters</p>
                        </div>
                    </div>
                    <button
                        onClick={handleDownloadTemplate}
                        className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700"
                    >
                        <FiDownload className="text-sm" />
                        Download Template
                    </button>
                </div>

                <div className="overflow-hidden rounded-xl border border-slate-200">
                    <table className="w-full border-collapse text-sm">
                        <thead>
                            <tr className="border-b border-slate-200 bg-slate-50">
                                <th className="px-4 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-500">Column Header</th>
                                <th className="px-4 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-500">Description &amp; Accepted Values</th>
                                <th className="hidden px-4 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-500 md:table-cell">Example</th>
                                <th className="px-4 py-2.5 text-center text-[11px] font-semibold uppercase tracking-wide text-slate-500">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {[
                                { col: 'Fabric', desc: 'Identifies which SAN fabric the port belongs to', values: 'FAB-A or FAB-B', example: 'FAB-A', status: 'required' },
                                { col: 'Alias', desc: 'Server hostname and port alias identifier', values: 'Free text string', example: 'pv109960_01', status: 'required' },
                                { col: 'Logged In', desc: 'Whether the port is actively logged in to the fabric', values: 'Yes / No', example: 'Yes', status: 'required' },
                                { col: 'Member WWN / D,P', desc: 'World Wide Name of the host port used for fabric authentication', values: 'Colon-separated hex (8 pairs)', example: '10:00:00:90:fa:ab:cd:ef', status: 'recommended' },
                                { col: 'Zone', desc: 'Zone name associating the host with a storage device', values: 'Free text string', example: 'server01_2_gpibox01_pg01', status: 'optional' },
                                { col: 'Zone Configuration Status', desc: 'State of the zone configuration on the switch', values: 'Effective', example: 'Effective', status: 'optional' },
                                { col: 'Alias Type', desc: 'Type of alias used for zone membership', values: 'WWN', example: 'WWN', status: 'optional' },
                                { col: 'Vendor', desc: 'Server hardware vendor name for identification', values: 'Free text string', example: 'IBM', status: 'optional' },
                            ].map((row) => (
                                <tr key={row.col} className="transition-colors hover:bg-slate-50/60">
                                    <td className="px-4 py-3">
                                        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs font-semibold text-slate-700">{row.col}</code>
                                    </td>
                                    <td className="px-4 py-3 text-xs text-slate-600">
                                        <span className="block leading-snug">{row.desc}</span>
                                        <span className="mt-0.5 block text-slate-400">Accepts: {row.values}</span>
                                    </td>
                                    <td className="hidden px-4 py-3 font-mono text-xs text-slate-400 md:table-cell">{row.example}</td>
                                    <td className="px-4 py-3 text-center">
                                        {row.status === 'required' && (
                                            <span className="rounded-full bg-red-50 px-2 py-0.5 text-[10px] font-semibold text-red-600 ring-1 ring-inset ring-red-200">Required</span>
                                        )}
                                        {row.status === 'recommended' && (
                                            <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-semibold text-amber-600 ring-1 ring-inset ring-amber-200">Recommended</span>
                                        )}
                                        {row.status === 'optional' && (
                                            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-500 ring-1 ring-inset ring-slate-200">Optional</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <p className="mt-3 inline-flex items-center gap-1.5 text-xs text-slate-400">
                    <FiCheckCircle className="text-emerald-500" />
                    Column headers must match exactly. Download the template for a ready-to-use starting file.
                </p>
            </div>
        </div>
    );
};

export default FileUpload;