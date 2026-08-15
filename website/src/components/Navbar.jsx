import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../features/auth/AuthContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/5 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary-600 to-accent-400 flex items-center justify-center font-bold text-white shadow-lg shadow-primary-500/20">
                J
              </div>
              <span className="font-bold text-xl text-white tracking-tight">Job Grid</span>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {isAuthenticated ? (
                <>
                  <Link to="/dashboard" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Dashboard</Link>
                  <Link to="/jobs" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Jobs</Link>
                  <Link to="/applications" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Applications</Link>
                </>
              ) : null}
            </div>
          </div>
          
          <div className="hidden md:block">
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <Link to="/profile" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
                  <div className="w-8 h-8 rounded-full bg-surface-800 border border-white/10 flex items-center justify-center text-sm font-medium text-white">
                    {user?.name?.charAt(0) || 'U'}
                  </div>
                </Link>
                <button onClick={handleLogout} className="text-gray-400 hover:text-white text-sm">Logout</button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link to="/login" className="text-gray-300 hover:text-white text-sm font-medium">Log in</Link>
                <Link to="/signup" className="btn-primary py-2 px-4 text-sm rounded-lg">Sign up</Link>
              </div>
            )}
          </div>
          
          <div className="-mr-2 flex md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-400 hover:text-white p-2">
              <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {isOpen && (
        <div className="md:hidden bg-surface-900 border-b border-white/10">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Dashboard</Link>
                <Link to="/jobs" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Jobs</Link>
                <Link to="/applications" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Applications</Link>
                <Link to="/profile" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Profile</Link>
                <button onClick={handleLogout} className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium w-full text-left">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Log in</Link>
                <Link to="/signup" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Sign up</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
