import React from 'react';

const InstallationTroubleshooting: React.FC = () => {
    return (
        <div className="prose prose-slate max-w-none">
            <h1 className="text-3xl font-extrabold text-slate-900 mb-6">Installation Troubleshooting</h1>
            
            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                If you encounter issues while setting up Mpath, check the common error scenarios below.
            </p>

            <div className="space-y-6 my-8">
                
                <div className="border border-slate-200 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-slate-800 mb-2 border-b border-slate-100 pb-2">Error: EADDRINUSE</h3>
                    <div className="bg-slate-900 rounded p-3 text-red-400 font-mono text-xs mb-3">
                        Error: listen EADDRINUSE: address already in use :::5173
                    </div>
                    <p className="text-sm text-slate-600 mb-2 font-semibold">Cause:</p>
                    <p className="text-sm text-slate-600 mb-3">Another application (or another instance of Vite) is already using port 5173.</p>
                    <p className="text-sm text-slate-600 mb-2 font-semibold">Resolution:</p>
                    <p className="text-sm text-slate-600">Vite will usually attempt to find the next available port automatically (e.g., 5174). If it doesn't, kill the process using the port, or run <code>npm run dev -- --port 3000</code> to specify a new port.</p>
                </div>

                <div className="border border-slate-200 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-slate-800 mb-2 border-b border-slate-100 pb-2">Error: Missing Dependencies / Module Not Found</h3>
                    <div className="bg-slate-900 rounded p-3 text-red-400 font-mono text-xs mb-3">
                        Uncaught Error: Module build failed: Error: Cannot find module 'react-icons'
                    </div>
                    <p className="text-sm text-slate-600 mb-2 font-semibold">Cause:</p>
                    <p className="text-sm text-slate-600 mb-3">The <code>node_modules</code> folder is incomplete or corrupt, or you pulled new code without running install.</p>
                    <p className="text-sm text-slate-600 mb-2 font-semibold">Resolution:</p>
                    <p className="text-sm text-slate-600">Delete your `node_modules` folder and `package-lock.json`, then run <code>npm cache clean --force</code> followed by <code>npm install</code>.</p>
                </div>

                <div className="border border-slate-200 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-slate-800 mb-2 border-b border-slate-100 pb-2">Error: Out of Memory (During Build)</h3>
                    <div className="bg-slate-900 rounded p-3 text-red-400 font-mono text-xs mb-3">
                        FATAL ERROR: Ineffective mark-compacts near heap limit Allocation failed - JavaScript heap out of memory
                    </div>
                    <p className="text-sm text-slate-600 mb-2 font-semibold">Cause:</p>
                    <p className="text-sm text-slate-600 mb-3">Vite/Rollup ran out of memory while attempting to minify and bundle the production build (`npm run build`).</p>
                    <p className="text-sm text-slate-600 mb-2 font-semibold">Resolution:</p>
                    <p className="text-sm text-slate-600">Increase the Node memory limit by running: <code>export NODE_OPTIONS="--max-old-space-size=4096"</code> before running your build command.</p>
                </div>

            </div>
        </div>
    );
};

export default InstallationTroubleshooting;
