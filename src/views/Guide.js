import React, { useState, useEffect } from 'react';
import { useMongoDBGuide } from '../controllers/useMongoDBGuide';
import '../styles/Guide.css';

const Guide = () => {
  const { content } = useMongoDBGuide();
  const [copySuccess, setCopySuccess] = useState({ show: false, message: '', index: -1 });
  const [modalImage, setModalImage] = useState(null);

  const handleScrollToSection = (index) => {
    const section = document.getElementById(`section${index}`);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleCopyCode = (code, sectionIndex, codeIndex) => {
    const uniqueId = `${sectionIndex}-${codeIndex}`;
    navigator.clipboard.writeText(code).then(() => {
      setCopySuccess({ show: true, message: 'Koden er kopiert til utklippstavlen!', index: uniqueId });
      setTimeout(() => setCopySuccess({ show: false, message: '', index: '' }), 2000);
    }, (err) => {
      console.error('Could not copy text:', err);
      setCopySuccess({ show: true, message: 'Klarte ikke å kopiere!', index: uniqueId });
      setTimeout(() => setCopySuccess({ show: false, message: '', index: '' }), 2000);
    });
  };

  const openModal = (image) => {
    setModalImage(image);
  };

  const closeModal = () => {
    setModalImage(null);
  };

  return (
    <div className="container">
      <div className="sidebar">
        {content.map((section, index) => (
          <button
            key={index}
            className={`sidebar-item ${modalImage && modalImage === `section${index}` ? 'active' : ''}`}
            onClick={() => handleScrollToSection(index)}
          >
            {section.title}
          </button>
        ))}
      </div>
  
      <h1>MongoDB Guide</h1>
      {content.map((section, sectionIndex) => (
        <div key={sectionIndex} className="section" id={`section${sectionIndex}`}>
          <h2>{section.title}</h2>
          <p>{section.description}</p>
          {section.images && section.images.map((img, imgIndex) => (
            <img key={imgIndex} src={img} alt={`Illustration for ${section.title}`} onClick={() => openModal(img)} />
          ))}
          {section.videos && section.videos.map((video, videoIndex) => (
            <video key={videoIndex} controls>
              <source src={video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ))}
          {section.codes && section.codes.map((code, codeIndex) => (
            <div key={codeIndex} className="code-block">
              <p>{code.description}</p>
              <pre className="pre">{code.code}</pre>
              <button 
                onClick={() => handleCopyCode(code.code, sectionIndex, codeIndex)} 
                className="copy-button"
              >
                Kopier til utklippstavlen
              </button>
            </div>
          ))}
          {section.additionalNotes && (
            <div className="additional-notes">
              <p>{section.additionalNotes}</p>
            </div>
          )}
        </div>
      ))}
      {modalImage && (
        <div className="modal">
          <span className="close" onClick={closeModal}>&times;</span>
          <img className="modal-content" src={modalImage} alt="Modal Content" />
        </div>
      )}
    </div>
  );
  
};

export default Guide;
