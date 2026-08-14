import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Landing() {
  return (
    <div className="min-h-screen bg-surface-950 text-white font-sans flex flex-col relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 left-[-10%] w-[40%] h-[40%] bg-primary-600/20 rounded-full blur-[120px] mix-blend-screen animate-pulse pointer-events-none"></div>
      <div className="absolute bottom-0 right-[-10%] w-[50%] h-[50%] bg-purple-600/20 rounded-full blur-[120px] mix-blend-screen animate-pulse pointer-events-none" style={{ animationDelay: '2s' }}></div>
      
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 text-center">
          <div className="animate-slide-up">
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8">
              <span className="block text-white">Apply to Jobs Everywhere,</span>
              <span className="block gradient-text mt-2">Automatically</span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-400">
              The smart platform for freshers. Build your profile once, and let our AI apply to thousands of jobs across 50+ platforms. Your job search on autopilot.
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <Link to="/signup" className="btn-primary text-lg px-8 py-4">
                Get Started Free
              </Link>
              <a href="#how-it-works" className="btn-secondary text-lg px-8 py-4">
                Learn More
              </a>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="border-y border-white/10 bg-white/[0.02]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center animate-slide-up stagger-1">
              <div>
                <div className="text-4xl font-bold text-white mb-2">10,000+</div>
                <div className="text-gray-400 uppercase tracking-wider text-sm font-semibold">Jobs Available</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-white mb-2">5,000+</div>
                <div className="text-gray-400 uppercase tracking-wider text-sm font-semibold">Happy Users</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-white mb-2">50+</div>
                <div className="text-gray-400 uppercase tracking-wider text-sm font-semibold">Platforms Supported</div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center mb-16 animate-slide-up stagger-2">
            <h2 className="text-3xl font-bold text-white">Why Choose Job Grid?</h2>
            <p className="mt-4 text-gray-400">Everything you need to land your first job, faster.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card-glass p-8 animate-slide-up stagger-1 hover:-translate-y-2 transition-transform">
              <div className="w-12 h-12 rounded-xl bg-primary-500/20 flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">One Profile, Apply Anywhere</h3>
              <p className="text-gray-400">Fill out your details once. We format and send it perfectly to every application portal automatically.</p>
            </div>
            
            <div className="card-glass p-8 animate-slide-up stagger-2 hover:-translate-y-2 transition-transform">
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Browser Extension</h3>
              <p className="text-gray-400">Apply with one click on LinkedIn, Indeed, and Glassdoor using our powerful Chrome extension.</p>
            </div>
            
            <div className="card-glass p-8 animate-slide-up stagger-3 hover:-translate-y-2 transition-transform">
              <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Track Everything</h3>
              <p className="text-gray-400">Never lose track of an application. Our dashboard organizes your interviews, offers, and rejections.</p>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="bg-surface-900/50 py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-white">How It Works</h2>
              <p className="mt-4 text-gray-400">Three simple steps to your first tech job.</p>
            </div>
            
            <div className="flex flex-col md:flex-row gap-8 relative">
              {/* Connection Line */}
              <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-primary-500/0 via-primary-500/50 to-primary-500/0 -z-10"></div>
              
              <div className="flex-1 text-center animate-slide-up stagger-1">
                <div className="w-16 h-16 rounded-full bg-surface-800 border-2 border-primary-500 flex items-center justify-center text-2xl font-bold text-white mx-auto mb-6 shadow-lg shadow-primary-500/20">1</div>
                <h3 className="text-xl font-bold text-white mb-3">Build Profile</h3>
                <p className="text-gray-400">Upload your resume and let our AI extract your skills and experience perfectly.</p>
              </div>
              
              <div className="flex-1 text-center animate-slide-up stagger-2">
                <div className="w-16 h-16 rounded-full bg-surface-800 border-2 border-primary-500 flex items-center justify-center text-2xl font-bold text-white mx-auto mb-6 shadow-lg shadow-primary-500/20">2</div>
                <h3 className="text-xl font-bold text-white mb-3">Find Jobs</h3>
                <p className="text-gray-400">Browse thousands of curated fresher roles tailored to your specific skill set.</p>
              </div>
              
              <div className="flex-1 text-center animate-slide-up stagger-3">
                <div className="w-16 h-16 rounded-full bg-surface-800 border-2 border-primary-500 flex items-center justify-center text-2xl font-bold text-white mx-auto mb-6 shadow-lg shadow-primary-500/20">3</div>
                <h3 className="text-xl font-bold text-white mb-3">Auto Apply</h3>
                <p className="text-gray-400">Click once. We handle the repetitive forms, questionnaires, and resume uploads.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <div className="card-glass p-12 relative overflow-hidden bg-gradient-to-br from-surface-900 to-primary-900/20 border-primary-500/20">
            <div className="relative z-10 animate-slide-up">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to stop manually applying?</h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">Join 5,000+ freshers who are using Job Grid to land their dream jobs 10x faster.</p>
              <Link to="/signup" className="btn-primary text-lg px-8 py-4 inline-block shadow-[0_0_30px_rgba(99,102,241,0.5)]">
                Create Your Free Account
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
