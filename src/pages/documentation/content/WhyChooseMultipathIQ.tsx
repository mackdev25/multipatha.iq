import React from 'react';

const WhyChooseMultipathIQ: React.FC = () => {
    return (
        <div className="prose prose-slate max-w-none">
            <h1 className="text-3xl font-extrabold text-slate-900 mb-6">Why choose MultipathIQ?</h1>
            
            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                In complex enterprise data centers, a single missing zone can result in a catastrophic storage outage during a fabric upgrade. MultipathIQ provides the speed, accuracy, and security necessary to prevent these occurrences.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                    <h3 className="text-lg font-bold text-slate-800 mb-2">Eliminate Human Error</h3>
                    <p className="text-sm text-slate-600">
                        Manually tracing WWNs across multiple switches is inherently flawed. MultipathIQ programmatically cross-references zones, aliases, and active logins with 100% precision.
                    </p>
                </div>
                
                <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                    <h3 className="text-lg font-bold text-slate-800 mb-2">Instant Validation</h3>
                    <p className="text-sm text-slate-600">
                        What traditionally takes a SAN engineer hours of manual verification can now be accomplished in milliseconds, drastically reducing the window for change management activities.
                    </p>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                    <h3 className="text-lg font-bold text-slate-800 mb-2">Complete Data Privacy</h3>
                    <p className="text-sm text-slate-600">
                        Because MultipathIQ processes data entirely client-side, infrastructure teams do not need to seek risky infosec approvals to upload sensitive network configurations to third-party SaaS platforms.
                    </p>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                    <h3 className="text-lg font-bold text-slate-800 mb-2">Proactive Observability</h3>
                    <p className="text-sm text-slate-600">
                        Stop acting reactively. The built-in Observability Dashboard highlights critical non-redundant paths and generates actionable health scores for immediate remediation.
                    </p>
                </div>
            </div>

            <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4">Designed for the Enterprise</h2>
            <p className="text-slate-600 mb-4">
                MultipathIQ isn't just a script; it's a fully realized platform built to integrate seamlessly into an enterprise SAN engineer's daily workflow. From comprehensive export options to dynamic dependency maps, it acts as a critical force multiplier for your infrastructure teams.
            </p>
        </div>
    );
};

export default WhyChooseMultipathIQ;
