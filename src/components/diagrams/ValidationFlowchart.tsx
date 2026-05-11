import React, { useCallback, useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import { FiZoomIn, FiZoomOut, FiMaximize2, FiRefreshCw } from 'react-icons/fi';
import type { ValidationResult } from '../../types';


interface ValidationFlowchartProps {
    data?: ValidationResult[];
}

const MIN_ZOOM = 0.4;
const MAX_ZOOM = 2.5;
const ZOOM_STEP = 0.15;

const ValidationFlowchart: React.FC<ValidationFlowchartProps> = ({ data = [] }) => {
    const diagramRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [diagramId] = useState(() => `flowchart-diagram-${Date.now()}`);
    const [zoom, setZoom] = useState(0.85);
    const [pan, setPan] = useState({ x: 0, y: 0 });
    const isPanning = useRef(false);
    const panStart = useRef({ x: 0, y: 0 });
    const panOrigin = useRef({ x: 0, y: 0 });

    useEffect(() => {
        mermaid.initialize({
            startOnLoad: false,
            theme: 'neutral',
            flowchart: { useMaxWidth: true, htmlLabels: true, curve: 'basis' },
            securityLevel: 'loose',
        });
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => { generateFlowchartDiagram(); }, 100);
        return () => clearTimeout(timer);
    }, [data, diagramId]);

    const generateFlowchartDiagram = async () => {
        if (!diagramRef.current) return;
        setIsLoading(true);
        try {
            const mermaidSyntax = generateMermaidSyntax();
            diagramRef.current.innerHTML = '';
            const uniqueId = `${diagramId}-${Date.now()}`;
            const { svg } = await mermaid.render(uniqueId, mermaidSyntax);
            if (diagramRef.current) {
                diagramRef.current.innerHTML = svg;
                // Keep SVG dimensions intact — stripping them collapses the SVG to 0×0.
                // We zoom/pan by scaling the wrapper div via CSS transform instead.
                const svgEl = diagramRef.current.querySelector('svg');
                if (svgEl) {
                    svgEl.style.display = 'block';
                }
            }
        } catch (error) {
            console.error('Error generating flowchart diagram:', error);
            if (diagramRef.current) {
                diagramRef.current.innerHTML = '<p style="padding:1rem;color:#dc2626">Error generating flowchart diagram</p>';
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleZoomIn = useCallback(() => setZoom(z => Math.min(z + ZOOM_STEP, MAX_ZOOM)), []);
    const handleZoomOut = useCallback(() => setZoom(z => Math.max(z - ZOOM_STEP, MIN_ZOOM)), []);
    const handleReset = useCallback(() => { setZoom(0.85); setPan({ x: 0, y: 0 }); }, []);

    const handleWheel = useCallback((e: React.WheelEvent) => {
        if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            const delta = e.deltaY > 0 ? -ZOOM_STEP : ZOOM_STEP;
            setZoom(z => Math.min(Math.max(z + delta, MIN_ZOOM), MAX_ZOOM));
        }
    }, []);

    const handleMouseDown = useCallback((e: React.MouseEvent) => {
        if (e.button !== 0) return;
        isPanning.current = true;
        panStart.current = { x: e.clientX, y: e.clientY };
        panOrigin.current = { ...pan };
    }, [pan]);

    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        if (!isPanning.current) return;
        const dx = e.clientX - panStart.current.x;
        const dy = e.clientY - panStart.current.y;
        setPan({ x: panOrigin.current.x + dx, y: panOrigin.current.y + dy });
    }, []);

    const handleMouseUp = useCallback(() => { isPanning.current = false; }, []); const generateMermaidSyntax = (): string => {
        return `
flowchart TD
    Start([Start Validation]) --> Upload[Upload Excel File]
    Upload --> Parse[Parse Fabric Data]
    Parse --> Validate{Validate Structure?}
    
    Validate -->|Invalid| Error1[Show Error Message]
    Error1 --> End1([End])
    
    Validate -->|Valid| CheckServer{Identify Server Type}
    
    CheckServer -->|AIX| AIXCheck[AIX Validation Rules]
    CheckServer -->|ESXi| ESXiCheck[ESXi Validation Rules]
    CheckServer -->|RHEL| RHELCheck[RHEL Validation Rules]
    CheckServer -->|Other| OtherCheck[Default Validation Rules]
    
    AIXCheck --> AIXRules{2 Logged In + 2 Not Logged In per Fabric?}
    ESXiCheck --> ESXiRules{1 Logged In per Fabric?}
    RHELCheck --> RHELRules{1 Logged In per Fabric?}
    OtherCheck --> OtherRules{Check Login Status}
    
    AIXRules -->|Pass| Pass1[✓ Validation Passed]
    AIXRules -->|Fail| Fail1[✗ Validation Failed]
    
    ESXiRules -->|Pass| Pass2[✓ Validation Passed]
    ESXiRules -->|Fail| Fail2[✗ Validation Failed]
    
    RHELRules -->|Pass| Pass3[✓ Validation Passed]
    RHELRules -->|Fail| Fail3[✗ Validation Failed]
    
    OtherRules -->|Pass| Pass4[✓ Validation Passed]
    OtherRules -->|Fail| Fail4[✗ Validation Failed]
    
    Pass1 --> Report[Generate Report]
    Pass2 --> Report
    Pass3 --> Report
    Pass4 --> Report
    
    Fail1 --> Report
    Fail2 --> Report
    Fail3 --> Report
    Fail4 --> Report
    
    Report --> Export{Export Results?}
    Export -->|Yes| ExportFile[Download Excel Report]
    Export -->|No| Display[Display Results]
    
    ExportFile --> End2([End])
    Display --> End2
    
    classDef startEnd fill:#e1f5fe,stroke:#01579b,stroke-width:2px
    classDef process fill:#f3e5f5,stroke:#4a148c,stroke-width:2px
    classDef decision fill:#fff3e0,stroke:#e65100,stroke-width:2px
    classDef success fill:#e8f5e8,stroke:#2e7d32,stroke-width:2px
    classDef error fill:#ffebee,stroke:#c62828,stroke-width:2px
    
    class Start,End1,End2 startEnd
    class Upload,Parse,Report,ExportFile,Display process
    class Validate,CheckServer,AIXRules,ESXiRules,RHELRules,OtherRules,Export decision
    class Pass1,Pass2,Pass3,Pass4 success
    class Error1,Fail1,Fail2,Fail3,Fail4 error
    class AIXCheck,ESXiCheck,RHELCheck,OtherCheck process
    `;
    };

    const getValidationStats = () => {
        if (data.length === 0) return null;

        const passed = data.filter(r => r.finalValidation === 'Good').length;
        const failed = data.filter(r => r.finalValidation !== 'Good').length;
        const fabABad = data.filter(r => r.finalValidation === 'FAB-A Is BAD').length;
        const fabBBad = data.filter(r => r.finalValidation === 'FAB-B Is BAD').length;
        const bothBad = data.filter(r => r.finalValidation === 'Both FABs Are BAD').length;

        return { passed, failed, fabABad, fabBBad, bothBad, total: data.length };
    };

    const stats = getValidationStats();

    return (
        <div className="flex h-full flex-col p-4">
            {/* Zoom controls bar */}
            <div className="mb-3 flex items-center justify-end">
                <div className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-2 py-1.5 shadow-sm">
                    <button
                        onClick={handleZoomOut}
                        disabled={zoom <= MIN_ZOOM}
                        title="Zoom out"
                        className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-800 disabled:cursor-not-allowed disabled:opacity-30"
                    >
                        <FiZoomOut className="text-[15px]" />
                    </button>
                    <span className="min-w-[3rem] text-center text-xs font-semibold tabular-nums text-slate-600">
                        {Math.round(zoom * 100)}%
                    </span>
                    <button
                        onClick={handleZoomIn}
                        disabled={zoom >= MAX_ZOOM}
                        title="Zoom in"
                        className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-800 disabled:cursor-not-allowed disabled:opacity-30"
                    >
                        <FiZoomIn className="text-[15px]" />
                    </button>
                    <div className="mx-1 h-4 w-px bg-slate-200" />
                    <button
                        onClick={handleReset}
                        title="Reset view"
                        className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
                    >
                        <FiMaximize2 className="text-[14px]" />
                    </button>
                    <button
                        onClick={() => generateFlowchartDiagram()}
                        title="Re-render diagram"
                        className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
                    >
                        <FiRefreshCw className="text-[13px]" />
                    </button>
                </div>
            </div>

            {/* Stats row */}
            {stats && (
                <div className="mb-4 flex flex-wrap gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                    {[
                        { value: stats.passed, label: 'Good', color: 'border-emerald-400 bg-emerald-50 text-emerald-700' },
                        { value: stats.failed, label: 'Failed', color: 'border-red-400 bg-red-50 text-red-700' },
                        { value: stats.fabABad, label: 'FAB-A Bad', color: 'border-amber-400 bg-amber-50 text-amber-700' },
                        { value: stats.fabBBad, label: 'FAB-B Bad', color: 'border-amber-400 bg-amber-50 text-amber-700' },
                        { value: stats.total, label: 'Total', color: 'border-indigo-400 bg-indigo-50 text-indigo-700' },
                    ].map(({ value, label, color }) => (
                        <div key={label} className={`flex min-w-[64px] flex-col items-center rounded-lg border px-4 py-2 ${color}`}>
                            <span className="text-xl font-bold">{value}</span>
                            <span className="mt-0.5 text-[11px] font-semibold uppercase tracking-wider opacity-70">{label}</span>
                        </div>
                    ))}
                </div>
            )}

            {/* Diagram canvas */}
            <div
                ref={containerRef}
                onWheel={handleWheel}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                className="relative flex-1 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
                style={{ cursor: isPanning.current ? 'grabbing' : 'grab' }}
            >
                {/* Hint */}
                <p className="pointer-events-none absolute bottom-3 right-3 z-10 rounded-lg bg-slate-900/60 px-2.5 py-1 text-[11px] text-white/70 backdrop-blur-sm">
                    Scroll to pan · Ctrl+Scroll to zoom · Drag to pan
                </p>

                {isLoading && (
                    <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/80">
                        <div className="flex flex-col items-center gap-2 text-slate-400">
                            <FiRefreshCw className="animate-spin text-2xl" />
                            <span className="text-sm">Rendering diagram…</span>
                        </div>
                    </div>
                )}

                <div
                    ref={diagramRef}
                    className="origin-top-left p-4"
                    style={{
                        display: 'inline-block',
                        minWidth: '800px',
                        minHeight: '500px',
                        transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                        transformOrigin: '0 0',
                        transition: isPanning.current ? 'none' : 'transform 0.12s ease',
                    }}
                />
            </div>
        </div>
    );
};

export default ValidationFlowchart;