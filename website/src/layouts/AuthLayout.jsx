import { Link } from 'react-router-dom';

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-surface-950 text-white font-sans gradient-bg-animated p-4 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary-600/20 rounded-full blur-[120px] mix-blend-screen animate-pulse"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-600/20 rounded-full blur-[120px] mix-blend-screen animate-pulse" style={{ animationDelay: '2s' }}></div>
      
      <div className="w-full max-w-md z-10 animate-slide-up">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-primary-600 to-accent-400 flex items-center justify-center font-bold text-white shadow-lg shadow-primary-500/20 text-xl">
              J
            </div>
            <span className="font-bold text-2xl tracking-tight">Job Grid</span>
          </Link>
          <p className="text-gray-400 mt-2 text-sm">Your job search on autopilot</p>
        </div>
        
        <div className="card-glass p-8 rounded-2xl shadow-xl border border-white/10">
          {children}
        </div>
      </div>
    </div>
  );
}
