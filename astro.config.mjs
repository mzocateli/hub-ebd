// @ts-check
import { defineConfig } from 'astro/config';
import remarkGlossario from './src/lib/remark-glossario.mjs';

const base = '/hub-ebd';

export default defineConfig({
  site: 'https://mzocateli.github.io',
  base,
  trailingSlash: 'always',
  markdown: {
    remarkPlugins: [[remarkGlossario, { base }]],
  },
});
