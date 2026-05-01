import { useState } from 'react';
import { useResume } from '../context/ResumeContext';
import './ResumeLibrary.css';

export default function ResumeLibrary() {
  const { savedResumes, loadResume, deleteResume, user } = useResume();
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [resumeName, setResumeName] = useState('');
  const [saveResume] = useState('');

  if (savedResumes.length === 0) {
    return (
      <div className="resume-library empty">
        <div className="empty-state">
          <span className="empty-icon">📁</span>
          <h3>No Saved Resumes</h3>
          <p>Save your first resume to access it anytime</p>
          {!user && (
            <button className="btn-small" onClick={() => setShowSaveModal(true)}>
              Create Account to Save
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="resume-library">
      <div className="library-header">
        <h3>📁 My Resumes ({savedResumes.length})</h3>
      </div>

      <div className="resume-list">
        {savedResumes.map((resume) => (
          <div key={resume.id} className="resume-card">
            <div className="resume-info">
              <h4>{resume.name}</h4>
              <p className="resume-date">
                Created: {new Date(resume.createdAt).toLocaleDateString()}
              </p>
              <p className="resume-template">
                Template: {resume.template} • Font: {resume.font}
              </p>
            </div>
            <div className="resume-actions">
              <button 
                className="btn-load"
                onClick={() => loadResume(resume.id)}
              >
                Load
              </button>
              <button 
                className="btn-delete"
                onClick={() => deleteResume(resume.id)}
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
