import React from 'react';

const glassCardClasses = "rounded-3xl border border-white/60 bg-white/40 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)]";

const Changelogs: React.FC = () => {
    return (
        <div className="flex h-full flex-col p-6 space-y-6 overflow-auto pb-12 max-w-4xl mx-auto">
            <section className={`${glassCardClasses} p-8 md:p-10`}>
                <h1 className="text-3xl font-bold text-slate-800 mb-8 tracking-tight">Changelogs</h1>
                
                <div className="relative border-l border-indigo-100 ml-3 space-y-10 pb-4">
                    
                    {/* v10.05.2026D */}
                    <div className="relative pl-8">
                        <span className="absolute -left-[7px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-indigo-500 bg-white shadow-[0_0_0_4px_rgba(99,102,241,0.15)]" />
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <h3 className="text-lg font-extrabold text-slate-800">v10.05.2026D</h3>
                            <span className="bg-indigo-100 text-indigo-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Latest</span>
                        </div>
                        <span className="text-xs font-semibold text-indigo-500 uppercase tracking-wider mb-2 block">Enterprise Analytics & Redesign</span>
                        <ul className="mt-2 list-disc pl-5 text-sm text-slate-600 space-y-1.5">
                            <li>Built state-of-the-art Observability Dashboard for real-time SAN fabric analysis.</li>
                            <li>Integrated dynamic charts using <code className="text-xs bg-slate-100 px-1 rounded font-mono">recharts</code> (Donut chart for health distribution and Bar chart for comparative path counts).</li>
                            <li>Introduced AI Insight Engine placeholder with automated analytical telemetry readying for future models.</li>
                            <li>Fixed calculation algorithms for path evaluations on multi-fabric configurations.</li>
                            <li>Refactored Terms of Service and Privacy Policy pages to enterprise standards.</li>
                        </ul>
                    </div>

                    {/* v09.05.2026D */}
                    <div className="relative pl-8">
                        <span className="absolute -left-[7px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-slate-300 bg-white" />
                        <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-lg font-bold text-slate-800">v09.05.2026D</h3>
                        </div>
                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">Branding & Visual Refinement</span>
                        <ul className="mt-2 list-disc pl-5 text-sm text-slate-600 space-y-1.5">
                            <li>Completed application rebranding from ZoneGuard to <strong className="text-slate-800 font-semibold">Mpath</strong>.</li>
                            <li>Integrated custom brand logo (`/logo.png`) into header and sidebar navigation elements.</li>
                            <li>Optimized global typography by integrating the premium <strong className="text-slate-800 font-semibold">Outfit</strong> Google Font.</li>
                            <li>Added social and feedback quicklinks (Discord, X, YouTube, Product Hunt) in the navigation sidebar.</li>
                        </ul>
                    </div>

                    {/* v28.04.2026D */}
                    <div className="relative pl-8">
                        <span className="absolute -left-[7px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-slate-300 bg-white" />
                        <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-lg font-bold text-slate-800">v28.04.2026D</h3>
                        </div>
                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">Dependency & Security Optimizations</span>
                        <ul className="mt-2 list-disc pl-5 text-sm text-slate-600 space-y-1.5">
                            <li>Unified Storage Mapping and Server Mapping into a singular, cohesive <strong className="text-slate-800 font-semibold">Dependency Map</strong>.</li>
                            <li>Added local browser sandbox notification for the client-side data sovereignty system.</li>
                            <li>Added disabled-state toast notifications to alert users before mock/unloaded datasets are viewed.</li>
                            <li>Compacted results widgets and stats panels to preserve screen real estate.</li>
                        </ul>
                    </div>

                    {/* v25.04.2026D */}
                    <div className="relative pl-8">
                        <span className="absolute -left-[7px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-slate-300 bg-white" />
                        <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-lg font-bold text-slate-800">v25.04.2026D</h3>
                        </div>
                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">Settings & Compliance Policies</span>
                        <ul className="mt-2 list-disc pl-5 text-sm text-slate-600 space-y-1.5">
                            <li>Introduced persistent dynamic settings schema (Multipath Validation vs Compliance Checks).</li>
                            <li>Configured OS-specific path policies (AIX multi-tier requirements, ESXi/RHEL standard checks).</li>
                            <li>Implemented custom rule builder to support arbitrary fabric criteria.</li>
                        </ul>
                    </div>

                    {/* v20.04.2026D */}
                    <div className="relative pl-8">
                        <span className="absolute -left-[7px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-slate-300 bg-white" />
                        <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-lg font-bold text-slate-800">v20.04.2026D</h3>
                        </div>
                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">Documentation Expansion</span>
                        <ul className="mt-2 list-disc pl-5 text-sm text-slate-600 space-y-1.5">
                            <li>Added rich comprehensive About and Suitability modules.</li>
                            <li>Added initial core Terms and Privacy policy legal assets.</li>
                            <li>Included complete user workflow and tutorial references.</li>
                        </ul>
                    </div>

                    {/* v18.04.2026D */}
                    <div className="relative pl-8">
                        <span className="absolute -left-[7px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-slate-300 bg-white" />
                        <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-lg font-bold text-slate-800">v18.04.2026D</h3>
                        </div>
                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">Topology & Interactive Features</span>
                        <ul className="mt-2 list-disc pl-5 text-sm text-slate-600 space-y-1.5">
                            <li>Added Mermaid.js-driven dynamic SAN Topology diagrams.</li>
                            <li>Implemented interactive Connection Matrix featuring color-coded endpoint highlights.</li>
                            <li>Added quick-filtering search features in raw host validation reports.</li>
                        </ul>
                    </div>

                    {/* v15.04.2026D */}
                    <div className="relative pl-8">
                        <span className="absolute -left-[7px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-slate-300 bg-white" />
                        <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-lg font-bold text-slate-800">v15.04.2026D</h3>
                        </div>
                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">Initial Project Release</span>
                        <ul className="mt-2 list-disc pl-5 text-sm text-slate-600 space-y-1.5">
                            <li>Launched core in-browser spreadsheet parser for Brocade switch configuration dumps.</li>
                            <li>Engineered initial path matching validation engine for SAN endpoints.</li>
                            <li>Integrated Excel-compatible sheet exports.</li>
                            <li>Established client-only processing pipeline preserving complete data sovereignty.</li>
                        </ul>
                    </div>

                </div>
            </section>
        </div>
    );
};

export default Changelogs;
