import React from 'react';

const TechnologyStack: React.FC = () => {
    return (
        <div className="prose prose-slate max-w-none">
            <h1 className="text-3xl font-extrabold text-slate-900 mb-6">Technology Stack</h1>
            
            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                MultipathIQ is built utilizing modern, high-performance web technologies designed to parse large datasets quickly without compromising on aesthetic quality or user experience.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                <div className="border border-slate-200 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-500 flex items-center justify-center font-bold">R</div>
                        <h3 className="text-lg font-bold text-slate-800 m-0">React 18</h3>
                    </div>
                    <p className="text-sm text-slate-600">
                        The foundational UI library. MultipathIQ heavily leverages functional components, Hooks (<code>useState</code>, <code>useMemo</code>), and a Virtual DOM to ensure the interface remains responsive even when rendering tables with thousands of SAN paths.
                    </p>
                </div>

                <div className="border border-slate-200 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 rounded-lg bg-yellow-50 text-yellow-500 flex items-center justify-center font-bold">V</div>
                        <h3 className="text-lg font-bold text-slate-800 m-0">Vite</h3>
                    </div>
                    <p className="text-sm text-slate-600">
                        The lightning-fast build tool and development server. Vite ensures that our Hot Module Replacement (HMR) remains instantaneous and our production bundles are highly optimized and minified.
                    </p>
                </div>

                <div className="border border-slate-200 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-500 flex items-center justify-center font-bold">TW</div>
                        <h3 className="text-lg font-bold text-slate-800 m-0">Tailwind CSS</h3>
                    </div>
                    <p className="text-sm text-slate-600">
                        The utility-first CSS framework responsible for MultipathIQ's premium, enterprise-grade aesthetic. It enables our complex glassmorphism effects, dynamic gradients, and precise responsive layouts.
                    </p>
                </div>

                <div className="border border-slate-200 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-500 flex items-center justify-center font-bold">TS</div>
                        <h3 className="text-lg font-bold text-slate-800 m-0">TypeScript</h3>
                    </div>
                    <p className="text-sm text-slate-600">
                        Providing strict type-safety across the application. By defining exact interfaces for <code>ValidationResult</code> and <code>FabricData</code>, we eliminate runtime bugs during complex config parsing.
                    </p>
                </div>
            </div>

            <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4">Key Integrations</h2>
            <ul className="list-disc pl-6 space-y-2 text-slate-600">
                <li><strong>Recharts:</strong> Drives the dynamic, animated telemetry graphs found in the Observability dashboard.</li>
                <li><strong>Mermaid.js:</strong> Programmatically generates complex, scalable vector SAN Topology flowcharts.</li>
                <li><strong>XLSX (SheetJS):</strong> The robust data parser allowing the browser to read binary Excel files directly from memory.</li>
                <li><strong>React Icons:</strong> Provides the crisp, scalable vector iconography used throughout the sidebar and tools.</li>
            </ul>
        </div>
    );
};

export default TechnologyStack;
