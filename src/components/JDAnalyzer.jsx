import { useState } from 'react';
import { useResume } from '../context/ResumeContext';
import './JDAnalyzer.css';

export default function JDAnalyzer() {
  const { jobDescription, analyzeJobDescription, ATSScore, jdKeywords } = useResume();
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      analyzeJobDescription(jobDescription);
      setIsAnalyzing(false);
    }, 500);
  };

  const getScoreColor = () => {
    if (ATSScore >= 80) return '#10b981'; // green
    if (ATSScore >= 50) return '#f59e0b'; // yellow
    return '#ef4444'; // red
  };

  const getScoreLabel = () => {
    if (ATSScore >= 80) return 'Excellent Match';
    if (ATSScore >= 50) return 'Good Match';
    if (ATSScore > 0) return 'Needs Improvement';
    return 'No Score';
  };

  return (
    <div className="jd-analyzer">
      <div className="analyzer-header">
        <h3>📋 Job Description Analyzer</h3>
        <span className="free-badge">FREE</span>
      </div>

      <div className="jd-input-section">
        <label>Paste Job Description</label>
        <textarea
          value={jobDescription}
          onChange={(e) => analyzeJobDescription(e.target.value)}
          placeholder="Paste the job description here... We will extract key skills and keywords to optimize your resume."
          rows={6}
        />
        <button 
          className="btn-analyze" 
          onClick={handleAnalyze}
          disabled={isAnalyzing || !jobDescription}
        >
          {isAnalyzing ? '🔄 Analyzing...' : '🔍 Analyze JD'}
        </button>
      </div>

      {jdKeywords.length > 0 && (
        <div className="keywords-section">
          <h4>Extracted Keywords ({jdKeywords.length})</h4>
          <div className="keywords-list">
            {jdKeywords.map((keyword, index) => (
              <span key={index} className="keyword-tag">{keyword}</span>
            ))}
          </div>
        </div>
      )}

      <div className="ats-score-section">
        <div className="score-circle" style={{ '--score-color': getScoreColor() }}>
          <svg viewBox="0 0 36 36">
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#eee"
              strokeWidth="3"
            />
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke={getScoreColor()}
              strokeWidth="3"
              strokeDasharray={`${ATSScore}, 100`}
              strokeLinecap="round"
            />
          </svg>
          <div className="score-value">
            <span className="score-number">{ATSScore}%</span>
            <span className="score-label">{getScoreLabel()}</span>
          </div>
        </div>
        
        <div className="score-tips">
          <h4>📌 Tips to Improve Your Score</h4>
          <ul>
            {ATSScore < 80 && (
              <>
                <li>Add more skills from the job description</li>
                <li>Use keywords naturally in your bullet points</li>
                <li>Include technical tools and software mentioned</li>
              </>
            )}
            {ATSScore >= 80 && (
              <li className="success-tip">✅ Your resume is well-optimized for this position!</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
