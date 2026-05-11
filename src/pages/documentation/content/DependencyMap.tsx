import React from 'react';

const DependencyMap: React.FC = () => {
    return (
        <div className="prose prose-slate max-w-none">
            <h1 className="text-3xl font-extrabold text-slate-900 mb-6">Dependency Map</h1>
            
            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                The Dependency Map is a unified visualization module that consolidates the legacy Storage Mapping and Server Mapping views into a single, cohesive interface.
            </p>

            <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4">The Impact Analysis Tool</h2>
            <p className="text-slate-600 mb-4">
                The primary purpose of the Dependency Map is to perform rapid <strong>Impact Analysis</strong> before conducting maintenance on a SAN switch or storage array port.
            </p>

            <ul className="list-disc pl-6 space-y-4 text-slate-600 mb-6">
                <li>
                    <strong>Switch Decommission / Upgrade:</strong> By selecting a specific switch or fabric, the Dependency Map will draw direct lines to every single host that will be affected if that node goes offline.
                </li>
                <li>
                    <strong>Storage Port Maintenance:</strong> By selecting a specific target WWN or storage alias, the map instantly displays the blast radius of hosts relying on that port.
                </li>
            </ul>

            <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6 my-8">
                <h3 className="text-indigo-800 font-bold mb-2">Current Development Status</h3>
                <p className="text-indigo-700 text-sm">
                    The full interactive functionality of the Dependency Map is currently in active development. In the current release, it displays an "Under Development" placeholder while the core relationship rendering engine is optimized for high-density environments.
                </p>
            </div>
        </div>
    );
};

export default DependencyMap;
