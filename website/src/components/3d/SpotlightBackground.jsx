import { useState, useEffect } from 'react';

export default function SpotlightBackground() {
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* 3D Cyber-Grid Plane */}
      <div 
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 30%, black 40%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 30%, black 40%, transparent 80%)'
        }}
      />

      {/* Dynamic Cursor Spotlight Light Field */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          background: `radial-gradient(750px circle at ${mousePos.x}px ${mousePos.y}px, rgba(99, 102, 241, 0.14), rgba(168, 85, 247, 0.05) 40%, transparent 70%)`,
        }}
      />

      {/* Atmospheric Ambient Blobs */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-primary-600/15 rounded-full blur-[140px] animate-pulse" />
      <div className="absolute top-1/3 -right-40 w-[550px] h-[550px] bg-purple-600/10 rounded-full blur-[150px]" />
      <div className="absolute -bottom-40 left-1/3 w-[650px] h-[650px] bg-indigo-600/10 rounded-full blur-[160px]" />
    </div>
  );
}
