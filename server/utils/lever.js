export const fetchLeverJobs = async (companySlug) => {
  try {
    const response = await fetch(`https://api.lever.co/v0/postings/${companySlug}?mode=json`);
    if (!response.ok) {
      throw new Error(`Failed to fetch from lever for ${companySlug}`);
    }
    const data = await response.json();
    return data.map(job => ({
      id: `lv_${companySlug}_${job.id}`,
      title: job.text,
      company: companySlug,
      location: job.categories?.location || 'Remote',
      description: job.descriptionPlain || job.description,
      url: job.hostedUrl,
      source: 'lever'
    }));
  } catch (error) {
    console.error(`Error fetching lever jobs for ${companySlug}:`, error);
    return [];
  }
};
