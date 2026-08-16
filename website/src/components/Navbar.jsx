import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../features/auth/AuthContext';
import AiCoreSyncModal from './AiCoreSyncModal';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showAiModal, setShowAiModal] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Handle scroll detection for dynamic glass elevation
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle click outside user dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setUserDropdownOpen(false);
    navigate('/login');
  };

  const navLinks = isAuthenticated
    ? [
        { name: 'Dashboard', path: '/dashboard', icon: '📊' },
        { name: 'Jobs', path: '/jobs', icon: '💼', badge: 'Live' },
        { name: 'Applications', path: '/applications', icon: '🚀' },
      ]
    : [
        { name: 'Features', path: '/#features', icon: '⚡' },
        { name: 'How It Works', path: '/#how-it-works', icon: '💡' },
        { name: 'Browse Jobs', path: '/jobs', icon: '🔍' },
        { name: 'Extension', path: '/extension', icon: '🧩' },
      ];

  const isActive = (path) => {
    if (path.startsWith('/#')) return false;
    return location.pathname === path;
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          scrolled ? 'pt-3 pb-2' : 'pt-5 pb-3'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav
            className={`relative rounded-2xl border transition-all duration-300 ${
              scrolled
                ? 'bg-surface-950/85 backdrop-blur-2xl border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.05)]'
                : 'bg-surface-950/60 backdrop-blur-xl border-white/10 shadow-[0_4px_24px_rgba(0,0,0,0.3)]'
            }`}
          >
            {/* Top iridescent glow accent line */}
            <div className="absolute inset-x-4 top-0 h-[1px] bg-gradient-to-r from-transparent via-primary-400/50 to-transparent pointer-events-none" />

            <div className="flex items-center justify-between h-16 px-4 sm:px-6">
              
              {/* 1. Futuristic 2026 Brand Mark */}
              <Link to="/" className="flex items-center gap-3 group select-none">
                <div className="relative">
                  {/* Outer animated aura */}
                  <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-primary-500 to-indigo-600 opacity-40 blur-sm group-hover:opacity-100 group-hover:blur transition duration-300" />
                  
                  {/* 3D Glass Badge */}
                  <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-surface-800 to-surface-900 border border-white/20 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-200">
                    <span className="font-extrabold text-lg bg-gradient-to-br from-white via-primary-200 to-primary-400 bg-clip-text text-transparent">
                      J
                    </span>
                    {/* Glowing neural dot */}
                    <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
                  </div>
                </div>

                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-lg text-white tracking-tight group-hover:text-primary-300 transition-colors">
                      Job Grid
                    </span>
                    <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded-md bg-primary-500/20 text-primary-300 border border-primary-500/30 tracking-wider">
                      2026
                    </span>
                  </div>
                  <span className="text-[10px] text-gray-400 font-medium tracking-wide -mt-0.5 hidden sm:block">
                    AI Auto-Apply Engine
                  </span>
                </div>
              </Link>

              {/* 2. Center Navigation Tabs with Animated Spring Underlay */}
              <div className="hidden lg:flex items-center gap-1 bg-surface-900/60 p-1.5 rounded-xl border border-white/5 shadow-inner">
                {navLinks.map((link) => {
                  const active = isActive(link.path);
                  return (
                    <Link
                      key={link.name}
                      to={link.path}
                      className={`relative px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 ${
                        active
                          ? 'text-white'
                          : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
                      }`}
                    >
                      {active && (
                        <motion.div
                          layoutId="nav-pill-active"
                          className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary-600/30 to-primary-500/20 border border-primary-500/40 shadow-[0_0_12px_rgba(99,102,241,0.25)]"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                      <span className="relative z-10 text-sm">{link.icon}</span>
                      <span className="relative z-10">{link.name}</span>
                      {link.badge && (
                        <span className="relative z-10 ml-0.5 px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 animate-pulse">
                          {link.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>

              {/* 3. Action Hub: AI Core Sync + User Profile / Auth */}
              <div className="hidden md:flex items-center gap-3">
                
                {/* AI Core Sync Button with Heartbeat Pulse */}
                <button
                  onClick={() => setShowAiModal(true)}
                  className="relative group px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-primary-500/15 via-indigo-500/15 to-purple-500/15 hover:from-primary-500/25 hover:via-indigo-500/25 hover:to-purple-500/25 border border-primary-500/35 hover:border-primary-400 text-xs font-bold text-primary-200 transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow-[0_0_20px_rgba(99,102,241,0.35)] cursor-pointer active:scale-95"
                  title="Open Real-time AI Core Engine & ATS Diagnostics"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  <span className="tracking-wide">AI Core Sync</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-black/40 text-primary-300 border border-white/10 font-mono">
                    ⚡ Live
                  </span>
                </button>

                {/* Authenticated User Pill & Dropdown */}
                {isAuthenticated ? (
                  <div className="relative" ref={dropdownRef}>
                    <button
                      onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                      className="flex items-center gap-2.5 p-1.5 pr-3 rounded-xl bg-surface-900/80 hover:bg-surface-800 border border-white/10 hover:border-white/20 transition-all cursor-pointer shadow"
                    >
                      {/* Avatar with gradient border */}
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary-500 to-indigo-500 p-[1.5px] shadow-sm">
                        <div className="w-full h-full rounded-[7px] bg-surface-900 flex items-center justify-center font-bold text-xs text-white">
                          {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-gray-200 max-w-[90px] truncate">
                        {user?.name?.split(' ')[0] || 'Account'}
                      </span>
                      <svg
                        className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${
                          userDropdownOpen ? 'rotate-180 text-white' : ''
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {/* Dropdown Menu */}
                    <AnimatePresence>
                      {userDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 6, scale: 0.96 }}
                          transition={{ duration: 0.15 }}
                          className="absolute right-0 mt-2 w-56 rounded-xl bg-surface-900/95 backdrop-blur-2xl border border-white/15 shadow-2xl p-2 z-50 divide-y divide-white/10"
                        >
                          <div className="px-3 py-2">
                            <p className="text-xs font-semibold text-white truncate">{user?.name || 'User'}</p>
                            <p className="text-[11px] text-gray-400 truncate">{user?.email || 'user@jobgrid.io'}</p>
                          </div>

                          <div className="py-1 space-y-0.5">
                            <Link
                              to="/profile"
                              onClick={() => setUserDropdownOpen(false)}
                              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
                            >
                              <span>👤</span> Profile & Resumes
                            </Link>
                            <Link
                              to="/dashboard"
                              onClick={() => setUserDropdownOpen(false)}
                              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
                            >
                              <span>📊</span> Application Stats
                            </Link>
                            <Link
                              to="/extension"
                              onClick={() => setUserDropdownOpen(false)}
                              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
                            >
                              <span>🧩</span> Chrome Extension
                            </Link>
                          </div>

                          <div className="pt-1">
                            <button
                              onClick={handleLogout}
                              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors text-left cursor-pointer"
                            >
                              <span>🚪</span> Sign Out
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Link
                      to="/login"
                      className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/signup"
                      className="relative group px-4 py-1.5 rounded-xl bg-gradient-to-r from-primary-600 to-indigo-600 hover:from-primary-500 hover:to-indigo-500 text-xs font-bold text-white shadow-lg shadow-primary-500/25 active:scale-95 transition-all duration-200"
                    >
                      Get Started
                    </Link>
                  </div>
                )}
              </div>

              {/* 4. Mobile Trigger Buttons */}
              <div className="flex md:hidden items-center gap-2">
                <button
                  onClick={() => setShowAiModal(true)}
                  className="px-2.5 py-1 rounded-lg bg-primary-500/20 text-primary-300 border border-primary-500/30 text-xs font-bold flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>AI</span>
                </button>

                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="p-2 rounded-lg bg-surface-900 border border-white/10 text-gray-300 hover:text-white transition-colors"
                  aria-label="Toggle navigation menu"
                >
                  <svg className="h-5 w-5" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                    {isOpen ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    )}
                  </svg>
                </button>
              </div>

            </div>

            {/* 5. Mobile Drawer */}
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="md:hidden overflow-hidden border-t border-white/10 bg-surface-950/95 backdrop-blur-2xl rounded-b-2xl"
                >
                  <div className="p-4 space-y-2">
                    {navLinks.map((link) => (
                      <Link
                        key={link.name}
                        to={link.path}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center justify-between p-2.5 rounded-xl text-sm font-medium transition-colors ${
                          isActive(link.path)
                            ? 'bg-primary-500/15 text-primary-300 border border-primary-500/30'
                            : 'text-gray-300 hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span>{link.icon}</span>
                          <span>{link.name}</span>
                        </div>
                        {link.badge && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                            {link.badge}
                          </span>
                        )}
                      </Link>
                    ))}

                    <div className="pt-2 border-t border-white/10">
                      {isAuthenticated ? (
                        <div className="space-y-1">
                          <Link
                            to="/profile"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-2.5 p-2.5 rounded-xl text-sm text-gray-300 hover:text-white hover:bg-white/5"
                          >
                            <span>👤</span> Profile ({user?.name || 'User'})
                          </Link>
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-2.5 p-2.5 rounded-xl text-sm text-red-400 hover:bg-red-500/10 text-left"
                          >
                            <span>🚪</span> Sign Out
                          </button>
                        </div>
                      ) : (
                        <div className="grid grid-cols-2 gap-2 pt-2">
                          <Link
                            to="/login"
                            onClick={() => setIsOpen(false)}
                            className="btn-secondary py-2 text-center text-sm"
                          >
                            Sign In
                          </Link>
                          <Link
                            to="/signup"
                            onClick={() => setIsOpen(false)}
                            className="btn-primary py-2 text-center text-sm"
                          >
                            Get Started
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </nav>
        </div>
      </header>

      {/* Global AI Core Sync Modal */}
      <AiCoreSyncModal isOpen={showAiModal} onClose={() => setShowAiModal(false)} />
    </>
  );
}
