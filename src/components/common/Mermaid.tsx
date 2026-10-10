import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

mermaid.initialize({
  startOnLoad: true,
  theme: 'dark',
  securityLevel: 'loose',
  themeVariables: {
    background: '#0f172a', // slate-900 / card
    primaryColor: '#1e293b', // slate-800
    primaryTextColor: '#f8fafc', // slate-50
    lineColor: '#1976d2', // primary brand blue
    actorBorder: '#334155', // slate-700
    nodeBorder: '#334155',
    signalColor: '#1976d2',
    signalLineColor: '#1976d2',
  }
});

interface MermaidProps {
  chart: string;
}

export const Mermaid: React.FC<MermaidProps> = ({ chart }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.removeAttribute('data-processed');
      mermaid.contentLoaded();
    }
  }, [chart]);

  return (
    <div 
      className="mermaid bg-card p-6 rounded-xl border border-border overflow-x-auto flex justify-center w-full" 
      ref={containerRef}
    >
      {chart}
    </div>
  );
};
