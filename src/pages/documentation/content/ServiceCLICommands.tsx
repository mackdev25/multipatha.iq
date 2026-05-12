import React from 'react';

const ServiceCLICommands: React.FC = () => {
    return (
        <div className="prose prose-slate max-w-none">
            <h1 className="text-3xl font-extrabold text-slate-900 mb-6">Service CLI Commands</h1>
            
            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                As a standard user, you interact with Mpath purely through the graphical web interface. However, for administrators deploying or developing the platform, specific CLI commands are available via Node.js.
            </p>

            <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4">NPM Scripts</h2>
            
            <div className="space-y-6 my-6">
                
                <div className="border border-slate-200 rounded-xl p-5 shadow-sm">
                    <div className="bg-slate-900 rounded p-3 text-emerald-400 font-mono text-sm mb-3">
                        npm run dev
                    </div>
                    <p className="text-sm text-slate-600">
                        Launches the Vite development server with Hot Module Replacement (HMR). Required for developing or testing the application locally.
                    </p>
                </div>

                <div className="border border-slate-200 rounded-xl p-5 shadow-sm">
                    <div className="bg-slate-900 rounded p-3 text-emerald-400 font-mono text-sm mb-3">
                        npm run build
                    </div>
                    <p className="text-sm text-slate-600">
                        Executes the TypeScript compiler (`tsc -b`) and invokes Vite to generate a highly optimized, minified production build into the <code>/dist</code> directory.
                    </p>
                </div>

                <div className="border border-slate-200 rounded-xl p-5 shadow-sm">
                    <div className="bg-slate-900 rounded p-3 text-emerald-400 font-mono text-sm mb-3">
                        npm run lint
                    </div>
                    <p className="text-sm text-slate-600">
                        Runs ESLint across the codebase to ensure code quality, catch unused variables, and enforce the defined styling rules before deployment.
                    </p>
                </div>

                <div className="border border-slate-200 rounded-xl p-5 shadow-sm">
                    <div className="bg-slate-900 rounded p-3 text-emerald-400 font-mono text-sm mb-3">
                        npm run preview
                    </div>
                    <p className="text-sm text-slate-600">
                        Boots a local static web server to preview the compiled contents of the <code>/dist</code> directory, simulating exactly how the application will run in production.
                    </p>
                </div>

            </div>
        </div>
    );
};

export default ServiceCLICommands;
