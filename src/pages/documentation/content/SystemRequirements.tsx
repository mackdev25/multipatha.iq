import React from 'react';

const SystemRequirements: React.FC = () => {
    return (
        <div className="prose prose-slate max-w-none">
            <h1 className="text-3xl font-extrabold text-slate-900 mb-6">System Requirements</h1>
            
            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                Because MultipathIQ processes data entirely client-side, the performance of the application is directly tied to the specifications of the machine running the browser, rather than a centralized server.
            </p>

            <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4">Hardware Requirements (Client)</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm text-slate-600 border-collapse border border-slate-200">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="px-4 py-3 font-semibold text-slate-800">Component</th>
                            <th className="px-4 py-3 font-semibold text-slate-800">Minimum</th>
                            <th className="px-4 py-3 font-semibold text-slate-800">Recommended (Large Fabrics)</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                        <tr>
                            <td className="px-4 py-3 font-medium">Processor (CPU)</td>
                            <td className="px-4 py-3">Modern Dual-Core (Intel i3 / Apple M1)</td>
                            <td className="px-4 py-3">Modern Quad-Core or better (Intel i5/i7 / Apple M2+)</td>
                        </tr>
                        <tr>
                            <td className="px-4 py-3 font-medium">Memory (RAM)</td>
                            <td className="px-4 py-3">4 GB RAM</td>
                            <td className="px-4 py-3">8 GB RAM or higher (Crucial for parsing massive .xlsx dumps)</td>
                        </tr>
                        <tr>
                            <td className="px-4 py-3 font-medium">Storage</td>
                            <td className="px-4 py-3">&lt; 100 MB free space</td>
                            <td className="px-4 py-3">SSD highly recommended for browser caching</td>
                        </tr>
                        <tr>
                            <td className="px-4 py-3 font-medium">Network</td>
                            <td className="px-4 py-3">Offline Capable</td>
                            <td className="px-4 py-3">Internet connection only required to download initial assets</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4">Supported Browsers</h2>
            <p className="text-slate-600 mb-4">
                MultipathIQ utilizes modern ES6 JavaScript features, Web Workers (under the hood via React), and advanced CSS properties like glassmorphism (backdrop-filter). 
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600">
                <li><strong>Google Chrome:</strong> Version 90+ (Recommended for best V8 parsing speeds)</li>
                <li><strong>Mozilla Firefox:</strong> Version 88+</li>
                <li><strong>Microsoft Edge:</strong> Version 90+ (Chromium-based)</li>
                <li><strong>Apple Safari:</strong> Version 15+</li>
            </ul>

            <div className="bg-red-50 border border-red-100 rounded-xl p-6 my-8">
                <h3 className="text-red-800 font-bold mb-2">Internet Explorer Warning</h3>
                <p className="text-red-700 text-sm">
                    Internet Explorer is entirely unsupported. The legacy rendering engine cannot process modern React components, Recharts visualizations, or Mermaid.js topology generation.
                </p>
            </div>
        </div>
    );
};

export default SystemRequirements;
