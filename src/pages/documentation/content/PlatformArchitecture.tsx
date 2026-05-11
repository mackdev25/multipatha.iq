import React from 'react';

const PlatformArchitecture: React.FC = () => {
    return (
        <div className="prose prose-slate max-w-none">
            <h1 className="text-3xl font-extrabold text-slate-900 mb-6">Platform Architecture</h1>
            
            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                Understanding the architecture of MultipathIQ is crucial to appreciating its security model. The platform is designed entirely around a <strong>Local-First, Zero-Exfiltration</strong> paradigm.
            </p>

            <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4">The Zero-Trust Sandbox</h2>
            <p className="text-slate-600 mb-4">
                Unlike traditional monitoring tools that require deploying agents or establishing secure tunnels back to a cloud service, MultipathIQ operates 100% within the sandbox of the user's modern web browser.
            </p>

            <div className="bg-slate-800 text-slate-300 rounded-xl p-6 my-6 font-mono text-sm leading-relaxed overflow-x-auto">
                {`[User Browser] <--- (Loads static UI) ---> [MultipathIQ Server]`}<br/><br/>
                {`[Brocade SAN] ---> (Config Dump .xlsx) ---> [User Local Machine]`}<br/><br/>
                {`[User Local Machine] ---> (In-Browser Parse) ---> [MultipathIQ Dashboard]`}<br/><br/>
                <span className="text-emerald-400"># NO data ever traverses the network.</span>
            </div>

            <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4">Data Processing Pipeline</h2>
            <ol className="list-decimal pl-6 space-y-4 text-slate-600">
                <li>
                    <strong>Ingestion:</strong> The user selects a `.xlsx` file generated from their Brocade environment. 
                    The application uses the `xlsx` library to parse this binary stream directly in the browser's JavaScript V8 engine.
                </li>
                <li>
                    <strong>Normalization:</strong> The raw data arrays are normalized into structured TypeScript interfaces (e.g., `FabricData`, `ValidationResult`).
                    Aliases and WWNs are cross-referenced to establish logical mappings.
                </li>
                <li>
                    <strong>Validation Engine:</strong> The core logic evaluates the normalized data against the active Compliance Policies (e.g., checking `fabA_LoggedInYes` thresholds).
                </li>
                <li>
                    <strong>Visualization:</strong> The results are instantly rendered into the DOM using React, generating dynamic tables, Recharts-based telemetry, and Mermaid.js topology graphs.
                </li>
            </ol>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 my-8">
                <h3 className="text-amber-800 font-bold mb-2">Memory Volatility</h3>
                <p className="text-amber-700 text-sm">
                    Because there is no backend database, all parsed data resides strictly in the browser's active RAM. <strong>Refreshing the page, closing the tab, or navigating away will instantly and permanently destroy the data.</strong>
                </p>
            </div>
        </div>
    );
};

export default PlatformArchitecture;
