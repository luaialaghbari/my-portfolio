import React from 'react';
import { motion } from 'framer-motion';
import styles from './Education.module.css';

export default function Education({ resume, trans, lang, assetPrefix }) {
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

      <div className="premium-education-narrative">
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
