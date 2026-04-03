import React from 'react';
import { Briefcase, Link as LinkIcon, Sparkles } from 'lucide-react';

const TOP_COMPANIES = ["google", "microsoft", "amazon", "infosys", "tcs", "accenture", "ibm", "oracle", "adobe"];

const JobCard = ({ job, onOptimize }) => {
  const isTopCompany = TOP_COMPANIES.some(tc => job.company?.toLowerCase().includes(tc));

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
            <div className="flex items-center gap-2">
              <h3 className="job-title" style={{ margin: 0, paddingBottom: '2px' }}>{job.title}</h3>
              {isTopCompany && (
                <span style={{ background: 'rgba(234, 179, 8, 0.15)', color: '#eab308', padding: '2px 6px', borderRadius: '4px', fontSize: '0.65rem', fontWeight: 'bold', border: '1px solid rgba(234, 179, 8, 0.3)', whiteSpace: 'nowrap' }}>
                  ★ Top Company
                </span>
              )}
            </div>
            <p className="company-name">{job.company}</p>
          </div>
        </div>
        {(job.match_score > 0) && (
          <span className="match-badge">
            {Math.round(job.match_score * 100)}% Match
          </span>
        )}
      </div>

      <div className="job-footer">
        <a 
          href={job.link || job.apply_link || '#'} 
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
