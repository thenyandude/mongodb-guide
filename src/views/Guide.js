import React, { useState } from 'react';
import { useMongoDBGuide } from '../controllers/useMongoDBGuide';
import '../styles/Guide.css';

const Guide = () => {
  const { content } = useMongoDBGuide();
  const [copySuccess, setCopySuccess] = useState({ show: false, message: '', index: -1 });

  const handleCopyCode = (code, sectionIndex, codeIndex) => {
    const uniqueId = `${sectionIndex}-${codeIndex}`; // Create a unique ID for each code block
    navigator.clipboard.writeText(code).then(() => {
        setCopySuccess({ show: true, message: 'Koden er kopiert til utklippstavlen!', index: uniqueId });
      setTimeout(() => setCopySuccess({ show: false, message: '', index: '' }), 2000);
    }, (err) => {
      console.error('Could not copy text:', err);
      setCopySuccess({ show: true, message: 'Klarte ikke å kopiere!', index: uniqueId });
      setTimeout(() => setCopySuccess({ show: false, message: '', index: '' }), 2000);
    });
  };
  

  return (
    <div className="container">
      <h1>MongoDB Guide</h1>
      {content.map((section, sectionIndex) => (
        <div key={sectionIndex} className="section">
          <h2>{section.title}</h2>
          <p>{section.description}</p>
          {section.images && section.images.map((img, imgIndex) => (
            <img key={imgIndex} src={img} alt={`Illustration for ${section.title}`} />
          ))}
          {section.videos && section.videos.map((video, videoIndex) => (
            <video key={videoIndex} controls>
              <source src={video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ))}
          {section.codes && section.codes.map((code, codeIndex) => (
            <div key={codeIndex} className={`code-block ${copySuccess.show && copySuccess.index === `${sectionIndex}-${codeIndex}` ? 'copy-success' : ''}`}>
                <p>{code.description}</p>
                <pre className="pre">{code.code}</pre>
                <button 
                onClick={() => handleCopyCode(code.code, sectionIndex, codeIndex)} 
                className="copy-button"
                >
                Kopier til utklippstavlen
                </button>
                <span className="copy-message">{copySuccess.message}</span>
            </div>
            ))}
        </div>
      ))}
    </div>
  );
};

export default Guide;
