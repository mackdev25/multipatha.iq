import React from 'react';

const WhatDataIsNeeded: React.FC = () => {
    return (
        <div className="prose prose-slate max-w-none">
            <h1 className="text-3xl font-extrabold text-slate-900 mb-6">What Data is needed</h1>
            
            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                For Mpath's parser to correctly evaluate paths, it requires specific outputs from the Brocade Fabric OS.
            </p>

            <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4">Required Commands</h2>
            
            <div className="space-y-6 my-6">
                <div className="border-l-4 border-indigo-500 pl-4">
                    <h3 className="text-lg font-bold text-slate-800 font-mono">switchshow</h3>
                    <p className="text-sm text-slate-600 mt-1">
                        Provides port state, port type (F-Port, E-Port), and logged-in WWNs. This is critical for determining if a zoned WWN is actually physically "LoggedInYes".
                    </p>
                </div>

                <div className="border-l-4 border-indigo-500 pl-4">
                    <h3 className="text-lg font-bold text-slate-800 font-mono">zoneshow</h3>
                    <p className="text-sm text-slate-600 mt-1">
                        Provides the active zone configuration. This is used to map host aliases to storage aliases within the fabric.
                    </p>
                </div>

                <div className="border-l-4 border-indigo-500 pl-4">
                    <h3 className="text-lg font-bold text-slate-800 font-mono">alishow</h3>
                    <p className="text-sm text-slate-600 mt-1">
                        Provides the mapping between human-readable aliases (e.g., `SRV_DB_01_HBA0`) and their corresponding hexadecimal WWNs.
                    </p>
                </div>
                
                <div className="border-l-4 border-slate-300 pl-4">
                    <h3 className="text-lg font-bold text-slate-800 font-mono text-slate-500">cfgshow <span className="text-xs uppercase bg-slate-100 px-2 py-0.5 rounded ml-2">Optional</span></h3>
                    <p className="text-sm text-slate-600 mt-1">
                        Provides the overarching configuration. While useful for context, Mpath primarily relies on the active zone database.
                    </p>
                </div>
            </div>

            <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4">Expected Excel Structure</h2>
            <p className="text-slate-600 mb-4">
                The uploaded `.xlsx` file should ideally have sheets corresponding to the fabrics (e.g., `Fabric_A`, `Fabric_B`) and columns matching: <strong>Host Alias</strong>, <strong>Host WWN</strong>, <strong>Storage Alias</strong>, and <strong>Login Status</strong>. If using a custom format, ensure your columns match the internal mappings of the parser.
            </p>
        </div>
    );
};

export default WhatDataIsNeeded;
