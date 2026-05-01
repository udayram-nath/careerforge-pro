import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from 'docx';
import { saveAs } from 'file-saver';

// Export resume to DOCX format
export async function exportToDOCX(resume, template = 'modern-blue', font = 'roboto') {
  const doc = new Document({
    sections: [{
      properties: {},
      children: [
        // Header - Name
        new Paragraph({
          text: resume.personalInfo.fullName || 'Your Name',
          heading: HeadingLevel.HEADING_1,
          alignment: AlignmentType.CENTER,
          spacing: { after: 200 }
        }),
        
        // Contact Info
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({ text: resume.personalInfo.email }),
            new TextRun({ text: '  |  ' }),
            new TextRun({ text: resume.personalInfo.phone }),
            new TextRun({ text: '  |  ' }),
            new TextRun({ text: resume.personalInfo.location }),
          ],
          spacing: { after: 400 }
        }),
        
        // Summary
        ...(resume.personalInfo.summary ? [
          new Paragraph({
            text: 'PROFESSIONAL SUMMARY',
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 400, after: 200 }
          }),
          new Paragraph({
            text: resume.personalInfo.summary,
            spacing: { after: 400 }
          })
        ] : []),
        
        // Experience
        ...(resume.experience.length > 0 && resume.experience[0].company ? [
          new Paragraph({
            text: 'PROFESSIONAL EXPERIENCE',
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 400, after: 200 }
          }),
          ...resume.experience.flatMap(exp => [
            new Paragraph({
              children: [
                new TextRun({ text: exp.position, bold: true }),
                new TextRun({ text: ' at ' }),
                new TextRun({ text: exp.company }),
              ],
              spacing: { after: 100 }
            }),
            new Paragraph({
              text: `${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}`,
              spacing: { after: 200 }
            }),
            ...exp.bullets.filter(b => b).map(bullet => 
              new Paragraph({
                text: bullet,
                bullet: { level: 0 },
                spacing: { after: 100 }
              })
            ),
            new Paragraph({ text: '', spacing: { after: 400 } })
          ])
        ] : []),
        
        // Education
        ...(resume.education.length > 0 && resume.education[0].institution ? [
          new Paragraph({
            text: 'EDUCATION',
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 400, after: 200 }
          }),
          ...resume.education.map(edu => 
            new Paragraph({
              children: [
                new TextRun({ text: edu.degree, bold: true }),
                new TextRun({ text: edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : '' }),
              ],
              spacing: { after: 100 }
            })
          )
        ] : []),
        
        // Skills
        ...(resume.skills.technical.length > 0 ? [
          new Paragraph({
            text: 'TECHNICAL SKILLS',
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 400, after: 200 }
          }),
          new Paragraph({
            text: resume.skills.technical.join(', '),
            spacing: { after: 400 }
          })
        ] : []),
      ]
    }]
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, `${resume.personalInfo.fullName || 'resume'}.docx`);
}

// Export resume to JSON format
export function exportToJSON(resume, template, font) {
  const data = {
    resume,
    template,
    font,
    exportedAt: new Date().toISOString(),
    version: '1.0.0'
  };
  
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  saveAs(blob, `${resume.personalInfo.fullName || 'resume'}.json`);
}

// Import resume from JSON
export function importFromJSON(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        resolve(data);
      } catch (error) {
        reject(new Error('Invalid JSON file'));
      }
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
}

// Export cover letter to DOCX
export async function exportCoverLetterToDOCX(coverLetter, fileName = 'cover-letter') {
  const lines = coverLetter.split('\n');
  
  const doc = new Document({
    sections: [{
      properties: {},
      children: lines.map(line => 
        new Paragraph({
          text: line,
          spacing: { after: 200 }
        })
      )
    }]
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, `${fileName}.docx`);
}
