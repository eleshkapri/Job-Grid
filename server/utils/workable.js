export const fetchWorkableJobs = async (companySlug) => {
  try {
    const response = await fetch(`https://apply.workable.com/api/v1/widget/accounts/${companySlug}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch from Workable for ${companySlug}`);
    }
    const data = await response.json();
    const jobsList = data.jobs || [];
    return jobsList.map(job => ({
      id: `wrk_${companySlug}_${job.shortcode || job.id}`,
      title: job.title,
      company: companySlug,
      location: job.location ? `${job.location.city || ''}, ${job.location.country || ''}`.trim() : (job.telecommute ? 'Remote' : 'Not specified'),
      description: job.description || '',
      url: job.url || `https://apply.workable.com/${companySlug}/j/${job.shortcode}/`,
      source: 'workable'
    }));
  } catch (error) {
    console.error(`Error fetching Workable jobs for ${companySlug}:`, error);
    return [];
  }
};
