import React from 'react';

const glassCardClasses = "rounded-3xl border border-white/60 bg-white/40 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)]";

const Terms: React.FC = () => {
    return (
        <div className="flex h-full flex-col p-6 space-y-6 overflow-auto pb-12 max-w-4xl mx-auto">
            <section className={`${glassCardClasses} p-8 md:p-10`}>
                <h1 className="text-3xl font-bold text-slate-800 mb-10 tracking-tight">Terms and Conditions</h1>
                
                <div className="space-y-10 text-slate-600 leading-relaxed">
                    
                    <div>
                        <p>
                            Welcome to Mpath, an enterprise infrastructure monitoring and observability platform operated by Macklabs ("Company," "we," "us," or "our"). We hope you enjoy the experience!
                        </p>
                        <p className="mt-4">
                            These Terms and Conditions ("Terms") are a legal contract between you and Macklabs and govern your activity on Mpath's websites, applications, monitoring agents, and other tools. All the text, data, information, software, graphics, logos, photographs, and more (all of which we refer to as "Materials") that Macklabs and its subsidiaries and affiliated companies may make available to you, as well as any solutions we may make available to you through any of our websites and other tools (all of which are referred to in these Terms as "Mpath Tools").
                        </p>
                        <p className="mt-6 p-4 bg-slate-100 rounded-xl border border-slate-200/60 font-semibold text-slate-800 uppercase tracking-wide text-sm">
                            READ THESE TERMS CAREFULLY BEFORE ACCESSING, BROWSING, OR USING Mpath TOOLS. ACCESSING, BROWSING, OR USING Mpath TOOLS INDICATES THAT YOU HAVE BOTH READ AND ACCEPT THESE TERMS. YOU CANNOT ACCESS, BROWSE, OR USE Mpath TOOLS IF YOU DO NOT ACCEPT THESE TERMS.
                        </p>
                    </div>

                    {/* Section 1 */}
                    <div>
                        <h2 className="text-xl font-bold text-slate-800 mb-3 flex items-center gap-2">
                            <span className="text-indigo-500/50 font-mono text-sm">1.</span>
                            Accessing Mpath Tools
                        </h2>
                        <p className="mb-2">When you access Mpath Tools, you are responsible for complying with these Terms as well as any and all use of Mpath Tools through any account that you may set up. Some Materials will only be available to you if you have an account.</p>
                        <p className="mb-2">You agree to provide true, accurate, current, and complete information for so long as you use Mpath Tools. It is your responsibility to obtain and maintain all equipment, services and software needed for access to and use of Mpath Tools. It is also your responsibility to maintain the confidentiality of your password(s).</p>
                        <p>Sometimes, we collect certain personal information about you solely in connection with your access and use of Mpath Tools. Macklabs's use of that information is governed by the provisions of our Privacy Policy.</p>
                    </div>

                    {/* Section 2 */}
                    <div>
                        <h2 className="text-xl font-bold text-slate-800 mb-3 flex items-center gap-2">
                            <span className="text-indigo-500/50 font-mono text-sm">2.</span>
                            Your Permitted Use of Mpath Tools
                        </h2>
                        <p className="mb-2">You are invited to use Mpath Tools for your business purposes to monitor, manage, and observe your infrastructure layout. We hereby grant you a limited, personal, non-exclusive and non-transferable license during the authorized term to use and to display the Materials only in connection with these permitted uses.</p>
                        <p>You have no other rights in Mpath Tools or any Materials and you may not modify, edit, copy, reproduce, create derivative works of, reverse engineer, alter, enhance or in any way exploit any Mpath Tools or Materials in any manner, unless it is authorized in writing by us.</p>
                    </div>

                    {/* Section 3 */}
                    <div>
                        <h2 className="text-xl font-bold text-slate-800 mb-3 flex items-center gap-2">
                            <span className="text-indigo-500/50 font-mono text-sm">3.</span>
                            Unauthorized Use of Mpath Tools
                        </h2>
                        <p>We authorize your limited use of Mpath Tools. Any other use of Mpath Tools beyond the permitted uses is prohibited and constitutes unauthorized use. All rights in Mpath Tools and Materials remain the property of Macklabs, its subsidiaries, or its affiliated companies.</p>
                    </div>

                    {/* Section 4 */}
                    <div>
                        <h2 className="text-xl font-bold text-slate-800 mb-3 flex items-center gap-2">
                            <span className="text-indigo-500/50 font-mono text-sm">4.</span>
                            Acceptable Use Policy
                        </h2>
                        <p className="mb-3">You agree to use Mpath Tools only for lawful purposes and in accordance with these Terms. You may not:</p>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>Use the Service for any illegal or unauthorized purpose</li>
                            <li>Upload or monitor content that violates intellectual property rights</li>
                            <li>Attempt to gain unauthorized access to the Service or other users' accounts</li>
                            <li>Interfere with or disrupt the Service or servers</li>
                            <li>Use the Service to transmit malware, viruses, or harmful code</li>
                            <li>Attempt to reverse engineer or decompile any software or monitoring agents</li>
                            <li>Use the Service to monitor endpoints you do not own or have explicit authorization to monitor</li>
                        </ul>
                    </div>

                    {/* Section 5 */}
                    <div>
                        <h2 className="text-xl font-bold text-slate-800 mb-3 flex items-center gap-2">
                            <span className="text-indigo-500/50 font-mono text-sm">5.</span>
                            Terminating Your Use of Mpath Tools
                        </h2>
                        <p>We or you may terminate your use of Mpath Tools at any time. Your use of Mpath Tools will automatically terminate in the event you breach any of these Terms. We may terminate, suspend, or modify your registration with, or access to, all or part of Mpath Tools, without notice, at any time and for any reason.</p>
                    </div>

                    {/* Section 6 */}
                    <div>
                        <h2 className="text-xl font-bold text-slate-800 mb-3 flex items-center gap-2">
                            <span className="text-indigo-500/50 font-mono text-sm">6.</span>
                            Disclaimers
                        </h2>
                        <p className="font-semibold text-slate-800 mb-2">Mpath TOOLS ARE PROVIDED "AS IS" AND "WITH ALL FAULTS" AND THE ENTIRE RISK AS TO THE QUALITY AND PERFORMANCE OF Mpath TOOLS IS WITH YOU.</p>
                        <p className="mb-2">Macklabs expressly disclaims all warranties of any kind (express, implied or statutory) with respect to Mpath Tools, which includes but is not limited to, any implied or statutory warranties of merchantability, fitness for a particular use or purpose, title, and non-infringement of intellectual property rights.</p>
                        <p>Macklabs does not promise you that Mpath Tools will meet your requirements or that Mpath Tools will be uninterrupted, timely, secure, or error free or that defects will be corrected.</p>
                    </div>

                    {/* Section 7 */}
                    <div>
                        <h2 className="text-xl font-bold text-slate-800 mb-3 flex items-center gap-2">
                            <span className="text-indigo-500/50 font-mono text-sm">7.</span>
                            Limitation of Liability
                        </h2>
                        <p className="font-semibold text-slate-800 uppercase text-[13px] leading-relaxed bg-rose-50/50 p-4 rounded-xl border border-rose-100">
                            IN NO EVENT WILL ANY OF THE MACKLABS PARTIES BE LIABLE FOR (A) ANY INDIRECT, SPECIAL, CONSEQUENTIAL, PUNITIVE, OR EXEMPLARY DAMAGES OR (B) DAMAGES THAT ARE MORE THAN ONE HUNDRED UNITED STATES (US$100.00) DOLLARS IN TOTAL (INCLUDING, WITHOUT LIMITATION, THOSE RESULTING FROM LOSS OF REVENUES, LOST PROFITS, LOSS OF GOODWILL, LOSS OF USE, BUSINESS INTERRUPTION, OR OTHER INTANGIBLE LOSSES), ARISING OUT OF OR IN CONNECTION WITH Mpath TOOLS, WHETHER SUCH DAMAGES ARE BASED ON WARRANTY, CONTRACT, TORT, STATUTE, OR ANY OTHER LEGAL THEORY.
                        </p>
                    </div>

                    {/* Section 8 */}
                    <div>
                        <h2 className="text-xl font-bold text-slate-800 mb-3 flex items-center gap-2">
                            <span className="text-indigo-500/50 font-mono text-sm">8.</span>
                            Content, Telemetry, and Data
                        </h2>
                        <ul className="space-y-2">
                            <li><strong className="text-slate-800">8.1 Data Ownership:</strong> You retain ownership of telemetry, logs, and infrastructure data you transmit to Mpath. By using our Services, you grant us a limited license to process, analyze, and display your data to provide the Service.</li>
                            <li><strong className="text-slate-800">8.2 Data Processing:</strong> We process your monitoring data in accordance with applicable data protection laws.</li>
                            <li><strong className="text-slate-800">8.3 Data Security:</strong> We implement appropriate technical and organizational measures to protect your monitoring data, but no system is completely secure.</li>
                            <li><strong className="text-slate-800">8.4 Data Retention:</strong> Your data is retained according to your plan's retention period and may be deleted upon account termination or data expiration.</li>
                        </ul>
                    </div>

                    {/* Section 9 */}
                    <div>
                        <h2 className="text-xl font-bold text-slate-800 mb-3 flex items-center gap-2">
                            <span className="text-indigo-500/50 font-mono text-sm">9.</span>
                            Infrastructure Monitoring Accuracy
                        </h2>
                        <ul className="space-y-2">
                            <li><strong className="text-slate-800">9.1 Telemetry Accuracy:</strong> Mpath relies on agents, SNMP, web probes, and API endpoints to collect telemetry. While we strive for high accuracy and minimal latency, network conditions, agent configurations, and external factors may cause delays or inaccuracies in reported statuses or metrics.</li>
                            <li><strong className="text-slate-800">9.2 Alerting Responsibility:</strong> You are responsible for configuring appropriate thresholds, alert rules, and incident response integrations. Macklabs is not liable for missed alerts, false positives, or the resulting impact on your business operations or service level agreements (SLAs).</li>
                        </ul>
                    </div>

                    {/* Section 10 */}
                    <div>
                        <h2 className="text-xl font-bold text-slate-800 mb-3 flex items-center gap-2">
                            <span className="text-indigo-500/50 font-mono text-sm">10.</span>
                            Intellectual Property Rights
                        </h2>
                        <ul className="space-y-2">
                            <li><strong className="text-slate-800">10.1 Our Rights:</strong> Mpath, including its software, agents, design, and content, is owned by Macklabs and protected by intellectual property laws.</li>
                            <li><strong className="text-slate-800">10.2 License:</strong> We grant you a limited, non-exclusive, non-transferable license to use Mpath and install its tracking agents in accordance with these Terms.</li>
                            <li><strong className="text-slate-800">10.3 Closed Software License:</strong> Mpath is a closed-source, proprietary software application. This software is not open source and cannot be used, modified, distributed, or reproduced without explicit written approval from Macklabs.</li>
                        </ul>
                    </div>

                    {/* Section 11 */}
                    <div>
                        <h2 className="text-xl font-bold text-slate-800 mb-3 flex items-center gap-2">
                            <span className="text-indigo-500/50 font-mono text-sm">11.</span>
                            Indemnification
                        </h2>
                        <p>You agree to indemnify, defend, and hold harmless Macklabs and its officers, directors, employees, and agents from and against any and all claims, liabilities, damages, losses, costs, expenses, or fees (including reasonable attorneys' fees) that such parties may incur as a result of or arising from your (or anyone using your account) violation of these Terms.</p>
                    </div>

                    {/* Section 12 */}
                    <div>
                        <h2 className="text-xl font-bold text-slate-800 mb-3 flex items-center gap-2">
                            <span className="text-indigo-500/50 font-mono text-sm">12.</span>
                            Governing Law
                        </h2>
                        <p>These Terms shall be governed by and construed in accordance with the laws of the jurisdiction where Macklabs is incorporated, without regard to conflict of law principles.</p>
                    </div>

                    {/* Section 13 */}
                    <div>
                        <h2 className="text-xl font-bold text-slate-800 mb-3 flex items-center gap-2">
                            <span className="text-indigo-500/50 font-mono text-sm">13.</span>
                            Entire Agreement
                        </h2>
                        <p>These Terms constitute the entire and exclusive and final statement of the agreement between you and Macklabs with respect to the subject matter hereof, superseding any prior agreements or negotiations.</p>
                    </div>

                    {/* Section 14 */}
                    <div>
                        <h2 className="text-xl font-bold text-slate-800 mb-3 flex items-center gap-2">
                            <span className="text-indigo-500/50 font-mono text-sm">14.</span>
                            Contact Information
                        </h2>
                        <p className="mb-2">If you have any questions about these Terms, please contact us at:</p>
                        <address className="not-italic text-slate-800 font-medium bg-white/50 p-4 rounded-xl border border-slate-200/60 inline-block">
                            Macklabs<br />
                            Email: <a href="mailto:legal@macklabs.com" className="text-indigo-600 font-normal hover:underline">legal@macklabs.com</a><br />
                        </address>
                    </div>

                </div>
            </section>
        </div>
    );
};

export default Terms;
