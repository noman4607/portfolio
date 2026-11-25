import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import path from 'node:path';
import { defineConfig } from 'vite';
import { projectsList } from './src/data/portfolioData.ts';

const routes = ['/', '/projects/', '/research/', ...projectsList.map(({ slug }) => `/projects/${slug}/`)];
const basePath = (process.env.PAGES_BASE_PATH ?? '').replace(/^\/+|\/+$/g, '');
const pagesUrl = process.env.PAGES_BASE_URL?.replace(/\/+$/, '');

export default defineConfig({
  base: basePath ? `/${basePath}/` : '/',
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'static-portfolio',
      writeBundle(options) {
        const distDir = options.dir ?? 'dist';
        const html = fs.readFileSync(path.join(distDir, 'index.html'));
        for (const route of routes.slice(1)) {
          const routeDir = path.join(distDir, route);
          fs.mkdirSync(routeDir, { recursive: true });
          fs.writeFileSync(path.join(routeDir, 'index.html'), html);
        }
        fs.writeFileSync(path.join(distDir, '404.html'), html);

        if (pagesUrl) {
          const urls = routes.map((route) => `  <url><loc>${pagesUrl}${route}</loc></url>`).join('\n');
          fs.writeFileSync(path.join(distDir, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
          fs.writeFileSync(path.join(distDir, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${pagesUrl}/sitemap.xml\n`);
        }
      },
    },
  ],
  resolve: {
    alias: {
      '@': import.meta.dirname,
    },
  },
  server: {
    hmr: process.env.DISABLE_HMR !== 'true',
    watch: process.env.DISABLE_HMR === 'true' ? null : {},
  },
});
