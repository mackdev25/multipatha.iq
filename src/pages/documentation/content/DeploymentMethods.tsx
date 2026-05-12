import React from 'react';

const DeploymentMethods: React.FC = () => {
    return (
        <div className="prose prose-slate max-w-none">
            <h1 className="text-3xl font-extrabold text-slate-900 mb-6">Deployment Methods</h1>
            
            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                As a fully client-side application built on React and Vite, Mpath is incredibly versatile. It compiles down to pure HTML, CSS, and JavaScript, meaning it can be deployed almost anywhere without requiring a backend database or application server.
            </p>

            <div className="space-y-8 my-8">
                
                {/* Local Development */}
                <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold">1</div>
                        <h3 className="text-lg font-bold text-slate-800 m-0">Local Node.js Runtime</h3>
                    </div>
                    <p className="text-sm text-slate-600 mb-4">
                        The easiest way to run the application for development or private offline usage. Requires Node.js installed on the host machine.
                    </p>
                    <div className="bg-slate-900 rounded p-3 text-emerald-400 font-mono text-sm">
                        $ npm install<br/>
                        $ npm run dev
                    </div>
                </div>

                {/* Static Web Hosting */}
                <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold">2</div>
                        <h3 className="text-lg font-bold text-slate-800 m-0">Static Web Hosting (Vercel / Netlify / S3)</h3>
                    </div>
                    <p className="text-sm text-slate-600 mb-4">
                        Because there is no backend API, you can build the production bundle and host it on any static web server or CDN.
                    </p>
                    <div className="bg-slate-900 rounded p-3 text-emerald-400 font-mono text-sm">
                        $ npm run build<br/>
                        <span className="text-slate-500"># Output generated in the /dist directory. Upload this to your web server.</span>
                    </div>
                </div>

                {/* Containerized */}
                <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold">3</div>
                        <h3 className="text-lg font-bold text-slate-800 m-0">Docker Container (Nginx)</h3>
                    </div>
                    <p className="text-sm text-slate-600 mb-4">
                        For enterprise environments, wrapping the static build in a lightweight Alpine Nginx container is the standard deployment strategy.
                    </p>
                    <div className="bg-slate-900 rounded p-3 text-emerald-400 font-mono text-xs overflow-x-auto whitespace-pre">
{`FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]`}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default DeploymentMethods;
