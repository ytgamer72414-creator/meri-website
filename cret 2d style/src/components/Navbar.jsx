import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import logo from '../assets/klyrex_logo.png';
import { ArrowRight } from 'lucide-react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isItemActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    if (path === '/work') {
      return location.pathname === '/work' || location.pathname.startsWith('/portfolio');
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      padding: scrolled ? '1rem 2rem' : '0',
      transition: 'all 0.3s ease',
      pointerEvents: 'none'
    }}>
      <nav style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: scrolled ? '0.8rem 1.5rem' : '1.5rem 2rem',
        backgroundColor: scrolled ? 'rgba(253, 248, 238, 0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderRadius: scrolled ? '9999px' : '0',
        border: scrolled ? '1px solid rgba(0,0,0,0.05)' : 'none',
        boxShadow: scrolled ? '0 10px 30px rgba(0,0,0,0.1)' : 'none',
        maxWidth: scrolled ? '1100px' : '100%',
        margin: '0 auto',
        transition: 'all 0.3s ease',
        pointerEvents: 'auto'
      }}>
        <NavLink to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <img src={logo} alt="Klyrex Media" style={{ height: scrolled ? '30px' : '35px', transition: 'height 0.3s ease' }} />
          <span style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--col-dark)', marginLeft: '10px' }}>Klyrex.</span>
        </NavLink>
        
        <div style={{ display: 'flex', gap: '2rem', fontSize: '0.95rem' }}>
          {[
            { path: '/', label: 'Home' },
            { path: '/services', label: 'Services' },
            { path: '/work', label: 'Work' },
            { path: '/pricing', label: 'Pricing' },
            { path: '/reviews', label: 'Reviews' },
            { path: '/contact', label: 'Contact' },
          ].map((item) => {
            const active = isItemActive(item.path);
            return (
              <NavLink 
                key={item.label}
                to={item.path} 
                className={active ? "active-nav-link" : ""}
                style={{ 
                  textDecoration: 'none', 
                  color: 'var(--col-dark)', 
                  opacity: active ? 1 : 0.8,
                  fontWeight: active ? 700 : 600,
                  borderBottom: active ? '3px solid var(--col-yellow)' : '3px solid transparent',
                  paddingBottom: '4px',
                  transition: 'all 0.2s ease'
                }}
              >
                {item.label}
              </NavLink>
            );
          })}
        </div>

        <a href="https://wa.me/919756289688" target="_blank" rel="noopener noreferrer" className="btn" style={{ fontSize: '0.85rem', padding: '0.6rem 1.2rem', backgroundColor: '#002B99', color: 'white', border: 'none', gap: '6px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>
          Start a project <ArrowRight size={14} />
        </a>
      </nav>
    </div>
  );
};

export default Navbar;
