import { useResume, templates, fonts } from '../context/ResumeContext';
import './ResumePreview.css';

export default function ResumePreview() {
  const { resume, selectedFont, selectedTemplate } = useResume();

  // Get current template configuration
  const template = templates.find(t => t.id === selectedTemplate) || templates[0];
  const font = fonts.find(f => f.id === selectedFont) || fonts[0];

  // Helper to format date
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const [year, month] = dateString.split('-');
    const date = new Date(year, month - 1);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <div className="resume-preview">
      <div 
        className="resume-page"
        id="resume-content"
        style={{
          fontFamily: font.family,
          '--template-primary': template.primaryColor,
          '--template-bg': template.backgroundColor
        }}
      >
        {/* Header */}
        <header className="resume-header">
          <h1 className="name">{resume.personalInfo.fullName || 'Your Name'}</h1>
          <div className="contact-info">
            {resume.personalInfo.email && <span>{resume.personalInfo.email}</span>}
            {resume.personalInfo.phone && <span>{resume.personalInfo.phone}</span>}
            {resume.personalInfo.location && <span>{resume.personalInfo.location}</span>}
            {resume.personalInfo.linkedin && (
              <a href={`https://${resume.personalInfo.linkedin}`} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            )}
            {resume.personalInfo.portfolio && (
              <a href={`https://${resume.personalInfo.portfolio}`} target="_blank" rel="noopener noreferrer">
                Portfolio
              </a>
            )}
          </div>
        </header>

        {/* Summary */}
        {resume.personalInfo.summary && (
          <section className="resume-section">
            <h2 className="section-title">Professional Summary</h2>
            <p className="summary">{resume.personalInfo.summary}</p>
          </section>
        )}

        {/* Experience */}
        {resume.experience.length > 0 && resume.experience[0].company && (
          <section className="resume-section">
            <h2 className="section-title">Work Experience</h2>
            {resume.experience.map((exp) => (
              <div key={exp.id} className="experience-item">
                <div className="item-header">
                  <div className="role-company">
                    <h3 className="position">{exp.position || 'Position'}</h3>
                    <span className="company">{exp.company}</span>
                  </div>
                  <div className="date-location">
                    <span className="date">
                      {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                    </span>
                    {exp.location && <span className="location">{exp.location}</span>}
                  </div>
                </div>
                <ul className="bullets">
                  {exp.bullets.filter(b => b.trim()).map((bullet, index) => (
                    <li key={index}>{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        )}

        {/* Education */}
        {resume.education.length > 0 && resume.education[0].institution && (
          <section className="resume-section">
            <h2 className="section-title">Education</h2>
            {resume.education.map((edu) => (
              <div key={edu.id} className="education-item">
                <div className="item-header">
                  <div className="school-degree">
                    <h3 className="institution">{edu.institution}</h3>
                    <span className="degree">
                      {edu.degree} {edu.fieldOfStudy && `in ${edu.fieldOfStudy}`}
                    </span>
                  </div>
                  <div className="date-gpa">
                    <span className="date">
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    </span>
                    {edu.gpa && <span className="gpa">GPA: {edu.gpa}</span>}
                  </div>
                </div>
                {edu.description && <p className="description">{edu.description}</p>}
              </div>
            ))}
          </section>
        )}

        {/* Skills */}
        {(resume.skills.technical.length > 0 || resume.skills.tools.length > 0 || resume.skills.soft.length > 0) && (
          <section className="resume-section">
            <h2 className="section-title">Skills</h2>
            <div className="skills-container">
              {resume.skills.technical.length > 0 && (
                <div className="skill-category">
                  <strong>Technical:</strong>
                  <span>{resume.skills.technical.join(', ')}</span>
                </div>
              )}
              {resume.skills.tools.length > 0 && (
                <div className="skill-category">
                  <strong>Tools & Technologies:</strong>
                  <span>{resume.skills.tools.join(', ')}</span>
                </div>
              )}
              {resume.skills.soft.length > 0 && (
                <div className="skill-category">
                  <strong>Soft Skills:</strong>
                  <span>{resume.skills.soft.join(', ')}</span>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Projects */}
        {resume.projects.length > 0 && resume.projects[0].name && (
          <section className="resume-section">
            <h2 className="section-title">Projects</h2>
            {resume.projects.map((proj) => (
              <div key={proj.id} className="project-item">
                <div className="item-header">
                  <h3 className="project-name">{proj.name}</h3>
                  {proj.link && (
                    <a href={`https://${proj.link}`} target="_blank" rel="noopener noreferrer">
                      View Project
                    </a>
                  )}
                </div>
                {proj.technologies && (
                  <p className="technologies">{proj.technologies}</p>
                )}
                {proj.description && <p className="description">{proj.description}</p>}
              </div>
            ))}
          </section>
        )}

        {/* Certifications */}
        {resume.certifications.length > 0 && resume.certifications[0].name && (
          <section className="resume-section">
            <h2 className="section-title">Certifications</h2>
            {resume.certifications.map((cert) => (
              <div key={cert.id} className="certification-item">
                <div className="item-header">
                  <h3 className="cert-name">{cert.name}</h3>
                  <span className="issuer">{cert.issuer}</span>
                </div>
                <div className="cert-date-link">
                  <span className="date">{formatDate(cert.date)}</span>
                  {cert.link && (
                    <a href={`https://${cert.link}`} target="_blank" rel="noopener noreferrer">
                      Credential
                    </a>
                  )}
                </div>
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
}
