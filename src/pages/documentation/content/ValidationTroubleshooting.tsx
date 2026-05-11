import React from 'react';

const ValidationTroubleshooting: React.FC = () => {
    return (
        <div className="prose prose-slate max-w-none">
            <h1 className="text-3xl font-extrabold text-slate-900 mb-6">Validation Troubleshooting</h1>
            
            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                If the Validation Results table looks incorrect or fails to generate, review the common data-integrity issues below.
            </p>

            <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4">Common Issues</h2>

            <div className="space-y-6">
                <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                    <h3 className="text-md font-bold text-slate-800 mb-1">1. 0 Paths Detected Across All Hosts</h3>
                    <p className="text-sm text-slate-600 mb-2"><strong>Symptom:</strong> The table renders, but every host shows a Critical state with 0 logins.</p>
                    <p className="text-sm text-slate-600"><strong>Fix:</strong> The parser could not find the `Login Status` or `State` column in your Excel file. Ensure the headers in your dataset exactly match the expected keys (e.g., "LoggedInYes", "Logged In", depending on your macro output).</p>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                    <h3 className="text-md font-bold text-slate-800 mb-1">2. "Invalid File Format" Error</h3>
                    <p className="text-sm text-slate-600 mb-2"><strong>Symptom:</strong> Dropping the file triggers a red toast notification.</p>
                    <p className="text-sm text-slate-600"><strong>Fix:</strong> MultipathIQ only accepts `.xlsx` or `.xls` MIME types. If you captured raw text (`.txt` or `.log`), you must format it into an Excel spreadsheet first. Direct CLI text parsing is an upcoming feature.</p>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                    <h3 className="text-md font-bold text-slate-800 mb-1">3. Mismatched Fabric Data</h3>
                    <p className="text-sm text-slate-600 mb-2"><strong>Symptom:</strong> Fabric B paths are showing up under Fabric A.</p>
                    <p className="text-sm text-slate-600"><strong>Fix:</strong> Check the sheet names in your Excel file. The parser relies on sheet names or specific column headers to differentiate between Fabric A and Fabric B data. Ensure they are explicitly separated.</p>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                    <h3 className="text-md font-bold text-slate-800 mb-1">4. Missing OS Classification</h3>
                    <p className="text-sm text-slate-600 mb-2"><strong>Symptom:</strong> The OS Type column displays "Unknown", failing the Compliance Check rules.</p>
                    <p className="text-sm text-slate-600"><strong>Fix:</strong> The OS auto-detection relies on standard naming conventions in your aliases (e.g., `AIX_SRV_1`, `ESX_HOST_A`). If your organization uses non-standard naming, the classifier will fall back to "Unknown".</p>
                </div>
            </div>
        </div>
    );
};

export default ValidationTroubleshooting;
