import { createContext, useContext, useState, useEffect } from 'react';

// Default resume template
const defaultResume = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    portfolio: '',
    summary: ''
  },
  education: [
    {
      id: 1,
      institution: '',
      degree: '',
      fieldOfStudy: '',
      startDate: '',
      endDate: '',
      gpa: '',
      description: ''
    }
  ],
  experience: [
    {
      id: 1,
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      bullets: ['']
    }
  ],
  skills: {
    technical: [],
    tools: [],
    soft: []
  },
  projects: [
    {
      id: 1,
      name: '',
      description: '',
      technologies: '',
      link: ''
    }
  ],
  certifications: [
    {
      id: 1,
      name: '',
      issuer: '',
      date: '',
      link: ''
    }
  ]
};

// Available fonts - 12 Professionally curated fonts
export const fonts = [
  { id: 'roboto', name: 'Roboto', family: "'Roboto', sans-serif", category: 'Modern Sans' },
  { id: 'open-sans', name: 'Open Sans', family: "'Open Sans', sans-serif", category: 'Humanist Sans' },
  { id: 'lato', name: 'Lato', family: "'Lato', sans-serif", category: 'Humanist Sans' },
  { id: 'montserrat', name: 'Montserrat', family: "'Montserrat', sans-serif", category: 'Geometric Sans' },
  { id: 'poppins', name: 'Poppins', family: "'Poppins', sans-serif", category: 'Geometric Sans' },
  { id: 'source-sans-pro', name: 'Source Sans Pro', family: "'Source Sans Pro', sans-serif", category: 'Humanist Sans' },
  { id: 'merriweather', name: 'Merriweather', family: "'Merriweather', serif", category: 'Serif' },
  { id: 'playfair-display', name: 'Playfair Display', family: "'Playfair Display', serif", category: 'Serif' },
  { id: 'raleway', name: 'Raleway', family: "'Raleway', sans-serif", category: 'Geometric Sans' },
  { id: 'ubuntu', name: 'Ubuntu', family: "'Ubuntu', sans-serif", category: 'Humanist Sans' },
  { id: 'libre-baskerville', name: 'Libre Baskerville', family: "'Libre Baskerville', serif", category: 'Serif' },
  { id: 'work-sans', name: 'Work Sans', family: "'Work Sans', sans-serif", category: 'Geometric Sans' }
];

// Available templates - 8 Professionally designed templates
export const templates = [
  {
    id: 'modern-blue',
    name: 'Modern Blue',
    description: 'Clean and professional with blue accents',
    primaryColor: '#2563eb',
    secondaryColor: '#1d4ed8',
    backgroundColor: '#ffffff',
    accentColor: '#eff6ff'
  },
  {
    id: 'professional-classic',
    name: 'Professional Classic',
    description: 'Traditional and elegant serif design',
    primaryColor: '#1e3a8a',
    secondaryColor: '#172554',
    backgroundColor: '#ffffff',
    accentColor: '#f1f5f9'
  },
  {
    id: 'creative-ats',
    name: 'Creative ATS',
    description: 'Modern design optimized for ATS',
    primaryColor: '#7c3aed',
    secondaryColor: '#5b21b6',
    backgroundColor: '#fefefe',
    accentColor: '#f5f3ff'
  },
  {
    id: 'executive',
    name: 'Executive',
    description: 'Premium design for senior roles',
    primaryColor: '#0f172a',
    secondaryColor: '#020617',
    backgroundColor: '#f8fafc',
    accentColor: '#e2e8f0'
  },
  {
    id: 'minimalist',
    name: 'Minimalist',
    description: 'Simple and clean design',
    primaryColor: '#374151',
    secondaryColor: '#1f2937',
    backgroundColor: '#ffffff',
    accentColor: '#f9fafb'
  },
  {
    id: 'tech-gradient',
    name: 'Tech Gradient',
    description: 'Modern tech-inspired design',
    primaryColor: '#06b6d4',
    secondaryColor: '#0891b2',
    backgroundColor: '#ecfeff',
    accentColor: '#cffafe'
  },
  {
    id: 'elegant-serif',
    name: 'Elegant Serif',
    description: 'Classic serif for traditional roles',
    primaryColor: '#991b1b',
    secondaryColor: '#7f1d1d',
    backgroundColor: '#fef2f2',
    accentColor: '#fee2e2'
  },
  {
    id: 'bold-headers',
    name: 'Bold Headers',
    description: 'Eye-catching with strong headers',
    primaryColor: '#ea580c',
    secondaryColor: '#c2410c',
    backgroundColor: '#fff7ed',
    accentColor: '#ffedd5'
  }
];

const ResumeContext = createContext();

export function ResumeProvider({ children }) {
  const [resume, setResume] = useState(defaultResume);
  const [selectedFont, setSelectedFont] = useState('roboto');
  const [selectedTemplate, setSelectedTemplate] = useState('modern-blue');
  const [ATSScore, setATSScore] = useState(0);
  const [jobDescription, setJobDescription] = useState('');
  const [jdKeywords, setJdKeywords] = useState([]);
  const [user, setUser] = useState(null);
  const [savedResumes, setSavedResumes] = useState([]);
  const [coverLetter, setCoverLetter] = useState('');
  const [subscription, setSubscription] = useState('free');

  // Load user data on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('careerforge_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    const savedResumesList = localStorage.getItem('careerforge_resumes');
    if (savedResumesList) {
      setSavedResumes(JSON.parse(savedResumesList));
    }
  }, []);

  // Save resumes to localStorage
  useEffect(() => {
    if (savedResumes.length > 0) {
      localStorage.setItem('careerforge_resumes', JSON.stringify(savedResumes));
    }
  }, [savedResumes]);

  // JD Analysis - Extract keywords from job description
  const analyzeJobDescription = (jd) => {
    setJobDescription(jd);
    
    // Common keywords to extract
    const skillsPattern = /\b(JavaScript|Python|Java|C\+\+|Ruby|Go|Rust|PHP|React|Angular|Vue|Node\.js|Express|Django|Flask|Spring|Laravel|MySQL|PostgreSQL|MongoDB|Redis|Docker|Kubernetes|AWS|Azure|GCP|Git|DevOps|Agile|Scrum|Machine Learning|Data Science|AI|NLP|Computer Vision|API|REST|GraphQL|Microservices|CI\/CD|TDD|Leadership|Management|Communication|Problem Solving|Teamwork|Project Management|SEO|Analytics|Growth Hacking|Marketing|Sales|Partnerships|Legal|Finance|Accounting|Excel|PPT|PowerPoint|Word|Figma|Sketch|Adobe Photoshop|Illustrator|InDesign)\b/gi;
    
    const matches = jd.match(skillsPattern);
    if (matches) {
      const uniqueKeywords = [...new Set(matches.map(k => k.toLowerCase()))];
      setJdKeywords(uniqueKeywords);
      calculateATSScore(uniqueKeywords);
    } else {
      setJdKeywords([]);
      setATSScore(0);
    }
  };

  // Calculate ATS Score based on keywords
  const calculateATSScore = (keywords) => {
    if (!keywords || keywords.length === 0) {
      setATSScore(0);
      return;
    }

    const content = JSON.stringify(resume).toLowerCase();
    let matches = 0;

    keywords.forEach(keyword => {
      if (content.includes(keyword.toLowerCase())) {
        matches++;
      }
    });

    const score = Math.round((matches / keywords.length) * 100);
    setATSScore(score);
  };

  // Save current resume
  const saveResume = (name) => {
    const newResume = {
      id: Date.now(),
      name: name || `Resume ${savedResumes.length + 1}`,
      data: resume,
      font: selectedFont,
      template: selectedTemplate,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    const updatedList = [...savedResumes, newResume];
    setSavedResumes(updatedList);
    localStorage.setItem('careerforge_resumes', JSON.stringify(updatedList));
    return newResume;
  };

  // Load saved resume
  const loadResume = (id) => {
    const found = savedResumes.find(r => r.id === id);
    if (found) {
      setResume(found.data);
      setSelectedFont(found.font);
      setSelectedTemplate(found.template);
    }
  };

  // Delete saved resume
  const deleteResume = (id) => {
    const updatedList = savedResumes.filter(r => r.id !== id);
    setSavedResumes(updatedList);
    localStorage.setItem('careerforge_resumes', JSON.stringify(updatedList));
  };

  // User authentication (simple localStorage)
  const login = (email, name) => {
    const userData = { email, name, createdAt: new Date().toISOString() };
    setUser(userData);
    localStorage.setItem('careerforge_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('careerforge_user');
  };

  // Upgrade subscription
  const upgradeSubscription = (tier) => {
    setSubscription(tier);
  };

  // Update personal info
  const updatePersonalInfo = (field, value) => {
    setResume(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value }
    }));
  };

  // Add education
  const addEducation = () => {
    setResume(prev => ({
      ...prev,
      education: [
        ...prev.education,
        {
          id: Date.now(),
          institution: '',
          degree: '',
          fieldOfStudy: '',
          startDate: '',
          endDate: '',
          gpa: '',
          description: ''
        }
      ]
    }));
  };

  // Update education
  const updateEducation = (id, field, value) => {
    setResume(prev => ({
      ...prev,
      education: prev.education.map(edu =>
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    }));
  };

  // Remove education
  const removeEducation = (id) => {
    setResume(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }));
  };

  // Add experience
  const addExperience = () => {
    setResume(prev => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          id: Date.now(),
          company: '',
          position: '',
          location: '',
          startDate: '',
          endDate: '',
          current: false,
          bullets: ['']
        }
      ]
    }));
  };

  // Update experience
  const updateExperience = (id, field, value) => {
    setResume(prev => ({
      ...prev,
      experience: prev.experience.map(exp =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    }));
  };

  // Update experience bullet point
  const updateBullet = (expId, bulletIndex, value) => {
    setResume(prev => ({
      ...prev,
      experience: prev.experience.map(exp => {
        if (exp.id === expId) {
          const newBullets = [...exp.bullets];
          newBullets[bulletIndex] = value;
          return { ...exp, bullets: newBullets };
        }
        return exp;
      })
    }));
  };

  // Add bullet point
  const addBullet = (expId) => {
    setResume(prev => ({
      ...prev,
      experience: prev.experience.map(exp => {
        if (exp.id === expId) {
          return { ...exp, bullets: [...exp.bullets, ''] };
        }
        return exp;
      })
    }));
  };

  // Remove bullet point
  const removeBullet = (expId, bulletIndex) => {
    setResume(prev => ({
      ...prev,
      experience: prev.experience.map(exp => {
        if (exp.id === expId) {
          return {
            ...exp,
            bullets: exp.bullets.filter((_, index) => index !== bulletIndex)
          };
        }
        return exp;
      })
    }));
  };

  // Remove experience
  const removeExperience = (id) => {
    setResume(prev => ({
      ...prev,
      experience: prev.experience.filter(exp => exp.id !== id)
    }));
  };

  // Update skills
  const updateSkills = (category, skills) => {
    setResume(prev => ({
      ...prev,
      skills: { ...prev.skills, [category]: skills }
    }));
  };

  // Add project
  const addProject = () => {
    setResume(prev => ({
      ...prev,
      projects: [
        ...prev.projects,
        {
          id: Date.now(),
          name: '',
          description: '',
          technologies: '',
          link: ''
        }
      ]
    }));
  };

  // Update project
  const updateProject = (id, field, value) => {
    setResume(prev => ({
      ...prev,
      projects: prev.projects.map(proj =>
        proj.id === id ? { ...proj, [field]: value } : proj
      )
    }));
  };

  // Remove project
  const removeProject = (id) => {
    setResume(prev => ({
      ...prev,
      projects: prev.projects.filter(proj => proj.id !== id)
    }));
  };

  // Add certification
  const addCertification = () => {
    setResume(prev => ({
      ...prev,
      certifications: [
        ...prev.certifications,
        {
          id: Date.now(),
          name: '',
          issuer: '',
          date: '',
          link: ''
        }
      ]
    }));
  };

  // Update certification
  const updateCertification = (id, field, value) => {
    setResume(prev => ({
      ...prev,
      certifications: prev.certifications.map(cert =>
        cert.id === id ? { ...cert, [field]: value } : cert
      )
    }));
  };

  // Remove certification
  const removeCertification = (id) => {
    setResume(prev => ({
      ...prev,
      certifications: prev.certifications.filter(cert => cert.id !== id)
    }));
  };

  // Reset resume
  const resetResume = () => {
    setResume(defaultResume);
    setATSScore(0);
    setJobDescription('');
    setJdKeywords([]);
    setCoverLetter('');
  };

  const value = {
    resume,
    setResume,
    selectedFont,
    setSelectedFont,
    selectedTemplate,
    setSelectedTemplate,
    ATSScore,
    jobDescription,
    setJobDescription,
    jdKeywords,
    user,
    savedResumes,
    coverLetter,
    setCoverLetter,
    subscription,
    analyzeJobDescription,
    calculateATSScore,
    saveResume,
    loadResume,
    deleteResume,
    login,
    logout,
    upgradeSubscription,
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
    removeCertification,
    resetResume
  };

  return (
    <ResumeContext.Provider value={value}>
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
}
