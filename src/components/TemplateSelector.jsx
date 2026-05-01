import { useResume, templates, fonts } from '../context/ResumeContext';
import './TemplateSelector.css';

export default function TemplateSelector() {
  const { 
    selectedTemplate, 
    setSelectedTemplate, 
    selectedFont, 
    setSelectedFont 
  } = useResume();

  return (
    <div className="template-selector">
      {/* Template Selection */}
      <div className="selector-group">
        <h3 className="selector-title">Resume Template</h3>
        <div className="template-grid">
          {templates.map((template) => (
            <button
              key={template.id}
              className={`template-card ${selectedTemplate === template.id ? 'active' : ''}`}
              onClick={() => setSelectedTemplate(template.id)}
              style={{ '--template-color': template.primaryColor }}
            >
              <div className="template-preview">
                <div className="preview-header"></div>
                <div className="preview-content">
                  <div className="preview-line short"></div>
                  <div className="preview-line"></div>
                  <div className="preview-line medium"></div>
                </div>
              </div>
              <span className="template-name">{template.name}</span>
              <span className="template-desc">{template.description}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Font Selection */}
      <div className="selector-group">
        <h3 className="selector-title">Font Style</h3>
        <div className="font-grid">
          {fonts.map((font) => (
            <button
              key={font.id}
              className={`font-card ${selectedFont === font.id ? 'active' : ''}`}
              onClick={() => setSelectedFont(font.id)}
              style={{ fontFamily: font.family }}
            >
              <span className="font-name">{font.name}</span>
              <span className="font-preview">Aa Bb Cc 123</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
