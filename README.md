# hub-ebd

Portal estático com o conteúdo das aulas da Escola Bíblica Dominical e um glossário de termos.
Publicado em <https://mzocateli.github.io/hub-ebd/>.

Feito com [Astro](https://astro.build) (conteúdo em Markdown) e [Pagefind](https://pagefind.app) (busca estática).

## Rodar localmente

```sh
npm install
npm run dev       # http://localhost:4321/hub-ebd/ (sem busca)
npm run build     # valida o conteúdo, gera dist/ e o índice de busca
npm run preview   # serve dist/, com busca
```

Um push na `main` publica o site pelo workflow `.github/workflows/deploy.yml`.
Na primeira vez, ative em **Settings → Pages → Source: GitHub Actions**.

## Estrutura do conteúdo

```
src/content/
  series/<serie>.md                    # uma série (ementa completa, blocos)
  aulas/<serie>/<NN-slug>/index.md     # resumo do aluno de uma aula + imagens da aula
  glossario/<termo>.md                 # um termo
public/downloads/<serie>/              # PDFs dos slides
```

O `npm run build` valida o frontmatter de todos os arquivos (`src/content.config.ts`).
Um campo faltando, uma série inexistente ou um termo inexistente fazem o build falhar, com a mensagem apontando o arquivo.

## Nova aula

1. Crie `src/content/aulas/<serie>/<NN-slug>/index.md` (ex.: `01-alianca/index.md`). Copie o frontmatter da Aula 0 como modelo.
2. `numero` precisa bater com o número da aula no `programa` da série. Ela deixa de aparecer como "em breve" automaticamente.
3. Em `termos`, liste os slugs (nomes de arquivo) dos termos do glossário usados na aula.
4. No texto, faça links para o glossário com `[[slug]]` ou `[[slug|texto exibido]]`. Dentro de tabelas, escape a barra: `[[slug\|texto]]`.
5. Imagens ficam na mesma pasta e são referenciadas com `![descrição](./arquivo.png)`.
6. Slides: exporte o `.pptx` para PDF, salve em `public/downloads/<serie>/aula-NN-slides.pdf` e preencha `slides: /downloads/<serie>/aula-NN-slides.pdf`.
7. Para deixar uma aula pronta sem publicá-la, use `rascunho: true`.

O resumo do aluno é um texto próprio, não o guia do professor: pergunta central, textos bíblicos, ideias principais, citações lidas em aula, ressalvas importantes e a ponte para a próxima aula.

## Novo termo no glossário

Crie `src/content/glossario/<slug>.md`:

```md
---
termo: Nome do termo
variantes: [sinônimo, outra forma]      # opcional; também entra no filtro
resumo: Uma ou duas frases, mostradas na lista e ao passar o mouse.
relacionados: [outro-slug]               # opcional
series: [identidade-presbiteriana]
---

Explicação mais longa, em Markdown. Pode usar [[outro-slug]].
```

A lista "Aparece nas aulas" de cada termo é calculada a partir do campo `termos` das aulas.

## Nova série

Crie `src/content/series/<slug>.md` com `titulo`, `periodo`, `descricao`, `status` (`em-andamento`, `concluida` ou `planejada`), `ordem`, `blocos` e `programa`.
Use `src/content/series/identidade-presbiteriana.md` como modelo. Em `programa`, coloque títulos entre aspas quando tiverem vírgula.
