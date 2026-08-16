import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SmoothScroll from '../components/3d/SmoothScroll';
import SpotlightBackground from '../components/3d/SpotlightBackground';
import HeroScene from '../components/3d/HeroScene';
import TiltCard from '../components/3d/TiltCard';
import DemoShowcase from '../components/DemoShowcase';
import AiCoreSyncModal from '../components/AiCoreSyncModal';

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12
    }
  }
};

const connectedPlatforms = [
  { name: 'Greenhouse', color: 'text-emerald-400', border: 'border-emerald-500/30', bg: 'bg-emerald-500/10' },
  { name: 'Lever', color: 'text-blue-400', border: 'border-blue-500/30', bg: 'bg-blue-500/10' },
  { name: 'Ashby', color: 'text-purple-400', border: 'border-purple-500/30', bg: 'bg-purple-500/10' },
  { name: 'Workable', color: 'text-amber-400', border: 'border-amber-500/30', bg: 'bg-amber-500/10' },
  { name: 'LinkedIn', color: 'text-sky-400', border: 'border-sky-500/30', bg: 'bg-sky-500/10' },
  { name: 'Naukri', color: 'text-rose-400', border: 'border-rose-500/30', bg: 'bg-rose-500/10' },
];

export default function Landing() {
  const [stats, setStats] = useState({ totalUsers: 0, totalApplications: 0, platforms: 6 });
  const [showAiModal, setShowAiModal] = useState(false);

  useEffect(() => {
    fetch('/api/stats')
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(() => {});
  }, []);

  return (
    <SmoothScroll>
      <div className="min-h-screen bg-surface-950 text-white font-sans flex flex-col relative selection:bg-primary-500 selection:text-white overflow-x-hidden w-full">
        {/* Dynamic 3D Spotlight & Grid Backdrop */}
        <SpotlightBackground />
        
        <Navbar />

        <main className="flex-1 relative z-10 w-full overflow-x-hidden">
          {/* ========================================================================= */}
          {/* 3D HERO SECTION                                                           */}
          {/* ========================================================================= */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-14 sm:pt-10 sm:pb-20 lg:pt-14 lg:pb-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Left Column: Kinetic Typography & CTAs */}
              <motion.div 
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
                className="lg:col-span-6 text-center lg:text-left z-20"
              >
                {/* Holographic Badge */}
                <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-900/90 border border-primary-500/40 backdrop-blur-xl shadow-lg shadow-primary-500/10 mb-5 max-w-full">
                  <span className="flex h-2 w-2 relative shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
                  </span>
                  <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-primary-300 truncate">
                    Next-Gen 3D Job Automation Engine
                  </span>
                </motion.div>

                {/* Primary Hero Headline */}
                <motion.h1 variants={fadeInUp} className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.12] mb-5 sm:mb-6">
                  <span className="block text-white">Apply to Jobs Everywhere,</span>
                  <span className="block gradient-text mt-1 bg-gradient-to-r from-primary-400 via-purple-400 to-accent-300">
                    Automatically.
                  </span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p variants={fadeInUp} className="text-sm sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto lg:mx-0 mb-7 sm:mb-8 leading-relaxed font-normal">
                  Build your candidate profile once. Seamlessly discover, autofill, and synchronize live applications across <strong className="text-white">LinkedIn, Naukri, Greenhouse, Lever, Ashby, and Workable</strong> in one unified workspace.
                </motion.p>

                {/* Interactive CTAs */}
                <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start items-stretch sm:items-center mb-8 sm:mb-10 w-full sm:w-auto">
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="w-full sm:w-auto">
                    <Link 
                      to="/signup" 
                      className="btn-primary w-full sm:w-auto text-base sm:text-lg px-7 py-3.5 shadow-2xl shadow-primary-500/30 hover:shadow-primary-500/60 transition-all flex items-center justify-center gap-2 group"
                    >
                      <span>Get Started Free</span>
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </Link>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="w-full sm:w-auto">
                    <a 
                      href="#how-it-works" 
                      className="btn-secondary w-full sm:w-auto text-base sm:text-lg px-7 py-3.5 backdrop-blur-xl border-white/10 hover:border-primary-400/40 transition-colors flex items-center justify-center gap-2"
                    >
                      <span>▶ Watch Demo</span>
                    </a>
                  </motion.div>
                </motion.div>

                {/* Connected Platforms Pill Badges */}
                <motion.div variants={fadeInUp} className="pt-5 border-t border-white/10">
                  <div className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3 text-center lg:text-left">
                    Integrated Career Portals & ATS Engines
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                    {connectedPlatforms.map((p) => (
                      <span 
                        key={p.name}
                        className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl text-xs font-bold border ${p.border} ${p.bg} ${p.color} backdrop-blur-md flex items-center gap-1.5 shadow-sm`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-current shrink-0" />
                        {p.name}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>

              {/* Right Column: 3D Interactive WebGL Canvas with Floating Badges */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-6 relative flex items-center justify-center h-[320px] sm:h-[400px] lg:h-[500px] w-full my-2 lg:my-0"
              >
                <div className="w-full h-full relative flex items-center justify-center">
                  <HeroScene />
                  
                  {/* Floating Holographic Specular Tags */}
                  <motion.button 
                    onClick={() => setShowAiModal(true)}
                    initial={{ y: 15, opacity: 0 }}
                    animate={{ y: [0, -5, 0], opacity: 1 }}
                    transition={{ y: { repeat: Infinity, duration: 4, ease: "easeInOut" }, delay: 0.4 }}
                    className="absolute top-2 sm:top-4 left-2 sm:left-4 card-glass px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-2xl border-primary-500/40 backdrop-blur-xl shadow-xl shadow-primary-500/15 flex items-center gap-2.5 cursor-pointer hover:border-primary-400 hover:scale-105 transition-all text-left z-30"
                  >
                    <span className="text-xl sm:text-2xl">🤖</span>
                    <div>
                      <div className="text-[11px] sm:text-xs font-bold text-white flex items-center gap-1.5">
                        AI Core Sync
                        <span className="text-[9px] px-1.5 py-0.2 rounded bg-primary-500/30 text-primary-200">Open ↗</span>
                      </div>
                      <div className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping shrink-0" />
                        <span>ATS Active</span>
                      </div>
                    </div>
                  </motion.button>
                </div>
              </motion.div>

            </div>
          </section>

          {/* ========================================================================= */}
          {/* REAL DATABASE STATS STRIP                                                 */}
          {/* ========================================================================= */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 border-y border-white/5 relative bg-white/[0.01]">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={staggerContainer}
              className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6 text-center"
            >
              <motion.div variants={fadeInUp}>
                <TiltCard maxTilt={10}>
                  <div className="card-glass p-5 sm:p-6 rounded-2xl border-white/10 flex items-center justify-center gap-4">
                    <span className="text-3xl sm:text-4xl p-2 rounded-xl bg-primary-500/10 shrink-0">👥</span>
                    <div className="text-left">
                      <div className="text-2xl sm:text-4xl font-extrabold text-white gradient-text bg-gradient-to-r from-white to-primary-200">
                        {stats.totalUsers.toLocaleString()}
                      </div>
                      <div className="text-gray-400 text-[11px] sm:text-xs font-bold uppercase tracking-wider mt-0.5">
                        Active Job Seekers
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <TiltCard maxTilt={10}>
                  <div className="card-glass p-5 sm:p-6 rounded-2xl border-white/10 flex items-center justify-center gap-4">
                    <span className="text-3xl sm:text-4xl p-2 rounded-xl bg-accent-500/10 shrink-0">🚀</span>
                    <div className="text-left">
                      <div className="text-2xl sm:text-4xl font-extrabold text-white gradient-text bg-gradient-to-r from-white to-accent-200">
                        {stats.totalApplications.toLocaleString()}
                      </div>
                      <div className="text-gray-400 text-[11px] sm:text-xs font-bold uppercase tracking-wider mt-0.5">
                        Applications Tracked
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <TiltCard maxTilt={10}>
                  <div className="card-glass p-5 sm:p-6 rounded-2xl border-white/10 flex items-center justify-center gap-4">
                    <span className="text-3xl sm:text-4xl p-2 rounded-xl bg-purple-500/10 shrink-0">🌐</span>
                    <div className="text-left">
                      <div className="text-2xl sm:text-4xl font-extrabold text-white gradient-text bg-gradient-to-r from-white to-purple-200">
                        {stats.platforms}
                      </div>
                      <div className="text-gray-400 text-[11px] sm:text-xs font-bold uppercase tracking-wider mt-0.5">
                        Live Platforms Supported
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            </motion.div>
          </section>

          {/* ========================================================================= */}
          {/* HOW IT WORKS SECTION WITH INTERACTIVE PRODUCT DEMO VIDEO SHOWCASE         */}
          {/* ========================================================================= */}
          <section id="how-it-works" className="py-14 sm:py-20 relative my-2 sm:my-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              {/* Header */}
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={fadeInUp}
                className="text-center mb-10 sm:mb-14"
              >
                <span className="text-primary-400 font-bold text-xs uppercase tracking-widest bg-primary-500/10 border border-primary-500/20 px-3.5 py-1.5 rounded-full">
                  Interactive Product Demo
                </span>
                <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white mt-3 tracking-tight">
                  How Job Grid Works in Action
                </h2>
                <p className="mt-3 text-gray-400 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto px-2">
                  Watch how our automated workflow transforms manual job applications into an effortless, real-time experience.
                </p>
              </motion.div>

              {/* Interactive Demo Showcase Player */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                variants={fadeInUp}
                className="mb-12 sm:mb-16 w-full"
              >
                <DemoShowcase />
              </motion.div>

              {/* 3 Step Deep Dive Grid */}
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                variants={staggerContainer}
                className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8"
              >
                {/* Step 1 */}
                <motion.div variants={fadeInUp}>
                  <TiltCard maxTilt={10} className="h-full">
                    <div className="card-glass p-6 sm:p-8 rounded-3xl border-white/10 bg-gradient-to-b from-surface-900/90 to-surface-950 flex flex-col justify-between h-full">
                      <div>
                        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-surface-900 border-2 border-primary-500 flex items-center justify-center text-xl sm:text-2xl font-extrabold text-primary-400 mb-5 sm:mb-6 shadow-xl shadow-primary-500/25">
                          1
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Build Single Master Profile</h3>
                        <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                          Enter your headline, contact details, skills, location preference, and resume once in your encrypted candidate profile.
                        </p>
                      </div>
                      <div className="mt-5 pt-4 border-t border-white/5 text-xs text-primary-400 font-semibold">
                        ✓ Saved to SQLite in Real-Time
                      </div>
                    </div>
                  </TiltCard>
                </motion.div>
                
                {/* Step 2 */}
                <motion.div variants={fadeInUp}>
                  <TiltCard maxTilt={10} className="h-full">
                    <div className="card-glass p-6 sm:p-8 rounded-3xl border-white/10 bg-gradient-to-b from-surface-900/90 to-surface-950 flex flex-col justify-between h-full">
                      <div>
                        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-surface-900 border-2 border-accent-400 flex items-center justify-center text-xl sm:text-2xl font-extrabold text-accent-400 mb-5 sm:mb-6 shadow-xl shadow-accent-500/25">
                          2
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Discover Live ATS Postings</h3>
                        <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                          Search verified openings aggregated directly from Greenhouse, Lever, Ashby, and Workable with location and keyword filters.
                        </p>
                      </div>
                      <div className="mt-5 pt-4 border-t border-white/5 text-xs text-accent-400 font-semibold">
                        ✓ Live Public ATS Feeds
                      </div>
                    </div>
                  </TiltCard>
                </motion.div>
                
                {/* Step 3 */}
                <motion.div variants={fadeInUp}>
                  <TiltCard maxTilt={10} className="h-full">
                    <div className="card-glass p-6 sm:p-8 rounded-3xl border-white/10 bg-gradient-to-b from-surface-900/90 to-surface-950 flex flex-col justify-between h-full">
                      <div>
                        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-surface-900 border-2 border-purple-400 flex items-center justify-center text-xl sm:text-2xl font-extrabold text-purple-400 mb-5 sm:mb-6 shadow-xl shadow-purple-500/25">
                          3
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold text-white mb-2">1-Click Apply & Track</h3>
                        <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                          Click apply to autofill application forms in seconds. Submitted applications automatically synchronize to your tracking pipeline.
                        </p>
                      </div>
                      <div className="mt-5 pt-4 border-t border-white/5 text-xs text-purple-400 font-semibold">
                        ✓ Automated Status Logging
                      </div>
                    </div>
                  </TiltCard>
                </motion.div>
              </motion.div>

            </div>
          </section>

          {/* ========================================================================= */}
          {/* FEATURES SECTION                                                          */}
          {/* ========================================================================= */}
          <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeInUp}
              className="text-center mb-12 sm:mb-16"
            >
              <span className="text-primary-400 text-xs font-bold tracking-widest uppercase bg-primary-500/10 border border-primary-500/20 px-3.5 py-1.5 rounded-full">
                Architected for Speed
              </span>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white mt-3 sm:mt-4 tracking-tight">
                Why Choose Job Grid?
              </h2>
              <p className="mt-3 text-gray-400 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto">
                Everything you need to land your next opportunity, 10x faster.
              </p>
            </motion.div>
            
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={staggerContainer}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            >
              {/* Feature Card 1 */}
              <motion.div variants={fadeInUp}>
                <TiltCard maxTilt={12} className="h-full">
                  <div className="card-glass p-6 sm:p-8 rounded-3xl border-white/10 h-full flex flex-col justify-between hover:border-primary-500/50 transition-colors">
                    <div>
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-600 to-indigo-600 flex items-center justify-center text-2xl shadow-lg shadow-primary-500/25 mb-6">
                        ⚡
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Automated Form Filling</h3>
                      <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                        Say goodbye to typing your name, phone, resume, and experience hundreds of times across different portals.
                      </p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-white/5 text-xs text-primary-400 font-semibold flex items-center gap-1">
                      <span>Instant autofill</span> →
                    </div>
                  </div>
                </TiltCard>
              </motion.div>

              {/* Feature Card 2 */}
              <motion.div variants={fadeInUp}>
                <TiltCard maxTilt={12} className="h-full">
                  <div className="card-glass p-6 sm:p-8 rounded-3xl border-white/10 h-full flex flex-col justify-between hover:border-accent-500/50 transition-colors">
                    <div>
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-accent-600 to-teal-500 flex items-center justify-center text-2xl shadow-lg shadow-accent-500/25 mb-6">
                        🎯
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Aggregated Direct Openings</h3>
                      <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                        Curated verified feeds from top startup job boards so you apply directly to company hiring managers.
                      </p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-white/5 text-xs text-accent-400 font-semibold flex items-center gap-1">
                      <span>Verified ATS feeds</span> →
                    </div>
                  </div>
                </TiltCard>
              </motion.div>

              {/* Feature Card 3 */}
              <motion.div variants={fadeInUp}>
                <TiltCard maxTilt={12} className="h-full">
                  <div className="card-glass p-6 sm:p-8 rounded-3xl border-white/10 h-full flex flex-col justify-between hover:border-purple-500/50 transition-colors">
                    <div>
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center text-2xl shadow-lg shadow-purple-500/25 mb-6">
                        📊
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Live Application Tracker</h3>
                      <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                        Keep all your job submissions neatly organized in a Kanban-style pipeline with real-time status updates.
                      </p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-white/5 text-xs text-purple-400 font-semibold flex items-center gap-1">
                      <span>Real-time SQLite sync</span> →
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            </motion.div>
          </section>

          {/* ========================================================================= */}
          {/* CTA BANNER                                                                */}
          {/* ========================================================================= */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={fadeInUp}
              className="card-glass p-8 sm:p-12 lg:p-16 rounded-3xl border border-primary-500/30 text-center relative overflow-hidden bg-gradient-to-b from-surface-900 via-surface-950 to-surface-950"
            >
              <div className="max-w-2xl mx-auto relative z-10">
                <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                  Ready to Automate Your Job Search?
                </h2>
                <p className="mt-3 text-sm sm:text-lg text-gray-300">
                  Join hundreds of ambitious candidates using Job Grid to streamline applications and land interviews 10x faster.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                  <Link to="/signup" className="btn-primary text-base sm:text-lg px-8 py-3.5">
                    Create Free Account →
                  </Link>
                  <Link to="/jobs" className="btn-secondary text-base sm:text-lg px-8 py-3.5">
                    Browse All Jobs
                  </Link>
                </div>
              </div>
            </motion.div>
          </section>

        </main>

        <Footer />
        
        {/* Global AI Core Sync Modal */}
        <AiCoreSyncModal isOpen={showAiModal} onClose={() => setShowAiModal(false)} />
      </div>
    </SmoothScroll>
  );
}
