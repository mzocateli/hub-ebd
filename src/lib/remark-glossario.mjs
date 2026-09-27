// Converte [[slug]] ou [[slug|rótulo]] em link para /glossario/<slug>/.
// Slugs são os nomes de arquivo em src/content/glossario; slug inexistente quebra o build.
import { readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { visit, SKIP } from 'unist-util-visit';

const dirGlossario = fileURLToPath(new URL('../content/glossario/', import.meta.url));
const PADRAO = /\[\[([a-z0-9-]+)(?:\|([^\]]+))?\]\]/g;

export default function remarkGlossario({ base = '' } = {}) {
  return (tree, file) => {
    const slugs = new Set(
      readdirSync(dirGlossario)
        .filter((f) => f.endsWith('.md'))
        .map((f) => f.replace(/\.md$/, '')),
    );

    visit(tree, 'text', (node, index, parent) => {
      if (!parent || index === undefined || !node.value.includes('[[')) return;

      const partes = [];
      let ultimo = 0;
      for (const m of node.value.matchAll(PADRAO)) {
        const [inteiro, slug, rotulo] = m;
        if (!slugs.has(slug)) {
          throw new Error(`[[${slug}]] em ${file.path}: termo não existe em src/content/glossario/`);
        }
        if (m.index > ultimo) partes.push({ type: 'text', value: node.value.slice(ultimo, m.index) });
        partes.push({
          type: 'link',
          url: `${base}/glossario/${slug}/`,
          data: { hProperties: { className: ['termo'] } },
          children: [{ type: 'text', value: rotulo ?? slug }],
        });
        ultimo = m.index + inteiro.length;
      }
      if (partes.length === 0) return;
      if (ultimo < node.value.length) partes.push({ type: 'text', value: node.value.slice(ultimo) });

      parent.children.splice(index, 1, ...partes);
      return [SKIP, index + partes.length];
    });
  };
}
