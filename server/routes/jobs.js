import express from 'express';
import { fetchGreenhouseJobs } from '../utils/greenhouse.js';
import { fetchLeverJobs } from '../utils/lever.js';

const router = express.Router();

let jobsCache = {
  data: [],
  timestamp: 0
};
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

const fetchAllJobs = async () => {
  const greenhouseTokens = ['stripe', 'figma', 'notion', 'discord', 'reddit'];
  const leverSlugs = ['spotify', 'twitch', 'netlify'];

  const greenhousePromises = greenhouseTokens.map(token => fetchGreenhouseJobs(token));
  const leverPromises = leverSlugs.map(slug => fetchLeverJobs(slug));

  const allResults = await Promise.all([...greenhousePromises, ...leverPromises]);
  return allResults.flat();
};

// GET /api/jobs
router.get('/', async (req, res) => {
  try {
    const { search, source, location } = req.query;

    if (Date.now() - jobsCache.timestamp > CACHE_TTL) {
      const allJobs = await fetchAllJobs();
      jobsCache = {
        data: allJobs,
        timestamp: Date.now()
      };
    }

    let filteredJobs = jobsCache.data;

    if (source) {
      filteredJobs = filteredJobs.filter(job => job.source === source);
    }
    if (location) {
      filteredJobs = filteredJobs.filter(job => job.location.toLowerCase().includes(location.toLowerCase()));
    }
    if (search) {
      filteredJobs = filteredJobs.filter(job => 
        job.title.toLowerCase().includes(search.toLowerCase()) || 
        job.company.toLowerCase().includes(search.toLowerCase())
      );
    }

    res.json(filteredJobs);
  } catch (error) {
    console.error('Get jobs error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/jobs/:id
router.get('/:id', async (req, res) => {
  try {
    // Basic single job detail lookup from cache
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
