import React from 'react';

const ObservabilityHowItWorks: React.FC = () => {
    return (
        <div className="prose prose-slate max-w-none">
            <h1 className="text-3xl font-extrabold text-slate-900 mb-6">How Observability Works</h1>
            
            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                The Observability module in Mpath is designed to shift SAN management from a reactive state to a proactive state. It ingests the raw validation matrix and computes a real-time health telemetry index for your infrastructure.
            </p>

            <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4">The Scoring Engine</h2>
            <p className="text-slate-600 mb-4">
                When you run a validation, the engine evaluates every single host path across Fabric A and Fabric B simultaneously. It calculates an <strong>Overall Health Score (0-100)</strong> based on a weighted algorithm:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600 mb-6">
                <li><strong className="text-emerald-600">Perfect Status (100% weight):</strong> Hosts with 2 or more active paths on <em>both</em> fabrics.</li>
                <li><strong className="text-indigo-600">Good Status (80% weight):</strong> Hosts with at least 1 active path on <em>both</em> fabrics.</li>
                <li><strong className="text-amber-600">Warning Level (40% weight):</strong> Hosts active on only one fabric (missing redundancy).</li>
                <li><strong className="text-red-600">Critical Status (0% weight):</strong> Hosts with 0 active paths across both fabrics.</li>
            </ul>

            <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4">Client-Side Processing</h2>
            <p className="text-slate-600 mb-4">
                Unlike cloud-based monitoring solutions, the Observability engine computes these metrics entirely within the V8 JavaScript engine of your browser using the `useMemo` React hook. This ensures that even when analyzing thousands of host paths, the dashboard renders instantly without transmitting your sensitive telemetry to a remote server.
            </p>
            
            <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6 my-8">
                <h3 className="text-indigo-800 font-bold mb-2">Visualizing the Data</h3>
                <p className="text-indigo-700 text-sm">
                    Mpath utilizes the `recharts` library to render the telemetry. This provides interactive, SVG-based Donut and Bar charts that immediately highlight disparities in load or configuration errors between your redundant fabrics.
                </p>
            </div>
        </div>
    );
};

export default ObservabilityHowItWorks;
