import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop >= 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => {
    return currentPath === path;
  };

  const handleNavClick = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  // Hide header on home page
  if (currentPath === '/home' || currentPath === '/') {
    return null;
  }

  return (
    <header>
      <div className={`navigation-wrap bg-light start-header start-style ${isScrolled ? 'scroll-on' : ''}`}>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <nav className="navbar navbar-expand-md navbar-light">
                
                <Link className="navbar-brand" to="/home">
                  <img src="/logo.png" alt="[logo] Mathematics Society" />
                </Link>	
                
                <button 
                  className="navbar-toggler" 
                  type="button" 
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  aria-controls="navbarSupportedContent" 
                  aria-expanded={isMenuOpen} 
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon"></span>
                </button>
                
                <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`} id="navbarSupportedContent">
                  <ul className="navbar-nav ml-auto py-4 py-md-0">
                    
                    <li className={`nav-item pl-4 pl-md-0 ml-0 ml-md-4 ${isActive('/home') ? 'active' : ''}`} id="nav-home">
                      <Link className="nav-link" to="/home" onClick={handleNavClick}>Home</Link>
                    </li>
                    <li className={`nav-item pl-4 pl-md-0 ml-0 ml-md-4 ${isActive('/about') ? 'active' : ''}`} id="nav-about">
                      <Link className="nav-link" to="/about" onClick={handleNavClick}>About</Link>
                    </li>
                    <li className={`nav-item pl-4 pl-md-0 ml-0 ml-md-4 ${isActive('/events') ? 'active' : ''}`} id="nav-events">
                      <Link className="nav-link" to="/events" onClick={handleNavClick}>Events</Link>
                    </li>
                    <li className={`nav-item pl-4 pl-md-0 ml-0 ml-md-4 ${isActive('/team') ? 'active' : ''}`} id="nav-team">
                      <Link className="nav-link" to="/team" onClick={handleNavClick}>Team</Link>
                    </li>
                    <li className={`nav-item pl-4 pl-md-0 ml-0 ml-md-4 ${isActive('/contact') ? 'active' : ''}`} id="nav-contact">
                      <Link className="nav-link" to="/contact" onClick={handleNavClick}>Contact</Link>
                    </li>
                    <li className="nav-item pl-4 pl-md-0 ml-0 ml-md-4">
                      <a className="nav-link" href="https://mathsociitd.github.io/blog/" target="_blank" rel="noopener noreferrer">
                        Blog &nbsp;<i className="fa fa-external-link"></i>
                      </a>
                    </li>

                  </ul>
                </div>
                
              </nav>		
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;