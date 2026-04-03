import React, { useState, useEffect } from 'react';
import { Search, Briefcase, Zap, Bell, RefreshCcw, Sparkles } from 'lucide-react';
import JobCard from '../components/JobCard';
import Modal from '../components/Modal';
import { apiService } from '../services/api.js';

const Home = ({ activeTab }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [scraping, setScraping] = useState(false);
  const [error, setError] = useState(null);
  
  // Optimization State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [optimizing, setOptimizing] = useState(false);
  const [optimizedResult, setOptimizedResult] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);

  // Initial fetch
  useEffect(() => {
    if (activeTab === 'find') {
      loadJobs();
    }
  }, [activeTab]);

  const loadJobs = async () => {
    setLoading(true);
    try {
      const data = await apiService.fetchJobs();
      setJobs(data);
      setError(null);
    } catch (err) {
      setError('Could not connect to backend. Please make sure the FastAPI server is running.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFetchJobs = async () => {
    setScraping(true);
    try {
      await apiService.scrapeJobs();
      await loadJobs();
    } catch (err) {
      setError('Failed to fetch new jobs. Try again later.');
    } finally {
      setScraping(false);
    }
  };

  const handleOptimize = async (job) => {
    setSelectedJob(job);
    setOptimizing(true);
    setIsModalOpen(true);
    setOptimizedResult(null);
    
    try {
      const results = await apiService.optimizeResume(job.description);
      setOptimizedResult(results);
    } catch (err) {
      setOptimizedResult({ 
        updated_resume: 'Error: Failed to optimize resume. Please check backend logs.',
        changes_made: ['Network or backend error occurred']
      });
    } finally {
      setOptimizing(false);
    }
  };

  if (activeTab === 'applications') {
    return (
      <main className="main-content">
        <header className="flex justify-between items-center" style={{ marginBottom: '3rem' }}>
           <h1 style={{ fontSize: '2.5rem', fontWeight: '800' }}>My Applications</h1>
        </header>
        <div style={{ textAlign: 'center', padding: '100px 0', opacity: 0.5 }}>
           <Briefcase size={48} style={{ marginBottom: '1rem' }} />
           <h3>No applications track yet.</h3>
           <p>Start applying to jobs from the "Find Jobs" tab.</p>
        </div>
      </main>
    );
  }

  if (activeTab === 'resume') {
    return (
       <main className="main-content">
        <header className="flex justify-between items-center" style={{ marginBottom: '3rem' }}>
           <h1 style={{ fontSize: '2.5rem', fontWeight: '800' }}>My Professional Identity</h1>
        </header>
        <div style={{ padding: '2rem', background: 'var(--panel-bg)', borderRadius: '24px', border: '1px solid var(--border-color)' }}>
           <div className="flex justify-between items-center mb-8">
              <h3 style={{ margin: 0 }}>Current Resume</h3>
              <button className="btn-outline">Edit Resume</button>
           </div>
           <div style={{ whiteSpace: 'pre-wrap', color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6' }}>
              Your default resume content will appear here once you upload or generate it.
           </div>
        </div>
      </main>
    );
  }

  return (
    <main className="main-content">
      <header className="flex justify-between items-center" style={{ marginBottom: '3rem' }}>
         <div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '0.5rem' }}>Find Your Dream Job</h1>
            <p style={{ color: 'var(--text-secondary)' }}>Our AI agent has curated {jobs.length} high-match roles for you.</p>
         </div>
         
         <div className="flex items-center gap-6">
            <button 
              onClick={handleFetchJobs} 
              disabled={scraping}
              className="btn-primary flex items-center gap-2"
            >
              {scraping ? <RefreshCcw className="animate-spin" size={18} /> : <Zap size={18} />}
              {scraping ? 'Searching...' : 'Fetch Jobs'}
            </button>
            
            <div style={{ padding: '10px', background: 'var(--panel-bg)', borderRadius: '10px', border: '1px solid var(--border-color)', cursor: 'pointer' }}>
                <Bell size={20} />
            </div>
         </div>
      </header>

      {error && (
          <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', color: '#ef4444', padding: '1rem', borderRadius: '12px', marginBottom: '2rem' }}>
              {error}
          </div>
      )}

      {loading ? (
         <div className="flex-col items-center justify-center flex" style={{ height: '50vh' }}>
            <div className="loader" style={{ border: '4px solid var(--border-color)', borderTop: '4px solid #6366f1', borderRadius: '50%', width: '40px', height: '40px', animation: 'spin 1s linear infinite' }}></div>
            <p style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>Analyzing job market...</p>
         </div>
      ) : (
         <div className="job-grid">
            {jobs.map(job => (
              <JobCard 
                key={job.id || job._id || Math.random()} 
                job={job} 
                onOptimize={handleOptimize}
              />
            ))}
            
            {jobs.length === 0 && !error && (
              <div style={{ textAlign: 'center', gridColumn: '1/-1', padding: '100px 0', opacity: 0.5 }}>
                 <Briefcase size={48} style={{ marginBottom: '1rem' }} />
                 <h3>No jobs found yet.</h3>
                 <p>Click "Fetch Jobs" to start your search.</p>
              </div>
            )}
         </div>
      )}

      {/* Modal for Optimization */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title={optimizing ? "AI Optimizing..." : `Resume for ${selectedJob?.title}`}
        contentToCopy={optimizedResult?.updated_resume}
      >
        {optimizing ? (
          <div className="flex-col items-center flex" style={{ padding: '40px' }}>
              <Sparkles size={48} color="#6366f1" className="animate-pulse" style={{ marginBottom: '20px' }} />
              <p>Optimizing your resume with AI agent for this specific role...</p>
          </div>
        ) : (
          <div className="flex flex-col gap-8">
            {optimizedResult && (
              <>
                <div className="changes-section" style={{ background: 'rgba(99, 102, 241, 0.05)', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(99, 102, 241, 0.2)' }}>
                    <h3 className="flex items-center gap-2 text-indigo-400 mb-4" style={{ fontSize: '1.1rem', fontWeight: '700', margin: 0 }}>
                        <Zap size={18} /> Optimization Changes Made
                    </h3>
                    <ul className="flex flex-col gap-2" style={{ marginTop: '1rem', paddingLeft: '1rem' }}>
                        {optimizedResult?.changes_made?.map((change, idx) => (
                            <li key={idx} className="text-sm" style={{ color: 'var(--text-secondary)', listStyleType: 'disc' }}>
                                {change}
                            </li>
                        ))}
                    </ul>
                </div>
                
                <div className="resume-preview">
                    <h3 className="mb-4" style={{ fontSize: '1.1rem', fontWeight: '700' }}>Updated Resume</h3>
                    <pre style={{ 
                        whiteSpace: 'pre-wrap', 
                        background: 'var(--panel-bg)', 
                        padding: '1.5rem', 
                        borderRadius: '12px', 
                        border: '1px solid var(--border-color)',
                        fontSize: '0.9rem',
                        lineHeight: '1.6',
                        color: 'var(--text-primary)'
                    }}>
                        {optimizedResult?.updated_resume}
                    </pre>
                </div>
              </>
            )}
          </div>
        )}
      </Modal>

      {/* CSS for animations */}
      <style>{`
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        .animate-spin { animation: spin 1s linear infinite; }
      `}</style>
    </main>
  );
};

export default Home;
