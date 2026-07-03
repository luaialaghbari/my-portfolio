import React from 'react';
import styles from './Navigation.module.css';

export default function Navigation({ lang, trans, active, setLang, menuOpen, toggleMenu }) {
  return (
    <>
      {/* Desktop Navigation */}
      <nav id={styles.desktopNav}>
        <div className={styles.leftNav}>
          <a className={styles.logo} href="#profile">Luai Alaghbari</a>
        </div>
        <ul className={styles.navLinks}>
          {lang === 'ar' ? (
            <>
              <li><a className={active==='contact'?styles.active:''} href="#contact">{trans.contact}</a></li>
              <li><a className={active==='education'?styles.active:''} href="#education">{trans.education}</a></li>
              <li><a className={active==='skills'?styles.active:''} href="#skills">{trans.skills_nav}</a></li>
              <li><a className={active==='experience'?styles.active:''} href="#experience">{trans.experience}</a></li>
              <li><a className={active==='about'?styles.active:''} href="#about">{trans.about}</a></li>
            </>
          ) : (
            <>
              <li><a className={active==='about'?styles.active:''} href="#about">{trans.about}</a></li>
              <li><a className={active==='experience'?styles.active:''} href="#experience">{trans.experience}</a></li>
              <li><a className={active==='skills'?styles.active:''} href="#skills">{trans.skills_nav}</a></li>
              <li><a className={active==='education'?styles.active:''} href="#education">{trans.education}</a></li>
              <li><a className={active==='contact'?styles.active:''} href="#contact">{trans.contact}</a></li>
            </>
          )}
        </ul>
        <div className={styles.navControls}>
          <button className={styles.langToggle} onClick={() => setLang(lang === 'en' ? 'ar' : 'en')} aria-label="Toggle language">
            {lang === 'en' ? 'Ar' : 'En'}
          </button>
        </div>
      </nav>

      {/* Hamburger Navigation */}
      <nav id={styles.hamburgerNav}>
        <div className={styles.leftNav}>
          <a className={styles.logo} href="#profile">Luai Alaghbari</a>
        </div>
        <div className={styles.navControlsMobile}>
          <button className={styles.langToggle} onClick={() => setLang(lang === 'en' ? 'ar' : 'en')} aria-label="Toggle language">
            {lang === 'en' ? 'Ar' : 'En'}
          </button>
          <div className={styles.hamburgerMenu}>
            <div className={`${styles.hamburgerIcon} ${menuOpen ? styles.open : ''}`} onClick={toggleMenu}>
              <span></span><span></span><span></span>
            </div>
            <div className={`${styles.menuLinks} ${menuOpen ? styles.open : ''}`}>
              <ul>
                {lang === 'ar' ? (
                  <>
                    <li><a href="#contact" onClick={toggleMenu}>{trans.contact}</a></li>
                    <li><a href="#education" onClick={toggleMenu}>{trans.education}</a></li>
                    <li><a href="#skills" onClick={toggleMenu}>{trans.skills_nav}</a></li>
                    <li><a href="#experience" onClick={toggleMenu}>{trans.experience}</a></li>
                    <li><a href="#about" onClick={toggleMenu}>{trans.about}</a></li>
                  </>
                ) : (
                  <>
                    <li><a href="#about" onClick={toggleMenu}>{trans.about}</a></li>
                    <li><a href="#experience" onClick={toggleMenu}>{trans.experience}</a></li>
                    <li><a href="#skills" onClick={toggleMenu}>{trans.skills_nav}</a></li>
                    <li><a href="#education" onClick={toggleMenu}>{trans.education}</a></li>
                    <li><a href="#contact" onClick={toggleMenu}>{trans.contact}</a></li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
