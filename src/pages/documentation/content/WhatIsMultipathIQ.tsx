import React from 'react';

const WhatIsMultipathIQ: React.FC = () => {
    return (
        <div className="prose prose-slate max-w-none">
            <h1 className="text-3xl font-extrabold text-slate-900 mb-6">What is MultipathIQ?</h1>
            
            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                <strong>MultipathIQ</strong> is a cutting-edge, browser-based SAN fabric path validation and observability platform. 
                Built specifically for enterprise storage environments, it automates the tedious and error-prone process of parsing Brocade configuration files to ensure host-to-storage paths are fully resilient.
            </p>

            <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4">Core Purpose</h2>
            <p className="text-slate-600 mb-4">
                Traditional SAN validation requires engineers to manually run <code>switchshow</code>, <code>cfgshow</code>, and <code>zoneshow</code> commands, cross-referencing WWNs and aliases across hundreds of ports. MultipathIQ simplifies this by ingesting raw configuration dumps (in Excel format) and instantly mapping the entire topology.
            </p>

            <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6 my-8">
                <h3 className="text-indigo-800 font-bold mb-2">Zero-Trust & Data Sovereignty</h3>
                <p className="text-indigo-700 text-sm">
                    MultipathIQ operates under a strict Zero-Trust philosophy. The application runs <strong>entirely locally</strong> within your browser's memory. No configuration data, aliases, or WWNs are ever uploaded to an external server, ensuring complete compliance with stringent enterprise security policies.
                </p>
            </div>

            <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4">Key Capabilities</h2>
            <ul className="list-disc pl-6 space-y-2 text-slate-600">
                <li><strong>Automated Path Validation:</strong> Instantly verify if a host is zoned correctly across multiple fabrics.</li>
                <li><strong>Compliance Checking:</strong> Enforce strict multipathing rules based on OS types (e.g., AIX requires 4 paths, ESXi requires 2).</li>
                <li><strong>Visual Topology:</strong> Render complex SAN relationships into interactive Dependency Maps.</li>
                <li><strong>Observability Dashboard:</strong> Generate enterprise-grade health scores and identify critical single-points-of-failure before they cause an outage.</li>
            </ul>
        </div>
    );
};

export default WhatIsMultipathIQ;
