import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Landing() {
  return (
    <div className="min-h-screen bg-surface-950 text-white font-sans flex flex-col relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-[-10%] w-[50%] h-[50%] bg-primary-600/15 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute top-[40%] right-[-10%] w-[45%] h-[45%] bg-accent-500/10 rounded-full blur-[140px] pointer-events-none"></div>
      
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 text-center relative z-10">
          <div className="animate-slide-up">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/30 text-primary-300 text-sm font-semibold mb-8">
              ✨ The #1 Auto-Apply Platform for Freshers
            </span>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
              <span className="block text-white">Apply to Jobs Everywhere,</span>
              <span className="block gradient-text mt-2">Automatically</span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-gray-300 leading-relaxed">
              Build your candidate profile once. Automatically discover and autofill applications across LinkedIn, Naukri, Greenhouse, and Lever in one single dashboard.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto sm:max-w-none">
              <Link to="/signup" className="btn-primary text-lg px-8 py-4 shadow-xl shadow-primary-600/25">
                Get Started Free →
              </Link>
              <a href="#how-it-works" className="btn-secondary text-lg px-8 py-4">
                See How It Works
              </a>
            </div>
          </div>
        </section>

        {/* Stats Section with Glass Cards & Distinct Hierarchy */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-slide-up stagger-1">
            <div className="card-glass p-6 rounded-2xl border-white/10 bg-gradient-to-br from-purple-900/20 to-surface-900/80 hover:border-purple-500/40 transition-all flex items-center gap-5">
              <div className="w-14 h-14 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-3xl shrink-0">
                💼
              </div>
              <div className="text-left">
                <div className="text-3xl font-extrabold text-white gradient-text">10,000+</div>
                <div className="text-gray-400 text-xs font-semibold uppercase tracking-wider mt-1">Curated Job Openings</div>
              </div>
            </div>

            <div className="card-glass p-6 rounded-2xl border-white/10 bg-gradient-to-br from-teal-900/20 to-surface-900/80 hover:border-teal-500/40 transition-all flex items-center gap-5">
              <div className="w-14 h-14 rounded-xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-3xl shrink-0">
                👥
              </div>
              <div className="text-left">
                <div className="text-3xl font-extrabold text-white gradient-text">5,000+</div>
                <div className="text-gray-400 text-xs font-semibold uppercase tracking-wider mt-1">Freshers Employed</div>
              </div>
            </div>

            <div className="card-glass p-6 rounded-2xl border-white/10 bg-gradient-to-br from-amber-900/20 to-surface-900/80 hover:border-amber-500/40 transition-all flex items-center gap-5">
              <div className="w-14 h-14 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-3xl shrink-0">
                ⚡
              </div>
              <div className="text-left">
                <div className="text-3xl font-extrabold text-white gradient-text">50+</div>
                <div className="text-gray-400 text-xs font-semibold uppercase tracking-wider mt-1">Platforms Supported</div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section ("Why Choose Job Grid?") */}
        <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-16 animate-slide-up stagger-2">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Why Choose Job Grid?</h2>
            <p className="mt-4 text-gray-400 text-lg">Everything you need to land your first tech job, 10x faster.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="card-glass p-8 rounded-2xl border-purple-500/20 bg-gradient-to-b from-purple-950/20 to-surface-900 hover:border-purple-400/50 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 hover:-translate-y-2">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500/30 to-indigo-500/20 border border-purple-500/40 flex items-center justify-center mb-6 text-2xl">
                👤
              </div>
              <h3 className="text-xl font-bold text-white mb-3">One Profile, Apply Anywhere</h3>
              <p className="text-gray-400 leading-relaxed text-sm">Fill out your contact details, education, and skills once. We format and auto-fill them into application forms across multiple job portals.</p>
            </div>
            
            {/* Card 2 */}
            <div className="card-glass p-8 rounded-2xl border-teal-500/20 bg-gradient-to-b from-teal-950/20 to-surface-900 hover:border-teal-400/50 hover:shadow-2xl hover:shadow-teal-500/10 transition-all duration-300 hover:-translate-y-2">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-500/30 to-emerald-500/20 border border-teal-500/40 flex items-center justify-center mb-6 text-2xl">
                🧩
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Browser Extension</h3>
              <p className="text-gray-400 leading-relaxed text-sm">Autofill Easy Apply forms on LinkedIn and Naukri with one click using our secure Manifest V3 Chrome Extension.</p>
            </div>
            
            {/* Card 3 */}
            <div className="card-glass p-8 rounded-2xl border-rose-500/20 bg-gradient-to-b from-rose-950/20 to-surface-900 hover:border-rose-400/50 hover:shadow-2xl hover:shadow-rose-500/10 transition-all duration-300 hover:-translate-y-2">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500/30 to-amber-500/20 border border-rose-500/40 flex items-center justify-center mb-6 text-2xl">
                📊
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Track Everything</h3>
              <p className="text-gray-400 leading-relaxed text-sm">Never lose track of an application. Our real-time dashboard categorizes your applications into Applied, Interview, Offer, and Rejected.</p>
            </div>
          </div>
        </section>

        {/* How It Works Section with Contrast Mesh Background & Connecting Flow Line */}
        <section id="how-it-works" className="py-20 relative my-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Visual Contrast Container */}
            <div className="card-glass p-10 sm:p-16 rounded-3xl bg-gradient-to-b from-surface-900 via-surface-950 to-surface-900 border-white/10 relative overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-600/10 via-accent-400/10 to-purple-600/10 opacity-70 pointer-events-none"></div>

              <div className="text-center mb-16 relative z-10">
                <span className="text-primary-400 font-semibold text-sm uppercase tracking-wider">Simple Workflow</span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">How It Works</h2>
                <p className="mt-3 text-gray-400 text-lg">Three simple steps to automate your application journey.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative z-10">
                {/* Horizontal Connecting Flow Line (Desktop) */}
                <div className="hidden md:block absolute top-10 left-[20%] right-[20%] h-0.5 border-t-2 border-dashed border-primary-400/40 z-0"></div>
                
                {/* Step 1 */}
                <div className="flex flex-col items-center text-center relative z-10 group">
                  <div className="w-20 h-20 rounded-2xl bg-surface-900 border-2 border-primary-500 flex items-center justify-center text-2xl font-extrabold text-primary-400 mb-6 shadow-xl shadow-primary-500/20 group-hover:scale-110 transition-transform">
                    1
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Build Profile</h3>
                  <p className="text-gray-400 text-sm leading-relaxed max-w-xs">Upload your resume and enter your skills, contact info, and education once.</p>
                </div>
                
                {/* Step 2 */}
                <div className="flex flex-col items-center text-center relative z-10 group">
                  <div className="w-20 h-20 rounded-2xl bg-surface-900 border-2 border-accent-400 flex items-center justify-center text-2xl font-extrabold text-accent-400 mb-6 shadow-xl shadow-accent-500/20 group-hover:scale-110 transition-transform">
                    2
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Find Jobs</h3>
                  <p className="text-gray-400 text-sm leading-relaxed max-w-xs">Browse curated job postings aggregated live from Greenhouse, Lever, and top job boards.</p>
                </div>
                
                {/* Step 3 */}
                <div className="flex flex-col items-center text-center relative z-10 group">
                  <div className="w-20 h-20 rounded-2xl bg-surface-900 border-2 border-purple-400 flex items-center justify-center text-2xl font-extrabold text-purple-400 mb-6 shadow-xl shadow-purple-500/20 group-hover:scale-110 transition-transform">
                    3
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Auto Apply</h3>
                  <p className="text-gray-400 text-sm leading-relaxed max-w-xs">Click Apply. Our Chrome extension autofills form fields instantly so you submit in seconds.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Single Closing High-Impact CTA Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="card-glass p-10 sm:p-14 rounded-3xl relative overflow-hidden bg-gradient-to-br from-surface-900 via-primary-950/40 to-surface-900 border-primary-500/30 shadow-2xl">
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4">
                Ready to stop manually applying?
              </h2>
              <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Join 5,000+ freshers using Job Grid to streamline applications and land interviews 10x faster.
              </p>
              <Link to="/signup" className="btn-primary text-lg px-9 py-4 inline-block shadow-2xl shadow-primary-500/40">
                Create Your Free Account →
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
