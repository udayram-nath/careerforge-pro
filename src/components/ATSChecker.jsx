import { useState, useRef } from 'react';
import { useResume } from '../context/ResumeContext';
import './ATSChecker.css';

export default function ATSChecker() {
  const { analyzeJobDescription } = useResume();
  const [file, setFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      analyzeResume(selectedFile);
    }
  };

  const analyzeResume = async (file) => {
    setIsAnalyzing(true);
    
    // Simulate text extraction and analysis
    setTimeout(() => {
      // Generate mock analysis results
      setAnalysisResult({
        score: Math.floor(Math.random() * 30) + 60, // 60-90
        issues: [
          { type: 'keyword', message: 'Missing keywords: Leadership, Project Management', severity: 'high' },
          { type: 'format', message: 'Consider using bullet points for achievements', severity: 'medium' },
          { type: 'length', message: 'Resume is slightly short - add more detail', severity: 'low' }
        ],
        suggestions: [
          'Add quantifiable achievements (e.g., "Increased sales by 25%")',
          'Include relevant technical skills',
          'Add a strong professional summary',
          'Include relevant certifications'
        ],
        atsCompatible: true
      });
      setIsAnalyzing(false);
    }, 2000);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && (droppedFile.type === 'application/pdf' || droppedFile.type === 'text/plain')) {
      setFile(droppedFile);
      analyzeResume(droppedFile);
    }
  };

  return (
    <div className="ats-checker">
      <div className="checker-header">
        <h3>🤖 ATS Resume Checker</h3>
        <span className="free-badge">FREE</span>
      </div>

      {!analysisResult && (
        <div 
          className="upload-area"
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.txt,.docx"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
          <div className="upload-icon">📄</div>
          <p>Drag & drop your resume here</p>
          <span className="upload-hint">PDF, TXT, or DOCX</span>
        </div>
      )}

      {isAnalyzing && (
        <div className="analyzing">
          <div className="spinner"></div>
          <p>Analyzing your resume...</p>
        </div>
      )}

      {analysisResult && (
        <div className="analysis-results">
          <div className="result-header">
            <h4>Analysis Results</h4>
            <button className="btn-reset" onClick={() => setAnalysisResult(null)}>
              Check Another
            </button>
          </div>

          <div className="score-section">
            <div 
              className="main-score" 
              style={{ 
                '--score-color': analysisResult.score >= 80 ? '#10b981' : analysisResult.score >= 60 ? '#f59e0b' : '#ef4444' 
              }}
            >
              <span className="score-number">{analysisResult.score}</span>
              <span className="score-label">ATS Score</span>
            </div>
            <div className="ats-badge">
              {analysisResult.atsCompatible ? '✅ ATS Compatible' : '⚠️ Not ATS Compatible'}
            </div>
          </div>

          <div className="issues-section">
            <h5>Issues Found ({analysisResult.issues.length})</h5>
            {analysisResult.issues.map((issue, index) => (
              <div key={index} className={`issue-item ${issue.severity}`}>
                <span className="issue-type">{issue.type}</span>
                <p>{issue.message}</p>
              </div>
            ))}
          </div>

          <div className="suggestions-section">
            <h5>Suggestions to Improve</h5>
            <ul>
              {analysisResult.suggestions.map((suggestion, index) => (
                <li key={index}>{suggestion}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
