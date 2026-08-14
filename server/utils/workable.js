export const fetchWorkableJobs = async (companySlug) => {
  try {
    const response = await fetch(`https://apply.workable.com/api/v1/widget/accounts/${companySlug}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch from Workable for ${companySlug}`);
    }
    const data = await response.json();
    const jobsList = data.jobs || [];
    return jobsList.map(job => ({
      id: `wrk_${companySlug}_${job.shortcode || job.id || Math.random().toString(36).substr(2, 9)}`,
      title: job.title,
      company: data.name || (companySlug.charAt(0).toUpperCase() + companySlug.slice(1)),
      location: job.location ? `${job.location.city || ''}, ${job.location.country || ''}`.replace(/^, /, '').trim() : (job.telecommute ? 'Remote' : 'Remote / Hybrid'),
      description: job.description || '',
      url: job.url || `https://apply.workable.com/${companySlug}/j/${job.shortcode}/`,
      source: 'workable'
    }));
  } catch (error) {
    console.error(`Error fetching Workable jobs for ${companySlug}:`, error);
    return [];
  }
};
