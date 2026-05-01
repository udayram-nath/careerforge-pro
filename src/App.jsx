import { useState, useRef, useEffect } from 'react';
import { ResumeProvider, useResume } from './context/ResumeContext';
import ResumeForm from './components/ResumeForm';
import ResumePreview from './components/ResumePreview';
import TemplateSelector from './components/TemplateSelector';
import JDAnalyzer from './components/JDAnalyzer';
import ResumeLibrary from './components/ResumeLibrary';
import CoverLetterGenerator from './components/CoverLetterGenerator';
import ATSChecker from './components/ATSChecker';
import Pricing from './components/Pricing';
import AuthModal from './components/AuthModal';
import html2pdf from 'html2pdf.js';
import { exportToDOCX, exportToJSON } from './utils/exportUtils';
import './App.css';

function AppContent() {
  const [activeTab, setActiveTab] = useState('editor');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const resumeRef = useRef(null);
  const {
    resume,
    selectedFont,
    selectedTemplate,
    user,
    subscription,
    saveResume,
    logout
  } = useResume();

  const handleDownloadPDF = async () => {
    const element = document.getElementById('resume-content');
    if (!element) return;

    const opt = {
      margin: 0,
      filename: `${resume.personalInfo.fullName || 'resume'}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    try {
      await html2pdf().set(opt).from(element).save();
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  const handleExportDOCX = async () => {
    try {
      await exportToDOCX(resume, selectedTemplate, selectedFont);
    } catch (error) {
      console.error('Error exporting DOCX:', error);
    }
    setShowExportMenu(false);
  };

  const handleExportJSON = () => {
    exportToJSON(resume, selectedTemplate, selectedFont);
    setShowExportMenu(false);
  };

  const handleSaveResume = () => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    const name = prompt('Enter a name for this resume:', `Resume ${new Date().toLocaleDateString()}`);
    if (name) {
      saveResume(name);
      alert('Resume saved successfully!');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleLogin = () => {
    setShowAuthModal(true);
  };

  // Hide export menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (showExportMenu && !e.target.closest('.export-menu')) {
        setShowExportMenu(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showExportMenu]);

  return (
    <div className="app">
      {/* Header */}
      <header className="app-header">
        <div className="header-content">
          <div className="logo">
            🎯 <h1>CareerForge Pro</h1>
            <span>ATS-Proof Resume Generator</span>
          </div>
          <div className="header-actions">
{user ? (
              <div className="user-info">
                <span className="user-name">👤 {user.name}</span>
                <button className="btn btn-outline" onClick={logout}>
                  Logout
                </button>
              </div>
            ) : (
              <button className="btn btn-outline" onClick={handleLogin}>
                👤 Sign In
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="app-main">
        {/* Sidebar with Tabs */}
        <aside className="sidebar">
          <div className="tabs">
            <button
              className={`tab ${activeTab === 'editor' ? 'active' : ''}`}
              onClick={() => setActiveTab('editor')}
            >
              ✏️ Edit
            </button>
            <button
              className={`tab ${activeTab === 'templates' ? 'active' : ''}`}
              onClick={() => setActiveTab('templates')}
            >
              🎨 Templates
            </button>
            <button
              className={`tab ${activeTab === 'jd-analyzer' ? 'active' : ''}`}
              onClick={() => setActiveTab('jd-analyzer')}
            >
              📋 JD Analyzer
            </button>
            <button
              className={`tab ${activeTab === 'library' ? 'active' : ''}`}
              onClick={() => setActiveTab('library')}
            >
              📁 Library
            </button>
            <button
              className={`tab ${activeTab === 'cover-letter' ? 'active' : ''}`}
              onClick={() => setActiveTab('cover-letter')}
            >
              ✉️ Cover Letter
            </button>
            <button
              className={`tab ${activeTab === 'ats-checker' ? 'active' : ''}`}
              onClick={() => setActiveTab('ats-checker')}
            >
              🤖 ATS Checker
            </button>
            <button
              className={`tab ${activeTab === 'pricing' ? 'active' : ''}`}
              onClick={() => setActiveTab('pricing')}
            >
              💳 Pricing
            </button>
          </div>

          <div className="sidebar-content">
            {activeTab === 'editor' && <ResumeForm />}
            {activeTab === 'templates' && <TemplateSelector />}
            {activeTab === 'jd-analyzer' && <JDAnalyzer />}
            {activeTab === 'library' && <ResumeLibrary />}
            {activeTab === 'cover-letter' && <CoverLetterGenerator />}
{activeTab === 'ats-checker' && <ATSChecker />}
            {activeTab === 'pricing' && <Pricing />}
          </div>
        </aside>

        {/* Preview Area */}
        <section className="preview-area" ref={resumeRef}>
          <div className="preview-toolbar">
            <button className="btn btn-outline btn-sm" onClick={handleSaveResume}>
              💾 Save
            </button>
            <div className="export-menu-container">
              <button 
                className="btn btn-outline btn-sm"
                onClick={() => setShowExportMenu(!showExportMenu)}
              >
                📤 Export ▾
              </button>
              {showExportMenu && (
                <div className="export-menu">
                  <button onClick={handleDownloadPDF}>📄 PDF</button>
                  <button onClick={handleExportDOCX}>📃 DOCX</button>
                  <button onClick={handleExportJSON}>📋 JSON</button>
                </div>
              )}
            </div>
            <button className="btn btn-outline btn-sm" onClick={handlePrint}>
              🖨️ Print
            </button>
            <button className="btn btn-primary btn-sm" onClick={handleDownloadPDF}>
              📥 Download PDF
            </button>
          </div>
          <ResumePreview />
        </section>
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p>🎯 CareerForge Pro - Build ATS-Optimized Resumes That Land Interviews</p>
      </footer>

      {/* Auth Modal */}
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </div>
  );
}

export default function App() {
  return (
    <ResumeProvider>
      <AppContent />
    </ResumeProvider>
  );
}
