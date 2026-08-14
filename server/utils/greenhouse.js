export const fetchGreenhouseJobs = async (boardToken) => {
  try {
    const response = await fetch(`https://boards-api.greenhouse.io/v1/boards/${boardToken}/jobs?content=true`);
    if (!response.ok) {
      throw new Error(`Failed to fetch from greenhouse for ${boardToken}`);
    }
    const data = await response.json();
    return data.jobs.map(job => ({
      id: `gh_${boardToken}_${job.id}`,
      title: job.title,
      company: boardToken,
      location: job.location?.name || 'Remote',
      description: job.content,
      url: job.absolute_url,
      source: 'greenhouse'
    }));
  } catch (error) {
    console.error(`Error fetching greenhouse jobs for ${boardToken}:`, error);
    return [];
  }
};
