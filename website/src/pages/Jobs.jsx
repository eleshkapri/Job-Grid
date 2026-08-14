import { useState, useEffect } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';

const POPULAR_LOCATIONS = [
  'Remote',
  'Bangalore, India',
  'Delhi NCR, India',
  'Mumbai, India',
  'Hyderabad, India',
  'Pune, India',
  'United States',
  'United Kingdom',
  'Canada',
];

const fallbackJobs = [
  { id: 1, role: 'Frontend Engineer (New Grad)', company: 'Stripe', location: 'San Francisco, CA', type: 'On-site', source: 'greenhouse', url: 'https://boards.greenhouse.io/stripe' },
  { id: 2, role: 'Software Engineer I', company: 'Spotify', location: 'New York, NY', type: 'Hybrid', source: 'lever', url: 'https://jobs.lever.co/spotify' },
  { id: 3, role: 'Frontend Engineer', company: 'Ramp', location: 'New York, NY', type: 'Hybrid', source: 'ashby', url: 'https://jobs.ashbyhq.com/ramp' },
  { id: 4, role: 'React Developer', company: 'Linear', location: 'Remote', type: 'Remote', source: 'ashby', url: 'https://jobs.ashbyhq.com/linear' },
  { id: 5, role: 'Full Stack Developer', company: 'Twitch', location: 'Remote', type: 'Remote', source: 'lever', url: 'https://jobs.lever.co/twitch' },
  { id: 6, role: 'UI Engineer Intern', company: 'Figma', location: 'San Francisco, CA', type: 'On-site', source: 'greenhouse', url: 'https://boards.greenhouse.io/figma' },
  { id: 7, role: 'Full Stack Developer', company: 'Sentry', location: 'San Francisco, CA', type: 'Hybrid', source: 'workable', url: 'https://apply.workable.com/sentry/' },
  { id: 8, role: 'Junior Web Developer', company: 'Notion', location: 'New York, NY', type: 'Hybrid', source: 'greenhouse', url: 'https://boards.greenhouse.io/notion' },
  { id: 9, role: 'Software Engineer', company: 'Postman', location: 'Bangalore, India', type: 'Hybrid', source: 'ashby', url: 'https://jobs.ashbyhq.com/postman' },
  { id: 10, role: 'Frontend Developer', company: 'Netlify', location: 'Remote', type: 'Remote', source: 'lever', url: 'https://jobs.lever.co/netlify' },
];

const getSourceBadge = (source = '') => {
  const src = source.toLowerCase();
  switch (src) {
    case 'greenhouse':
      return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">Greenhouse</span>;
    case 'lever':
      return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/40">Lever</span>;
    case 'ashby':
      return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/40 font-bold">Ashby</span>;
    case 'workable':
      return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/40">Workable</span>;
    default:
      return <span className="badge-primary">{source}</span>;
  }
};

export default function Jobs() {
  const [jobs, setJobs] = useState(fallbackJobs);
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('Bangalore, India');
  const [remoteOnly, setRemoteOnly] = useState(false);
  const [customLocInput, setCustomLocInput] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [loading, setLoading] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [toast, setToast] = useState('');

  const token = localStorage.getItem('token');

  // Load candidate profile default preferred_location
  useEffect(() => {
    async function fetchProfileLocation() {
      if (!token) return;
      try {
        const res = await fetch('/api/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          if (data.preferred_location) {
            setLocation(data.preferred_location);
          }
          if (typeof data.remote_only !== 'undefined') {
            setRemoteOnly(Boolean(data.remote_only));
          }
        }
      } catch (err) {
        console.log('Using default session location');
      }
    }
    fetchProfileLocation();
  }, [token]);

  useEffect(() => {
    async function fetchJobs() {
      setLoading(true);
      try {
        const res = await fetch('/api/jobs');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setJobs(data);
          }
        }
      } catch (err) {
        console.log('Using default curated jobs list');
      } finally {
        setLoading(false);
      }
    }
    fetchJobs();
  }, []);

  const handleApplyClick = (job) => {
    setSelectedJob(job);
  };

  const trackJobApplication = async (job) => {
    try {
      if (token) {
        await fetch('/api/applications', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            job_title: job.role || job.title,
            company: job.company,
            source: job.source,
            url: job.url || job.applyUrl
          })
        });
      }
    } catch (err) {
      console.log('Track application local fallback');
    }

    setToast(`Applied to ${job.role || job.title} at ${job.company}! Added to tracker.`);
    setTimeout(() => setToast(''), 4000);
    setSelectedJob(null);
  };

  // Option A Prefilled Search URLs with dynamic Location filter
  const searchKeyword = search.trim() || 'Software Engineer';
  const effectiveLocation = remoteOnly ? 'Remote' : (location || '');
  const cleanCity = effectiveLocation.split(',')[0].trim().toLowerCase().replace(/\s+/g, '-');

  const linkedinSearchUrl = `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(searchKeyword)}&location=${encodeURIComponent(effectiveLocation)}`;
  const naukriSearchUrl = effectiveLocation
    ? `https://www.naukri.com/${searchKeyword.toLowerCase().replace(/\s+/g, '-')}-jobs-in-${cleanCity}`
    : `https://www.naukri.com/${searchKeyword.toLowerCase().replace(/\s+/g, '-')}-jobs`;

  const filters = ['All', 'LinkedIn (Search)', 'Naukri (Search)', 'Greenhouse', 'Lever', 'Ashby', 'Workable', 'Remote', 'On-site'];

  const filteredJobs = jobs.filter(job => {
    const roleText = job.role || job.title || '';
    const jobLoc = (job.location || '').toLowerCase();
    const src = (job.source || '').toLowerCase();
    
    // Keyword match
    const matchesSearch = roleText.toLowerCase().includes(search.toLowerCase()) ||
                          (job.company || '').toLowerCase().includes(search.toLowerCase()) ||
                          jobLoc.includes(search.toLowerCase());
    if (!matchesSearch) return false;

    // Remote Only filter
    if (remoteOnly && !jobLoc.includes('remote')) return false;

    // Portal source filter
    if (activeFilter === 'All' || activeFilter.includes('Search')) return true;
    if (activeFilter === 'Greenhouse') return src === 'greenhouse';
    if (activeFilter === 'Lever') return src === 'lever';
    if (activeFilter === 'Ashby') return src === 'ashby';
    if (activeFilter === 'Workable') return src === 'workable';
    if (activeFilter === 'Remote') return jobLoc.includes('remote');
    if (activeFilter === 'On-site') return !jobLoc.includes('remote');
    
    return true;
  });

  return (
    <DashboardLayout>
      {toast && (
        <div className="fixed top-20 right-6 z-50 bg-primary-600 text-white px-5 py-3 rounded-xl shadow-2xl border border-primary-400 animate-slide-down flex items-center gap-2">
          <span>✓</span> {toast}
        </div>
      )}

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Find Jobs</h1>
        <p className="text-gray-400 mt-2">Live postings aggregated from Greenhouse, Lever, Ashby, and Workable + prefilled searches on LinkedIn & Naukri.</p>
      </div>

      {/* Main Search & Location Filter Bar */}
      <div className="relative bg-surface-900 p-6 mb-8 rounded-2xl border border-white/10 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="w-full relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>
            <input 
              type="text" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-field pl-10" 
              placeholder="Search by role, company, or skills (e.g. React, Frontend)..." 
            />
          </div>
          <button className="btn-primary whitespace-nowrap w-full md:w-auto">
            {loading ? 'Searching...' : 'Search Jobs'}
          </button>
        </div>

        {/* Location Filter Section */}
        <div className="border-t border-white/10 pt-4 space-y-3">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <label className="text-xs font-bold text-gray-300 uppercase tracking-wider flex items-center gap-1.5">
              <span>📍</span> Preferred Work Location
            </label>
            <label className="flex items-center gap-2 text-xs text-gray-300 cursor-pointer bg-white/5 px-2.5 py-1 rounded-md border border-white/10 hover:border-primary-400">
              <input 
                type="checkbox" 
                checked={remoteOnly} 
                onChange={e => setRemoteOnly(e.target.checked)}
                className="w-3.5 h-3.5 accent-primary-500 rounded cursor-pointer" 
              />
              <span className="font-semibold">Remote Only</span>
            </label>
          </div>

          <div className="flex flex-wrap gap-2">
            {POPULAR_LOCATIONS.map((loc) => (
              <button
                key={loc}
                onClick={() => setLocation(loc)}
                className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all ${
                  location === loc && !remoteOnly
                    ? 'bg-primary-600 border-primary-500 text-white shadow-md shadow-primary-500/30'
                    : 'bg-surface-800/80 border-white/10 text-gray-300 hover:border-primary-400'
                }`}
              >
                {loc}
              </button>
            ))}
          </div>

          <div className="flex gap-2">
            <input 
              type="text" 
              placeholder="Or type custom city or country (e.g. Toronto, London)..."
              value={customLocInput}
              onChange={e => setCustomLocInput(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter' && customLocInput.trim()) {
                  e.preventDefault();
                  setLocation(customLocInput.trim());
                  setCustomLocInput('');
                }
              }}
              className="input-field py-1.5 text-xs flex-1"
            />
            <button 
              onClick={() => {
                if (customLocInput.trim()) {
                  setLocation(customLocInput.trim());
                  setCustomLocInput('');
                }
              }}
              className="btn-secondary py-1.5 px-3 text-xs"
            >
              Set
            </button>
          </div>

          {location && (
            <div className="text-xs text-gray-400">
              Filtering location: <span className="text-primary-400 font-semibold">{effectiveLocation}</span>
            </div>
          )}
        </div>
        
        {/* Source Filter Pills */}
        <div className="border-t border-white/10 pt-3 flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {filters.map((filter) => (
            <button 
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                activeFilter === filter ? 'bg-primary-600 text-white' : 'bg-surface-800 text-gray-300 hover:bg-surface-700'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* External Search Launch Cards for LinkedIn & Naukri */}
      {(activeFilter === 'All' || activeFilter.includes('LinkedIn') || activeFilter.includes('Naukri')) && (
        <div className="mb-8">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <span className="text-accent-400">⚡</span> Quick Launch External Searches ({effectiveLocation})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* LinkedIn Search Card */}
            {(activeFilter === 'All' || activeFilter.includes('LinkedIn')) && (
              <div className="card-glass p-5 border-blue-500/30 bg-gradient-to-r from-blue-950/30 to-surface-900 flex flex-col justify-between hover:border-blue-400 transition-all">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">LinkedIn Jobs</span>
                    <span className="badge-primary bg-blue-500/20 text-blue-300 border-blue-500/40">Extension Autofill Ready</span>
                  </div>
                  <h3 className="text-lg font-bold text-white">Search "{searchKeyword}" in {effectiveLocation} on LinkedIn</h3>
                  <p className="text-gray-400 text-xs mt-1">Launches LinkedIn Easy Apply results pre-filled with role & location.</p>
                </div>
                <a 
                  href={linkedinSearchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 btn-secondary py-2.5 px-4 text-center text-sm font-semibold border-blue-500/40 text-blue-300 hover:bg-blue-600 hover:text-white flex items-center justify-center gap-2"
                >
                  Search on LinkedIn →
                </a>
              </div>
            )}

            {/* Naukri Search Card */}
            {(activeFilter === 'All' || activeFilter.includes('Naukri')) && (
              <div className="card-glass p-5 border-sky-500/30 bg-gradient-to-r from-sky-950/30 to-surface-900 flex flex-col justify-between hover:border-sky-400 transition-all">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">Naukri.com Jobs</span>
                    <span className="badge-primary bg-sky-500/20 text-sky-300 border-sky-500/40">Extension Autofill Ready</span>
                  </div>
                  <h3 className="text-lg font-bold text-white">Search "{searchKeyword}" in {effectiveLocation} on Naukri</h3>
                  <p className="text-gray-400 text-xs mt-1">Launches Naukri portal with pre-filled role & city criteria.</p>
                </div>
                <a 
                  href={naukriSearchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 btn-secondary py-2.5 px-4 text-center text-sm font-semibold border-sky-500/40 text-sky-300 hover:bg-sky-600 hover:text-white flex items-center justify-center gap-2"
                >
                  Search on Naukri →
                </a>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Live Greenhouse, Lever, Ashby & Workable Job Grid */}
      <div>
        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <span className="text-primary-400">💼</span> Live ATS Postings (Greenhouse, Lever, Ashby, Workable)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredJobs.map((job, i) => (
            <div key={job.id || i} className="card-glass p-5 flex flex-col h-full animate-slide-up" style={{ animationDelay: `${(i % 4) * 100}ms` }}>
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-lg bg-surface-800 border border-white/10 flex items-center justify-center font-bold text-lg text-white">
                  {(job.company || 'C').charAt(0).toUpperCase()}
                </div>
                {getSourceBadge(job.source)}
              </div>
              
              <h3 className="font-bold text-white text-lg leading-tight mb-1">{job.role || job.title}</h3>
              <div className="text-primary-400 font-medium text-sm mb-4 capitalize">{job.company}</div>
              
              <div className="mt-auto space-y-2 mb-6">
                <div className="flex items-center text-sm text-gray-400 gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  {job.location || 'Remote'}
                </div>
                <div className="flex items-center text-sm text-gray-400 gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  {job.type || (job.location?.includes('Remote') ? 'Remote' : 'Full-time')}
                </div>
              </div>
              
              <button 
                onClick={() => handleApplyClick(job)}
                className="btn-secondary w-full py-2 hover:bg-primary-600 hover:border-primary-500 hover:text-white transition-all flex items-center justify-center gap-2 text-center text-sm font-semibold"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                Auto Apply via Extension
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Auto Apply Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="card-glass w-full max-w-lg p-6 bg-surface-900 border-white/10 animate-scale-in">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary-600 flex items-center justify-center font-bold text-white text-lg">
                  {(selectedJob.company || 'C').charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{selectedJob.role || selectedJob.title}</h3>
                  <p className="text-sm text-primary-400 capitalize">{selectedJob.company}</p>
                </div>
              </div>
              <button onClick={() => setSelectedJob(null)} className="text-gray-400 hover:text-white text-xl">✕</button>
            </div>

            <div className="space-y-4 my-6 bg-white/[0.03] p-4 rounded-xl border border-white/5">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Portal Source:</span>
                <div>{getSourceBadge(selectedJob.source)}</div>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Location:</span>
                <span className="text-white font-medium">{selectedJob.location}</span>
              </div>
              <div className="text-xs text-gray-400 pt-2 border-t border-white/5">
                💡 <strong className="text-gray-300">How Job Grid Assist Works:</strong> Opening the job page will launch the portal. Your installed <strong>Job Grid Assist Extension</strong> will detect the form and automatically fill your profile details and resume!
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-end">
              <button 
                onClick={() => setSelectedJob(null)}
                className="btn-secondary py-2.5 px-4 text-sm"
              >
                Cancel
              </button>
              <a
                href={selectedJob.url || selectedJob.applyUrl || 'https://linkedin.com'}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackJobApplication(selectedJob)}
                className="btn-primary py-2.5 px-6 text-sm font-semibold flex items-center justify-center gap-2 shadow-lg shadow-primary-500/25"
              >
                Launch Portal & Track Application 🚀
              </a>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
