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
        <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-white/10 bg-white/[0.03] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500/80 border border-red-600/40" />
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500/80 border border-yellow-600/40" />
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500/80 border border-green-600/40" />
            <span className="ml-2 sm:ml-3 text-[11px] sm:text-xs font-mono text-gray-400 font-medium truncate max-w-[160px] sm:max-w-none">
              jobgrid-demo-v2.6 · Interactive Preview
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-semibold text-gray-300 transition-colors flex items-center gap-1 cursor-pointer border border-white/10"
            >
              <span>{isPlaying ? '⏸ Pause' : '▶ Play'}</span>
            </button>
            <span className="text-[10px] sm:text-[11px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="hidden sm:inline">Live Demo</span>
              <span className="sm:hidden">Live</span>
            </span>
          </div>
        </div>

        {/* Step Navigation Pill Tabs */}
        <div className="p-3 sm:p-6 border-b border-white/10 bg-surface-950/40">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
            {demoSteps.map((step, idx) => (
              <button
                key={step.id}
                onClick={() => handleTabChange(idx)}
                className={`p-3 sm:p-3.5 rounded-2xl text-left transition-all relative overflow-hidden cursor-pointer border ${
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

                <div className="flex items-center gap-2.5 sm:gap-3">
                  <span className="text-lg sm:text-xl p-1.5 sm:p-2 rounded-xl bg-white/5 shrink-0">{step.icon}</span>
                  <div className="min-w-0 flex-1">
                    <div className={`text-xs font-bold truncate ${activeTab === idx ? 'text-white' : 'text-gray-400'}`}>
                      {step.title}
                    </div>
                    <div className="text-[10px] sm:text-[11px] text-gray-500 truncate mt-0.5">
                      {step.subtitle}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Demo Viewport Display */}
        <div className="p-4 sm:p-8 lg:p-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center"
            >
              {/* Left Details */}
              <div className="lg:col-span-5 space-y-4 sm:space-y-5">
                <span className={`inline-block px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold bg-gradient-to-r ${currentStep.accent} text-white shadow-md`}>
                  {currentStep.badge}
                </span>

                <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white leading-tight">
                  {currentStep.subtitle}
                </h3>

                <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                  {currentStep.description}
                </p>

                {/* Metrics Badges */}
                <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-2">
                  {Object.entries(currentStep.metrics).map(([key, val]) => (
                    <div key={key} className="p-2.5 sm:p-3 rounded-xl bg-surface-950/60 border border-white/5 text-center">
                      <div className="text-[10px] text-gray-400 uppercase font-mono">{key}</div>
                      <div className="text-xs sm:text-sm font-bold text-white mt-0.5 truncate">{val}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Interactive Simulation Canvas */}
              <div className="lg:col-span-7 bg-surface-950 rounded-2xl border border-white/10 p-4 sm:p-6 shadow-inner relative overflow-hidden min-h-[260px] sm:min-h-[320px] flex flex-col justify-between">
                
                {/* Visual Simulation for Step 0: Extension Form Autofill */}
                {activeTab === 0 && (
                  <div className="space-y-3 sm:space-y-4 animate-fade-in text-xs sm:text-sm">
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-md bg-blue-600 flex items-center justify-center text-white font-bold text-xs shrink-0">in</span>
                        <span className="font-semibold text-white truncate text-xs sm:text-sm">Senior React Developer · Easy Apply</span>
                      </div>
                      <span className="badge-success text-[10px] sm:text-xs">Detected</span>
                    </div>

                    <div className="space-y-2 font-mono text-[11px] sm:text-xs text-gray-300">
                      <div className="flex justify-between p-2 rounded-lg bg-surface-900 border border-white/5 items-center">
                        <span className="text-gray-400">Full Name:</span>
                        <span className="text-emerald-400 font-semibold truncate ml-2">✓ Verified Profile</span>
                      </div>
                      <div className="flex justify-between p-2 rounded-lg bg-surface-900 border border-white/5 items-center">
                        <span className="text-gray-400">Resume Attached:</span>
                        <span className="text-emerald-400 font-semibold truncate ml-2">✓ Master_Resume.pdf</span>
                      </div>
                      <div className="flex justify-between p-2 rounded-lg bg-surface-900 border border-white/5 items-center">
                        <span className="text-gray-400">Skills Matching:</span>
                        <span className="text-emerald-400 font-semibold truncate ml-2">✓ React, TS, Tailwind, Node</span>
                      </div>
                    </div>

                    <div className="pt-2 flex items-center justify-between">
                      <span className="text-[10px] text-gray-500">Auto-filled in 420ms</span>
                      <button className="btn-primary py-1.5 px-3 sm:px-4 text-xs">
                        🚀 Submit Application
                      </button>
                    </div>
                  </div>
                )}

                {/* Visual Simulation for Step 1: Real-time ATS Board Fetching */}
                {activeTab === 1 && (
                  <div className="space-y-3 animate-fade-in text-xs sm:text-sm">
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping shrink-0" />
                        <span className="font-semibold text-white text-xs sm:text-sm">Live ATS Board Stream</span>
                      </div>
                      <span className="text-[10px] sm:text-xs font-mono text-gray-400">6 Boards Active</span>
                    </div>

                    <div className="space-y-2">
                      <div className="p-2.5 rounded-xl bg-surface-900 border border-white/5 flex items-center justify-between">
                        <div className="truncate mr-2">
                          <div className="font-bold text-white text-xs truncate">Software Engineer I</div>
                          <div className="text-[11px] text-gray-400">Stripe · San Francisco / Remote</div>
                        </div>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shrink-0">Greenhouse</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-surface-900 border border-white/5 flex items-center justify-between">
                        <div className="truncate mr-2">
                          <div className="font-bold text-white text-xs truncate">Frontend Engineer (Design)</div>
                          <div className="text-[11px] text-gray-400">Linear · Remote (Global)</div>
                        </div>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30 shrink-0">Ashby</span>
                      </div>
                    </div>

                    <div className="pt-1 text-center text-[10px] sm:text-xs text-accent-400 font-semibold">
                      ✓ Direct application endpoint generated automatically
                    </div>
                  </div>
                )}

                {/* Visual Simulation for Step 2: Central SQLite Database Sync */}
                {activeTab === 2 && (
                  <div className="space-y-3 animate-fade-in text-xs sm:text-sm">
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <span className="font-semibold text-white text-xs sm:text-sm">Live SQLite Database Stream</span>
                      <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        SYNCED
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 sm:gap-3">
                      <div className="p-3 rounded-xl bg-surface-900 border border-white/5">
                        <div className="text-[10px] text-gray-400 font-mono">STATUS</div>
                        <div className="text-xs sm:text-sm font-bold text-primary-300 mt-1">Applied & Logged</div>
                      </div>
                      <div className="p-3 rounded-xl bg-surface-900 border border-white/5">
                        <div className="text-[10px] text-gray-400 font-mono">ENCRYPTION</div>
                        <div className="text-xs sm:text-sm font-bold text-emerald-400 mt-1">Local & Private</div>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-primary-500/10 border border-primary-500/20 text-center">
                      <span className="text-xs text-primary-300 font-semibold">
                        📊 Dashboard and tracker update automatically with zero page reload
                      </span>
                    </div>
                  </div>
                )}

              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
