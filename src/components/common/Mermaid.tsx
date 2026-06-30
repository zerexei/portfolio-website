import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

mermaid.initialize({
  startOnLoad: true,
  theme: 'dark',
  securityLevel: 'loose',
  themeVariables: {
    background: '#18181b', // zinc-900
    primaryColor: '#27272a', // zinc-800
    primaryTextColor: '#f4f4f5', // zinc-100
    lineColor: '#55ffff', // accent cyan
    actorBorder: '#3f3f46',
    nodeBorder: '#3f3f46',
    signalColor: '#55ffff',
    signalLineColor: '#55ffff',
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
      className="mermaid bg-zinc-950/40 p-6 rounded-xl border border-zinc-800/80 overflow-x-auto flex justify-center w-full" 
      ref={containerRef}
    >
      {chart}
    </div>
  );
};
