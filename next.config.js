
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

const normalizeBasePath = (value) => {
  if (!value) return '';
  const cleaned = value.trim().replace(/^\/+|\/+$/g, '');
  return cleaned ? `/${cleaned}` : '';
};

const inferredRepoName = repoFromHomepage || repoFromCi;
const explicitBasePath = normalizeBasePath(process.env.BASE_PATH || '');
const basePath = isProd ? (explicitBasePath || normalizeBasePath(inferredRepoName)) : '';

const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  assetPrefix: basePath ? `${basePath}/` : '',
  basePath,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

module.exports = nextConfig;
