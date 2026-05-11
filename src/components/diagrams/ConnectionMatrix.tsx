import React, { useMemo } from 'react';
import type { ValidationResult } from '../../types';


interface ConnectionMatrixProps {
    data?: ValidationResult[];
}

const ConnectionMatrix: React.FC<ConnectionMatrixProps> = ({ data = [] }) => {
    const matrixData = useMemo(() => {
        if (data.length === 0) return null;

        // Extract unique fabrics
        const fabrics = new Set<string>();
        data.forEach(result => {
            result.wwns.forEach(wwn => {
                if (wwn.fabric) fabrics.add(wwn.fabric);
            });
        });

        const fabricArray = Array.from(fabrics).sort();

        // Build matrix data
        const matrix = data.map(result => {
            const row: any = {
                host: result.host,
                finalValidation: result.finalValidation,
                fabrics: {}
            };

            fabricArray.forEach(fabric => {
                const fabricWwns = result.wwns.filter(w => w.fabric === fabric);
                const loggedInCount = fabricWwns.filter(w => w.isLoggedIn).length;
                const totalCount = fabricWwns.length;

                row.fabrics[fabric] = {
                    loggedIn: loggedInCount,
                    total: totalCount,
                    status: loggedInCount > 0 ? 'connected' : 'disconnected',
                    wwns: fabricWwns
                };
            });

            return row;
        });

        return { matrix, fabrics: fabricArray };
    }, [data]);

    const getStatusClass = (status: string, finalValidation: string) => {
        if (finalValidation !== 'Good') return 'bg-amber-50 text-amber-800';
        return status === 'connected' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800';
    };

    const getValidationClass = (validation: string) => {
        switch (validation) {
            case 'Good': return 'bg-green-100 text-green-800';
            case 'FAB-A Is BAD': return 'bg-amber-100 text-amber-800';
            case 'FAB-B Is BAD': return 'bg-amber-100 text-amber-800';
            case 'Both FABs Are BAD': return 'bg-red-100 text-red-800';
            default: return 'bg-slate-100 text-slate-700';
        }
    };

    if (!matrixData || matrixData.matrix.length === 0) {
        return (
            <div className="flex h-full flex-col p-6">
                <div className="flex flex-1 items-center justify-center text-lg text-slate-500">
                    <p>Upload Excel file to generate connection matrix</p>
                </div>
            </div>
        );
    }

    const { matrix, fabrics } = matrixData;

    return (
        <div className="flex h-full flex-col p-6">
            <div className="mb-4">

                <div className="flex flex-wrap gap-6 rounded-md border border-slate-200 bg-slate-50 px-4 py-3">
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                        <span className="h-3 w-3 rounded-full border border-green-600 bg-green-400"></span>
                        <span>Connected (Logged In)</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                        <span className="h-3 w-3 rounded-full border border-red-600 bg-red-400"></span>
                        <span>Disconnected (Not Logged In)</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                        <span className="h-3 w-3 rounded-full border border-amber-500 bg-amber-400"></span>
                        <span>Validation Error</span>
                    </div>
                </div>
            </div>

            <div className="mb-4 flex-1 overflow-auto rounded-lg border border-slate-200 bg-white">
                <div className="overflow-auto">
                    <table className="w-full border-collapse text-sm">
                        <thead>
                            <tr>
                                <th className="sticky top-0 z-10 min-w-[150px] max-w-[200px] border border-slate-200 bg-slate-50 px-3 py-3 text-left font-semibold text-slate-700">Host</th>
                                <th className="sticky top-0 z-10 min-w-[80px] border border-slate-200 bg-slate-50 px-3 py-3 text-center font-semibold text-slate-700">Status</th>
                                {fabrics.map(fabric => (
                                    <th key={fabric} className="sticky top-0 z-10 min-w-[70px] border border-slate-200 bg-slate-50 px-2 py-3 text-center font-semibold text-slate-700" style={{ writingMode: 'vertical-lr', textOrientation: 'mixed', height: 60 }}>
                                        {fabric}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {matrix.map((row, index) => (
                                <tr key={index}>
                                    <td className="max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap border border-slate-200 px-3 py-2 text-left font-medium text-slate-900 align-middle" title={row.host}>
                                        {row.host}
                                    </td>
                                    <td className={`border border-slate-200 px-2 py-2 text-center align-middle font-semibold ${getValidationClass(row.finalValidation)}`}>
                                        <span className="block text-base">
                                            {row.finalValidation === 'Good' ? '✓' : '✗'}
                                        </span>
                                        <span className="mt-0.5 block text-[11px] opacity-80">
                                            {row.finalValidation}
                                        </span>
                                    </td>
                                    {fabrics.map(fabric => {
                                        const fabricData = row.fabrics[fabric];
                                        return (
                                            <td
                                                key={fabric}
                                                className={`w-[70px] border border-slate-200 px-1 py-1 align-middle ${getStatusClass(fabricData.status, row.finalValidation)}`}
                                                title={`${fabricData.loggedIn}/${fabricData.total} logged in`}
                                            >
                                                <div className="flex flex-col items-center gap-0.5">
                                                    <span className="text-base leading-none">
                                                        {fabricData.status === 'connected' ? '●' : '○'}
                                                    </span>
                                                    <span className="text-[11px] font-medium leading-none">
                                                        {fabricData.loggedIn}/{fabricData.total}
                                                    </span>
                                                </div>
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="flex flex-wrap gap-4 rounded-md border border-slate-200 bg-slate-50 px-4 py-3">
                <div className="flex items-center gap-2 text-sm">
                    <span className="text-slate-600">Total Hosts:</span>
                    <span className="font-semibold text-slate-900">{matrix.length}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                    <span className="text-slate-600">Fabrics:</span>
                    <span className="font-semibold text-slate-900">{fabrics.length}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                    <span className="text-slate-600">Good:</span>
                    <span className="font-semibold text-green-700">
                        {matrix.filter(r => r.finalValidation === 'Good').length}
                    </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                    <span className="text-slate-600">Issues:</span>
                    <span className="font-semibold text-red-700">
                        {matrix.filter(r => r.finalValidation !== 'Good').length}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ConnectionMatrix;