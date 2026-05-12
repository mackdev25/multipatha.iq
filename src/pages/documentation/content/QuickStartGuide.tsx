import React from 'react';

const QuickStartGuide: React.FC = () => {
    return (
        <div className="prose prose-slate max-w-none">
            <h1 className="text-3xl font-extrabold text-slate-900 mb-6">Quick Start Guide</h1>
            
            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                Follow this simple workflow to perform your first end-to-end SAN fabric validation using Mpath.
            </p>

            <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4">1. Access the Dashboard</h2>
            <p className="text-slate-600 mb-4">
                Open Mpath in your modern browser. You will be greeted by the <strong>Validation Flow</strong> screen. Notice the "Secure" badge in the top right corner—this indicates the application is running completely locally in your sandbox.
            </p>

            <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4">2. Upload your Data</h2>
            <p className="text-slate-600 mb-4">
                Click the main upload area or drag-and-drop your Brocade configuration <code>.xlsx</code> file. 
            </p>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 my-4 text-sm text-slate-600 italic">
                * If you do not have a file yet, you can click "Download Sample Data" to download a mocked `.xlsx` file designed to demonstrate the platform's capabilities.
            </div>

            <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4">3. Select Validation Mode</h2>
            <p className="text-slate-600 mb-4">
                Before hitting "Run Validation", select your mode from the top right settings:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600 mb-4">
                <li><strong>Multipath Validation:</strong> The default mode. Checks if a host has at least 1 path on both Fabric A and Fabric B.</li>
                <li><strong>Compliance Check:</strong> Stricter OS-based rules (e.g., AIX requiring exactly 2 paths per fabric).</li>
            </ul>

            <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4">4. Review Results</h2>
            <p className="text-slate-600 mb-4">
                Click "Run Validation". In milliseconds, the <strong>Validation Results</strong> table will populate. Review the `Status` column. 
                Any row marked with a red <span className="text-red-500 font-bold">Critical</span> badge indicates a host missing paths on one or both fabrics.
            </p>

            <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4">5. Explore Topology</h2>
            <p className="text-slate-600 mb-4">
                Once validated, the sidebar unlocks. Navigate to <strong>SAN Topology</strong> or <strong>Dependency Map</strong> to visually explore the routing of any problematic hosts discovered in step 4.
            </p>
        </div>
    );
};

export default QuickStartGuide;
