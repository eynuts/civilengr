import React, { useState, useEffect } from 'react';
import Tilt from 'react-parallax-tilt';
import { 
  Plane, 
  BarChart3, 
  ShieldCheck, 
  Smartphone, 
  Download, 
  ChevronRight,
  Info,
  LayoutDashboard,
  Menu,
  X,
  ArrowUp
} from 'lucide-react';
import './App.css';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [scrollY, setScrollY] = useState(0);
  const downloadLink = "https://github.com/eynuts/civilengr/releases/download/v1.0/BuildView.apk";

  useEffect(() => {
    const handleScrollReveal = () => {
      const reveals = document.querySelectorAll('.reveal');
      const windowHeight = window.innerHeight;
      const elementVisible = 100;

      reveals.forEach((reveal) => {
        const elementTop = reveal.getBoundingClientRect().top;
        if (elementTop < windowHeight - elementVisible) {
          reveal.classList.add('active');
        }
      });

      // Check active section
      const sections = ['features', 'download', 'about'];
      let current = '';
      
      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            current = section;
          }
        }
      });
      setActiveSection(current);
    };

    const checkScroll = () => {
      setScrollY(window.scrollY);

      if (!showScrollTop && window.scrollY > 400) {
        setShowScrollTop(true);
      } else if (showScrollTop && window.scrollY <= 400) {
        setShowScrollTop(false);
      }
      handleScrollReveal();
    };

    window.addEventListener('scroll', checkScroll);
    handleScrollReveal();
    return () => window.removeEventListener('scroll', checkScroll);
  }, [showScrollTop]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const handleScroll = (e, targetId) => {
    e.preventDefault();
    closeMenu();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const navHeight = 100; // Account for sticky navbar
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - navHeight;
  
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <>
      <div 
        className="parallax-bg" 
        style={{ transform: `translateY(-${scrollY * 0.2}px)` }}
      />
      <div className="site-wrapper">
        {/* Navbar */}
        <nav className="container nav-container">
        <div className="navbar glass-card">
          <div className="logo">
            <LayoutDashboard className="logo-icon" size={28} />
            Build<span>View</span>
          </div>
          
          {/* Desktop Nav */}
          <div className="nav-links desktop-nav">
            <a href="#features" className={`nav-link ${activeSection === 'features' ? 'active' : ''}`} onClick={(e) => handleScroll(e, 'features')}>Features</a>
            <a href="#download" className={`nav-link ${activeSection === 'download' ? 'active' : ''}`} onClick={(e) => handleScroll(e, 'download')}>Download</a>
            <a href="#about" className={`nav-link ${activeSection === 'about' ? 'active' : ''}`} onClick={(e) => handleScroll(e, 'about')}>About</a>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle Menu">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav Dropdown */}
        <div className={`mobile-nav glass-card ${isMenuOpen ? 'open' : ''}`}>
          <a href="#features" className="nav-link" onClick={(e) => handleScroll(e, 'features')}>Features</a>
          <a href="#download" className="nav-link" onClick={(e) => handleScroll(e, 'download')}>Download</a>
          <a href="#about" className="nav-link" onClick={(e) => handleScroll(e, 'about')}>About</a>
          <a href={downloadLink} className="btn-primary mobile-download" onClick={closeMenu}>
            <Download size={18} />
            Download APK
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container hero">
        <div className="hero-content glass-card">
          <div className="hero-badge">
            <Plane size={14} className="badge-icon" />
            Now Supporting DJI Drones
          </div>
          <h1>Build Smarter. View Clearer.</h1>
          <p>
            The comprehensive construction management platform for modern engineers. 
            Integrate DJI drones, track project lifecycles, and collaborate with 
            clients in real-time.
          </p>
          <div className="hero-btns">
            <a href={downloadLink} className="btn-primary">
              <Download size={20} />
              Download APK
            </a>
            <a href="#features" className="btn-secondary" onClick={(e) => handleScroll(e, 'features')}>
              Explore Features
              <ChevronRight size={18} />
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container features" id="features">
        <div className="section-header reveal">
          <h2>Engineered for Precision</h2>
          <p>Tools designed to handle the complexity of modern construction.</p>
        </div>
        <div className="features-grid">
          <Tilt tiltMaxAngleX={8} tiltMaxAngleY={8} scale={1.02} transitionSpeed={2000} className="feature-card glass-card reveal delay-1">
            <div className="feature-icon-wrapper">
              <Plane className="feature-icon" size={32} />
            </div>
            <h3>Drone Integration</h3>
            <p>Seamlessly connect DJI drones for high-resolution aerial site inspections and progress monitoring.</p>
          </Tilt>
          
          <Tilt tiltMaxAngleX={8} tiltMaxAngleY={8} scale={1.02} transitionSpeed={2000} className="feature-card glass-card reveal delay-2">
            <div className="feature-icon-wrapper">
              <BarChart3 className="feature-icon" size={32} />
            </div>
            <h3>Live Tracking</h3>
            <p>Monitor project milestones and daily updates with our intuitive dashboard designed for engineers.</p>
          </Tilt>

          <Tilt tiltMaxAngleX={8} tiltMaxAngleY={8} scale={1.02} transitionSpeed={2000} className="feature-card glass-card reveal delay-3">
            <div className="feature-icon-wrapper">
              <ShieldCheck className="feature-icon" size={32} />
            </div>
            <h3>Role-Based Security</h3>
            <p>Securely manage access for clients and team members with encrypted data and verified accounts.</p>
          </Tilt>

          <Tilt tiltMaxAngleX={8} tiltMaxAngleY={8} scale={1.02} transitionSpeed={2000} className="feature-card glass-card reveal delay-4">
            <div className="feature-icon-wrapper">
              <Smartphone className="feature-icon" size={32} />
            </div>
            <h3>Mobile First</h3>
            <p>Built specifically for Android, ensuring a smooth and responsive experience on the field.</p>
          </Tilt>
        </div>
      </section>

      {/* Download Section */}
      <section className="container download-section" id="download">
        <div className="download-banner glass-card reveal">
          <h2>Ready to transform your workflow?</h2>
          <p>Get the BuildView APK for Android and start managing your projects today.</p>
          <div className="hero-btns" style={{ marginTop: '40px' }}>
            <a href={downloadLink} className="btn-primary large">
              <Download size={24} />
              Download BuildView v1.0
            </a>
          </div>
          <div className="download-info reveal delay-1">
            <Info size={14} />
            Requires Android 8.0+ | Size: ~170MB | Version: 1.0.0
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="container" id="about" style={{ padding: '80px 0' }}>
        <div className="glass-card reveal" style={{ padding: '60px', textAlign: 'center' }}>
          <div className="about-icon-wrapper">
            <Info size={40} className="about-icon" />
          </div>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '24px' }}>About BuildView</h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '800px', margin: '0 auto', fontSize: '1.1rem', lineHeight: '1.8' }}>
            BuildView is a cutting-edge construction management solution that bridges the gap between field 
            operations and client expectations. By leveraging drone technology and real-time data synchronization, 
            we empower civil engineers to deliver projects with unprecedented transparency and efficiency.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>&copy; 2026 BuildView Construction Management. All rights reserved.</p>
        </div>
      </footer>

      {/* Back to Top Button */}
        <button 
          className={`scroll-top-btn ${showScrollTop ? 'visible' : ''}`} 
          onClick={scrollToTop}
          aria-label="Scroll to top"
        >
          <ArrowUp size={24} />
        </button>
      </div>
    </>
  );
};

export default App;
