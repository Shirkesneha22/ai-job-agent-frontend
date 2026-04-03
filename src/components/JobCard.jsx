import React from 'react';
import { Briefcase, Link as LinkIcon, Sparkles } from 'lucide-react';

const JobCard = ({ job, onOptimize }) => {
  return (
    <div className="job-card">
      <div className="job-header">
        <div className="flex items-center gap-4">
          <div style={{ 
            background: 'rgba(99, 102, 241, 0.1)', 
            padding: '10px', 
            borderRadius: '12px' 
          }}>
            <Briefcase size={20} color="#6366f1" />
          </div>
          <div>
            <h3 className="job-title">{job.title}</h3>
            <p className="company-name">{job.company}</p>
          </div>
        </div>
        {job.match_score && (
          <span className="match-badge">
            {Math.round(job.match_score * 100)}% Match
          </span>
        )}
      </div>

      <div className="job-footer">
        <a 
          href={job.apply_link} 
          target="_blank" 
          rel="noopener noreferrer"
          className="btn-primary flex items-center gap-2"
          style={{ flex: 1, justifyContent: 'center', textDecoration: 'none' }}
        >
          <LinkIcon size={18} /> Apply Now
        </a>
        <button 
          onClick={() => onOptimize(job)}
          className="btn-secondary flex items-center gap-2"
          title="Optimize Resume for this job"
        >
          <Sparkles size={18} color="#6366f1" />
          Optimize
        </button>
      </div>
    </div>
  );
};

export default JobCard;
