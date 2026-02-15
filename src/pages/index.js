
import Head from 'next/head';
const assetPrefix = process.env.NEXT_PUBLIC_BASE_PATH || '';
import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import resume from '../data/resume';
import Navigation from '../../components/layout/Navigation/Navigation';
import Hero from '../../components/sections/Hero/Hero';
import About from '../../components/sections/About/About';
import Experience from '../../components/sections/Experience/Experience';
import Skills from '../../components/sections/Skills/Skills';
import Education from '../../components/sections/Education/Education';
import Timeline from '../../components/sections/Timeline/Timeline';
import Projects from '../../components/sections/Projects/Projects';
import Contact from '../../components/sections/Contact/Contact';
import Footer from '../../components/sections/Footer/Footer';

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

  // Allow vertical page scroll when pointer is over the horizontal education rail
  useEffect(() => {
    const container = eduScrollRef.current;
    if (!container) return;

    const onWheel = (event) => {
      // If the user is primarily scrolling vertically, pass it to the page
      if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
        event.preventDefault();
        window.scrollBy({ top: event.deltaY, behavior: 'auto' });
      }
    };

    container.addEventListener('wheel', onWheel, { passive: false });
    return () => container.removeEventListener('wheel', onWheel);
  }, []);
  
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
      visionReality: 'أحوّل الأفكار إلى منتجات رقمية سريعة ومتقنة.',
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

      <Navigation
        lang={lang}
        trans={trans}
        active={active}
        setLang={setLang}
        menuOpen={menuOpen}
        toggleMenu={toggleMenu}
      />

      <Hero
        scrolled={scrolled}
        lang={lang}
        assetPrefix={assetPrefix}
        resume={resume}
      />

      <About
        lang={lang}
        t={t}
        trans={trans}
        assetPrefix={assetPrefix}
      />

      <Experience
        resume={resume}
        trans={trans}
        lang={lang}
        assetPrefix={assetPrefix}
        isDesktop={isDesktop}
      />

      <Timeline />

      <Projects />

      <Skills
        resume={resume}
        trans={trans}
        assetPrefix={assetPrefix}
        renderSkillIcon={renderSkillIcon}
      />

      <Education
        resume={resume}
        trans={trans}
        lang={lang}
        assetPrefix={assetPrefix}
        eduScrollRef={eduScrollRef}
      />

      <Contact
        resume={resume}
        lang={lang}
        trans={trans}
      />

      <Footer
        resume={resume}
        lang={lang}
        yearRef={yearRef}
      />


    </>
  );
}
