import React from 'react';
import { X, Download, Copy, Check } from 'lucide-react';
import { useState } from 'react';

const Modal = ({ isOpen, onClose, title, children, contentToCopy }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    if (contentToCopy) {
      navigator.clipboard.writeText(contentToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <X size={24} />
        </button>
        
        <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold" style={{ margin: 0 }}>{title}</h2>
            <div className="flex gap-4">
                <button 
                  onClick={handleCopy}
                  className="btn-secondary flex items-center gap-2"
                >
                  {copied ? <Check size={18} color="#10b981" /> : <Copy size={18} />}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
                <button className="btn-primary flex items-center gap-2">
                   <Download size={18} /> Download PDF
                </button>
            </div>
        </div>

        <div className="optimized-resume">
            {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
