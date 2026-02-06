
import Head from 'next/head';
const assetPrefix = process.env.NODE_ENV === 'production' ? '/my-portfolio' : '';
import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import resume from '../data/resume';

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [active, setActive] = useState('profile');
  const [lang, setLang] = useState('en');
  const [scrolled, setScrolled] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const yearRef = useRef(null);
  const eduScrollRef = useRef(null);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1367);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Direction-aware auto-sliding for Education cards
  useEffect(() => {
    const container = eduScrollRef.current;
    if (!container || !isDesktop) return;

    let autoScrollInterval;
    const startAutoScroll = () => {
      autoScrollInterval = setInterval(() => {
        const { scrollLeft, scrollWidth, clientWidth } = container;
        const isRTL = lang === 'ar';
        
        // Calculate step based on first card width + gap
        const firstCard = container.querySelector('.edu-narrative-block');
        const gap = parseFloat(getComputedStyle(container).gap) || 0;
        const step = firstCard ? firstCard.offsetWidth + gap : 340;
        
        if (isRTL) {
          if (Math.abs(scrollLeft) + clientWidth >= scrollWidth - 50) {
            container.scrollTo({ left: 0, behavior: 'smooth' });
          } else {
            container.scrollBy({ left: -step, behavior: 'smooth' });
          }
        } else {
          if (scrollLeft + clientWidth >= scrollWidth - 50) {
            container.scrollTo({ left: 0, behavior: 'smooth' });
          } else {
            container.scrollBy({ left: step, behavior: 'smooth' });
          }
        }
      }, 4000);
    };

    startAutoScroll();
    
    const pauseScroll = () => clearInterval(autoScrollInterval);
    const resumeScroll = () => {
      clearInterval(autoScrollInterval);
      startAutoScroll();
    };
    
    // Attach listeners to container
    container.addEventListener('mouseenter', pauseScroll);
    container.addEventListener('mouseleave', resumeScroll);
    container.addEventListener('touchstart', pauseScroll, { passive: true });
    container.addEventListener('touchend', resumeScroll, { passive: true });
    
    // Also pause on window scroll to avoid fighting with vertical page scroll
    window.addEventListener('scroll', pauseScroll, { passive: true });

    return () => {
      clearInterval(autoScrollInterval);
      container.removeEventListener('mouseenter', pauseScroll);
      container.removeEventListener('mouseleave', resumeScroll);
      container.removeEventListener('touchstart', pauseScroll);
      container.removeEventListener('touchend', resumeScroll);
      window.removeEventListener('scroll', pauseScroll);
      container.removeEventListener('scroll', pauseScroll);
    };
  }, [lang, isDesktop]); // Re-run if language or desktop mode changes
  
  // Scroll listener for hero shadow
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const t = {
    en: {
      home: 'Home',
      about: 'About',
      education: 'Education',
      experience: 'Experience',
      contact: 'Contact',
      skills_nav: 'Skills',
      download: 'Download resume',
      available: 'Available for work',
      toolkit: 'Toolkit',
      skills: 'Skills',
      skillsSubtitle: 'Toolkit',
      background: 'Background',
      eduTitle: 'Education',
      expTitle: 'Experience',
      recentWork: 'Recent work',
      getInTouch: 'Get in touch',
      contactMe: 'Contact me',
      footer: 'All rights reserved.',
      dark: 'Dark',
      light: 'Light',
      aboutMe: 'About me',
      aboutMeStroke: 'ABOUT',
      aboutMeGradient: 'ME',
      visionReality: 'Turning ideas into fast, polished products.',
      aboutText1: 'I’m a Frontend Developer for web and mobile, bringing design ideas to life as sleek, responsive interfaces that users enjoy.',
      aboutText2: 'I craft modern, engaging UI/UX designs that focus on clarity, usability, and a seamless experience across web and mobile.',
      mastery: '01 – Frontend Development',
      masteryDesc: 'Building responsive web and mobile apps with Next.js and Flutter.',
      designCentric: '02 – UI/UX Design',
      designCentricDesc: 'Designing intuitive interfaces with strong attention to detail.',
      globalVision: '03 – Languages',
      globalVisionDesc: 'Fluent in English.',
      featuredWork: 'Featured Work',
      preview: 'Preview',
      source: 'Source',
      subject: 'Subject',
      message: 'Message',
      send: 'Send',
      catMobile: 'Mobile Development',
      catFrontend: 'Frontend Web',
      catTools: 'Tools & Design',
      catBackend: 'Backend & Services',

      /* Hero */
      heroRole: 'Frontend Developer & UI/UX Designer',
      heroLead: 'Frontend Developer & UI/UX Designer focused on building intuitive, high-performance digital experiences.',

      /* Contact */
      contactHeadline: "Ready to start something new?",
      contactDesc: "Let’s bring your vision to life.",
      contactEmph1: "",
      contactEmph2: "",
      contactEmph3: "",
      name: 'Your name',
      timeline: 'Timeline',
      timelineSoon: 'ASAP',
      timelineWeeks: '2–4 weeks',
      timelineMonths: '1–3 months',
      timelineFlexible: 'Flexible',
      replyTime: 'Response within 24 hours',
      privacyNote: 'Confidential by default.',
      tzLine: 'Based in GMT+3',
      tzLineAr: 'Mecca time',
      placeholderHelp: 'How can I help you?',
      socialLinkedIn: 'LinkedIn',
      socialGitHub: 'GitHub',
      socialWhatsApp: 'WhatsApp',
      socialEmail: 'Email',
    },
    ar: {
      home: 'الرئيسية',
      about: 'نبذة عنّي',
      education: 'التعليم',
      experience: 'الخبرة',
      contact: 'للتواصل',
      skills_nav: 'المهارات',
      download: 'تحميل السيرة الذاتية',
      available: 'متاح للعمل',
      toolkit: 'الأدوات',
      skills: 'المهارات',
      skillsSubtitle: 'الأدوات',
      background: 'الخلفية',
      eduTitle: 'التعليم',
      expTitle: 'الخبرة العملية',
      recentWork: 'أحدث الأعمال',
      getInTouch: 'دعنا نتواصل',
      contactMe: 'للتواصل',
      footer: 'جميع الحقوق محفوظة.',
      dark: 'داكن',
      light: 'فاتح',
      aboutMe: 'من أنا',
      aboutMeStroke: 'من',
      aboutMeGradient: ' أنا',
      visionReality: null, // Will use a React element below
      aboutText1: 'من أنا\nكمطور واجهات أمامية (Frontend Developer)، تخصصي هو تحويل الرؤى إلى واجهات رقمية جذابة وسريعة الاستجابة.',
      aboutText2: 'كـ UI UX designer أسعى دائماً لتقديم تصاميم عصرية تتسم بالبساطة والجمالية، مع التركيز على توفير تجربة مستخدم انسيابية على الويب والتطبيقات.',
      mastery: '01 – تطوير الواجهات',
      masteryDesc: 'بناء تطبيقات ويب وموبايل متجاوبة باستخدام Next.js وFlutter.',
      designCentric: '02 – تصميم UI/UX',
      designCentricDesc: 'تصميم واجهات جذابة وسهلة الاستخدام مع التركيز على التفاصيل.',
      globalVision: '03 – اللغات',
      globalVisionDesc:'الانجليزية',
      featuredWork: 'أعمال مختارة',
      preview: 'معاينة',
      source: 'المصدر',
      subject: 'الموضوع',
      message: 'الرسالة',
      send: 'إرسال',
      catMobile: 'تطوير الموبايل',
      catFrontend: 'تطوير الويب',
      catTools: 'الأدوات والتصميم',
      catBackend: 'الخدمات والبنية الخلفية',

      /* Hero */
      heroRole: 'مطوّر واجهات أمامية ومصمّم UI/UX',
      heroLead: 'مطوّر واجهات أمامية ومصمّم UI/UX أركّز على بناء تجارب رقمية سهلة الاستخدام وعالية الأداء.',

      /* Contact */
      contactHeadline: 'هل لديك مشروع؟',
      contactDesc: 'خلّينا نحول رؤيتك إلى واقع',
      contactEmph1: 'المشاريع الجديدة',
      contactEmph2: 'الأفكار الإبداعية',
      contactEmph3: 'رؤيتك',
      name: 'الاسم',
      timeline: 'الإطار الزمني',
      timelineSoon: 'بأسرع وقت',
      timelineWeeks: '2–4 أسابيع',
      timelineMonths: '1–3 أشهر',
      timelineFlexible: 'مرن',
      replyTime: 'الرد خلال 24 ساعة',
      privacyNote: 'خصوصيتك محفوظة.',
      tzLine: 'GMT+3',
      tzLineAr: 'توقيت مكة المكرمة',
      placeholderHelp: 'كيف يمكنني مساعدتك؟',
      socialLinkedIn: 'لينكدإن',
      socialGitHub: 'جيت هب',
      socialWhatsApp: 'واتساب',
      socialEmail: 'إيميل',
    }
  };

  const trans = t[lang];

  // Language load/persist
  useEffect(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('lang') : null;
    if (saved === 'en' || saved === 'ar') setLang(saved);
  }, []);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = lang;
      localStorage.setItem('lang', lang);
    }
  }, [lang]);

  // Scroll reveal effect
  useEffect(() => {
    const revealEls = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealEls.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Footer year
  useEffect(() => {
    if (yearRef.current) {
      yearRef.current.textContent = new Date().getFullYear();
    }
  }, []);

  // Mouse move effect for cards
  useEffect(() => {
    
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Card mouse tracking
      for (const card of document.querySelectorAll('.node-card')) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      }

      // Hero spotlight tracking
      const hero = document.getElementById('profile');
      if (hero) {
        const rect = hero.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        hero.style.setProperty('--mouse-x', `${x}%`);
        hero.style.setProperty('--mouse-y', `${y}%`);
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const toggleMenu = () => setMenuOpen((v) => !v);

  // Theme load/persist
  useEffect(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('theme') : null;
    if (saved === 'light' || saved === 'dark') setTheme(saved);
  }, []);
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
    }
  }, [theme]);

  // Active section tracking
  useEffect(() => {
    const sections = ['profile','about','experience','skills','education','contact'];
    const elements = sections.map((id) => document.getElementById(id)).filter(Boolean);
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActive(entry.target.id);
        }
      });
    }, { rootMargin: '-30% 0px -30% 0px', threshold: 0.01 });
    elements.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);


  // --- Magnetic Avatar Component ---
  const MagneticAvatar = ({ children }) => {
    const ref = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouse = (e) => {
      if (!ref.current) return;
      const { clientX, clientY } = e;
      const { height, width, left, top } = ref.current.getBoundingClientRect();
      const middleX = clientX - (left + width / 2);
      const middleY = clientY - (top + height / 2);
      setPosition({ x: middleX * 0.15, y: middleY * 0.15 });
    };

    const reset = () => {
      setPosition({ x: 0, y: 0 });
    };

    return (
      <motion.div
        ref={ref}
        onMouseMove={handleMouse}
        onMouseLeave={reset}
        animate={{ x: position.x, y: position.y }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      >
        {children}
      </motion.div>
    );
  };

  // --- Skills helpers: icon renderer ---
  const renderSkillIcon = (skillName) => {
    const skillKey = skillName.toLowerCase().replace(/\s+/g, '').replace(/[\.\-\/]/g, '');
    const iconMap = {
      flutter: 'flutter',
      dart: 'dart',
      react: 'react',
      'next.js': 'nextdotjs',
      nextjs: 'nextdotjs',
      javascript: 'javascript',
      js: 'javascript',
      html: 'html5',
      css: 'css',
      java: 'openjdk',
      php: 'php',
      supabase: 'supabase',
      firebase: 'firebase',
      figma: 'figma',
      git: 'git',
      github: 'github',
      photoshop: 'adobephotoshop',
      illustrator: 'adobeillustrator',
      xd: 'adobexd',
      sketch: 'sketch',
      framer: 'framer',
      dribbble: 'dribbble',
      behance: 'behance',
      'c++': 'cplusplus',
      cpp: 'cplusplus',
      microsoft: 'microsoft',
      restapis: 'postman',
      restapi: 'postman',
      rest: 'postman',
      nodejs: 'nodedotjs',
      node: 'nodedotjs'
    };
    
    const iconName = iconMap[skillKey];
    if (iconName) {
      const brandColors = { javascript: 'F7DF1E', html5: 'E34F26', css: '1572B6', react: '61DAFB', flutter: '02569B', dart: '0175C2', php: '777BB4', firebase: 'FFCA28', figma: 'F24E1E', github: '181717', adobephotoshop: '31A8FF', adobeillustrator: 'FF9A00', adobexd: 'FF61F6', sketch: 'FDB927', framer: '0055FF', dribbble: 'EA4C89', behance: '1769FF' };
      const color = brandColors[iconName];
      const src = color ? `https://cdn.simpleicons.org/${iconName}/${color}` : `https://cdn.simpleicons.org/${iconName}`;
      return <img src={src} alt={skillName} loading="lazy" />;
    }
    
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      </svg>
    );
  };

  return (
    <>
      <Head>
        <title>My Portfolio</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* Background intentionally minimal/black */}

      {/* Desktop Navigation */}
      <nav id="desktop-nav">
        <div className="left-nav">
          <a className="logo" href="#profile">Luai Alaghbari</a>
        </div>
        <ul className="nav-links">
          {lang === 'ar' ? (
            <>
              <li><a className={active==='contact'?'active':''} href="#contact">{trans.contact}</a></li>
              <li><a className={active==='education'?'active':''} href="#education">{trans.education}</a></li>
              <li><a className={active==='skills'?'active':''} href="#skills">{trans.skills_nav}</a></li>
              <li><a className={active==='experience'?'active':''} href="#experience">{trans.experience}</a></li>
              <li><a className={active==='about'?'active':''} href="#about">{trans.about}</a></li>
            </>
          ) : (
            <>
              <li><a className={active==='about'?'active':''} href="#about">{trans.about}</a></li>
              <li><a className={active==='experience'?'active':''} href="#experience">{trans.experience}</a></li>
              <li><a className={active==='skills'?'active':''} href="#skills">{trans.skills_nav}</a></li>
              <li><a className={active==='education'?'active':''} href="#education">{trans.education}</a></li>
              <li><a className={active==='contact'?'active':''} href="#contact">{trans.contact}</a></li>
            </>
          )}
        </ul>
        <div className="nav-controls">
          <button className="lang-toggle" onClick={() => setLang(lang === 'en' ? 'ar' : 'en')} aria-label="Toggle language">
            {lang === 'en' ? 'Ar' : 'En'}
          </button>
        </div>
      </nav>

      {/* Hamburger Navigation */}
      <nav id="hamburger-nav">
        <div className="left-nav">
          <a className="logo" href="#profile">Luai Alaghbari</a>
        </div>
        <div className="nav-controls-mobile">
          <button className="lang-toggle" onClick={() => setLang(lang === 'en' ? 'ar' : 'en')} aria-label="Toggle language">
            {lang === 'en' ? 'Ar' : 'En'}
          </button>
          <div className="hamburger-menu">
            <div className={`hamburger-icon ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}>
              <span></span><span></span><span></span>
            </div>
            <div className={`menu-links ${menuOpen ? 'open' : ''}`}>
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

      <section id="profile" className={`hero-modern ${scrolled ? 'scrolled' : ''}`}>
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
              <span className="mid-name">I’m Luai</span>
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

      {/* About Section */}
      <section id="about" className="about-section-bold">
        <motion.div 
          className="about-wrapper-bold"
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
            className="about-header-bold"
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
              <div className="about-ar-slogan" style={{fontSize: '1.2rem', color: '#a1a1aa', marginTop: '0.5rem', fontWeight: 500, textAlign: 'center'}}>
                {t.ar.visionReality}
              </div>
            )}
          </motion.div>

          {/* Big Statement Section */}
          <div className="about-statement">
            <motion.h2 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {lang === 'ar' ? (
                <>
                  أجمع بين فن التصميم وبراعة <span className="gradient-text">البرمجة</span>؛ حيث أصمم واجهات مستخدم ذكية وأحولها إلى واقع ملموس.
                </>
              ) : (
                <>Creating intuitive <span className="gradient-text">UI/UX</span> and <br /> bringing it to life on the <span className="gradient-text">frontend</span>.</>
              )}
            </motion.h2>
          </div>

          {/* Main Content Grid - No Boxes */}
          <div className="about-grid-bold">
            <div className="grid-left" style={lang === 'ar' ? {textAlign: 'right'} : {}}>
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
                  <>I’m a <span className="gradient-text">Frontend Developer</span> for web and mobile, bringing design ideas to life as <span className="gradient-text">sleek, responsive interfaces</span> that users enjoy.</>
                )}
              </motion.p>
            </div>
            <div className="grid-right">
              <motion.p 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
                style={lang === 'ar' ? {textAlign: 'right'} : {}}
              >
                {lang === 'ar' ? (
                  <span style={{display: 'block', textAlign: 'right'}}>
                    كـ UI UX designer أسعى دائماً لتقديم تصاميم عصرية تتسم بالبساطة والجمالية، مع التركيز على توفير تجربة مستخدم انسيابية على الويب والتطبيقات.
                  </span>
                ) : (
                  <>I craft <span className="gradient-text">modern, engaging UI/UX designs</span> that focus on <span className="gradient-text">clarity, usability</span>, and a seamless experience across web and mobile.</>
                )}
              </motion.p>
            </div>
          </div>

          {/* Staggered High-Impact Stats/Highlights */}
          <div className="about-nodes-bold">
            <div className="node-item">
              <div className="node-line"></div>
              <div className="node-content">
                <h3 className="gradient-text">{trans.mastery}</h3>
                <p>{trans.masteryDesc}</p>
              </div>
            </div>
            <div className="node-item">
              <div className="node-line"></div>
              <div className="node-content">
                <h3 className="gradient-text">{trans.designCentric}</h3>
                <p>{trans.designCentricDesc}</p>
              </div>
            </div>
            <div className="node-item">
              <div className="node-line"></div>
              <div className="node-content">
                <h3 className="gradient-text">{trans.globalVision}</h3>
                <p>{trans.globalVisionDesc}</p>
              </div>
            </div>
          </div>

          {/* Down Arrow - Moved Inside Wrapper */}
          <div className="arrow-container">
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

      {/* Experience Section */}
      <section id="experience" className="modern-experience">
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
                          <img src={`${assetPrefix}/assets/Screenshot_20250703_173702.jpg`} alt="QR Events App" />
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
                          <img src={`${assetPrefix}/assets/Screenshot 2026-01-09 233757.png`} alt="Internship Project" />
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
                            preload="auto"
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
                            preload="auto"
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
                          <img src={`${assetPrefix}/assets/Screenshot_20250225_002302.jpg`} alt="Graduation Project" />
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
                      <span className="step-text">{lang === 'ar' ? 'محطة' : 'Milestone'}</span>
                    </div>
                    <div className="node-date">{exp.period}</div>
                  </div>
                  
                  <div className="node-card">
                    <div className="node-card-glass"></div>
                    <div className="node-card-content">
                      <h3 className="node-title" style={{fontFamily: 'Inter, system-ui, Arial, sans-serif', fontWeight: 800, fontSize: '1.35em'}}>
                        {exp.role}
                      </h3>
                      <div className="node-appname" style={{fontWeight: 700, fontSize: '1.05em', marginBottom: '0.2em'}}>
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
                            <a href={exp.preview} target="_blank" rel="noopener" className="btn btn-color-2 btn-sm">
                              {trans.preview}
                            </a>
                          )}
                          {exp.source && exp.source !== '#' && (
                            <a href={exp.source} target="_blank" rel="noopener" className="btn btn-color-1 btn-sm">
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

      {/* Skills Section - Modern Bento Grid */}
      <section id="skills">
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

      {/* Education Section */}
      <section id="education">
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

        <div className="premium-education-narrative" ref={eduScrollRef}>
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

      {/* Contact Section */}
      <section id="contact" className="contact-apple">
        <motion.div 
          className="section-header-left"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="title-refined">{trans.contactMe}</h2>
          <section className="contact-apple-surface">
            <div className="contact-apple-container">
              <motion.div
                className="contact-apple-grid"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="contact-apple-left">
                  <h3 className="contact-apple-title">{trans.contactHeadline}</h3>
                </div>
                <div className="contact-apple-right">
                  <div className="contact-apple-links">
                    <a href={resume.socials.whatsapp} target="_blank" rel="noreferrer" className="contact-link-pill whatsapp">
                      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                      <span>{lang === 'ar' ? 'WhatsApp' : trans.socialWhatsApp}</span>
                    </a>
                    <a href={resume.socials.github} target="_blank" rel="noreferrer" className="contact-link-pill github">
                      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.58 2 12.24c0 4.52 2.87 8.35 6.84 9.7.5.1.68-.22.68-.48 0-.24-.01-.86-.01-1.7-2.78.62-3.37-1.38-3.37-1.38-.45-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.63.07-.63 1.01.07 1.54 1.06 1.54 1.06.9 1.58 2.36 1.12 2.94.86.09-.67.35-1.12.64-1.38-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.31.1-2.73 0 0 .84-.27 2.75 1.05.8-.23 1.66-.34 2.52-.35.86.01 1.72.12 2.52.35 1.91-1.32 2.75-1.05 2.75-1.05.55 1.42.2 2.47.1 2.73.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.8-4.58 5.06.36.32.68.95.68 1.92 0 1.38-.01 2.49-.01 2.83 0 .27.18.58.69.48 3.96-1.35 6.83-5.18 6.83-9.7C22 6.58 17.52 2 12 2z"/></svg>
                      <span>{lang === 'ar' ? 'GitHub' : trans.socialGitHub}</span>
                    </a>
                    <a href={resume.socials.linkedin} target="_blank" rel="noreferrer" className="contact-link-pill linkedin">
                      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.55v-5.56c0-1.33-.02-3.04-1.86-3.04-1.86 0-2.14 1.45-2.14 2.94v5.66H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.86 3.37-1.86 3.6 0 4.27 2.37 4.27 5.45v6.3zM5.34 7.43c-1.14 0-2.06-.93-2.06-2.06 0-1.14.92-2.06 2.06-2.06 1.14 0 2.06.93 2.06 2.06 0 1.14-.93 2.06-2.06 2.06zM7.12 20.45H3.56V9h3.56v11.45z"/></svg>
                      <span>{lang === 'ar' ? 'LinkedIn' : trans.socialLinkedIn}</span>
                    </a>
                    <a href={`mailto:${resume.email}`} className="contact-link-pill email">
                      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                      <span>{resume.email}</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="footer-logo-container">
        {/* footer tagline removed per request */}

        <div className="footer-socials">
          <a href={resume.socials.whatsapp} target="_blank" rel="noreferrer" className="footer-social-icon whatsapp">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          </a>
          <a href={resume.socials.github} target="_blank" rel="noreferrer" className="footer-social-icon github">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.58 2 12.24c0 4.52 2.87 8.35 6.84 9.7.5.1.68-.22.68-.48 0-.24-.01-.86-.01-1.7-2.78.62-3.37-1.38-3.37-1.38-.45-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.63.07-.63 1.01.07 1.54 1.06 1.54 1.06.9 1.58 2.36 1.12 2.94.86.09-.67.35-1.12.64-1.38-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.31.1-2.73 0 0 .84-.27 2.75 1.05.8-.23 1.66-.34 2.52-.35.86.01 1.72.12 2.52.35 1.91-1.32 2.75-1.05 2.75-1.05.55 1.42.2 2.47.1 2.73.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.8-4.58 5.06.36.32.68.95.68 1.92 0 1.38-.01 2.49-.01 2.83 0 .27.18.58.69.48 3.96-1.35 6.83-5.18 6.83-9.7C22 6.58 17.52 2 12 2z"/></svg>
          </a>
          <a href={resume.socials.linkedin} target="_blank" rel="noreferrer" className="footer-social-icon linkedin">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.55v-5.56c0-1.33-.02-3.04-1.86-3.04-1.86 0-2.14 1.45-2.14 2.94v5.66H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.86 3.37-1.86 3.6 0 4.27 2.37 4.27 5.45v6.3zM5.34 7.43c-1.14 0-2.06-.93-2.06-2.06 0-1.14.92-2.06 2.06-2.06 1.14 0 2.06.93 2.06 2.06 0 1.14-.93 2.06-2.06 2.06zM7.12 20.45H3.56V9h3.56v11.45z"/></svg>
          </a>
          <a href={`mailto:${resume.email}`} className="footer-social-icon email">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
          </a>
        </div>

        <div className="footer-middle-row">
          <div className="footer-copyright">
            © <span ref={yearRef} /> {lang === 'ar' ? 'لؤي الاغبري. جميع الحقوق محفوظة.' : 'Luai Alaghbari. All Rights Reserved.'}
          </div>
        </div>

        <div className="footer-massive-logo">
          <h2>create.</h2>
        </div>
      </footer>


    </>
  );
}