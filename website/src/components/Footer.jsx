import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-surface-950 border-t border-white/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary-600 to-accent-400 flex items-center justify-center font-bold text-white shadow-lg shadow-primary-500/20">
                J
              </div>
              <span className="font-bold text-xl text-white tracking-tight">Job Grid</span>
            </Link>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              Apply to jobs everywhere, automatically. Your job search on autopilot.
            </p>
            <div className="flex gap-4">
              <a href="https://github.com/eleshkapri/Job-Grid" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-400 hover:scale-110 transition-all p-1" title="GitHub">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.379.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-accent-400 hover:scale-110 transition-all p-1" title="Twitter">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-xs font-bold text-gray-300 tracking-wider uppercase mb-4">Product</h3>
            <ul className="space-y-3">
              <li><a href="#features" className="text-gray-400 hover:text-white transition-colors text-sm">Features</a></li>
              <li><a href="#how-it-works" className="text-gray-400 hover:text-white transition-colors text-sm">How It Works</a></li>
              <li><Link to="/extension" className="text-gray-400 hover:text-white transition-colors text-sm">Chrome Extension</Link></li>
              <li><Link to="/jobs" className="text-gray-400 hover:text-white transition-colors text-sm">Browse Jobs</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xs font-bold text-gray-300 tracking-wider uppercase mb-4">Company</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors text-sm">About Us</Link></li>
              <li><Link to="/jobs" className="text-gray-400 hover:text-white transition-colors text-sm">Job Openings</Link></li>
              <li><Link to="/extension" className="text-gray-400 hover:text-white transition-colors text-sm">Extension Setup</Link></li>
              <li><a href="mailto:support@jobgrid.dev" className="text-gray-400 hover:text-white transition-colors text-sm">Contact Support</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xs font-bold text-gray-300 tracking-wider uppercase mb-4">Legal</h3>
            <ul className="space-y-3">
              <li><Link to="/privacy" className="text-gray-400 hover:text-white transition-colors text-sm">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-400 hover:text-white transition-colors text-sm">Terms of Service</Link></li>
              <li><Link to="/security" className="text-gray-400 hover:text-white transition-colors text-sm">Security Disclosures</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Job Grid. All rights reserved.
          </p>
          <div>
            <span className="text-gray-500 text-sm flex items-center gap-1">
              Made with <span className="text-red-500">♥</span> for freshers
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
