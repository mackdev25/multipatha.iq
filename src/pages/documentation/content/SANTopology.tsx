import React from 'react';

const SANTopology: React.FC = () => {
    return (
        <div className="prose prose-slate max-w-none">
            <h1 className="text-3xl font-extrabold text-slate-900 mb-6">SAN Topology</h1>
            
            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                The SAN Topology module transforms abstract arrays of WWNs and aliases into an interactive, visual flowchart of your infrastructure architecture.
            </p>

            <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4">Powered by Mermaid.js</h2>
            <p className="text-slate-600 mb-4">
                MultipathIQ utilizes the `mermaid` parsing library to dynamically generate SVG-based topology graphs entirely in the browser. 
            </p>

            <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4">Interpreting the Graph</h2>
            <ul className="list-disc pl-6 space-y-3 text-slate-600 mb-6">
                <li><strong>Hosts (Left):</strong> Represented as standard nodes. These are your servers (ESXi, AIX, Windows).</li>
                <li><strong>Fabrics (Center):</strong> Represented as logical groupings or switch nodes (Fabric A vs Fabric B).</li>
                <li><strong>Storage (Right):</strong> Represented as cylindrical database nodes. These are your target arrays.</li>
                <li><strong>Links:</strong> Solid lines represent an active zone and physical login (`LoggedInYes`). Dashed lines may represent configured zones that are currently offline.</li>
            </ul>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 my-8">
                <h3 className="text-slate-800 font-bold mb-2">Performance Considerations</h3>
                <p className="text-slate-600 text-sm">
                    Generating massive SVGs with thousands of nodes can cause browser rendering lag. MultipathIQ implements logic to restrict or group extreme topologies, but it is highly recommended to filter your data via the core Validation grid before switching to the Topology view for troubleshooting specific hosts.
                </p>
            </div>
        </div>
    );
};

export default SANTopology;
