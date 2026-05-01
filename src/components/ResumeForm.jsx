import { useResume } from '../context/ResumeContext';
import './ResumeForm.css';

export default function ResumeForm() {
  const {
    resume,
    updatePersonalInfo,
    addEducation,
    updateEducation,
    removeEducation,
    addExperience,
    updateExperience,
    updateBullet,
    addBullet,
    removeBullet,
    removeExperience,
    updateSkills,
    addProject,
    updateProject,
    removeProject,
    addCertification,
    updateCertification,
    removeCertification
  } = useResume();

  const handleSkillsChange = (category, value) => {
    const skillsArray = value.split(',').map(s => s.trim()).filter(s => s);
    updateSkills(category, skillsArray);
  };

  return (
    <div className="resume-form">
      {/* Personal Information Section */}
      <section className="form-section">
        <h2 className="section-title">Personal Information</h2>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="fullName">Full Name *</label>
            <input
              type="text"
              id="fullName"
              value={resume.personalInfo.fullName}
              onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
              placeholder="John Doe"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              value={resume.personalInfo.email}
              onChange={(e) => updatePersonalInfo('email', e.target.value)}
              placeholder="john@example.com"
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              type="tel"
              id="phone"
              value={resume.personalInfo.phone}
              onChange={(e) => updatePersonalInfo('phone', e.target.value)}
              placeholder="+1 (555) 123-4567"
            />
          </div>
          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              value={resume.personalInfo.location}
              onChange={(e) => updatePersonalInfo('location', e.target.value)}
              placeholder="San Francisco, CA"
            />
          </div>
          <div className="form-group">
            <label htmlFor="linkedin">LinkedIn</label>
            <input
              type="url"
              id="linkedin"
              value={resume.personalInfo.linkedin}
              onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
              placeholder="linkedin.com/in/johndoe"
            />
          </div>
          <div className="form-group">
            <label htmlFor="portfolio">Portfolio/Website</label>
            <input
              type="url"
              id="portfolio"
              value={resume.personalInfo.portfolio}
              onChange={(e) => updatePersonalInfo('portfolio', e.target.value)}
              placeholder="johndoe.com"
            />
          </div>
          <div className="form-group full-width">
            <label htmlFor="summary">Professional Summary</label>
            <textarea
              id="summary"
              value={resume.personalInfo.summary}
              onChange={(e) => updatePersonalInfo('summary', e.target.value)}
              placeholder="Experienced software engineer with 5+ years..."
              rows={4}
            />
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="form-section">
        <div className="section-header">
          <h2 className="section-title">Education</h2>
          <button className="btn-add" onClick={addEducation}>
            + Add Education
          </button>
        </div>
        {resume.education.map((edu, index) => (
          <div key={edu.id} className="repeatable-item">
            <div className="item-header">
              <span className="item-number">Education {index + 1}</span>
              <button 
                className="btn-remove" 
                onClick={() => removeEducation(edu.id)}
              >
                Remove
              </button>
            </div>
            <div className="form-grid">
              <div className="form-group">
                <label>Institution</label>
                <input
                  type="text"
                  value={edu.institution}
                  onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                  placeholder="University of California"
                />
              </div>
              <div className="form-group">
                <label>Degree</label>
                <input
                  type="text"
                  value={edu.degree}
                  onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                  placeholder="Bachelor of Science"
                />
              </div>
              <div className="form-group">
                <label>Field of Study</label>
                <input
                  type="text"
                  value={edu.fieldOfStudy}
                  onChange={(e) => updateEducation(edu.id, 'fieldOfStudy', e.target.value)}
                  placeholder="Computer Science"
                />
              </div>
              <div className="form-group">
                <label>GPA</label>
                <input
                  type="text"
                  value={edu.gpa}
                  onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                  placeholder="3.8/4.0"
                />
              </div>
              <div className="form-group">
                <label>Start Date</label>
                <input
                  type="month"
                  value={edu.startDate}
                  onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>End Date</label>
                <input
                  type="month"
                  value={edu.endDate}
                  onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                />
              </div>
              <div className="form-group full-width">
                <label>Description</label>
                <textarea
                  value={edu.description}
                  onChange={(e) => updateEducation(edu.id, 'description', e.target.value)}
                  placeholder="Relevant coursework, honors, achievements..."
                  rows={3}
                />
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Experience Section */}
      <section className="form-section">
        <div className="section-header">
          <h2 className="section-title">Work Experience</h2>
          <button className="btn-add" onClick={addExperience}>
            + Add Experience
          </button>
        </div>
        {resume.experience.map((exp, index) => (
          <div key={exp.id} className="repeatable-item">
            <div className="item-header">
              <span className="item-number">Experience {index + 1}</span>
              <button 
                className="btn-remove" 
                onClick={() => removeExperience(exp.id)}
              >
                Remove
              </button>
            </div>
            <div className="form-grid">
              <div className="form-group">
                <label>Company</label>
                <input
                  type="text"
                  value={exp.company}
                  onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                  placeholder="Google"
                />
              </div>
              <div className="form-group">
                <label>Position</label>
                <input
                  type="text"
                  value={exp.position}
                  onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                  placeholder="Senior Software Engineer"
                />
              </div>
              <div className="form-group">
                <label>Location</label>
                <input
                  type="text"
                  value={exp.location}
                  onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
                  placeholder="Mountain View, CA"
                />
              </div>
              <div className="form-group">
                <label>Start Date</label>
                <input
                  type="month"
                  value={exp.startDate}
                  onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>End Date</label>
                <input
                  type="month"
                  value={exp.endDate}
                  onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                  disabled={exp.current}
                />
              </div>
              <div className="form-group checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={exp.current}
                    onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)}
                  />
                  I currently work here
                </label>
              </div>
            </div>
            <div className="bullets-section">
              <label>Bullet Points (Achievements/Responsibilities)</label>
              {exp.bullets.map((bullet, bulletIndex) => (
                <div key={bulletIndex} className="bullet-input">
                  <span className="bullet-marker">•</span>
                  <textarea
                    value={bullet}
                    onChange={(e) => updateBullet(exp.id, bulletIndex, e.target.value)}
                    placeholder="Led development of key features that improved..."
                    rows={2}
                  />
                  {exp.bullets.length > 1 && (
                    <button
                      type="button"
                      className="btn-remove-bullet"
                      onClick={() => removeBullet(exp.id, bulletIndex)}
                    >
                     ×
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                className="btn-add-bullet"
                onClick={() => addBullet(exp.id)}
              >
                + Add Bullet Point
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* Skills Section */}
      <section className="form-section">
        <h2 className="section-title">Skills</h2>
        <div className="form-grid">
          <div className="form-group">
            <label>Technical Skills (comma-separated)</label>
            <input
              type="text"
              value={resume.skills.technical.join(', ')}
              onChange={(e) => handleSkillsChange('technical', e.target.value)}
              placeholder="Python, JavaScript, React, SQL"
            />
          </div>
          <div className="form-group">
            <label>Tools & Technologies (comma-separated)</label>
            <input
              type="text"
              value={resume.skills.tools.join(', ')}
              onChange={(e) => handleSkillsChange('tools', e.target.value)}
              placeholder="AWS, Docker, Git, Jenkins"
            />
          </div>
          <div className="form-group full-width">
            <label>Soft Skills (comma-separated)</label>
            <input
              type="text"
              value={resume.skills.soft.join(', ')}
              onChange={(e) => handleSkillsChange('soft', e.target.value)}
              placeholder="Leadership, Communication, Teamwork"
            />
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="form-section">
        <div className="section-header">
          <h2 className="section-title">Projects</h2>
          <button className="btn-add" onClick={addProject}>
            + Add Project
          </button>
        </div>
        {resume.projects.map((proj, index) => (
          <div key={proj.id} className="repeatable-item">
            <div className="item-header">
              <span className="item-number">Project {index + 1}</span>
              <button 
                className="btn-remove" 
                onClick={() => removeProject(proj.id)}
              >
                Remove
              </button>
            </div>
            <div className="form-grid">
              <div className="form-group">
                <label>Project Name</label>
                <input
                  type="text"
                  value={proj.name}
                  onChange={(e) => updateProject(proj.id, 'name', e.target.value)}
                  placeholder="E-Commerce Platform"
                />
              </div>
              <div className="form-group">
                <label>Technologies Used</label>
                <input
                  type="text"
                  value={proj.technologies}
                  onChange={(e) => updateProject(proj.id, 'technologies', e.target.value)}
                  placeholder="React, Node.js, MongoDB"
                />
              </div>
              <div className="form-group">
                <label>Link</label>
                <input
                  type="url"
                  value={proj.link}
                  onChange={(e) => updateProject(proj.id, 'link', e.target.value)}
                  placeholder="github.com/johndoe/project"
                />
              </div>
              <div className="form-group full-width">
                <label>Description</label>
                <textarea
                  value={proj.description}
                  onChange={(e) => updateProject(proj.id, 'description', e.target.value)}
                  placeholder="Built a full-stack e-commerce platform..."
                  rows={3}
                />
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Certifications Section */}
      <section className="form-section">
        <div className="section-header">
          <h2 className="section-title">Certifications</h2>
          <button className="btn-add" onClick={addCertification}>
            + Add Certification
          </button>
        </div>
        {resume.certifications.map((cert, index) => (
          <div key={cert.id} className="repeatable-item">
            <div className="item-header">
              <span className="item-number">Certification {index + 1}</span>
              <button 
                className="btn-remove" 
                onClick={() => removeCertification(cert.id)}
              >
                Remove
              </button>
            </div>
            <div className="form-grid">
              <div className="form-group">
                <label>Certification Name</label>
                <input
                  type="text"
                  value={cert.name}
                  onChange={(e) => updateCertification(cert.id, 'name', e.target.value)}
                  placeholder="AWS Solutions Architect"
                />
              </div>
              <div className="form-group">
                <label>Issuing Organization</label>
                <input
                  type="text"
                  value={cert.issuer}
                  onChange={(e) => updateCertification(cert.id, 'issuer', e.target.value)}
                  placeholder="Amazon Web Services"
                />
              </div>
              <div className="form-group">
                <label>Date</label>
                <input
                  type="month"
                  value={cert.date}
                  onChange={(e) => updateCertification(cert.id, 'date', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Credential Link</label>
                <input
                  type="url"
                  value={cert.link}
                  onChange={(e) => updateCertification(cert.id, 'link', e.target.value)}
                  placeholder="https://www.credential.net/..."
                />
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
