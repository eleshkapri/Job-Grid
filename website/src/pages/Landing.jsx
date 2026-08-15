import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SmoothScroll from '../components/3d/SmoothScroll';
import SpotlightBackground from '../components/3d/SpotlightBackground';
import HeroScene from '../components/3d/HeroScene';
import TiltCard from '../components/3d/TiltCard';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

export default function Landing() {
  const [stats, setStats] = useState({ totalUsers: 0, totalApplications: 0, platforms: 6 });

  useEffect(() => {
    fetch('/api/stats')
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(() => {});
  }, []);

  return (
    <SmoothScroll>
      <div className="min-h-screen bg-surface-950 text-white font-sans flex flex-col relative selection:bg-primary-500 selection:text-white overflow-x-hidden">
        {/* Dynamic 3D Spotlight & Grid Backdrop */}
        <SpotlightBackground />
        
        <Navbar />

        <main className="flex-1 relative z-10">
          {/* ========================================================================= */}
          {/* 3D HERO SECTION                                                           */}
          {/* ========================================================================= */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-20 lg:pt-20 lg:pb-28">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Column: Kinetic Typography & CTAs */}
              <motion.div 
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
                className="lg:col-span-7 text-center lg:text-left z-20"
              >
                {/* Holographic Badge */}
                <motion.div variants={fadeInUp} className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-surface-900/90 border border-primary-500/40 backdrop-blur-xl shadow-lg shadow-primary-500/10 mb-6">
                  <span className="flex h-2.5 w-2.5 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary-500"></span>
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider text-primary-300">
                    Next-Gen 3D Job Automation Engine
                  </span>
                </motion.div>

                {/* Primary Hero Headline */}
                <motion.h1 variants={fadeInUp} className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6">
                  <span className="block text-white">Apply to Jobs Everywhere,</span>
                  <span className="block gradient-text mt-1 bg-gradient-to-r from-primary-400 via-purple-400 to-accent-300">
                    Automatically.
                  </span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p variants={fadeInUp} className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto lg:mx-0 mb-10 leading-relaxed font-normal">
                  Build your verified candidate profile once. Seamlessly discover, autofill, and synchronize live applications across <strong className="text-white">LinkedIn, Naukri, Greenhouse, Lever, Ashby, and Workable</strong> in one unified 3D workspace.
                </motion.p>

                {/* Interactive CTAs with Hover Springs */}
                <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
                  <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                    <Link 
                      to="/signup" 
                      className="btn-primary text-lg px-8 py-4 shadow-2xl shadow-primary-500/30 hover:shadow-primary-500/60 transition-all flex items-center gap-2 group"
                    >
                      <span>Get Started Free</span>
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </Link>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                    <a 
                      href="#how-it-works" 
                      className="btn-secondary text-lg px-8 py-4 backdrop-blur-xl border-white/10 hover:border-primary-400/40 transition-colors"
                    >
                      Explore Workflow
                    </a>
                  </motion.div>
                </motion.div>

                {/* Live Feature Highlights */}
                <motion.div variants={fadeInUp} className="mt-10 pt-8 border-t border-white/10 grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0 text-center sm:text-left">
                  <div>
                    <div className="text-sm font-bold text-white">⚡ Instant</div>
                    <div className="text-xs text-gray-400 mt-0.5">1-Click Auto-Fill</div>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">🔒 Private</div>
                    <div className="text-xs text-gray-400 mt-0.5">Encrypted Data</div>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">🌐 6 Portals</div>
                    <div className="text-xs text-gray-400 mt-0.5">ATS & Boards</div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Right Column: 3D Interactive WebGL Canvas */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-5 relative flex items-center justify-center min-h-[440px]"
              >
                <div className="w-full h-full relative">
                  <HeroScene />
                  
                  {/* Floating Holographic Specular Tags */}
                  <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="absolute -top-2 -left-4 sm:left-4 card-glass px-4 py-2.5 rounded-2xl border-primary-500/30 backdrop-blur-xl shadow-xl shadow-primary-500/10 flex items-center gap-3 pointer-events-none"
                  >
                    <span className="text-xl">🤖</span>
                    <div>
                      <div className="text-xs font-bold text-white">AI Core Sync</div>
                      <div className="text-[10px] text-emerald-400 font-semibold">Active & Listening</div>
                    </div>
                  </motion.div>

                  <motion.div 
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className="absolute -bottom-4 right-0 sm:right-4 card-glass px-4 py-2.5 rounded-2xl border-accent-500/30 backdrop-blur-xl shadow-xl shadow-accent-500/10 flex items-center gap-3 pointer-events-none"
                  >
                    <span className="text-xl">⚡</span>
                    <div>
                      <div className="text-xs font-bold text-white">Live Tracking</div>
                      <div className="text-[10px] text-primary-300 font-semibold">Real-Time Database</div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

            </div>
          </section>

          {/* ========================================================================= */}
          {/* REAL-TIME 3D STATS SECTION (TILT-ENABLED)                                  */}
          {/* ========================================================================= */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {/* Stat Card 1 */}
              <motion.div variants={fadeInUp}>
                <TiltCard className="h-full">
                  <div className="card-glass p-7 rounded-2xl border-white/10 bg-gradient-to-br from-purple-900/20 via-surface-900/90 to-surface-900/70 hover:border-purple-500/50 transition-all flex items-center gap-5">
                    <div className="w-16 h-16 rounded-2xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-3xl shrink-0 shadow-lg shadow-purple-500/20">
                      💼
                    </div>
                    <div>
                      <div className="text-4xl font-extrabold text-white gradient-text bg-gradient-to-r from-white to-purple-200">
                        {stats.totalApplications.toLocaleString()}
                      </div>
                      <div className="text-gray-400 text-xs font-bold uppercase tracking-wider mt-1">
                        Total Live Applications
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>

              {/* Stat Card 2 */}
              <motion.div variants={fadeInUp}>
                <TiltCard className="h-full">
                  <div className="card-glass p-7 rounded-2xl border-white/10 bg-gradient-to-br from-teal-900/20 via-surface-900/90 to-surface-900/70 hover:border-teal-500/50 transition-all flex items-center gap-5">
                    <div className="w-16 h-16 rounded-2xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-3xl shrink-0 shadow-lg shadow-teal-500/20">
                      👥
                    </div>
                    <div>
                      <div className="text-4xl font-extrabold text-white gradient-text bg-gradient-to-r from-white to-teal-200">
                        {stats.totalUsers.toLocaleString()}
                      </div>
                      <div className="text-gray-400 text-xs font-bold uppercase tracking-wider mt-1">
                        Registered Candidates
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>

              {/* Stat Card 3 */}
              <motion.div variants={fadeInUp}>
                <TiltCard className="h-full">
                  <div className="card-glass p-7 rounded-2xl border-white/10 bg-gradient-to-br from-amber-900/20 via-surface-900/90 to-surface-900/70 hover:border-amber-500/50 transition-all flex items-center gap-5">
                    <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-3xl shrink-0 shadow-lg shadow-amber-500/20">
                      ⚡
                    </div>
                    <div>
                      <div className="text-4xl font-extrabold text-white gradient-text bg-gradient-to-r from-white to-amber-200">
                        {stats.platforms}
                      </div>
                      <div className="text-gray-400 text-xs font-bold uppercase tracking-wider mt-1">
                        Live Platforms Supported
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            </motion.div>
          </section>

          {/* ========================================================================= */}
          {/* 3D TILT FEATURES SECTION ("Why Choose Job Grid?")                          */}
          {/* ========================================================================= */}
          <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              className="text-center mb-16"
            >
              <span className="text-primary-400 text-xs font-bold tracking-widest uppercase bg-primary-500/10 border border-primary-500/20 px-3.5 py-1.5 rounded-full">
                Architected for Speed
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-4 tracking-tight">
                Why Choose Job Grid?
              </h2>
              <p className="mt-4 text-gray-400 text-lg max-w-2xl mx-auto">
                Engineered with high-velocity automation so you spend less time on repetitive forms and more time interviewing.
              </p>
            </motion.div>
            
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {/* Feature Card 1 */}
              <motion.div variants={fadeInUp}>
                <TiltCard className="h-full" maxTilt={12}>
                  <div className="card-glass p-8 rounded-3xl border-purple-500/20 bg-gradient-to-b from-purple-950/30 via-surface-900/90 to-surface-900 hover:border-purple-400/60 transition-all h-full flex flex-col justify-between">
                    <div>
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/30 to-indigo-500/20 border border-purple-500/40 flex items-center justify-center mb-6 text-3xl shadow-lg shadow-purple-500/20">
                        👤
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-3">One Profile, Everywhere</h3>
                      <p className="text-gray-400 leading-relaxed text-sm">
                        Store your headline, skills, work experience, education, and resume once. Our engine adapts and injects them accurately across diverse portal formats.
                      </p>
                    </div>
                    <div className="mt-8 pt-4 border-t border-white/5 flex items-center gap-2 text-xs font-semibold text-purple-400">
                      <span>✓ Profile Auto-Sync</span>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
              
              {/* Feature Card 2 */}
              <motion.div variants={fadeInUp}>
                <TiltCard className="h-full" maxTilt={12}>
                  <div className="card-glass p-8 rounded-3xl border-teal-500/20 bg-gradient-to-b from-teal-950/30 via-surface-900/90 to-surface-900 hover:border-teal-400/60 transition-all h-full flex flex-col justify-between">
                    <div>
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500/30 to-emerald-500/20 border border-teal-500/40 flex items-center justify-center mb-6 text-3xl shadow-lg shadow-teal-500/20">
                        🧩
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-3">Browser Extension</h3>
                      <p className="text-gray-400 leading-relaxed text-sm">
                        Autofill complex multi-step forms on LinkedIn and Naukri with one click using our sandboxed Manifest V3 Chrome Extension.
                      </p>
                    </div>
                    <div className="mt-8 pt-4 border-t border-white/5 flex items-center gap-2 text-xs font-semibold text-teal-400">
                      <span>✓ Easy Apply Automation</span>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
              
              {/* Feature Card 3 */}
              <motion.div variants={fadeInUp}>
                <TiltCard className="h-full" maxTilt={12}>
                  <div className="card-glass p-8 rounded-3xl border-rose-500/20 bg-gradient-to-b from-rose-950/30 via-surface-900/90 to-surface-900 hover:border-rose-400/60 transition-all h-full flex flex-col justify-between">
                    <div>
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-rose-500/30 to-amber-500/20 border border-rose-500/40 flex items-center justify-center mb-6 text-3xl shadow-lg shadow-rose-500/20">
                        📊
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-3">Real-Time Tracker</h3>
                      <p className="text-gray-400 leading-relaxed text-sm">
                        Keep every application organized without messy spreadsheets. Categorize stages into Applied, Interview, Offer, and Rejected with instant stats.
                      </p>
                    </div>
                    <div className="mt-8 pt-4 border-t border-white/5 flex items-center gap-2 text-xs font-semibold text-rose-400">
                      <span>✓ Live SQLite Tracking</span>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            </motion.div>
          </section>

          {/* ========================================================================= */}
          {/* HOW IT WORKS SECTION (CONNECTED FLOW PIPELINE)                            */}
          {/* ========================================================================= */}
          <section id="how-it-works" className="py-24 relative my-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeInUp}
                className="card-glass p-10 sm:p-16 rounded-3xl bg-gradient-to-b from-surface-900 via-surface-950 to-surface-900 border-white/10 relative overflow-hidden shadow-2xl"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary-600/10 via-purple-600/10 to-accent-400/10 opacity-75 pointer-events-none"></div>

                <div className="text-center mb-16 relative z-10">
                  <span className="text-primary-400 font-bold text-xs uppercase tracking-widest">Frictionless Steps</span>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mt-2 tracking-tight">
                    How It Works
                  </h2>
                  <p className="mt-3 text-gray-400 text-lg">Three streamlined steps to automate your tech job hunt.</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative z-10">
                  {/* Step 1 */}
                  <TiltCard maxTilt={10}>
                    <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-surface-900/60 border border-white/5 h-full">
                      <div className="w-20 h-20 rounded-2xl bg-surface-900 border-2 border-primary-500 flex items-center justify-center text-2xl font-extrabold text-primary-400 mb-6 shadow-xl shadow-primary-500/25">
                        1
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">Build Profile</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        Upload your resume and input your skills, preferred location, and education once.
                      </p>
                    </div>
                  </TiltCard>
                  
                  {/* Step 2 */}
                  <TiltCard maxTilt={10}>
                    <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-surface-900/60 border border-white/5 h-full">
                      <div className="w-20 h-20 rounded-2xl bg-surface-900 border-2 border-accent-400 flex items-center justify-center text-2xl font-extrabold text-accent-400 mb-6 shadow-xl shadow-accent-500/25">
                        2
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">Discover Live Openings</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        Browse real-time ATS postings from Greenhouse, Lever, Ashby, and Workable with location filtering.
                      </p>
                    </div>
                  </TiltCard>
                  
                  {/* Step 3 */}
                  <TiltCard maxTilt={10}>
                    <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-surface-900/60 border border-white/5 h-full">
                      <div className="w-20 h-20 rounded-2xl bg-surface-900 border-2 border-purple-400 flex items-center justify-center text-2xl font-extrabold text-purple-400 mb-6 shadow-xl shadow-purple-500/25">
                        3
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">Autofill & Track</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        Click Apply. Our Chrome extension autofills forms in seconds and syncs your tracking dashboard.
                      </p>
                    </div>
                  </TiltCard>
                </div>
              </motion.div>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* HIGH-IMPACT 3D CLOSING CTA                                                */}
          {/* ========================================================================= */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <TiltCard maxTilt={6}>
                <div className="card-glass p-12 sm:p-16 rounded-3xl relative overflow-hidden bg-gradient-to-br from-surface-900 via-primary-950/50 to-surface-900 border-primary-500/40 shadow-2xl">
                  <div className="relative z-10 max-w-3xl mx-auto">
                    <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-5 tracking-tight">
                      Ready to Stop Applying Manually?
                    </h2>
                    <p className="text-lg sm:text-xl text-gray-300 mb-8 leading-relaxed">
                      Join hundreds of ambitious candidates using Job Grid to streamline applications and land interviews 10x faster.
                    </p>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
                      <Link 
                        to="/signup" 
                        className="btn-primary text-lg px-10 py-4.5 inline-block shadow-2xl shadow-primary-500/40 font-semibold"
                      >
                        Create Your Free Account →
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          </section>
        </main>

        <Footer />
      </div>
    </SmoothScroll>
  );
}
