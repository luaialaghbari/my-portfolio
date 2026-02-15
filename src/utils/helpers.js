export const assetPrefix = process.env.NODE_ENV === 'production' ? '/my-portfolio' : '';

export const renderSkillIcon = (skillName) => {
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
