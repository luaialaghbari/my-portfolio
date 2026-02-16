
/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';
const isGithubActions = process.env.GITHUB_ACTIONS === 'true';

const repoFromCi = process.env.GITHUB_REPOSITORY
  ? process.env.GITHUB_REPOSITORY.split('/')[1]
  : '';

const normalizeBasePath = (value) => {
  if (!value) return '';
  const cleaned = value.trim().replace(/^\/+|\/+$/g, '');
  return cleaned ? `/${cleaned}` : '';
};

const explicitBasePath = normalizeBasePath(process.env.BASE_PATH || '');
const ciRepoBasePath = normalizeBasePath(repoFromCi);
const basePath = isProd
  ? (explicitBasePath || (isGithubActions ? ciRepoBasePath : ''))
  : '';

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
