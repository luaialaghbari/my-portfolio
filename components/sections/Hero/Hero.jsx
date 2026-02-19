import React from 'react';
import { motion } from 'framer-motion';
import styles from './Hero.module.css';

export default function Hero({ scrolled, lang, assetPrefix, resume }) {
  return (
    <section id="profile" className={`${styles.scope} hero-modern ${scrolled ? 'scrolled' : ''}`}>
      {/* Aesthetic background elements */}
      <div className="hero-bg-glow"></div>
      <div className="hero-rings">
        <div className="ring ring-1"></div>
        <div className="ring ring-2"></div>
        <div className="ring ring-3"></div>
      </div>
      
      <div className="hero-modern-container">
        {/* Large Background Name */}
        <div className="hero-name-bg">
          <h1 className="name-main">
            <span className="hi-text">Hi,</span>
            <span className="im-text">I'm</span>
            <span className="mid-name">Luai</span>
            <span className="last-name">Alaghbari</span>
            <div className="hero-subtitle-container hide-mobile">
              {lang === 'ar' ? (
                <>
                  <span className="name-accent" style={{fontFamily: 'Inter, system-ui, Arial, sans-serif'}}>Frontend Developer &</span>
                  <span className="name-accent" style={{fontFamily: 'Inter, system-ui, Arial, sans-serif'}}>UI UX designer<span className="dot-accent">.</span></span>
                </>
              ) : (
                <>
                  <span className="name-accent">Frontend Developer &</span>
                  <span className="name-accent">UI UX designer<span className="dot-accent">.</span></span>
                </>
              )}
            </div>
          </h1>
        </div>

        <div className="hero-modern-grid">
          {/* Left Column: Name, Bio & CTA */}
          <div className="hero-col-content">
            <motion.div 
              className="hero-text-block"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <p className="hero-description">
                {/* Text removed */}
              </p>
            </motion.div>

            {/* Action Button */}
            <motion.div
              className="hero-action-btn"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <button 
                className="btn-modern-pill" 
                onClick={() => {
                  const resumeUrl = lang === 'ar' ? resume.resumeUrlAr : resume.resumeUrl;
                  window.open(`${assetPrefix}${resumeUrl}`, '_blank');
                }}
              >
                <span>{lang === 'ar' ? 'تحميل السيرة الذاتية' : 'Download Resume'}</span>
                <div className="btn-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
                </div>
              </button>
            </motion.div>
          </div>

          {/* Right Column: Portrait Image */}
          <div className="hero-col-portrait">
            <motion.div 
              className="hero-portrait"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="portrait-bg-shape"></div>
              <img src={`${assetPrefix}/assets/newprofilelogo.png`} alt="Luai Alaghbari" />
              <div className="hero-subtitle-container show-mobile">
                {lang === 'ar' ? (
                  <>
                    <span className="name-accent" style={{fontFamily: 'Inter, system-ui, Arial, sans-serif'}}>Frontend Developer &</span>
                    <span className="name-accent" style={{fontFamily: 'Inter, system-ui, Arial, sans-serif'}}>UI UX designer<span className="dot-accent">.</span></span>
                  </>
                ) : (
                  <>
                    <span className="name-accent">Frontend Developer &</span>
                    <span className="name-accent">UI UX designer<span className="dot-accent">.</span></span>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

