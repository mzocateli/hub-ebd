import { defineCollection, reference, z } from 'astro:content';
import { glob } from 'astro/loaders';

const series = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/series' }),
  schema: z.object({
    titulo: z.string(),
    periodo: z.string(),
    descricao: z.string(),
    status: z.enum(['em-andamento', 'concluida', 'planejada']),
    ordem: z.number(),
    blocos: z.array(
      z.object({ id: z.string(), titulo: z.string(), descricao: z.string().optional() }),
    ),
    programa: z.array(
      z.object({ numero: z.number(), titulo: z.string(), bloco: z.string() }),
    ),
  }),
});

const aulas = defineCollection({
  // id: "<serie>/<nn-slug>" (index.md vira o nome da pasta)
  loader: glob({
    pattern: '*/*/index.md',
    base: './src/content/aulas',
    generateId: ({ entry }) => entry.replace(/\/index\.md$/, ''),
  }),
  schema: ({ image }) =>
    z.object({
      serie: reference('series'),
      numero: z.number(),
      titulo: z.string(),
      subtitulo: z.string().optional(),
      data: z.coerce.date(),
      texto_principal: z.string(),
      pano_de_fundo: z.string().optional(),
      pergunta_central: z.string(),
      grande_ideia: z.string(),
      capa: image().optional(),
      termos: z.array(reference('glossario')).default([]),
      slides: z.string().optional(),
      referencias: z
        .array(z.object({ texto: z.string(), url: z.string().url().optional() }))
        .default([]),
      rascunho: z.boolean().default(false),
    }),
});

const glossario = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/glossario' }),
  schema: z.object({
    termo: z.string(),
    variantes: z.array(z.string()).default([]),
    resumo: z.string(),
    relacionados: z.array(reference('glossario')).default([]),
    series: z.array(reference('series')).default([]),
    // Obras de referência consultadas para redigir o verbete (não são citadas por extenso).
    fontes: z.array(z.string()).default([]),
  }),
});

export const collections = { series, aulas, glossario };
