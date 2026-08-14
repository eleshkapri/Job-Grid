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

  useEffect(() => {
    async function fetchJobs() {
      setLoading(true);
      try {
        const res = await fetch('/api/jobs');
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
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

  const filters = ['All', 'Greenhouse', 'Lever', 'Remote', 'On-site'];

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = (job.role || job.title || '').toLowerCase().includes(search.toLowerCase()) ||
                          (job.company || '').toLowerCase().includes(search.toLowerCase()) ||
                          (job.location || '').toLowerCase().includes(search.toLowerCase());
    
    if (!matchesSearch) return false;

    if (activeFilter === 'All') return true;
    if (activeFilter === 'Greenhouse') return (job.source || '').toLowerCase() === 'greenhouse';
    if (activeFilter === 'Lever') return (job.source || '').toLowerCase() === 'lever';
    if (activeFilter === 'Remote') return (job.location || '').toLowerCase().includes('remote');
    if (activeFilter === 'On-site') return !(job.location || '').toLowerCase().includes('remote');
    
    return true;
  });

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Find Jobs</h1>
        <p className="text-gray-400 mt-2">Discover and auto-apply to roles aggregated across job portals.</p>
      </div>

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
              placeholder="Search by role, company, or skills..." 
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
            
            <a 
              href={job.url || job.applyUrl || 'https://linkedin.com'} 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-secondary w-full py-2 hover:bg-primary-600 hover:border-primary-500 hover:text-white transition-all flex items-center justify-center gap-2 text-center"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              Auto Apply via Extension
            </a>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
