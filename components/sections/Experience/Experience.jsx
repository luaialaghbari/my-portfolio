import React from 'react';
import { motion } from 'framer-motion';
import styles from './Experience.module.css';

export default function Experience({ resume, trans, lang, assetPrefix, isDesktop }) {
  const withAssetPrefix = (url) => {
    if (!url || url === '#') return url;
    if (/^(?:[a-z]+:)?\/\//i.test(url) || url.startsWith('mailto:') || url.startsWith('tel:')) {
      return url;
    }
    const normalized = url.startsWith('/') ? url : `/${url}`;
    return `${assetPrefix}${normalized}`;
  };

  return (
    <section id="experience" className={`${styles.scope} modern-experience`}>
      <motion.div 
        className="section-header-left"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <p className="subtitle-editorial">{trans.recentWork}</p>
        <h2 className="title-refined">{trans.expTitle}</h2>
      </motion.div>
      
      <div className="experience-container">
        
        {resume.experience.map((exp, idx) => {
          const isCandy = exp.title.toLowerCase().includes('water delivery');
          const isYemeniStore = exp.title.toLowerCase().includes('yemeni store');
          const isGraduation = exp.title.toLowerCase().includes('graduation project');
          const isInternship = exp.title.toLowerCase().includes('summer internship');
          const isQrEvents = exp.title.toLowerCase().includes('qr events');
          
          return (
            <motion.div 
              key={idx}
              className={`experience-node ${idx % 2 === 0 ? 'left' : 'right'} ${isCandy ? 'candy-node' : ''} ${isYemeniStore ? 'yemeni-node' : ''} ${isGraduation ? 'graduation-node' : ''} ${isInternship ? 'internship-node' : ''} ${isQrEvents ? 'qr-node' : ''}`}
              initial={isDesktop ? { opacity: 1, y: 0 } : { opacity: 0, y: 80 }}
              whileInView={isDesktop ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={isDesktop ? { duration: 0 } : { 
                duration: 1, 
                ease: [0.16, 1, 0.3, 1],
                type: "spring",
                stiffness: 50,
                damping: 15
              }}
            >
              {isQrEvents && (
                <>
                  <div className="qr-phone-right-container">
                    <motion.div 
                      className="iphone-17-frame titanium-silver"
                      initial={{ opacity: 0, x: 50, scale: 1, rotate: 0 }}
                      whileInView={{ opacity: 1, x: 0, scale: 1, rotate: 0 }}
                      viewport={{ once: false, amount: 0.2 }}
                      transition={{ 
                        type: "spring",
                        stiffness: 50,
                        damping: 15,
                        delay: 0.1
                      }}
                    >
                      <div className="iphone-inner-border"></div>
                      <div className="iphone-dynamic-island"></div>
                      <div className="iphone-buttons-left">
                        <div className="action-button"></div>
                        <div className="volume-up"></div>
                        <div className="volume-down"></div>
                      </div>
                      <div className="iphone-buttons-right">
                        <div className="power-button"></div>
                      </div>
                      <div className="iphone-screen">
                        <img
                          src={`${assetPrefix}/assets/Screenshot_20250703_173702.jpg`}
                          alt="QR Events App"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                      <div className="iphone-bottom-details">
                        <div className="speaker-grill">
                          <span></span><span></span><span></span>
                        </div>
                        <div className="usb-c-port"></div>
                        <div className="speaker-grill">
                          <span></span><span></span><span></span>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                  <div className="project-connector-line">
                    <div className="project-beam-arrow"></div>
                  </div>
                </>
              )}
              {isInternship && (
                <>
                  <div className="internship-phone-right-container">
                    <motion.div 
                      className="iphone-17-frame titanium-natural"
                      initial={{ opacity: 0, x: 50, scale: 1, rotate: 0 }}
                      whileInView={{ opacity: 1, x: 0, scale: 1, rotate: 0 }}
                      viewport={{ once: false, amount: 0.2 }}
                      transition={{ 
                        type: "spring",
                        stiffness: 50,
                        damping: 15,
                        delay: 0.1
                      }}
                    >
                      <div className="iphone-inner-border"></div>
                      <div className="iphone-dynamic-island"></div>
                      <div className="iphone-buttons-left">
                        <div className="action-button"></div>
                        <div className="volume-up"></div>
                        <div className="volume-down"></div>
                      </div>
                      <div className="iphone-buttons-right">
                        <div className="power-button"></div>
                      </div>
                      <div className="iphone-screen">
                        <img
                          src={`${assetPrefix}/assets/Screenshot 2026-01-09 233757.png`}
                          alt="Internship Project"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                      <div className="iphone-bottom-details">
                        <div className="speaker-grill">
                          <span></span><span></span><span></span>
                        </div>
                        <div className="usb-c-port"></div>
                        <div className="speaker-grill">
                          <span></span><span></span><span></span>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                  <div className="project-connector-line">
                    <div className="project-beam-arrow"></div>
                  </div>
                </>
              )}

              {isCandy && (
                <>
                  <div className="candy-phone-left-container">
                    <motion.div 
                      className="iphone-17-frame video-frame titanium-orange"
                      initial={{ opacity: 0, x: -50, scale: 1, rotate: 0 }}
                      whileInView={{ opacity: 1, x: 0, scale: 1, rotate: 0 }}
                      viewport={{ once: false, amount: 0.2 }}
                      transition={{ 
                        type: "spring",
                        stiffness: 50,
                        damping: 15,
                        delay: 0.1
                      }}
                    >
                      <div className="iphone-inner-border"></div>
                      <div className="iphone-dynamic-island"></div>
                      <div className="iphone-buttons-left">
                        <div className="action-button"></div>
                        <div className="volume-up"></div>
                        <div className="volume-down"></div>
                      </div>
                      <div className="iphone-buttons-right">
                        <div className="power-button"></div>
                      </div>
                      <div className="iphone-screen">
                        <video 
                          src={`${assetPrefix}/assets/Screen_Recording_20260106_005631_Crystal Drop.mp4`} 
                          autoPlay 
                          loop 
                          muted 
                          playsInline 
                          preload="metadata"
                          poster={`${assetPrefix}/assets/candy app.jpg`}
                          width="1080"
                          height="1920"
                          style={{ 
                            transform: 'translate3d(0, 0, 0) scale(1.0001)',
                            backfaceVisibility: 'hidden',
                            WebkitBackfaceVisibility: 'hidden',
                            filter: 'brightness(1.000001) contrast(1.000001)',
                            WebkitFilter: 'brightness(1.000001) contrast(1.000001)'
                          }}
                        />
                      </div>
                      <div className="iphone-bottom-details">
                        <div className="speaker-grill">
                          <span></span><span></span><span></span>
                        </div>
                        <div className="usb-c-port"></div>
                        <div className="speaker-grill">
                          <span></span><span></span><span></span>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                  <div className="project-connector-line">
                    <div className="project-beam-arrow"></div>
                  </div>
                </>
              )}

              {isYemeniStore && (
                <>
                  <div className="yemeni-phone-right-container">
                    <motion.div 
                      className="iphone-17-frame video-frame titanium-deep-blue"
                      initial={{ opacity: 0, x: 50, scale: 1, rotate: 0 }}
                      whileInView={{ opacity: 1, x: 0, scale: 1, rotate: 0 }}
                      viewport={{ once: false, amount: 0.2 }}
                      transition={{ 
                        type: "spring",
                        stiffness: 50,
                        damping: 15,
                        delay: 0.1
                      }}
                    >
                      <div className="iphone-inner-border"></div>
                      <div className="iphone-dynamic-island"></div>
                      <div className="iphone-buttons-left">
                        <div className="action-button"></div>
                        <div className="volume-up"></div>
                        <div className="volume-down"></div>
                      </div>
                      <div className="iphone-buttons-right">
                        <div className="power-button"></div>
                      </div>
                      <div className="iphone-screen">
                        <video 
                          src={`${assetPrefix}/assets/Screen_Recording_20250725_203231.mp4`} 
                          autoPlay 
                          loop 
                          muted 
                          playsInline 
                          preload="metadata"
                          poster={`${assetPrefix}/assets/yemen e-commerc app.png`}
                          width="1080"
                          height="1920"
                          style={{ 
                            transform: 'translate3d(0, 0, 0) scale(1.0001)',
                            backfaceVisibility: 'hidden',
                            WebkitBackfaceVisibility: 'hidden',
                            filter: 'brightness(1.000001) contrast(1.000001)',
                            WebkitFilter: 'brightness(1.000001) contrast(1.000001)'
                          }}
                        />
                      </div>
                      <div className="iphone-bottom-details">
                        <div className="speaker-grill">
                          <span></span><span></span><span></span>
                        </div>
                        <div className="usb-c-port"></div>
                        <div className="speaker-grill">
                          <span></span><span></span><span></span>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                  <div className="project-connector-line">
                    <div className="project-beam-arrow"></div>
                  </div>
                </>
              )}

              {/* Graduation card: always show connector above phone, like other cards */}
              {isGraduation && (
                <>
                  <div className="graduation-phone-left-container">
                    <motion.div 
                      className="iphone-17-frame titanium-silver"
                      initial={{ opacity: 0, x: -50, scale: 1, rotate: 0 }}
                      whileInView={{ opacity: 1, x: 0, scale: 1, rotate: 0 }}
                      viewport={{ once: false, amount: 0.2 }}
                      transition={{ 
                        type: "spring",
                        stiffness: 50,
                        damping: 15,
                        delay: 0.1
                      }}
                    >
                      <div className="iphone-inner-border"></div>
                      <div className="iphone-dynamic-island"></div>
                      <div className="iphone-buttons-left">
                        <div className="action-button"></div>
                        <div className="volume-up"></div>
                        <div className="volume-down"></div>
                      </div>
                      <div className="iphone-buttons-right">
                        <div className="power-button"></div>
                      </div>
                      <div className="iphone-screen">
                        <img
                          src={`${assetPrefix}/assets/Screenshot_20250225_002302.jpg`}
                          alt="Graduation Project"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                      <div className="iphone-bottom-details">
                        <div className="speaker-grill">
                          <span></span><span></span><span></span>
                        </div>
                        <div className="usb-c-port"></div>
                        <div className="speaker-grill">
                          <span></span><span></span><span></span>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                  <div className="project-connector-line">
                    <div className="project-beam-arrow"></div>
                  </div>
                </>
              )}
              
              <motion.div 
                className="node-content-wrapper"
                initial={isDesktop ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.9, y: 40 }}
                whileInView={isDesktop ? { opacity: 1, scale: 1, y: 0 } : { opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={isDesktop ? { duration: 0 } : { 
                  duration: 0.8, 
                  type: "spring",
                  stiffness: 45,
                  damping: 12,
                  delay: 0.2
                }}
              >
                <div className="node-info-stack">
                  <div className="node-step-label">
                    <span className="step-index">{String(idx + 1).padStart(2, '0')}</span>
                    <span className="step-text">{lang === 'ar' ? 'مرحلة' : 'Milestone'}</span>
                  </div>
                  <div className="node-date">{exp.period}</div>
                </div>
                
                <div className="node-card">
                  <div className="node-card-glass"></div>
                  <div className="node-card-content">
                    <h3
                      className="node-title"
                      style={{
                        fontFamily: '" "Satoshi"',
                        fontWeight: 900,
                        fontSize: '1.35em',
                        letterSpacing: '-0.01em',
                        WebkitTextStroke: '0.35px rgba(168, 85, 247, 0.35)',
                      }}
                    >
                      {exp.role}
                    </h3>
                    <div className="node-appname" style={{fontWeight: 900, fontSize: '1.05em', marginBottom: '0.2em'}}>
                      {lang === 'ar' ? (
                        (() => {
                          // Remove the role part in parentheses from the Arabic title for the app name
                          const arTitle = exp.titleAr || '';
                          // Remove any parenthesis and content inside
                          const appName = arTitle.replace(/\s*\(.*?\)/, '').trim();
                          return appName;
                        })()
                      ) : (
                        // Remove the role part in parentheses from the English title for the app name
                        (exp.title || '').replace(/\s*\(.*?\)/, '').trim()
                      )}
                    </div>
                    <div className="node-company-row" style={{ color: '#888' }}>
                      <span className="node-company">
                        {lang === 'ar'
                          ? (exp.companyAr === 'منصة فعاليات QR' ? '' : exp.companyAr)
                          : exp.company}
                      </span>
                      {(exp.location || exp.locationAr) && <span className="node-location"> • {lang === 'ar' ? exp.locationAr : exp.location}</span>}
                    </div>
                    
                    <ul className="node-highlights">
                      {(lang === 'ar' ? exp.highlightsAr : exp.highlights).map((h, i) => (
                        <li key={i}>{h}</li>
                      ))}
                    </ul>

                    <div className="node-tech">
                      {exp.technologies.map((tech, i) => (
                        <span key={i} className="tech-badge">{tech}</span>
                      ))}
                    </div>

                    {(exp.preview && exp.preview !== '#') || (exp.source && exp.source !== '#') ? (
                      <div className="node-actions">
                        {exp.preview && exp.preview !== '#' && (
                          <a href={withAssetPrefix(exp.preview)} target="_blank" rel="noopener" className="btn btn-color-2 btn-sm">
                            {trans.preview}
                          </a>
                        )}
                        {exp.source && exp.source !== '#' && (
                          <a href={withAssetPrefix(exp.source)} target="_blank" rel="noopener" className="btn btn-color-1 btn-sm">
                            {trans.source}
                          </a>
                        )}
                      </div>
                    ) : null}
                  </div>
                </div>
              </motion.div>
          </motion.div>
        );
      })}
      </div>
      <div className="arrow-container">
        <motion.img
          src={`${assetPrefix}/assets/arrow.png`}
          className="icon arrow"
          alt="Scroll down"
          onClick={() => { const el = document.getElementById('skills'); el && el.scrollIntoView({ behavior: 'smooth'}); }}
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        />
      </div>
    </section>
  );
}

