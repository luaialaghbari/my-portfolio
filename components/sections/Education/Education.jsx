import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import styles from './Education.module.css';

export default function Education({ resume, trans, lang, assetPrefix }) {
  const narrativeRef = useRef(null);

  useEffect(() => {
    const scroller = narrativeRef.current;
    if (!scroller || typeof window === 'undefined') return undefined;

    const reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const speedPxPerSecond = 36;
    const direction = lang === 'ar' ? -1 : 1;
    let rafId;
    let lastTs = 0;

    const setEdgeStart = () => {
      const maxScroll = Math.max(0, scroller.scrollWidth - scroller.clientWidth);
      if (maxScroll <= 0) return;
      scroller.scrollLeft = direction > 0 ? 0 : maxScroll;
    };

    const tick = (ts) => {
      if (!lastTs) lastTs = ts;
      const deltaSeconds = (ts - lastTs) / 1000;
      lastTs = ts;

      if (!reduceMotionQuery.matches) {
        const maxScroll = Math.max(0, scroller.scrollWidth - scroller.clientWidth);
        if (maxScroll > 0) {
          const next = scroller.scrollLeft + (direction * speedPxPerSecond * deltaSeconds);
          if (direction > 0 && next >= maxScroll) {
            scroller.scrollLeft = 0;
          } else if (direction < 0 && next <= 0) {
            scroller.scrollLeft = maxScroll;
          } else {
            scroller.scrollLeft = next;
          }
        }
      }

      rafId = window.requestAnimationFrame(tick);
    };

    setEdgeStart();
    rafId = window.requestAnimationFrame(tick);

    const onResize = () => {
      setEdgeStart();
      lastTs = 0;
    };

    window.addEventListener('resize', onResize);
    if (typeof reduceMotionQuery.addEventListener === 'function') {
      reduceMotionQuery.addEventListener('change', onResize);
    } else if (typeof reduceMotionQuery.addListener === 'function') {
      reduceMotionQuery.addListener(onResize);
    }

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener('resize', onResize);
      if (typeof reduceMotionQuery.removeEventListener === 'function') {
        reduceMotionQuery.removeEventListener('change', onResize);
      } else if (typeof reduceMotionQuery.removeListener === 'function') {
        reduceMotionQuery.removeListener(onResize);
      }
    };
  }, [lang, resume.education.length]);

  return (
    <section id="education" className={styles.scope}>
      <motion.div 
        className="section-header-left"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <p className="subtitle-editorial">{trans.background}</p>
        <h2 className="title-refined">{trans.eduTitle}</h2>
      </motion.div>

      <div className="premium-education-narrative" ref={narrativeRef} dir="ltr">
        {resume.education.map((ed, idx) => (
          <React.Fragment key={idx}>
            <motion.div
              className={"edu-narrative-block"}
              data-edu-index={idx + 1}
              initial={{ opacity: 0, y: 100, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.1, margin: "0px 0px -100px 0px" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Watermark Year */}
              <motion.div 
                className="edu-watermark"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                {lang === 'ar' ? ed.periodAr.split('–')[0] || ed.periodAr.split('-')[0] : ed.period.split('–')[0] || ed.period.split('-')[0]}
              </motion.div>

              <div className="edu-premium-card">
                <div className="edu-card-glow"></div>
                <div className="edu-card-content">
                  <div className="edu-header">
                    <span className="edu-number">0{idx + 1}</span>
                    {idx !== 1 && <span className="edu-period-tag">{lang === 'ar' ? ed.periodAr : ed.period}</span>}
                  </div>
                  <h3 className="edu-degree-title">{lang === 'ar' ? ed.degreeAr : ed.degree}</h3>
                  <div className="edu-institution">
                    <span className="edu-school-name">{lang === 'ar' ? ed.schoolAr : ed.school}</span>
                    <span className="edu-location-dot"></span>
                    <span className="edu-location-text">{lang === 'ar' ? ed.locationAr : ed.location}</span>
                  </div>
                  {(ed.details || ed.detailsAr) && (
                    <p className="edu-details-text">
                      {lang === 'ar' 
                        ? (Array.isArray(ed.detailsAr) ? ed.detailsAr.join(' ') : ed.detailsAr)
                        : (Array.isArray(ed.details) ? ed.details.join(' ') : ed.details)}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
            
            {/* Connector Arrow */}
            {idx < resume.education.length - 1 && (
              <div className="edu-connector">
                <motion.img 
                  src={`${assetPrefix}/assets/arrow.png`}
                  className="connector-arrow-img"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 0.3, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
      <div className="arrow-container">
        <motion.img
          src={`${assetPrefix}/assets/arrow.png`}
          className="icon arrow"
          alt="Scroll down"
          onClick={() => { const el = document.getElementById('contact'); el && el.scrollIntoView({ behavior: 'smooth'}); }}
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        />
      </div>
    </section>
  );
}
