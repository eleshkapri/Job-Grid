import express from 'express';
import { fetchGreenhouseJobs } from '../utils/greenhouse.js';
import { fetchLeverJobs } from '../utils/lever.js';
import { fetchAshbyJobs } from '../utils/ashby.js';
import { fetchWorkableJobs } from '../utils/workable.js';

const router = express.Router();

let jobsCache = {
  data: [],
  timestamp: 0
};
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

const fallbackCuratedJobs = [
  // Greenhouse
  { id: 'gh_stripe_1', title: 'Frontend Engineer (New Grad)', company: 'Stripe', location: 'San Francisco, CA', type: 'On-site', source: 'greenhouse', url: 'https://boards.greenhouse.io/stripe' },
  { id: 'gh_figma_2', title: 'UI Engineer Intern', company: 'Figma', location: 'San Francisco, CA', type: 'On-site', source: 'greenhouse', url: 'https://boards.greenhouse.io/figma' },
  { id: 'gh_notion_3', title: 'Junior Web Developer', company: 'Notion', location: 'New York, NY', type: 'Hybrid', source: 'greenhouse', url: 'https://boards.greenhouse.io/notion' },
  { id: 'gh_discord_4', title: 'Software Engineer (Frontend)', company: 'Discord', location: 'Remote', type: 'Remote', source: 'greenhouse', url: 'https://boards.greenhouse.io/discord' },
  
  // Lever
  { id: 'lv_spotify_1', title: 'Software Engineer I', company: 'Spotify', location: 'New York, NY', type: 'Hybrid', source: 'lever', url: 'https://jobs.lever.co/spotify' },
  { id: 'lv_twitch_2', title: 'Full Stack Developer', company: 'Twitch', location: 'Remote', type: 'Remote', source: 'lever', url: 'https://jobs.lever.co/twitch' },
  { id: 'lv_netlify_3', title: 'Frontend Developer', company: 'Netlify', location: 'Remote', type: 'Remote', source: 'lever', url: 'https://jobs.lever.co/netlify' },

  // Ashby
  { id: 'ashby_linear_1', title: 'React Frontend Developer', company: 'Linear', location: 'Remote', type: 'Remote', source: 'ashby', url: 'https://jobs.ashbyhq.com/linear' },
  { id: 'ashby_ramp_2', title: 'Software Engineer (Product)', company: 'Ramp', location: 'New York, NY', type: 'Hybrid', source: 'ashby', url: 'https://jobs.ashbyhq.com/ramp' },
  { id: 'ashby_replit_3', title: 'Frontend Infrastructure Intern', company: 'Replit', location: 'San Francisco, CA', type: 'On-site', source: 'ashby', url: 'https://jobs.ashbyhq.com/replit' },
  { id: 'ashby_postman_4', title: 'Software Engineer I (Frontend)', company: 'Postman', location: 'Bangalore, India', type: 'Hybrid', source: 'ashby', url: 'https://jobs.ashbyhq.com/postman' },

  // Workable
  { id: 'wrk_sentry_1', title: 'Full Stack Engineer', company: 'Sentry', location: 'San Francisco, CA', type: 'Hybrid', source: 'workable', url: 'https://apply.workable.com/sentry/' },
  { id: 'wrk_invision_2', title: 'Frontend Engineer (Design System)', company: 'InVision', location: 'Remote', type: 'Remote', source: 'workable', url: 'https://apply.workable.com/invision/' },
  { id: 'wrk_swiggy_3', title: 'Web Developer Intern', company: 'Swiggy', location: 'Bangalore, India', type: 'Hybrid', source: 'workable', url: 'https://apply.workable.com/swiggy/' }
];

const fetchAllJobs = async () => {
  const greenhouseTokens = ['stripe', 'figma', 'notion', 'discord', 'reddit'];
  const leverSlugs = ['spotify', 'twitch', 'netlify'];
  const ashbySlugs = ['linear', 'ramp', 'replit', 'vanta'];
  const workableSlugs = ['sentry', 'invision'];

  try {
    const greenhousePromises = greenhouseTokens.map(token => fetchGreenhouseJobs(token));
    const leverPromises = leverSlugs.map(slug => fetchLeverJobs(slug));
    const ashbyPromises = ashbySlugs.map(slug => fetchAshbyJobs(slug));
    const workablePromises = workableSlugs.map(slug => fetchWorkableJobs(slug));

    const allResults = await Promise.all([
      ...greenhousePromises, 
      ...leverPromises, 
      ...ashbyPromises, 
      ...workablePromises
    ]);

    const liveJobs = allResults.flat();
    return liveJobs.length > 0 ? [...liveJobs, ...fallbackCuratedJobs] : fallbackCuratedJobs;
  } catch (err) {
    console.error('Error fetching live jobs:', err);
    return fallbackCuratedJobs;
  }
};

// GET /api/jobs
router.get('/', async (req, res) => {
  try {
    const { search, source, location } = req.query;

    if (Date.now() - jobsCache.timestamp > CACHE_TTL || jobsCache.data.length === 0) {
      const allJobs = await fetchAllJobs();
      jobsCache = {
        data: allJobs,
        timestamp: Date.now()
      };
    }

    let filteredJobs = jobsCache.data;

    if (source) {
      filteredJobs = filteredJobs.filter(job => (job.source || '').toLowerCase() === source.toLowerCase());
    }
    if (location) {
      filteredJobs = filteredJobs.filter(job => (job.location || '').toLowerCase().includes(location.toLowerCase()));
    }
    if (search) {
      filteredJobs = filteredJobs.filter(job => 
        (job.title || job.role || '').toLowerCase().includes(search.toLowerCase()) || 
        (job.company || '').toLowerCase().includes(search.toLowerCase())
      );
    }

    res.json(filteredJobs);
  } catch (error) {
    console.error('Get jobs error:', error);
    res.json(fallbackCuratedJobs);
  }
});

// GET /api/jobs/:id
router.get('/:id', async (req, res) => {
  try {
    if (Date.now() - jobsCache.timestamp > CACHE_TTL || jobsCache.data.length === 0) {
      const allJobs = await fetchAllJobs();
      jobsCache = {
        data: allJobs,
        timestamp: Date.now()
      };
    }
    
    const job = jobsCache.data.find(j => j.id === req.params.id);
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }
    
    res.json(job);
  } catch (error) {
    console.error('Get job error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
