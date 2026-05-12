import React from 'react';

const InstallingMpath: React.FC = () => {
    return (
        <div className="prose prose-slate max-w-none">
            <h1 className="text-3xl font-extrabold text-slate-900 mb-6">Installing Mpath</h1>
            
            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                This guide covers the standard installation process for running Mpath locally on your workstation for private, zero-trust infrastructure validation.
            </p>

            <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4">Step 1: Clone the Repository</h2>
            <p className="text-slate-600 mb-4">
                Ensure you have Git installed, then pull the source code from your version control system into your desired working directory.
            </p>
            <div className="bg-slate-900 rounded p-4 text-emerald-400 font-mono text-sm mb-6">
                git clone https://github.com/your-org/Mpath.git<br/>
                cd Mpath
            </div>

            <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4">Step 2: Install Dependencies</h2>
            <p className="text-slate-600 mb-4">
                Mpath uses npm (Node Package Manager) to handle its dependencies like React, Tailwind, and Recharts. Run the following command at the root of the project:
            </p>
            <div className="bg-slate-900 rounded p-4 text-emerald-400 font-mono text-sm mb-6">
                npm install
            </div>

            <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4">Step 3: Start the Development Server</h2>
            <p className="text-slate-600 mb-4">
                Once dependencies are installed, you can launch the Vite-powered development server.
            </p>
            <div className="bg-slate-900 rounded p-4 text-emerald-400 font-mono text-sm mb-6">
                npm run dev
            </div>
            <p className="text-slate-600 mb-4">
                The terminal will output a local address (usually <code>http://localhost:5173</code>). Open this URL in your modern browser (Chrome, Firefox, Edge, Safari) to access the platform.
            </p>

            <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6 my-8">
                <h3 className="text-indigo-800 font-bold mb-2">Network Isolation</h3>
                <p className="text-indigo-700 text-sm">
                    Because this runs locally, you can safely disconnect from the internet or enterprise VPN after the dependencies are installed. Mpath requires NO external network connection to process and validate your SAN data.
                </p>
            </div>
        </div>
    );
};

export default InstallingMpath;
