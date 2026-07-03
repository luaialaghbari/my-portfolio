import React from 'react';
import { motion } from 'framer-motion';
import styles from './Experience.module.css';

function Media({ exp, assetPrefix }) {
  const title = (exp.title || '').toLowerCase();
  const isCandy = title.includes('water delivery');
  const isYemeni = title.includes('yemeni store');
  const isGrad = title.includes('graduation project');
  const isIntern = title.includes('summer internship');

  if (isCandy)
    return <video src={`${assetPrefix}/assets/Screen_Recording_20260106_005631_Crystal Drop.mp4`} autoPlay loop muted playsInline preload="none" poster={`${assetPrefix}/assets/candy app.jpg`} />;
  if (isYemeni)
    return <video src={`${assetPrefix}/assets/Screen_Recording_20250725_203231.mp4`} autoPlay loop muted playsInline preload="none" poster={`${assetPrefix}/assets/yemen e-commerc app.png`} />;
  if (isGrad)
    return <img src={`${assetPrefix}/assets/Screenshot_20250225_002302.jpg`} alt="Graduation Project" loading="lazy" />;
  if (isIntern)
    return <img src={`${assetPrefix}/assets/Screenshot 2026-01-09 233757.png`} alt="Internship" loading="lazy" />;
  return <img src={`${assetPrefix}/assets/Screenshot_20250703_173702.jpg`} alt="Project" loading="lazy" />;
}

function Phone({ exp, assetPrefix, frameClass }) {
  return (
    <div className={styles.iphoneWrapper}>
      <div className={`${styles.iphoneFrame} ${frameClass}`}>
        <div className={styles.iphoneInner}></div>
        <div className={styles.dynamicIsland}></div>
        <div className={styles.buttonsLeft}>
          <div className={styles.actionBtn}></div>
          <div className={styles.volUp}></div>
          <div className={styles.volDown}></div>
        </div>
        <div className={styles.buttonsRight}>
          <div className={styles.powerBtn}></div>
        </div>
        <div className={styles.screen}><Media exp={exp} assetPrefix={assetPrefix} /></div>
        <div className={styles.bottomDetails}>
          <div className={styles.speakerGrill}><span></span><span></span><span></span></div>
          <div className={styles.usbPort}></div>
          <div className={styles.speakerGrill}><span></span><span></span><span></span></div>
        </div>
      </div>
    </div>
  );
}

function PanelCenter({ exp, idx, lang, assetPrefix, frameClass }) {
  const name = (lang === 'ar'
    ? (exp.titleAr || '').replace(/\s*\(.*?\)/, '').trim()
    : (exp.title || '').replace(/\s*\(.*?\)/, '').trim()
  );
  const highlights = lang === 'ar' ? exp.highlightsAr : exp.highlights;

  const phoneAnim = {
    hidden: { opacity: 0, scale: 0.85 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } }
  };
  const sideAnim = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 } }
  };
  const mid = Math.ceil(highlights.length / 2);
  const parts = exp.period.split('–');
  const startMonth = parts[0].trim();
  const endPart = parts[1].trim();
  const yearMatch = endPart.match(/\d{4}/);
  const year = yearMatch ? yearMatch[0] : '';
  const endMonth = endPart.replace(year, '').trim();

  return (
    <section className={`${styles.panel} ${styles.panelCenter}`}>
      <div className={styles.panelBg} />
      <div className={styles.timeline}>
        <div className={styles.timelineYear}>
          {year.split('').map((d, i) => <span key={i}>{d}</span>)}
        </div>
        <div className={styles.timelineBody}>
          <span className={styles.timelineDate}>{startMonth}</span>
          <span className={styles.timelineDot} />
          <span className={styles.timelineLine} />
          <span className={styles.timelineDot} />
          <span className={styles.timelineDate}>{endMonth}</span>
        </div>
      </div>
      <div className={styles.panelInner}>
        <motion.div className={styles.cLeft} variants={sideAnim} initial="hidden" whileInView="visible" viewport={{ once: false, margin: "-100px" }}>
          <div className={styles.appMag}>
            <span className={styles.appMagLg}>Candy</span>
            <span>Water</span>
          </div>
          <div className={styles.tech}>
            {exp.technologies.map((t, i) => <span key={i} className={styles.techBadge}>{t}</span>)}
          </div>
        </motion.div>
        <motion.div className={styles.phoneCenter} variants={phoneAnim} initial="hidden" whileInView="visible" viewport={{ once: false, margin: "-100px" }}>
          <Phone exp={exp} assetPrefix={assetPrefix} frameClass={frameClass} />
        </motion.div>
        <motion.div className={styles.cRight} variants={sideAnim} initial="hidden" whileInView="visible" viewport={{ once: false, margin: "-100px" }}>
          <div className={styles.appMag}>
            <span className={styles.appMagLg}>Delivery</span>
            <span>App</span>
          </div>
          <h2 className={styles.cRightRole}>{exp.role}</h2>
          <p className={styles.company}>{exp.company}</p>
          <div className={styles.highlightsCard}>
            <ul className={styles.highlights}>
              {highlights.slice(0, mid).map((h, i) => <li key={i}>{h}</li>)}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function PanelSide({ exp, idx, lang, assetPrefix, frameClass, align, stacked, timeline, timelineRight = true, timelineYellow, titleLines, gradientClass }) {
  const isLeft = align === 'left';
  const name = (lang === 'ar'
    ? (exp.titleAr || '').replace(/\s*\(.*?\)/, '').trim()
    : (exp.title || '').replace(/\s*\(.*?\)/, '').trim()
  );
  const parts = timeline ? exp.period.split(/[–-]/) : [];
  const startMonth = parts[0] ? parts[0].trim().replace(/\s*\d{4}$/, '') : '';
  const endPart = parts[1] ? parts[1].trim() : '';
  const yearMatch = endPart ? endPart.match(/\d{4}/) : exp.period.match(/\d{4}/);
  const year = yearMatch ? yearMatch[0] : '';
  const endMonth = endPart ? endPart.replace(year, '').trim() : '';

  const phoneAnim = {
    hidden: { opacity: 0, x: isLeft ? -120 : 120 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };
  const textAnim = {
    hidden: { opacity: 0, x: isLeft ? 80 : -80 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 } }
  };

  return (
    <section className={`${styles.panel} ${styles.panelSide} ${isLeft ? styles.panelSideLeft : styles.panelSideRight} ${gradientClass ? styles[gradientClass] : ''}`}>
      <div className={styles.panelBg} />
      {timeline && (
        <div className={`${styles.timeline} ${timelineRight ? styles.timelineRight : ''} ${timelineYellow ? styles.timelineYellow : ''} ${gradientClass ? styles[gradientClass] : ''}`}>
          <div className={styles.timelineYear}>
            {year.split('').map((d, i) => <span key={i}>{d}</span>)}
          </div>
          <div className={styles.timelineBody}>
            {endMonth ? (
              <>
                <span className={styles.timelineDate}>{startMonth}</span>
                <span className={styles.timelineDot} />
                <span className={styles.timelineLine} />
                <span className={styles.timelineDot} />
                <span className={styles.timelineDate}>{endMonth}</span>
              </>
            ) : (
              <>
                <span className={styles.timelineDot} />
                <span className={styles.timelineDate}>{startMonth || exp.period}</span>
              </>
            )}
          </div>
        </div>
      )}
      <div className={styles.panelInner}>
        {isLeft && (
          <motion.div className={styles.phoneLeft} variants={phoneAnim} initial="hidden" whileInView="visible" viewport={{ once: false, margin: "-100px" }}>
            <Phone exp={exp} assetPrefix={assetPrefix} frameClass={frameClass} />
          </motion.div>
        )}
        <motion.div className={isLeft ? styles.textRight : styles.textLeft} variants={textAnim} initial="hidden" whileInView="visible" viewport={{ once: false, margin: "-100px" }}>
          {titleLines ? (
            <div className={styles.appMagMultiline}>
              {titleLines.map((line, i) => <span key={i}>{line}</span>)}
            </div>
          ) : stacked ? (
            <div className={`${styles.appMagStacked} ${gradientClass ? styles[gradientClass] : ''}`}>
              {name.split(' ').map((w, i) => <span key={i}>{w}</span>)}
            </div>
          ) : (
            <p className={styles.appMag}>{name}</p>
          )}
          <h2 className={styles.role}>{exp.role}</h2>
          <p className={styles.company}>{lang === 'ar' ? exp.companyAr : exp.company}</p>
          <div className={styles.highlightsCard}>
            <ul className={styles.highlights}>
              {(lang === 'ar' ? exp.highlightsAr : exp.highlights).slice(0, 2).map((h, i) => (
                <li key={i}>{h}</li>
              ))}
            </ul>
          </div>
          <div className={styles.tech}>
            {exp.technologies.map((t, i) => <span key={i} className={styles.techBadge}>{t}</span>)}
          </div>
        </motion.div>
        {!isLeft && (
          <motion.div className={styles.phoneRight} variants={phoneAnim} initial="hidden" whileInView="visible" viewport={{ once: false, margin: "-100px" }}>
            <Phone exp={exp} assetPrefix={assetPrefix} frameClass={frameClass} />
          </motion.div>
        )}
      </div>
    </section>
  );
}

function Panel({ exp, idx, lang, assetPrefix }) {
  const title = (exp.title || '').toLowerCase();
  const isCandy = title.includes('water delivery');
  const isYemeni = title.includes('yemeni store');
  const isQrEvents = title.includes('qr &');
  const isIntern = title.includes('summer') || title.includes('yemen soft');

  const frameClass = isCandy ? styles.titaniumOrange
    : isYemeni || isQrEvents || isIntern ? styles.titaniumDeepBlue
    : styles.titaniumSilver;

  if (isCandy) return <PanelCenter exp={exp} idx={idx} lang={lang} assetPrefix={assetPrefix} frameClass={frameClass} />;
  if (idx === 1) return <PanelSide exp={exp} idx={idx} lang={lang} assetPrefix={assetPrefix} frameClass={frameClass} align="right" titleLines={["Graduation Project", "Food Delivery", "App"]} timeline timelineRight={false} timelineYellow />;
  if (idx === 0) return <PanelSide exp={exp} idx={idx} lang={lang} assetPrefix={assetPrefix} frameClass={frameClass} align="left" timeline gradientClass="accentGradient" />;
  if (isQrEvents) return <PanelSide exp={exp} idx={idx} lang={lang} assetPrefix={assetPrefix} frameClass={frameClass} align="left" stacked timeline gradientClass="blueGradient" />;
  return <PanelSide exp={exp} idx={idx} lang={lang} assetPrefix={assetPrefix} frameClass={frameClass} align="left" stacked timeline />;
}

export default function Experience({ resume, trans, lang, assetPrefix }) {
  return (
    <section id="experience" className={styles.scope}>
      <div className={styles.header}>
        <p className="subtitle-editorial">{trans.recentWork}</p>
        <h2 className={styles.title}>{trans.expTitle}</h2>
      </div>
      <div className={styles.track}>
        {resume.experience.map((exp, idx) => (
          <Panel key={idx} exp={exp} idx={idx} lang={lang} assetPrefix={assetPrefix} />
        ))}
      </div>
    </section>
  );
}
