import React, { useState } from 'react';
import { Search, Briefcase, Zap, FileText, Settings, User } from 'lucide-react';
import Home from './pages/Home';

function App() {
  const [activeTab, setActiveTab] = useState('find');

  return (
    <div className="app-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo">
           <Zap size={24} color="#6366f1" fill="#6366f1" />
           AI JobAgent
        </div>
        
        <nav className="flex-col gap-4 flex" style={{ marginTop: '2rem' }}>
           <button 
             onClick={() => setActiveTab('find')}
             className={`btn-secondary flex items-center gap-4 ${activeTab === 'find' ? 'active' : ''}`}
             style={{ 
               background: activeTab === 'find' ? 'rgba(99, 102, 241, 0.1)' : '', 
               borderColor: activeTab === 'find' ? '#6366f1' : '' 
             }}
           >
             <Search size={18} /> Find Jobs
           </button>
           <button 
             onClick={() => setActiveTab('applications')}
             className={`btn-secondary flex items-center gap-4 ${activeTab === 'applications' ? 'active' : ''}`}
           >
             <Briefcase size={18} /> Applications
           </button>
           <button 
             onClick={() => setActiveTab('resume')}
             className={`btn-secondary flex items-center gap-4 ${activeTab === 'resume' ? 'active' : ''}`}
           >
             <FileText size={18} /> My Resume
           </button>
        </nav>

        <div style={{ marginTop: 'auto', borderTop: '1px solid var(--border-color)', paddingTop: '2rem' }}>
           <button className="btn-secondary flex items-center gap-4 w-100" style={{ marginBottom: '1rem', width: '100%', border: 'none', textAlign: 'left' }}>
             <Settings size={18} /> Settings
           </button>
           <div className="flex items-center gap-4" style={{ padding: '0.5rem' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#6366f1' }}></div>
              <div>
                 <p style={{ fontSize: '0.9rem', fontWeight: '700' }}>User Profile</p>
                 <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Premium Plan</p>
              </div>
           </div>
        </div>
      </aside>

      {/* Main Content */}
      <Home activeTab={activeTab} />
    </div>
  );
}

export default App;
