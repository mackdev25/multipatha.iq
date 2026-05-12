import React from 'react';

const SupportedAITools: React.FC = () => {
    return (
        <div className="prose prose-slate max-w-none">
            <h1 className="text-3xl font-extrabold text-slate-900 mb-6">Supported AI Tools</h1>
            
            <div className="bg-indigo-100 text-indigo-800 px-4 py-2 rounded-lg text-sm font-bold inline-block mb-6 tracking-wide uppercase">
                Early Access Feature
            </div>

            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                The <strong>Mpath AI Insights Engine</strong> is an upcoming module designed to bring predictive analytics and automated anomaly detection to your SAN infrastructure.
            </p>

            <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4">Architecture & Privacy</h2>
            <p className="text-slate-600 mb-4">
                To maintain our strict Zero-Trust and Local-First architecture, the AI implementation will bypass traditional cloud-based LLM APIs (like OpenAI or Anthropic). Instead, Mpath will utilize <strong>Local Edge Inferencing</strong>.
            </p>

            <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4">Planned Capabilities</h2>
            <ul className="list-disc pl-6 space-y-4 text-slate-600">
                <li>
                    <strong>Predictive Bottleneck Analysis:</strong> By training the local model on your parsed configuration data, the engine will forecast potential path saturation based on alias clustering.
                </li>
                <li>
                    <strong>Automated Remediation Scripts:</strong> The AI will analyze a Critical node (e.g., a host missing a zone on Fabric B) and automatically generate the exact Brocade CLI commands needed to resolve the issue.
                </li>
                <li>
                    <strong>Configuration Drift Detection:</strong> The model will compare historical state files against current uploads to detect unauthorized or undocumented zoning modifications.
                </li>
            </ul>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 my-8">
                <h3 className="text-slate-800 font-bold mb-2">Current Status</h3>
                <p className="text-slate-600 text-sm">
                    As seen in the Observability Dashboard, the AI module is currently in the "Model Training" phase. The UI scaffolding is fully prepared to receive the WebAssembly (Wasm) compiled inferencing models in an upcoming release.
                </p>
            </div>
        </div>
    );
};

export default SupportedAITools;
