import React from 'react';
import { useTheme } from '../../utils/ThemeContext';

const Footer: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <footer>
      <div>
        <span 
          id="mode-toggler" 
          onClick={toggleTheme}
          style={{ textDecoration: 'underline', cursor: 'pointer' }}
        >
          {isDark ? 'Switch to light theme' : 'Switch to dark theme'}
        </span>
      </div>
      <div className="copy">Copyright &copy; 2025 Mathematics Society, IIT Delhi</div>
    </footer>
  );
};

export default Footer;