import React from 'react';
import { motion } from 'framer-motion';
import styles from './About.module.css';

export default function About({ lang, t, trans, assetPrefix }) {
  return (
    <section id="about" className={styles.aboutSectionBold}>
      <motion.div 
        className={styles.aboutWrapperBold}
        initial={{ opacity: 0, y: 100, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ 
          duration: 1.2, 
          ease: [0.16, 1, 0.3, 1], // Custom spring-like ease
          delay: 0.1 
        }}
      >
        {/* Refined Header - Smaller Scale, No Name */}
        <motion.div
          className={styles.aboutHeaderBold}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="title-massive">
            <span className="text-stroke">{lang === 'ar' ? t.ar.aboutMeStroke : 'About'}</span>
            <span className="gradient-text">{lang === 'ar' ? t.ar.aboutMeGradient : ' Me'}</span>
          </h1>
          {lang === 'ar' && (
            <div className={styles.aboutArSlogan}>
              {t.ar.visionReality}
            </div>
          )}
        </motion.div>

        {/* Big Statement Section */}
        <div className={styles.aboutStatement}>
          <motion.h2 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {lang === 'ar' ? (
              <>
                أجمع بين فن التصميم وبراعة <span className="gradient-text">البرمجة</span>؛ حيث أصمم واجهات مستخدم ذكية وأحوّلها إلى واقع ملموس.
              </>
            ) : (
              <>Creating intuitive <span className="gradient-text">UI/UX</span> and <br /> bringing it to life on the <span className="gradient-text">frontend</span>.</>
            )}
          </motion.h2>
        </div>

        {/* Main Content Grid - No Boxes */}
        <div className={styles.aboutGridBold}>
          <div className={styles.gridLeft} style={lang === 'ar' ? {textAlign: 'right'} : {}}>
            <motion.p 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {lang === 'ar' ? (
                <span style={{display: 'block', textAlign: 'right'}}>
                  كمطور واجهات أمامية (Frontend Developer)، تخصصي هو تحويل الرؤى إلى واجهات رقمية جذابة وسريعة الاستجابة.
                </span>
              ) : (
                <>I'm a <span className="gradient-text">Frontend Developer</span> for web and mobile, bringing design ideas to life as <span className="gradient-text">sleek, responsive interfaces</span> that users enjoy.</>
              )}
            </motion.p>
          </div>
          <div className={styles.gridRight}>
            <motion.p 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              style={lang === 'ar' ? {textAlign: 'right'} : {}}
            >
              {lang === 'ar' ? (
                <span style={{display: 'block', textAlign: 'right'}}>
                  كـ UI/UX designer أسعى دائماً لتقديم تصاميم عصرية تتسم بالبساطة والجمالية، مع التركيز على توفير تجربة مستخدم انسيابية على الويب والتطبيقات.
                </span>
              ) : (
                <>I craft <span className="gradient-text">modern, engaging UI/UX designs</span> that focus on <span className="gradient-text">clarity, usability</span>, and a seamless experience across web and mobile.</>
              )}
            </motion.p>
          </div>
        </div>

        {/* Staggered High-Impact Stats/Highlights */}
        <div className={styles.aboutNodesBold}>
          <div className={styles.nodeItem}>
            <div className={styles.nodeLine}></div>
            <div className={styles.nodeContent}>
              <h3 className="gradient-text">{trans.mastery}</h3>
              <p>{trans.masteryDesc}</p>
            </div>
          </div>
          <div className={styles.nodeItem}>
            <div className={styles.nodeLine}></div>
            <div className={styles.nodeContent}>
              <h3 className="gradient-text">{trans.designCentric}</h3>
              <p>{trans.designCentricDesc}</p>
            </div>
          </div>
          <div className={styles.nodeItem}>
            <div className={styles.nodeLine}></div>
            <div className={styles.nodeContent}>
              <h3 className="gradient-text">{trans.globalVision}</h3>
              <p>{trans.globalVisionDesc}</p>
            </div>
          </div>
        </div>

        {/* Down Arrow - Moved Inside Wrapper */}
        <div className={styles.arrowContainer}>
          <motion.img
            src={`${assetPrefix}/assets/arrow.png`}
            className="icon arrow"
            alt="Scroll down"
            onClick={() => { const el = document.getElementById('experience'); el && el.scrollIntoView({ behavior: 'smooth'}); }}
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          />
        </div>
      </motion.div>
    </section>
  );
}

