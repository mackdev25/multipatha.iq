import React from 'react';

const HowToCaptureData: React.FC = () => {
    return (
        <div className="prose prose-slate max-w-none">
            <h1 className="text-3xl font-extrabold text-slate-900 mb-6">How to capture the data</h1>
            
            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                MultipathIQ relies on accurate configuration dumps from your Brocade SAN switches. This guide explains how to extract the necessary information safely.
            </p>

            <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4">Using SSH / CLI</h2>
            <p className="text-slate-600 mb-4">
                The standard method for data extraction involves SSHing into your principal or subordinate Brocade switches using a terminal emulator (like PuTTY or SecureCRT) with session logging enabled.
            </p>
            
            <ol className="list-decimal pl-6 space-y-4 text-slate-600">
                <li>
                    <strong>Enable Logging:</strong> In your terminal emulator, ensure "Log session to file" is enabled so the output is captured to a `.txt` file.
                </li>
                <li>
                    <strong>Connect:</strong> SSH into Fabric A's principal switch using admin credentials.
                </li>
                <li>
                    <strong>Execute Commands:</strong> Run the required show commands (see <em>What Data is needed</em>). Ensure you disable pagination (e.g., `termLength 0` if applicable, though Brocade commands generally stream if piped or configured to not pause).
                </li>
                <li>
                    <strong>Repeat:</strong> Connect to Fabric B's principal switch and repeat the process.
                </li>
                <li>
                    <strong>Format:</strong> Currently, MultipathIQ ingests data via `.xlsx`. You may need to use an intermediate macro or script (provided by your organization) to format the raw text logs into the structured Excel columns expected by MultipathIQ.
                </li>
            </ol>

            <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6 my-8">
                <h3 className="text-indigo-800 font-bold mb-2">Automated API Extraction</h3>
                <p className="text-indigo-700 text-sm">
                    If your environment runs Brocade FOS 8.2.x or higher, you can utilize the REST API to pull this data programmatically into JSON/Excel format rather than screen-scraping CLI sessions. This is the recommended method for enterprise environments.
                </p>
            </div>
        </div>
    );
};

export default HowToCaptureData;
