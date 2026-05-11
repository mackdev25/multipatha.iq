import React from 'react';

const glassCardClasses = "rounded-3xl border border-white/60 bg-white/40 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)]";

const About: React.FC = () => {
    return (
        <div className="flex h-full flex-col p-6 space-y-6 overflow-auto pb-12 max-w-4xl mx-auto">
            <section className={`${glassCardClasses} p-8 md:p-10`}>
                <h1 className="text-3xl font-bold text-slate-800 mb-10 tracking-tight">About MultipathIQ</h1>
                
                <div className="space-y-10 text-slate-600 leading-relaxed">
                    
                    {/* About */}
                    <div>
                        <h2 className="text-xl font-bold text-slate-800 mb-3">About</h2>
                        <p>
                            <strong>MultipathIQ v1.0</strong> is an advanced SAN Fabric Path Validation platform built to simplify, automate, and secure the validation of host connectivity and storage paths during SAN infrastructure changes, maintenance activities, and switch operating system upgrades.
                        </p>
                    </div>

                    {/* Why we need it */}
                    <div>
                        <h2 className="text-xl font-bold text-slate-800 mb-3">Why we need it</h2>
                        <p>
                            Designed specifically for enterprise storage environments, MultipathIQ helps storage administrators, SAN engineers, and infrastructure teams validate critical host-to-storage communication across Brocade SAN fabrics with speed, accuracy, and confidence. Traditional SAN validation processes are often manual, time-consuming, and prone to human error, especially in large-scale environments with complex zoning, multipathing, and redundant fabric architectures. MultipathIQ eliminates these challenges through automated validation workflows and intelligent analysis.
                        </p>
                    </div>

                    {/* Benefits */}
                    <div>
                        <h2 className="text-xl font-bold text-slate-800 mb-3">Benefits</h2>
                        <p className="mb-5">
                            The platform continuously analyzes SAN path information, validates fabric connectivity, identifies inconsistencies, and detects potential risks that could impact redundancy, failover, or application availability. By automating validation and compliance checks, MultipathIQ significantly reduces operational overhead while improving infrastructure reliability and upgrade readiness.
                        </p>
                        <div className="rounded-2xl border border-slate-200/60 bg-white/50 p-6 shadow-sm">
                            <p className="mb-4 font-semibold text-slate-800">MultipathIQ provides comprehensive visibility into:</p>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <li className="flex items-center gap-3">
                                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 flex-shrink-0 text-xs font-bold">✓</span>
                                    Host-to-storage path validation
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 flex-shrink-0 text-xs font-bold">✓</span>
                                    SAN fabric connectivity and topology
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 flex-shrink-0 text-xs font-bold">✓</span>
                                    Multipath redundancy verification
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 flex-shrink-0 text-xs font-bold">✓</span>
                                    Zoning and configuration consistency
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 flex-shrink-0 text-xs font-bold">✓</span>
                                    Path availability and failover readiness
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 flex-shrink-0 text-xs font-bold">✓</span>
                                    Infrastructure compliance and validation reporting
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* For whom this suitable */}
                    <div>
                        <h2 className="text-xl font-bold text-slate-800 mb-3">For whom this suitable</h2>
                        <p className="mb-4">
                            Built with a privacy-first and self-hosted architecture, MultipathIQ operates entirely within your environment, ensuring complete data sovereignty and zero dependency on external cloud services. Sensitive infrastructure data never leaves your network, making the platform suitable for highly regulated and security-conscious enterprise environments.
                        </p>
                        <p>
                            With intelligent validation workflows, detailed reporting, and simplified operational visibility, MultipathIQ enables organizations to perform SAN upgrades, migrations, and maintenance activities with greater confidence, reduced downtime risk, and improved operational efficiency.
                        </p>
                    </div>

                </div>
            </section>
        </div>
    );
};

export default About;
