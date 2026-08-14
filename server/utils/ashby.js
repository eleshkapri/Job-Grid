export const fetchAshbyJobs = async (companySlug) => {
  try {
    const response = await fetch(`https://api.ashbyhq.com/posting-api/job-board/${companySlug}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch from Ashby for ${companySlug}`);
    }
    const data = await response.json();
    const jobsList = data.jobs || data.postings || [];
    return jobsList.map(job => ({
      id: `ashby_${companySlug}_${job.id}`,
      title: job.title,
      company: companySlug,
      location: job.location || (job.isRemote ? 'Remote' : 'Not specified'),
      description: job.descriptionPlain || job.description || '',
      url: job.applyUrl || `https://jobs.ashbyhq.com/${companySlug}/${job.id}`,
      source: 'ashby'
    }));
  } catch (error) {
    console.error(`Error fetching Ashby jobs for ${companySlug}:`, error);
    return [];
  }
};
