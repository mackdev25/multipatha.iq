import React from 'react';

const ConnectionMatrix: React.FC = () => {
    return (
        <div className="prose prose-slate max-w-none">
            <h1 className="text-3xl font-extrabold text-slate-900 mb-6">Connection Matrix</h1>
            
            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                While the Validation grid provides a host-centric view, the Connection Matrix provides a high-density, mathematical representation of your entire fabric state.
            </p>

            <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4">How it Works</h2>
            <p className="text-slate-600 mb-4">
                The matrix plots Hosts/Initiators on the Y-Axis and Targets/Storage Arrays on the X-Axis. 
                The intersections (the cells) indicate the state of connectivity between those two endpoints.
            </p>

            <div className="grid grid-cols-2 gap-4 my-6">
                <div className="border border-slate-200 rounded-xl p-4 flex items-center gap-3 bg-emerald-50/50">
                    <div className="w-4 h-4 rounded bg-emerald-500 flex-shrink-0" />
                    <span className="text-sm font-semibold text-slate-800">Active (Logged In)</span>
                </div>
                <div className="border border-slate-200 rounded-xl p-4 flex items-center gap-3 bg-red-50/50">
                    <div className="w-4 h-4 rounded bg-red-500 flex-shrink-0" />
                    <span className="text-sm font-semibold text-slate-800">Inactive (Offline)</span>
                </div>
                <div className="border border-slate-200 rounded-xl p-4 flex items-center gap-3 bg-slate-50">
                    <div className="w-4 h-4 rounded border border-slate-300 flex-shrink-0" />
                    <span className="text-sm font-semibold text-slate-800">No Zone Present</span>
                </div>
                <div className="border border-slate-200 rounded-xl p-4 flex items-center gap-3 bg-amber-50/50">
                    <div className="w-4 h-4 rounded bg-amber-500 flex-shrink-0" />
                    <span className="text-sm font-semibold text-slate-800">Missing Redundancy</span>
                </div>
            </div>

            <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4">Primary Use Cases</h2>
            <ul className="list-disc pl-6 space-y-2 text-slate-600 mb-6">
                <li><strong>Storage Migrations:</strong> Instantly verify if all hosts have been zoned to the new storage array before decommissioning the old one.</li>
                <li><strong>Orphaned Zones:</strong> Identify intersections that have zoning configured but have been offline for extended periods.</li>
                <li><strong>Load Balancing:</strong> Visually assess if a specific target port is over-subscribed compared to others.</li>
            </ul>
        </div>
    );
};

export default ConnectionMatrix;
