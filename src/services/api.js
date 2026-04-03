const BASE_URL = import.meta.env.VITE_API_URL || 'https://ai-job-agent-backend-9y7v.onrender.com';

export const apiService = {
  fetchJobs: async () => {
    try {
      const response = await fetch(`${BASE_URL}/jobs`);
      if (!response.ok) throw new Error('Failed to fetch jobs');
      return await response.json();
    } catch (error) {
      console.error('Error fetching jobs:', error);
      throw error;
    }
  },

  scrapeJobs: async () => {
    try {
      const response = await fetch(`${BASE_URL}/scrape`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      if (!response.ok) throw new Error('Failed to scrape jobs');
      return await response.json();
    } catch (error) {
      console.error('Error scraping jobs:', error);
      throw error;
    }
  },

  optimizeResume: async (jobDescription) => {
    try {
      const response = await fetch(`${BASE_URL}/optimize`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ job_description: jobDescription })
      });
      if (!response.ok) throw new Error('Failed to optimize resume');
      return await response.json();
    } catch (error) {
      console.error('Error optimizing resume:', error);
      throw error;
    }
  }
};
