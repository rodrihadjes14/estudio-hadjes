/** @type {import('next-sitemap').IConfig} */
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://hhlegales.com.ar';

module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  generateIndexSitemap: true,      // explícito (ya es true por defecto)
  sitemapSize: 5000,
  changefreq: 'weekly',
  priority: 0.7,
  exclude: ['/lp/*', '/api/*'],
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: '*', disallow: ['/lp/'] },
      { userAgent: '*', disallow: ['/api/'] },
    ],
  },
  transform: async (config, path) => {
    const entry = {
      loc: `${siteUrl}${path}`,
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date().toISOString(),
    };
    if (path === '/') entry.priority = 1.0;
    if (path.startsWith('/blog') || path.startsWith('/servicios')) entry.priority = 0.9;
    return entry;
  },
};
