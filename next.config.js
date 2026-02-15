
/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const repoFromCi = process.env.GITHUB_REPOSITORY
  ? process.env.GITHUB_REPOSITORY.split('/')[1]
  : '';

const repoFromHomepage = (() => {
  try {
    const { homepage } = require('./gh-pages.json');
    if (!homepage) return '';
    return (new URL(homepage).pathname || '').replace(/^\/|\/$/g, '');
  } catch {
    return '';
  }
})();

const repoName = repoFromCi || repoFromHomepage || 'my-portfolio';
const basePath = isProd ? `/${repoName}` : '';

const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: { unoptimized: true },
  assetPrefix: isProd ? `${basePath}/` : '',
  basePath,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

module.exports = nextConfig;
