import React from 'react';

const SetupAIObservability: React.FC = () => {
    return (
        <div className="prose prose-slate max-w-none">
            <h1 className="text-3xl font-extrabold text-slate-900 mb-6">How to Setup AI Observability</h1>
            
            <div className="bg-indigo-100 text-indigo-800 px-4 py-2 rounded-lg text-sm font-bold inline-block mb-6 tracking-wide uppercase">
                Early Access Feature
            </div>

            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                When the Mpath AI Insights Engine officially launches, setup will be entirely seamless and require zero external API keys or cloud configurations.
            </p>

            <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4">Future Setup Workflow</h2>
            
            <ol className="list-decimal pl-6 space-y-4 text-slate-600">
                <li>
                    <strong>Update Application:</strong> Pull the latest release of Mpath containing the embedded Wasm (WebAssembly) inferencing engine.
                </li>
                <li>
                    <strong>Hardware Allocation:</strong> Ensure the client machine running the browser has hardware acceleration (WebGL or WebGPU) enabled. The local AI engine will utilize the client's GPU to process the zoning algorithms.
                </li>
                <li>
                    <strong>Enable AI Insights:</strong> Navigate to the <strong>Settings</strong> page and toggle "Enable Local AI Processing". 
                </li>
                <li>
                    <strong>Initialize:</strong> Upon uploading your Brocade `.xlsx` validation file, the Observability Dashboard will shift from "Model Training in Progress" to "Active Analysis".
                </li>
            </ol>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 my-8">
                <h3 className="text-amber-800 font-bold mb-2">Security Note</h3>
                <p className="text-amber-700 text-sm">
                    Because the model weights and inferencing engine will be delivered alongside the static frontend bundle, <strong>your infrastructure data will still never leave your browser</strong>. The AI setup requires no firewall exceptions or egress traffic.
                </p>
            </div>
        </div>
    );
};

export default SetupAIObservability;
