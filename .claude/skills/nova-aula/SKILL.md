---
name: nova-aula
description: Publica no portal o resumo do aluno de uma aula já dada, a partir dos slides (.pptx) e notas do professor. Use quando o usuário pedir para adicionar, publicar ou atualizar uma aula de uma série da EBD.
---

# Publicar uma nova aula

Siga as regras editoriais do `CLAUDE.md`. Resumo do fluxo:

## 1. Localizar o material

- Pergunte ao usuário ou procure em `C:\Users\mateu\OneDrive\Documentos\_aulas_EBD\<serie>\<NN_tema>\`. Se a pasta não estiver acessível, peça para ele rodar `/add-dir`.
- Leia o `PLANEJAMENTO_serie.md` da série para saber o número, o título e o bloco da aula e o que pertence às aulas seguintes.

## 2. Extrair os slides

- Descompacte o `.pptx` no scratchpad e leia `ppt/slides/slideN.xml` e `ppt/notesSlides/notesSlideN.xml` em ordem.
- Anote quais slides estão ocultos (`show="0"`). Eles **não** entram no resumo.
- Exporte o PDF (comando no `CLAUDE.md`) para `public/downloads/<serie>/aula-NN-slides.pdf` e leia as páginas do PDF para ver os destaques visuais e os diagramas.

## 3. Escrever o resumo do aluno

Crie `src/content/aulas/<serie>/<NN-slug>/index.md`. Use a Aula 0 (`src/content/aulas/identidade-presbiteriana/00-introducao/index.md`) como modelo de frontmatter e de tom.

- Seções `## N. Título` seguindo as seções dos slides.
- Citações lidas em aula como blockquote, com a referência em um parágrafo separado. Destaques em **negrito**, como nos slides.
- As notas EXPLIQUE/DIGA podem virar texto explicativo. Não use CONDUÇÃO, TRANSIÇÃO, CUIDADO para o professor nem o aprofundamento do guia.
- Diagramas dos slides: recrie como SVG na pasta da aula (`![descrição](./figura.svg)`), nas cores dos slides.
- Aula dividida em partes (um `.pptx` por domingo): cada parte vira uma página, em `<NN-slug>-parte-N/`, com `parte: N`. Acrescente `partes: N` ao item do `programa` da série. O PDF fica em `aula-NN-parte-N-slides.pdf`.
- Marque os termos com `[[slug]]` na primeira ocorrência relevante e liste-os em `termos:` no frontmatter.
- `data`: a data em que a aula foi dada. Se não souber, pergunte.
- `referencias`: fontes públicas com link e a bibliografia citada em sala.

### Para aprofundar (opcional)

Se o professor quiser o conteúdo expandido ou se houve pergunta da turma, acrescente depois do resumo, separado por `---`, um `## Para aprofundar` que comece avisando que vai além do que foi dito em sala. Pode usar a Parte 2 do guia e as fontes da pasta da aula (`analises/`, `resources/`), sempre parafraseando textos protegidos. Seções úteis: a pergunta da turma, as passagens mais de perto, uma breve história da doutrina, onde consultar nas confissões, perguntas frequentes e "Para ir além". Confira cada citação bíblica no ARA e cada citação confessional no texto da IPB.

## 4. Glossário

- Para cada termo novo da aula, crie `src/content/glossario/<slug>.md` com `termo`, `variantes`, `resumo` (1 a 2 frases), `relacionados`, `series` e o corpo. As definições seguem o que foi dito em aula.
- Termos já existentes: confira se a aula acrescenta algo. Se a série for nova, inclua-a em `series`.
- Se o usuário forneceu dicionários em `fontes/glossario/`, siga a skill `/revisar-glossario`.

## 5. Verificar e mostrar

- `npm run build` sem erros. Depois `npm run preview` e confira a página da aula, a página da série (a aula deve deixar de aparecer como "em breve"), os links dos termos e o PDF.
- Apresente ao usuário o que entrou e o que ficou de fora (slides ocultos, notas não usadas). **Não faça commit sem a revisão dele.**
