import React, { useState } from 'react';
import { FiSearch, FiChevronRight, FiChevronDown, FiHexagon, FiGithub, FiTwitter, FiGlobe, FiHelpCircle } from 'react-icons/fi';

import WhatIsMultipathIQ from './content/WhatIsMultipathIQ';
import WhyChooseMultipathIQ from './content/WhyChooseMultipathIQ';
import PlatformArchitecture from './content/PlatformArchitecture';
import TechnologyStack from './content/TechnologyStack';

import SystemRequirements from './content/SystemRequirements';
import DeploymentMethods from './content/DeploymentMethods';
import InstallingMultipathIQ from './content/InstallingMultipathIQ';
import InstallationTroubleshooting from './content/InstallationTroubleshooting';

import QuickStartGuide from './content/QuickStartGuide';
import UnderstandingTheOutput from './content/UnderstandingTheOutput';

import HowToCaptureData from './content/HowToCaptureData';
import WhatDataIsNeeded from './content/WhatDataIsNeeded';
import ValidationTroubleshooting from './content/ValidationTroubleshooting';

import ObservabilityHowItWorks from './content/ObservabilityHowItWorks';
import UnderstandingTheDashboard from './content/UnderstandingTheDashboard';
import SupportedAITools from './content/SupportedAITools';
import SetupAIObservability from './content/SetupAIObservability';

import SANTopology from './content/SANTopology';
import ConnectionMatrix from './content/ConnectionMatrix';
import DependencyMap from './content/DependencyMap';
import ServiceCLICommands from './content/ServiceCLICommands';

interface Topic {
    title: string;
    component: React.FC;
}

interface Category {
    title: string;
    topics: Topic[];
}

const documentationStructure: Category[] = [
    {
        title: 'Platform Fundamentals',
        topics: [
            { title: 'What is Multipath.IQ', component: WhatIsMultipathIQ },
            { title: 'Why choose Multipath.IQ', component: WhyChooseMultipathIQ },
            { title: 'Platform architecture', component: PlatformArchitecture },
            { title: 'Technology Stack', component: TechnologyStack },
        ]
    },
    {
        title: 'Installation Setup',
        topics: [
            { title: 'System requirements', component: SystemRequirements },
            { title: 'Deployment methods', component: DeploymentMethods },
            { title: 'Installing Multipath.IQ', component: InstallingMultipathIQ },
            { title: 'Installation troubleshooting', component: InstallationTroubleshooting },
        ]
    },
    {
        title: 'Product Overview',
        topics: [
            { title: 'Quick Start Guide', component: QuickStartGuide },
            { title: 'Understanding the output', component: UnderstandingTheOutput },
        ]
    },
    {
        title: 'Validation',
        topics: [
            { title: 'How to capture the data', component: HowToCaptureData },
            { title: 'What Data is needed', component: WhatDataIsNeeded },
            { title: 'Common issues & Troubleshooting', component: ValidationTroubleshooting },
        ]
    },
    {
        title: 'Observability',
        topics: [
            { title: 'How it works', component: ObservabilityHowItWorks },
            { title: 'Understanding the Dashboard', component: UnderstandingTheDashboard },
            { title: 'Which AI tools are supported', component: SupportedAITools },
            { title: 'How to setup AI Observability', component: SetupAIObservability },
        ]
    },
    {
        title: 'SAN Topology',
        topics: [
            { title: 'Overview', component: SANTopology }
        ]
    },
    {
        title: 'Connection Matrix',
        topics: [
            { title: 'Overview', component: ConnectionMatrix }
        ]
    },
    {
        title: 'Dependency Map',
        topics: [
            { title: 'Overview', component: DependencyMap }
        ]
    },
    {
        title: 'Service CLI Commands',
        topics: [
            { title: 'Overview', component: ServiceCLICommands }
        ]
    }
];

const Documentation: React.FC = () => {
    const [activeTopic, setActiveTopic] = useState<Topic>(documentationStructure[0].topics[0]);
    const [expandedCategories, setExpandedCategories] = useState<string[]>(documentationStructure.map(c => c.title));

    const toggleCategory = (title: string) => {
        setExpandedCategories(prev => 
            prev.includes(title) ? prev.filter(c => c !== title) : [...prev, title]
        );
    };

    const ActiveComponent = activeTopic.component;

    return (
        <div className="flex min-h-screen bg-zinc-50 font-sans text-slate-800">
            {/* Background Grid */}
            <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)] bg-[size:14px_14px]" />

            {/* Left Sidebar */}
            <div className="relative w-80 flex-shrink-0 border-r border-slate-200/60 bg-white/50 backdrop-blur-xl h-screen flex flex-col pt-6 z-10 overflow-hidden">
                <div className="px-6 mb-6 flex items-center gap-3">
                    <FiHexagon className="text-2xl text-indigo-500 fill-indigo-50" />
                    <span className="text-xl font-bold tracking-tight text-slate-800">MultipathIQ</span>
                </div>
                
                <div className="px-6 mb-6">
                    <div className="relative flex items-center w-full h-9 rounded-lg border border-slate-200 bg-white shadow-sm overflow-hidden text-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500 transition-all">
                        <div className="pl-3 text-slate-400">
                            <FiSearch />
                        </div>
                        <input 
                            type="text" 
                            placeholder="Search docs..." 
                            className="w-full h-full px-2 outline-none bg-transparent placeholder-slate-400 text-slate-700"
                        />
                        <div className="pr-2">
                            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-slate-100 border border-slate-200 rounded">K</kbd>
                        </div>
                    </div>
                </div>

                <nav className="flex-1 overflow-y-auto px-4 pb-12 space-y-4">
                    {documentationStructure.map((category) => {
                        const isExpanded = expandedCategories.includes(category.title);
                        return (
                            <div key={category.title}>
                                <button 
                                    onClick={() => toggleCategory(category.title)}
                                    className="w-full flex items-center justify-between text-left px-2 py-1 mb-1 text-[11px] font-bold uppercase tracking-widest text-slate-500 hover:text-slate-800 transition-colors"
                                >
                                    {category.title}
                                    {isExpanded ? <FiChevronDown /> : <FiChevronRight />}
                                </button>
                                
                                {isExpanded && (
                                    <ul className="space-y-0.5 border-l border-slate-200 ml-3 pl-2">
                                        {category.topics.map(topic => {
                                            const isActive = activeTopic.title === topic.title && documentationStructure.find(c => c.topics.includes(activeTopic))?.title === category.title;
                                            return (
                                                <li key={topic.title}>
                                                    <button 
                                                        onClick={() => setActiveTopic(topic)}
                                                        className={`w-full text-left px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                                                            isActive 
                                                                ? 'bg-indigo-50 text-indigo-700' 
                                                                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                                                        }`}
                                                    >
                                                        {topic.title}
                                                    </button>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                )}
                            </div>
                        );
                    })}
                </nav>
            </div>

            {/* Main Content */}
            <div className="relative flex-1 h-screen overflow-y-auto z-10 scroll-smooth">
                <div className="max-w-4xl mx-auto px-10 py-16">
                    
                    {/* Rendered Markdown/TSX Content */}
                    <ActiveComponent />

                    {/* Footer Icons */}
                    <div className="flex items-center justify-between text-slate-400 pt-16 mt-16 border-t border-slate-200">
                        <span className="text-sm font-medium">Was this page helpful?</span>
                        <div className="flex gap-4">
                            <FiGithub className="hover:text-slate-600 cursor-pointer transition-colors" />
                            <FiTwitter className="hover:text-slate-600 cursor-pointer transition-colors" />
                            <FiGlobe className="hover:text-slate-600 cursor-pointer transition-colors" />
                            <FiHelpCircle className="hover:text-slate-600 cursor-pointer transition-colors" />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Documentation;
