import React from 'react';
import { motion } from 'framer-motion';
import styles from './Skills.module.css';

export default function Skills({ resume, trans, assetPrefix, renderSkillIcon }) {
  return (
    <section id="skills" className={styles.scope}>
      <motion.div 
        className="section-header-left"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <p className="subtitle-editorial">{trans.skillsSubtitle}</p>
        <h2 className="title-refined">{trans.skills}</h2>
      </motion.div>

      <div className="skills-layout">
        <div className="skills-grid-categories">
          {resume.skills.map((category, idx) => {
            const catKey = `cat${category.category.split(' ')[0]}`;
            return (
              <motion.div 
                key={category.category}
                className="skill-category-card"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.1 }}
                transition={{ 
                  type: "spring",
                  stiffness: 70,
                  damping: 15,
                  delay: idx * 0.1
                }}
                whileHover={{ 
                  y: -10,
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
              >
                <h3 className="category-title" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>{category.category}</h3>
              <div className="category-content">
                {category.items.map((skill, sIdx) => (
                  <motion.div 
                    key={skill} 
                    className="skill-chip"
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: false }}
                    transition={{ 
                      type: "spring",
                      stiffness: 150,
                      damping: 12,
                      delay: (idx * 0.1) + (sIdx * 0.05) 
                    }}
                    whileHover={{ 
                      scale: 1.15,
                      rotate: [0, -2, 2, 0],
                      transition: { duration: 0.3 }
                    }}
                  >
                    <div className="chip-icon">
                      {renderSkillIcon(skill)}
                    </div>
                    <span className="chip-label">{skill}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )})}
        </div>
      </div>
      <div className="arrow-container">
        <motion.img
          src={`${assetPrefix}/assets/arrow.png`}
          className="icon arrow"
          alt="Scroll down"
          onClick={() => { const el = document.getElementById('education'); el && el.scrollIntoView({ behavior: 'smooth'}); }}
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        />
      </div>
    </section>
  );
}
