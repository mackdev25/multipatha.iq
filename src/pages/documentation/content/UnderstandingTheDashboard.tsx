import React from 'react';

const UnderstandingTheDashboard: React.FC = () => {
    return (
        <div className="prose prose-slate max-w-none">
            <h1 className="text-3xl font-extrabold text-slate-900 mb-6">Understanding the Dashboard</h1>
            
            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                The Observability Dashboard is divided into three critical zones designed to give you an immediate, executive overview of your SAN health, followed by actionable remediation targets.
            </p>

            <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4">1. The Macro Overview</h2>
            <p className="text-slate-600 mb-4">
                At the top of the dashboard, you will find the <strong>Overall Health Score</strong> and the four primary micro-stats. 
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600 mb-6">
                <li>A score of <strong>80-100</strong> indicates Optimal Performance.</li>
                <li>A score of <strong>50-79</strong> indicates the fabric Needs Attention.</li>
                <li>A score <strong>below 50</strong> indicates a Critical State.</li>
            </ul>

            <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4">2. Visual Telemetry (Charts)</h2>
            <p className="text-slate-600 mb-4">
                The middle section provides comparative visualizations:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600 mb-6">
                <li><strong>Health Distribution (Donut Chart):</strong> Shows the exact percentage of your hosts falling into Perfect, Good, Warning, or Critical states.</li>
                <li><strong>Active Paths per Fabric (Bar Chart):</strong> Compares the total volume of active, logged-in paths on Fabric A vs Fabric B. A large disparity here immediately indicates a zoning imbalance or a switch failure.</li>
            </ul>

            <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4">3. Actionable Remediation Grids</h2>
            <p className="text-slate-600 mb-4">
                If the engine detects Warning or Critical nodes, the bottom of the dashboard will populate with isolated lists containing <em>only</em> the problematic entities. 
            </p>
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm my-6 border-l-4 border-l-red-500">
                <h3 className="text-md font-bold text-slate-800 mb-2">Critical Entities List</h3>
                <p className="text-sm text-slate-600">
                    Displays hosts with 0 active paths. The grid explicitly shows the exact path count for FAB A and FAB B (e.g., `FAB A: 0`, `FAB B: 0`) so engineers can immediately target the offline ports.
                </p>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm my-6 border-l-4 border-l-amber-500">
                <h3 className="text-md font-bold text-slate-800 mb-2">Warning Entities List</h3>
                <p className="text-sm text-slate-600">
                    Displays hosts missing redundancy. The grid highlights the broken path in red and the active path in green (e.g., `FAB A: 2`, `FAB B: 0`), allowing you to isolate troubleshooting to a specific fabric.
                </p>
            </div>
        </div>
    );
};

export default UnderstandingTheDashboard;
