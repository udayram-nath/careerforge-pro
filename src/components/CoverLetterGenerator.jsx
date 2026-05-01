import { useState } from 'react';
import { useResume } from '../context/ResumeContext';
import './CoverLetterGenerator.css';

export default function CoverLetterGenerator() {
  const { resume, jobDescription, coverLetter, setCoverLetter } = useResume();
  const [isGenerating, setIsGenerating] = useState(false);
  const [tone, setTone] = useState('professional');

  const generateCoverLetter = async () => {
    setIsGenerating(true);

    // Generate cover letter based on selected tone
    setTimeout(() => {
      const template = coverLetterTemplate(resume.personalInfo.fullName, resume.personalInfo.email, jobDescription, tone);
      setCoverLetter(template);
      setIsGenerating(false);
    }, 2000);
  };

  const coverLetterTemplate = (name, email, jd, tone) => {
    const jdLower = jd.toLowerCase();
    let role = 'the position';
    if (jdLower.includes('developer')) role = 'Developer';
    else if (jdLower.includes('engineer')) role = 'Engineer';
    else if (jdLower.includes('manager')) role = 'Manager';
    else if (jdLower.includes('designer')) role = 'Designer';
    else if (jdLower.includes('analyst')) role = 'Analyst';
    
    const templates = {
      professional: `${name}
${email}

Dear Hiring Manager,

I am excited to apply for ${role} at your company. With my proven track record in delivering exceptional results and my passion for excellence, I am confident that I would be a valuable addition to your team.

Throughout my career, I have demonstrated the ability to consistently exceed expectations. My combination of technical expertise, strong communication skills, and results-oriented mindset makes me well-suited for this role. I am particularly drawn to your company's commitment to innovation and quality.

In my current role, I have:
• Consistently exceeded performance targets
• Developed and implemented key initiatives
• Collaborated effectively with cross-functional teams

I would welcome the opportunity to discuss how my background, skills, and enthusiasm can contribute to your organization's continued success.

Sincerely,
${name}`,

      friendly: `Hi there!

I'm ${name}, and I'm really excited about the opportunity to join your team. When I saw the ${role} position, I knew this was exactly the kind of role I've been looking for!

A bit about me: I'm passionate about what I do, I love collaborating with teams, and I'm always eager to learn new things. I think my skills and experience would be a great match for what you're looking for.

Would love to chat more about this opportunity!

Best,
${name}`,

      formal: `Dear Sir/Madam,

I wish to apply for the ${role} position advertised by your company. Having reviewed the requirements of the role, I am confident that my qualifications and experience align perfectly with your needs.

My professional background has equipped me with the skills necessary to excel in this position. I have consistently demonstrated my ability to deliver results and contribute to organizational success.

I would be honored to discuss my application further at your earliest convenience.

Yours faithfully,
${name}`
    };

    return templates[tone] || templates.professional;
  };

  return (
    <div className="cover-letter-generator">
      <div className="generator-header">
        <h3>✉️ Cover Letter Generator</h3>
        <span className="free-badge">FREE</span>
      </div>

      <div className="tone-selector">
        <label>Select Tone:</label>
        <div className="tone-options">
          <button 
            className={tone === 'professional' ? 'active' : ''} 
            onClick={() => setTone('professional')}
          >
            Professional
          </button>
          <button 
            className={tone === 'friendly' ? 'active' : ''} 
            onClick={() => setTone('friendly')}
          >
            Friendly
          </button>
          <button 
            className={tone === 'formal' ? 'active' : ''} 
            onClick={() => setTone('formal')}
          >
            Formal
          </button>
        </div>
      </div>

      <button 
        className="btn-generate" 
        onClick={generateCoverLetter}
        disabled={isGenerating}
      >
        {isGenerating ? '🤖 Generating...' : '✨ Generate Cover Letter'}
      </button>

      {coverLetter && (
        <div className="cover-letter-preview">
          <div className="preview-header">
            <h4>Generated Cover Letter</h4>
            <button 
              className="btn-copy"
              onClick={() => navigator.clipboard.writeText(coverLetter)}
            >
              📋 Copy
            </button>
          </div>
          <pre className="letter-content">{coverLetter}</pre>
        </div>
      )}
    </div>
  );
}
