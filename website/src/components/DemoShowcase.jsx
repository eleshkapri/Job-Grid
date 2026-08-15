import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function DemoShowcase() {
  const [activeTab, setActiveTab] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  const demoSteps = [
    {
      id: 0,
      title: '1. Instant Form Autofill',
      subtitle: 'Chrome Extension in Action',
      badge: 'Manifest V3 Extension',
      icon: '⚡',
      accent: 'from-primary-500 to-indigo-500',
      description: 'Our extension detects job forms on LinkedIn & Naukri and fills name, contact, resume, skills, and experience with a single click.',
      metrics: { speed: '0.4s Autofill', accuracy: '100% Match', compatibility: 'Easy Apply' }
    },
    {
      id: 1,
      title: '2. Live ATS Discovery',
      subtitle: 'Greenhouse & Lever Aggregator',
      badge: 'Public Boards API',
      icon: '🌐',
      accent: 'from-purple-500 to-pink-500',
      description: 'Discovers verified openings directly from startup career boards (Greenhouse, Lever, Ashby, Workable) with location filters.',
      metrics: { latency: 'Real-time sync', sources: '6+ ATS Portals', filters: 'Remote / On-site' }
    },
    {
      id: 2,
      title: '3. Real-Time Pipeline Tracker',
      subtitle: 'SQLite Central Dashboard',
      badge: 'Live Database Sync',
      icon: '📊',
      accent: 'from-emerald-500 to-teal-500',
      description: 'Every submitted application automatically syncs to your personal SQLite database, updating stats and interview stages live.',
      metrics: { db: 'Zero Latency', status: 'Instant Update', security: 'Encrypted' }
    }
  ];

  // Auto-advance demo progress
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveTab((curr) => (curr + 1) % demoSteps.length);
          return 0;
        }
        return prev + 1.25;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [isPlaying, demoSteps.length]);

  const handleTabChange = (index) => {
    setActiveTab(index);
    setProgress(0);
  };

  const currentStep = demoSteps[activeTab];

  return (
    <div className="w-full relative">
      {/* Glow Backdrop */}
      <div className="absolute -inset-1 bg-gradient-to-r from-primary-500/20 via-purple-500/20 to-accent-400/20 rounded-3xl blur-2xl opacity-60 pointer-events-none" />

      {/* Main Glass Shell Container */}
      <div className="relative card-glass rounded-3xl border border-white/15 bg-surface-900/95 backdrop-blur-2xl shadow-2xl overflow-hidden">
        
        {/* macOS Window Title Bar */}
        <div className="px-6 py-4 border-b border-white/10 bg-white/[0.03] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80 border border-red-600/40" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80 border border-yellow-600/40" />
            <div className="w-3 h-3 rounded-full bg-green-500/80 border border-green-600/40" />
            <span className="ml-3 text-xs font-mono text-gray-400 font-medium hidden sm:inline">
              jobgrid-live-demo-v2.mp4 · Interactive Preview
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-semibold text-gray-300 transition-colors flex items-center gap-1.5 cursor-pointer border border-white/10"
            >
              <span>{isPlaying ? '⏸ Pause' : '▶ Play'}</span>
            </button>
            <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              Live Demo
            </span>
          </div>
        </div>

        {/* Step Navigation Pill Tabs */}
        <div className="p-4 sm:p-6 border-b border-white/10 bg-surface-950/40">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {demoSteps.map((step, idx) => (
              <button
                key={step.id}
                onClick={() => handleTabChange(idx)}
                className={`p-3.5 rounded-2xl text-left transition-all relative overflow-hidden cursor-pointer border ${
                  activeTab === idx
                    ? 'bg-surface-800/90 border-primary-500/60 shadow-lg shadow-primary-500/10'
                    : 'bg-white/[0.02] border-white/5 hover:bg-white/[0.05] hover:border-white/15'
                }`}
              >
                {/* Progress bar line for active tab */}
                {activeTab === idx && (
                  <div 
                    className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary-500 to-purple-400 transition-all duration-75"
                    style={{ width: `${progress}%` }}
                  />
                )}

                <div className="flex items-center gap-3">
                  <span className="text-xl p-2 rounded-xl bg-white/5 shrink-0">{step.icon}</span>
                  <div className="truncate">
                    <div className={`text-xs font-bold ${activeTab === idx ? 'text-white' : 'text-gray-400'}`}>
                      {step.title}
                    </div>
                    <div className="text-[11px] text-gray-500 truncate mt-0.5">
                      {step.subtitle}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Demo Viewport Display */}
        <div className="p-6 sm:p-8 lg:p-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              {/* Left Details */}
              <div className="lg:col-span-5 space-y-5">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${currentStep.accent} text-white shadow-md`}>
                  {currentStep.badge}
                </span>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                  {currentStep.subtitle}
                </h3>

                <p className="text-gray-300 text-sm leading-relaxed">
                  {currentStep.description}
                </p>

                {/* Metrics Badges */}
                <div className="grid grid-cols-3 gap-3 pt-3">
                  {Object.entries(currentStep.metrics).map(([key, val]) => (
                    <div key={key} className="p-3 rounded-xl bg-white/[0.03] border border-white/10 text-center">
                      <div className="text-xs font-bold text-white truncate">{val}</div>
                      <div className="text-[10px] text-gray-400 uppercase tracking-wider mt-0.5 font-medium">{key}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Interactive High-Fidelity Simulation Visual */}
              <div className="lg:col-span-7">
                <div className="relative rounded-2xl bg-surface-950 border border-white/15 p-5 shadow-2xl overflow-hidden min-h-[300px] flex flex-col justify-between">
                  
                  {/* Decorative Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-white/10 text-xs text-gray-400">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      <span className="font-mono text-emerald-300 text-[11px]">AUTOPILOT RUNNING</span>
                    </div>
                    <span className="font-mono text-[11px] text-gray-500">Target: Greenhouse / LinkedIn</span>
                  </div>

                  {/* Dynamic Simulation Content by Step */}
                  {activeTab === 0 && (
                    <div className="space-y-3 py-4 animate-fade-in">
                      <div className="flex items-center justify-between p-3 rounded-xl bg-primary-500/10 border border-primary-500/30">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">⚡</span>
                          <div>
                            <div className="text-xs font-bold text-white">1-Click AutoApply Extension</div>
                            <div className="text-[11px] text-primary-300">Target Field: Easy Apply Form Detected</div>
                          </div>
                        </div>
                        <span className="px-2.5 py-1 rounded-md bg-primary-600 text-[10px] font-bold text-white animate-pulse">
                          Autofilling...
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div className="p-2.5 rounded-lg bg-surface-900 border border-white/10">
                          <span className="text-gray-500 block text-[10px]">CANDIDATE NAME</span>
                          <span className="text-white font-mono font-medium">Elesh Kapri</span>
                        </div>
                        <div className="p-2.5 rounded-lg bg-surface-900 border border-white/10">
                          <span className="text-gray-500 block text-[10px]">EMAIL ADDRESS</span>
                          <span className="text-white font-mono font-medium">elesh@jobgrid.dev</span>
                        </div>
                        <div className="p-2.5 rounded-lg bg-surface-900 border border-white/10">
                          <span className="text-gray-500 block text-[10px]">TARGET LOCATION</span>
                          <span className="text-accent-300 font-mono font-medium">Bangalore / Remote</span>
                        </div>
                        <div className="p-2.5 rounded-lg bg-surface-900 border border-white/10">
                          <span className="text-gray-500 block text-[10px]">ATTACHED RESUME</span>
                          <span className="text-emerald-400 font-mono font-medium">✓ Resume-2026.pdf</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 1 && (
                    <div className="space-y-2.5 py-4 animate-fade-in">
                      <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/10 flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">Greenhouse</span>
                          <span className="text-xs font-semibold text-white">Stripe · Frontend Engineer</span>
                        </div>
                        <span className="text-[11px] text-gray-400">San Francisco, CA</span>
                      </div>

                      <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/10 flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-500/20 text-purple-400 border border-purple-500/30">Ashby</span>
                          <span className="text-xs font-semibold text-white">Linear · React Engineer</span>
                        </div>
                        <span className="text-[11px] text-gray-400">Remote Only</span>
                      </div>

                      <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/10 flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30">Lever</span>
                          <span className="text-xs font-semibold text-white">Spotify · Full Stack Developer</span>
                        </div>
                        <span className="text-[11px] text-gray-400">New York, NY</span>
                      </div>
                    </div>
                  )}

                  {activeTab === 2 && (
                    <div className="space-y-3 py-4 animate-fade-in">
                      <div className="grid grid-cols-4 gap-2 text-center text-xs">
                        <div className="p-2 rounded-lg bg-primary-500/10 border border-primary-500/30">
                          <div className="text-base font-bold text-white">12</div>
                          <div className="text-[10px] text-gray-400">Applied</div>
                        </div>
                        <div className="p-2 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
                          <div className="text-base font-bold text-yellow-400">4</div>
                          <div className="text-[10px] text-gray-400">Interview</div>
                        </div>
                        <div className="p-2 rounded-lg bg-green-500/10 border border-green-500/30">
                          <div className="text-base font-bold text-green-400">2</div>
                          <div className="text-[10px] text-gray-400">Offer</div>
                        </div>
                        <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/30">
                          <div className="text-base font-bold text-purple-400">100%</div>
                          <div className="text-[10px] text-gray-400">Live Sync</div>
                        </div>
                      </div>

                      <div className="p-3 rounded-xl bg-surface-900 border border-white/10 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2.5">
                          <span className="text-base">🎉</span>
                          <div>
                            <span className="font-semibold text-white">Google · Frontend Specialist</span>
                            <span className="text-gray-500 block text-[10px]">Status changed to "Interview"</span>
                          </div>
                        </div>
                        <span className="badge badge-warning text-[10px]">Scheduled</span>
                      </div>
                    </div>
                  )}

                  {/* Footer Status */}
                  <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-gray-500">
                    <span>Frame: 60 FPS · Hardware Accelerated</span>
                    <span className="text-primary-400 font-mono">Status: Connected to SQLite Engine</span>
                  </div>

                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
