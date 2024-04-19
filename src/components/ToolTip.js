import { useState } from 'react';

const ToolTip = ({ children, text }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <span className="tooltip-container" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      {children}
      {isHovered && <span className="tooltip-text">{text}</span>}
    </span>
  );
};

export default ToolTip;
