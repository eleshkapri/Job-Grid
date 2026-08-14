import { useState, useEffect } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';

const fallbackJobs = [
  { id: 1, role: 'Frontend Engineer (New Grad)', company: 'Stripe', location: 'San Francisco, CA', type: 'On-site', source: 'Greenhouse', url: 'https://boards.greenhouse.io/stripe' },
  { id: 2, role: 'Software Engineer I', company: 'Spotify', location: 'New York, NY', type: 'Hybrid', source: 'Lever', url: 'https://jobs.lever.co/spotify' },
  { id: 3, role: 'React Developer', company: 'Vercel', location: 'Remote', type: 'Remote', source: 'Greenhouse', url: 'https://boards.greenhouse.io/vercel' },
  { id: 4, role: 'Full Stack Developer', company: 'Twitch', location: 'Remote', type: 'Remote', source: 'Lever', url: 'https://jobs.lever.co/twitch' },
  { id: 5, role: 'UI Engineer Intern', company: 'Figma', location: 'San Francisco, CA', type: 'On-site', source: 'Greenhouse', url: 'https://boards.greenhouse.io/figma' },
  { id: 6, role: 'Junior Web Developer', company: 'Notion', location: 'New York, NY', type: 'Hybrid', source: 'Greenhouse', url: 'https://boards.greenhouse.io/notion' },
  { id: 7, role: 'Software Engineer', company: 'Discord', location: 'San Francisco, CA', type: 'Hybrid', source: 'Greenhouse', url: 'https://boards.greenhouse.io/discord' },
  { id: 8, role: 'Frontend Developer', company: 'Netlify', location: 'Remote', type: 'Remote', source: 'Lever', url: 'https://jobs.lever.co/netlify' },
];

export default function Jobs() {
  const [jobs, setJobs] = useState(fallbackJobs);
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [loading, setLoading] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [toast, setToast] = useState('');

  const token = localStorage.getItem('token');

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

  // Option A Prefilled Search URLs
  const searchKeyword = search.trim() || 'Software Engineer';
  const linkedinSearchUrl = `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(searchKeyword)}`;
  const naukriSearchUrl = `https://www.naukri.com/${searchKeyword.toLowerCase().replace(/\s+/g, '-')}-jobs`;

  const filters = ['All', 'LinkedIn (Search)', 'Naukri (Search)', 'Greenhouse', 'Lever', 'Remote', 'On-site'];

  const filteredJobs = jobs.filter(job => {
    const roleText = job.role || job.title || '';
    const matchesSearch = roleText.toLowerCase().includes(search.toLowerCase()) ||
                          (job.company || '').toLowerCase().includes(search.toLowerCase()) ||
                          (job.location || '').toLowerCase().includes(search.toLowerCase());
    
    if (!matchesSearch) return false;

    if (activeFilter === 'All' || activeFilter.includes('Search')) return true;
    if (activeFilter === 'Greenhouse') return (job.source || '').toLowerCase() === 'greenhouse';
    if (activeFilter === 'Lever') return (job.source || '').toLowerCase() === 'lever';
    if (activeFilter === 'Remote') return (job.location || '').toLowerCase().includes('remote');
    if (activeFilter === 'On-site') return !(job.location || '').toLowerCase().includes('remote');
    
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
        <p className="text-gray-400 mt-2">Discover live Greenhouse/Lever listings or launch pre-filled searches on LinkedIn & Naukri with extension autofill.</p>
      </div>

      {/* Option A: Search Bar & Filters */}
      <div className="card-glass p-4 mb-8 sticky top-20 z-10">
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
        
        <div className="mt-4 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {filters.map((filter) => (
            <button 
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                activeFilter === filter ? 'bg-primary-600 text-white' : 'bg-surface-800 text-gray-300 hover:bg-surface-700'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Option A: External Search Launch Cards for LinkedIn & Naukri */}
      {(activeFilter === 'All' || activeFilter.includes('LinkedIn') || activeFilter.includes('Naukri')) && (
        <div className="mb-8">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <span className="text-accent-400">⚡</span> Quick Launch External Searches (Extension Enabled)
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
                  <h3 className="text-lg font-bold text-white">Search "{searchKeyword}" on LinkedIn</h3>
                  <p className="text-gray-400 text-xs mt-1">Launches LinkedIn Easy Apply results with your pre-filled role keyword.</p>
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
                  <h3 className="text-lg font-bold text-white">Search "{searchKeyword}" on Naukri</h3>
                  <p className="text-gray-400 text-xs mt-1">Launches Naukri portal with your pre-filled role search criteria.</p>
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

      {/* Live Greenhouse & Lever Job Grid */}
      <div>
        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <span className="text-primary-400">💼</span> Live ATS Postings (Greenhouse & Lever)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredJobs.map((job, i) => (
            <div key={job.id || i} className="card-glass p-5 flex flex-col h-full animate-slide-up" style={{ animationDelay: `${(i % 4) * 100}ms` }}>
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-lg bg-surface-800 border border-white/10 flex items-center justify-center font-bold text-lg text-white">
                  {(job.company || 'C').charAt(0)}
                </div>
                <span className="badge-primary">{job.source || 'Portal'}</span>
              </div>
              
              <h3 className="font-bold text-white text-lg leading-tight mb-1">{job.role || job.title}</h3>
              <div className="text-primary-400 font-medium text-sm mb-4">{job.company}</div>
              
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
                  {selectedJob.company.charAt(0)}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{selectedJob.role || selectedJob.title}</h3>
                  <p className="text-sm text-primary-400">{selectedJob.company}</p>
                </div>
              </div>
              <button onClick={() => setSelectedJob(null)} className="text-gray-400 hover:text-white text-xl">✕</button>
            </div>

            <div className="space-y-4 my-6 bg-white/[0.03] p-4 rounded-xl border border-white/5">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Portal Source:</span>
                <span className="badge-primary">{selectedJob.source}</span>
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
