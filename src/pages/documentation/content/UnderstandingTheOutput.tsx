import React from 'react';

const UnderstandingTheOutput: React.FC = () => {
    return (
        <div className="prose prose-slate max-w-none">
            <h1 className="text-3xl font-extrabold text-slate-900 mb-6">Understanding the Output</h1>
            
            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                Mpath translates raw, complex configuration dumps into an easy-to-read, actionable data table. Here is how to interpret the primary Validation Results view.
            </p>

            <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4">The Results Table</h2>
            <p className="text-slate-600 mb-4">
                The main view consists of a data grid where each row represents a unique host (server) identified in the zoning configuration.
            </p>

            <div className="overflow-x-auto my-6 border border-slate-200 rounded-xl">
                <table className="min-w-full text-left text-sm text-slate-600 border-collapse">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="px-4 py-3 font-semibold text-slate-800">Column</th>
                            <th className="px-4 py-3 font-semibold text-slate-800">Description</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                        <tr>
                            <td className="px-4 py-3 font-medium text-slate-800">Host / Alias</td>
                            <td className="px-4 py-3">The parsed name of the server alias from the configuration.</td>
                        </tr>
                        <tr>
                            <td className="px-4 py-3 font-medium text-slate-800">OS Type</td>
                            <td className="px-4 py-3">Auto-detected operating system (e.g., AIX, ESXi, RHEL) used to determine compliance rules.</td>
                        </tr>
                        <tr>
                            <td className="px-4 py-3 font-medium text-slate-800">FAB A (Yes/No)</td>
                            <td className="px-4 py-3">Displays active logins vs inactive configured paths on Fabric A. E.g., `2 / 0` means 2 active, 0 down.</td>
                        </tr>
                        <tr>
                            <td className="px-4 py-3 font-medium text-slate-800">FAB B (Yes/No)</td>
                            <td className="px-4 py-3">Displays active logins vs inactive configured paths on Fabric B.</td>
                        </tr>
                        <tr>
                            <td className="px-4 py-3 font-medium text-slate-800">Final Validation</td>
                            <td className="px-4 py-3">
                                The computed status: 
                                <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded text-xs ml-2">Good</span>, 
                                <span className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded text-xs ml-2">FAB-A Is BAD</span>, 
                                <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded text-xs ml-2">Both FABs Are BAD</span>.
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4">Exporting Data</h2>
            <p className="text-slate-600 mb-4">
                The results table can be exported directly back to your local machine for reporting or change-management documentation.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600">
                <li><strong>Export to Excel:</strong> Generates an `.xlsx` file containing the exact formatting of the table.</li>
                <li><strong>CSV Export:</strong> Generates a raw comma-separated values file for ingestion into other tools or databases.</li>
            </ul>
        </div>
    );
};

export default UnderstandingTheOutput;
