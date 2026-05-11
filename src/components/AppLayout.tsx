import { useState } from 'react';
import HomePage from '../pages/HomePage';
import SettingsPage from '../pages/SettingsPage';
import About from '../pages/policy/About';
import Privacy from '../pages/policy/Privacy';
import Terms from '../pages/policy/Terms';
import Changelogs from '../pages/changelogs/Changelogs';
import Observability from '../pages/Observability';
import { FaDiscord, FaTwitter, FaYoutube, FaProductHunt } from 'react-icons/fa';
import versionData from '../version.json';
import {
    TopologyDiagram,
    ValidationFlowchart,
    ConnectionMatrix,
    StorageMapping,
} from './diagrams';
import type { ValidationResult, FabricData, ValidationSettings } from '../types';
import {
    FiCheckSquare,
    FiGithub,
    FiGlobe,
    FiGitBranch,
    FiGrid,
    FiLayers,
    FiActivity,
    FiRefreshCw,
    FiSettings,
    FiInfo,
    FiBookOpen,
    FiChevronLeft,
    FiChevronRight,
    FiChevronDown,
    FiLock,
    FiFileText,
    FiList,
    FiX,
} from 'react-icons/fi';

type SectionType = 'validation' | 'observability' | 'topology' | 'flowchart' | 'matrix' | 'dependency-map' | 'settings' | 'about' | 'privacy' | 'terms' | 'changelogs' | 'documentation';

const defaultSettings: ValidationSettings = {
    mode: 'compliance',
    conditions: [
        { id: 'preset-1', loggedIn: 1, notLoggedIn: 0, description: 'Single Path (ESXi/RHEL)' },
        { id: 'preset-2', loggedIn: 2, notLoggedIn: 2, description: 'AIX Configuration' }
    ],
    aiIntegration: {
        enabled: false,
        selectedModel: 'openai',
        apiKeys: {},
    }
};

const navItems = [
    {
        id: 'validation' as SectionType,
        label: 'Validation',
        icon: FiCheckSquare,
        desc: 'Host path validation',
    },
    {
        id: 'observability' as SectionType,
        label: 'Observability',
        icon: FiActivity,
        desc: 'Dashboard and health metrics',
    },
    {
        id: 'topology' as SectionType,
        label: 'SAN Topology',
        icon: FiGlobe,
        desc: 'Network topology view',
    },
    {
        id: 'matrix' as SectionType,
        label: 'Connection Matrix',
        icon: FiGrid,
        desc: 'Host–fabric connection matrix',
    },
    {
        id: 'dependency-map' as SectionType,
        label: 'Dependency Map',
        icon: FiLayers,
        desc: 'End-to-end dependency mapping',
    },
];

const AppLayout: React.FC = () => {
    const [active, setActive] = useState<SectionType>('validation');
    const [collapsed, setCollapsed] = useState(false);
    const [validationData, setValidationData] = useState<ValidationResult[] | null>(null);
    const [summaryData, setSummaryData] = useState<any>(null);
    const [rawFabricData, setRawFabricData] = useState<FabricData[] | null>(null);
    const [toolsOpen, setToolsOpen] = useState(true);
    const [toast, setToast] = useState<{ visible: boolean; fading: boolean }>({ visible: false, fading: false });
    const [appToast, setAppToast] = useState<{ message: React.ReactNode; visible: boolean; fading: boolean }>({ message: '', visible: false, fading: false });
    const [settings, setSettings] = useState<ValidationSettings>(defaultSettings);

    const showToast = () => {
        setToast({ visible: true, fading: false });
    };

    const showAppToast = (message: React.ReactNode) => {
        setAppToast({ message, visible: true, fading: false });
        setTimeout(() => setAppToast(t => ({ ...t, fading: true })), 6000);
        setTimeout(() => setAppToast(t => ({ ...t, visible: false, fading: false })), 6500);
    };

    const pageMeta: Record<SectionType, { title: string; subtitle: string }> = {
        validation: {
            title: 'Fabric Path Validation',
            subtitle: 'Validate host-to-storage paths across your Brocade SAN fabrics.',
        },
        observability: {
            title: 'Observability Dashboard',
            subtitle: 'Analyze overall infrastructure health, validation scores, and connectivity metrics.',
        },
        topology: {
            title: 'SAN Topology Map',
            subtitle: 'Visual representation of host-to-fabric port connections.',
        },
        flowchart: {
            title: 'Validation Status Flowchart',
            subtitle: 'Decision tree showing validation logic and rules.',
        },
        matrix: {
            title: 'Connection Matrix',
            subtitle: 'Host–fabric connection overview across all ports.',
        },
        'dependency-map': {
            title: 'Dependency Map',
            subtitle: 'End-to-end mapping from servers to fabrics and storage.',
        },
        settings: {
            title: 'Validation Settings',
            subtitle: 'Configure multipath validation and compliance checks.',
        },
        about: {
            title: 'About',
            subtitle: 'Learn more about MultipathIQ.',
        },
        privacy: {
            title: 'Privacy Policy',
            subtitle: 'How we handle and secure your data.',
        },
        terms: {
            title: 'Terms of Use',
            subtitle: 'Terms and conditions for using MultipathIQ.',
        },
        changelogs: {
            title: 'Changelogs',
            subtitle: 'Recent updates and release notes.',
        },
        documentation: {
            title: 'Documentation',
            subtitle: 'Guides and instructions for using MultipathIQ.',
        },
    };

    const handleDataUpdate = (
        results: ValidationResult[],
        summary: any,
        fabricData?: FabricData[]
    ) => {
        setValidationData(results);
        setSummaryData(summary);
        if (fabricData) setRawFabricData(fabricData);
    };

    const handleDataReset = () => {
        setValidationData(null);
        setSummaryData(null);
        setRawFabricData(null);
    };

    const hasDot = (id: SectionType) => {
        if (id === 'dependency-map') return !!(rawFabricData && rawFabricData.length > 0);
        if (id === 'validation') return false;
        return !!(validationData && validationData.length > 0);
    };

    const renderContent = () => {
        switch (active) {
            case 'validation':
                return (
                    <HomePage
                        settings={settings}
                        rawFabricData={rawFabricData}
                        onDataUpdate={handleDataUpdate}
                        onDataReset={handleDataReset}
                        initialResults={validationData}
                        initialSummary={summaryData}
                    />
                );
            case 'observability':
                return <Observability data={validationData || []} settings={settings} />;
            case 'settings':
                return <SettingsPage settings={settings} onUpdateSettings={setSettings} />;
            case 'topology':
                return <TopologyDiagram data={validationData || []} />;
            case 'flowchart':
                return <ValidationFlowchart data={validationData || []} />;
            case 'matrix':
                return <ConnectionMatrix data={validationData || []} />;
            case 'dependency-map':
                return <StorageMapping data={rawFabricData || []} />;
            case 'about':
                return <About />;
            case 'privacy':
                return <Privacy />;
            case 'terms':
                return <Terms />;
            case 'changelogs':
                return <Changelogs />;
        }
    };

    return (
        <div className="flex h-screen overflow-hidden bg-slate-50">
            {/* ── Sidebar wrapper (relative so toggle button can overflow) ─ */}
            <div
                className="relative flex-shrink-0 transition-[width] duration-300 ease-in-out"
                style={{ width: collapsed ? 64 : 256 }}
            >
                <aside
                    className="flex h-full w-full flex-col overflow-hidden bg-slate-900"
                >
                    {/* Brand */}
                    <div
                        className={`flex items-center gap-3 border-b border-white/10 bg-gradient-to-b from-slate-800/60 to-slate-900 py-5 ${collapsed ? 'justify-center px-0' : 'px-4'
                            }`}
                    >
                        <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl overflow-hidden bg-white shadow-lg shadow-indigo-900/60 ring-1 ring-inset ring-white/20">
                            <img src="/logo.png" alt="MultipathIQ Logo" className="h-full w-full object-contain p-1" />
                        </div>
                        {!collapsed && (
                            <div className="min-w-0">
                                <p className="truncate text-2xl font-normal tracking-wide text-white">
                                    Multipath<span className="text-rose-500">.</span><span className="text-rose-500 font-bold">iQ</span>
                                </p>

                            </div>
                        )}
                    </div>

                    {/* Nav label */}
                    {!collapsed && (
                        <div className="mb-1 mt-5 flex items-center gap-2 px-3">
                            <div className="h-px flex-1 bg-white/[0.07]" />
                            <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-slate-600">Navigation</p>
                            <div className="h-px flex-1 bg-white/[0.07]" />
                        </div>
                    )}

                    {/* Nav items */}
                    <nav className="flex-1 space-y-0.5 overflow-y-auto px-2 py-1">
                        {navItems.map(({ id, label, icon: Icon }) => {
                            const isActive = active === id;
                            const dot = hasDot(id);
                            const disabled = !validationData && (id === 'topology' || id === 'matrix' || id === 'observability');
                            return (
                                <button
                                    key={id}
                                    onClick={
                                        id === 'documentation'
                                            ? () => window.open(window.location.origin + window.location.pathname + '#/docs', '_blank')
                                            : disabled ? () => showAppToast(
                                                <>
                                                    <span className="block mb-1 text-slate-800">No validation file has been uploaded for processing.</span>
                                                    <span className="block text-slate-500 font-normal">Please upload a supported validation file to begin the analysis, verification, and compliance checks.</span>
                                                </>
                                            ) : () => setActive(id)
                                    }
                                    title={collapsed ? label : undefined}
                                    className={`group relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-150 ${isActive
                                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/50 ring-1 ring-inset ring-white/15'
                                        : disabled
                                            ? 'text-slate-500 opacity-50 cursor-not-allowed'
                                            : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'
                                        } ${collapsed ? 'justify-center' : ''}`}
                                >
                                    <Icon
                                        className={`flex-shrink-0 text-[17px] ${isActive
                                            ? 'text-indigo-200'
                                            : 'text-slate-500 group-hover:text-slate-300'
                                            }`}
                                    />
                                    {!collapsed && (
                                        <span className="truncate">{label}</span>
                                    )}
                                    {dot && (
                                        <span
                                            className={`h-1.5 w-1.5 flex-shrink-0 animate-pulse rounded-full bg-emerald-400 ${collapsed
                                                ? 'absolute right-2 top-2'
                                                : 'ml-auto'
                                                }`}
                                        />
                                    )}
                                </button>
                            );
                        })}
                    </nav>

                    {/* Divider */}
                    <div className="mx-3 my-2 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

                    {/* Tools label — collapsible toggle */}
                    <div className="px-2">
                        {!collapsed ? (
                            <button
                                onClick={() => setToolsOpen(o => !o)}
                                className="mb-1 mt-2 flex w-full items-center gap-2 px-1 py-0.5"
                            >
                                <div className="h-px flex-1 bg-white/[0.07]" />
                                <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-slate-600">Tools</p>
                                <FiChevronDown
                                    className={`text-[10px] text-slate-600 transition-transform duration-200 ${toolsOpen ? '' : '-rotate-90'}`}
                                />
                                <div className="h-px flex-1 bg-white/[0.07]" />
                            </button>
                        ) : (
                            <div className="my-1 h-px bg-white/[0.07]" />
                        )}
                    </div>

                    {/* Tools items (collapsible) */}
                    {(toolsOpen || collapsed) && (
                        <div className="space-y-0.5 px-2 pb-1">
                            {[
                                {
                                    id: 'flowchart' as SectionType,
                                    icon: FiGitBranch,
                                    label: 'Validation Flow',
                                },
                                {
                                    id: 'documentation' as SectionType,
                                    icon: FiBookOpen,
                                    label: 'Documentation',
                                },
                                {
                                    id: 'about' as SectionType,
                                    icon: FiInfo,
                                    label: 'About',
                                },
                                {
                                    id: 'privacy' as SectionType,
                                    icon: FiLock,
                                    label: 'Privacy',
                                },
                                {
                                    id: 'terms' as SectionType,
                                    icon: FiFileText,
                                    label: 'Terms',
                                },
                                {
                                    id: 'changelogs' as SectionType,
                                    icon: FiList,
                                    label: 'Changelogs',
                                },
                            ].map(({ id, icon: Icon, label }) => {
                                const isActive = active === id;
                                return (
                                    <button
                                        key={label}
                                        onClick={
                                            id === 'documentation'
                                                ? () => window.open(window.location.origin + window.location.pathname + '#/docs', '_blank')
                                                : () => setActive(id)
                                        }
                                        title={collapsed ? label : undefined}
                                        className={`group flex w-full items-center gap-3 rounded-xl px-3 py-2 text-xs transition-all duration-150 ${isActive
                                            ? 'bg-indigo-600 font-medium text-white shadow-lg shadow-indigo-900/50 ring-1 ring-inset ring-white/15'
                                            : 'font-normal text-slate-500 hover:bg-slate-800 hover:text-slate-200'
                                            } ${collapsed ? 'justify-center' : ''}`}
                                    >
                                        <Icon className={`flex-shrink-0 text-[15px] ${isActive ? 'text-indigo-200' : 'text-slate-600 group-hover:text-slate-300'}`} />
                                        {!collapsed && <span>{label}</span>}
                                    </button>
                                );
                            })}
                        </div>
                    )}

                    {/* Social icons */}
                    {!collapsed && (
                        <div className="flex items-center justify-center gap-5 px-4 py-3 mt-2 border-t border-white/5">
                            <a href="<Demo Link>" className="text-slate-500 hover:text-indigo-400 transition-colors" title="Discord"><FaDiscord size={18} /></a>
                            <a href="<Demo Link>" className="text-slate-500 hover:text-indigo-400 transition-colors" title="X"><FaTwitter size={18} /></a>
                            <a href="<Demo Link>" className="text-slate-500 hover:text-indigo-400 transition-colors" title="Youtube"><FaYoutube size={18} /></a>
                            <a href="<Demo Link>" className="text-slate-500 hover:text-indigo-400 transition-colors" title="Product Hunt"><FaProductHunt size={18} /></a>
                        </div>
                    )}

                    {/* Footer copyright */}
                    {!collapsed && (
                        <div className="flex items-center justify-between border-t border-white/10 px-4 py-3 relative group">
                            <p className="text-[10px] text-slate-600">
                                © {new Date().getFullYear()} {versionData.owner}.
                            </p>
                            <button
                                className="rounded bg-indigo-950 px-1.5 py-0.5 text-[9px] font-semibold text-indigo-400 hover:bg-indigo-900 transition-colors"
                            >
                                {versionData.version}
                            </button>

                            <div className="absolute bottom-full right-4 mb-2 hidden w-48 flex-col gap-1 rounded-xl border border-slate-700 bg-slate-800 p-3 shadow-xl group-hover:flex z-50">
                                <div className="flex justify-between items-center border-b border-slate-700 pb-2 mb-1">
                                    <span className="text-xs font-bold text-white">MultipathIQ Info</span>
                                </div>
                                <div className="flex justify-between text-[10px]">
                                    <span className="text-slate-400">Version</span>
                                    <span className="text-indigo-300 font-mono">{versionData.version}</span>
                                </div>
                                <div className="flex justify-between text-[10px]">
                                    <span className="text-slate-400">Date</span>
                                    <span className="text-slate-200">{versionData.date}</span>
                                </div>
                                <div className="flex justify-between text-[10px]">
                                    <span className="text-slate-400">Developer</span>
                                    <span className="text-slate-200">{versionData.developer}</span>
                                </div>
                                <div className="flex justify-between text-[10px]">
                                    <span className="text-slate-400">Owner</span>
                                    <span className="text-slate-200">{versionData.owner}</span>
                                </div>
                            </div>
                        </div>
                    )}
                </aside>
                {/* Collapse toggle – lives OUTSIDE <aside> so overflow-hidden doesn’t clip it */}
                <button
                    onClick={() => setCollapsed((c) => !c)}
                    className="absolute -right-3.5 top-[64px] z-30 flex h-7 w-7 items-center justify-center rounded-full border-2 border-slate-700 bg-slate-900 text-slate-300 shadow-[0_0_0_3px_#0f172a] transition-all hover:border-indigo-500 hover:bg-indigo-600 hover:text-white"
                >
                    {collapsed ? (
                        <FiChevronRight className="text-xs" />
                    ) : (
                        <FiChevronLeft className="text-xs" />
                    )}
                </button>
            </div> {/* end sidebar wrapper */}

            {/* ── Main area ─────────────────────────────── */}
            <div className="flex flex-1 flex-col overflow-hidden">

                {/* Page content */}
                <main
                    className="relative flex-1 overflow-auto"
                    style={{
                        backgroundColor: '#f8fafc',
                        backgroundImage:
                            'linear-gradient(rgba(148,163,184,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.2) 1px, transparent 1px)',
                        backgroundSize: '10px 10px',
                    }}
                >
                    {/* Page heading row — title left, icons right, both on the grid */}
                    <div className="flex items-start justify-between px-6 pb-2 pt-5">
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900">{pageMeta[active].title}</h2>
                            <p className="mt-1 text-sm text-slate-500">{pageMeta[active].subtitle}</p>
                        </div>

                        {/* Utility icons — right side of heading row */}
                        <div className="relative ml-4 flex flex-shrink-0 items-center gap-0.5 pt-0.5">
                            <button
                                onClick={() => window.location.reload()}
                                title="Refresh page"
                                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-all hover:bg-white/70 hover:text-slate-700"
                            >
                                <FiRefreshCw className="text-[14px]" />
                            </button>
                            <button
                                onClick={() => setActive('settings')}
                                title="Settings"
                                className={`flex h-8 w-8 items-center justify-center rounded-lg transition-all ${active === 'settings' ? 'bg-indigo-100 text-indigo-700' : 'text-slate-400 hover:bg-white/70 hover:text-slate-700'}`}
                            >
                                <FiSettings className="text-[14px]" />
                            </button>
                            <a
                                href="https://github.com/mackdev-inc/zone-assure"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-all hover:bg-white/70 hover:text-slate-700"
                                title="View on GitHub"
                            >
                                <FiGithub className="text-[15px]" />
                            </a>
                            <button
                                className="flex h-8 items-center gap-1 rounded-lg px-2 text-slate-400 transition-all hover:bg-white/70 hover:text-slate-700"
                                title="Language"
                            >
                                <FiGlobe className="text-sm" />
                                <span className="text-xs font-medium">EN</span>
                            </button>

                            <div className="ml-1 flex h-8 items-center gap-1.5 rounded-lg bg-indigo-50 px-2.5 text-indigo-700 ring-1 ring-inset ring-indigo-500/20" title="Current Validation Mode">
                                <span className="text-[10px] font-bold uppercase tracking-wider">
                                    {settings.mode === 'multipath' ? 'Multipath Mode' : 'Compliance Mode'}
                                </span>
                            </div>

                            <button
                                onClick={showToast}
                                className="flex h-8 items-center gap-1 rounded-lg bg-emerald-50 px-2.5 text-emerald-600 transition-all hover:bg-emerald-100"
                                title="Click to learn about our privacy &amp; security policy"
                            >
                                <FiLock className="text-sm" />
                                <span className="text-xs font-medium">Secure</span>
                            </button>
                        </div>
                    </div>

                    {renderContent()}

                    {/* App Toast Notification */}
                    {appToast.visible && (
                        <div
                            className={`fixed bottom-6 right-6 z-50 flex max-w-md items-start gap-3 rounded-2xl border border-amber-200 bg-white p-4 shadow-xl transition-all duration-500 ${appToast.fading ? 'translate-y-4 opacity-0' : 'translate-y-0 opacity-100'
                                }`}
                        >
                            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-amber-100">
                                <FiInfo className="text-lg text-amber-600" />
                            </div>
                            <div className="flex-1">
                                <p className="text-base font-bold text-slate-800 mb-1">Action Required</p>
                                <div className="text-sm leading-relaxed text-slate-600">
                                    {appToast.message}
                                </div>
                            </div>
                            <button onClick={() => setAppToast({ ...appToast, visible: false, fading: false })} className="text-slate-400 hover:text-slate-600 ml-2 mt-1">
                                <FiX size={16} />
                            </button>
                        </div>
                    )}

                    {/* Secure Toast Notification */}
                    {toast.visible && (
                        <div
                            className={`fixed bottom-6 right-6 z-50 flex w-[600px] max-w-[90vw] items-start gap-4 rounded-3xl border border-emerald-200 bg-white p-6 shadow-2xl shadow-emerald-900/10 transition-all duration-500 ${toast.fading ? 'translate-y-4 opacity-0' : 'translate-y-0 opacity-100'
                                }`}
                        >
                            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100">
                                <FiLock className="text-xl text-emerald-600" />
                            </div>
                            <div className="flex-1 max-h-[80vh] overflow-auto pr-2">
                                <p className="text-lg font-bold text-slate-800">100% Private &amp; Secure</p>
                                <div className="mt-3 space-y-4 text-sm leading-relaxed text-slate-600">
                                    <p>
                                        Everything runs entirely within your browser, ensuring your data never leaves your device at any point during processing. No files, logs, credentials, or metadata are uploaded to external servers or cloud infrastructure. All operations are executed locally in your active browser session, giving you complete control over your data and environment.
                                    </p>
                                    <p>
                                        Your files exist only temporarily in memory while the session is active and are automatically purged the moment you close, refresh, or leave the page. Nothing is persisted, cached, or retained after the session ends. There is no background synchronization, hidden storage, or external processing involved.
                                    </p>
                                    <p>
                                        The platform is designed with a privacy-first and zero-trust architecture, making it suitable for handling sensitive enterprise infrastructure data, configuration files, logs, storage reports, zoning information, and operational metadata without exposing them to third-party systems.
                                    </p>

                                    <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/60">
                                        <p className="font-semibold text-slate-700 mb-2">There are:</p>
                                        <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
                                            <li>No backend data processing services</li>
                                            <li>No cloud-based analysis pipelines</li>
                                            <li>No telemetry or behavioral tracking</li>
                                            <li>No persistent storage of uploaded content</li>
                                            <li>No sharing of data with external services</li>
                                        </ul>
                                    </div>

                                    <p className="font-medium text-slate-700">
                                        This approach ensures complete data sovereignty, enhanced security, and full local control, allowing administrators and infrastructure teams to safely analyze and validate critical information directly within their own environment.
                                    </p>
                                </div>
                            </div>
                            <button onClick={() => setToast({ visible: false, fading: false })} className="text-slate-400 hover:text-slate-600 flex-shrink-0 transition-colors">
                                <FiX size={24} />
                            </button>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default AppLayout;
