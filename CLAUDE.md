# hub-ebd

Portal estático da Escola Bíblica Dominical (IPB) para os **alunos** consultarem o conteúdo das aulas já dadas e um glossário de termos. Publicado no GitHub Pages em <https://mzocateli.github.io/hub-ebd/>. Todo o conteúdo e a interface são em **português do Brasil**.

A turma é de jovens de 20 a 35 anos, leigos, a maioria presbiteriana de berço. Escreva para esse público: claro, direto, sem jargão acadêmico não explicado.

## Stack e comandos

- Astro 5 (Node 20) com content collections em Markdown; CSS próprio; busca com Pagefind.
- `npm run dev` para desenvolvimento (sem busca); `npm run build` roda `astro check` + build + Pagefind; `npm run preview` serve o `dist/`.
- O deploy é automático em push na `main` (`.github/workflows/deploy.yml`).
- O site vive em `base: '/hub-ebd'`. Links internos em componentes usam `url()` de `src/lib/url.ts`; em Markdown, use `[[termo]]` ou links relativos. Nunca escreva `/glossario/...` sem o base.

## Estrutura do conteúdo

```
src/content/
  series/<serie>.md                  # série: blocos + programa completo (aulas futuras aparecem como "em breve")
  aulas/<serie>/<NN-slug>/index.md   # resumo do aluno + imagens co-localizadas
  glossario/<slug>.md                # um termo por arquivo
public/downloads/<serie>/            # PDFs dos slides
fontes/glossario/                    # textos de dicionários (gitignored, NUNCA publicar)
```

- Schemas em `src/content.config.ts`. O build falha se o frontmatter estiver errado. Isso é intencional.
- `[[slug]]` / `[[slug|rótulo]]` viram links para o glossário (`src/lib/remark-glossario.mjs`). Um slug inexistente quebra o build. **Dentro de tabelas**, escape a barra: `[[slug\|rótulo]]`.
- No YAML do `programa` da série, títulos com vírgula precisam de aspas.
- "Aparece nas aulas" de cada termo é calculado a partir do campo `termos` das aulas. Mantenha esse campo em dia.

## Material de origem das aulas

O professor prepara cada aula fora deste repositório, em `C:\Users\mateu\OneDrive\Documentos\_aulas_EBD\<serie>\<NN_tema>\`. Em cada pasta de aula:

- `*_Slides.pptx`: **base principal do resumo do aluno**, incluindo as notas do apresentador;
- `*_Guia_do_Professor.md`: apoio;
- `PLANEJAMENTO_serie.md`: fica na pasta da série e traz a ementa e as decisões de escopo.

## Regras editoriais (importantes)

1. **O resumo do aluno segue os slides, e não o guia do professor.** Siga a ordem e os destaques dos slides. As notas do apresentador (EXPLIQUE, DIGA) podem complementar. Não inclua:
   - slides ocultos;
   - a Parte 2 / aprofundamento do guia;
   - instruções de condução (CONDUÇÃO, TRANSIÇÃO, notas de condução);
   - citações que o professor cortou.
2. **Os termos seguem o que foi ensinado em aula.** Exemplo: a série usa um mapa didático de **seis círculos** (Cristianismo › Ocidental › Protestante › Calvinista › Reformado › Presbiteriano), em que *calvinista* ≠ *reformado*. Quando uma fonte usar o termo de outra forma, mantenha a convenção da aula e, no máximo, registre a divergência.
3. **Não antecipe aulas futuras** além de uma frase ("tema da Aula N").
4. **Fidelidade confessional:** a IPB adota a Confissão de Westminster (33 capítulos) e os Catecismos Maior e Breve. Não importe posições de fontes que contrariem a CFW ou a Constituição da IPB (por exemplo, práticas de outras denominações presbiterianas) sem deixar claro que são de outra igreja.
5. **Textos de dicionários:** servem para comparar, corrigir e complementar, **nunca** para copiar ou traduzir integralmente. Parafraseie e registre a obra no campo `fontes` do termo (formato: `AUTOR. Verbete. In: ORG. (org.). Obra. Editora, ano, p. X.`). A pasta `fontes/` é protegida por direito autoral e fica fora do git.
6. Citações bíblicas em Almeida Revista e Atualizada (ARA).

## Fluxos recorrentes

- **Nova aula:** use a skill `/nova-aula`.
- **Revisar ou ampliar o glossário com dicionários:** use a skill `/revisar-glossario`.
- **Nova série:** crie `src/content/series/<slug>.md` a partir de `identidade-presbiteriana.md`, com `status`, `periodo`, `ordem`, `blocos` e o `programa` completo tirado do `PLANEJAMENTO_serie.md`. Termos já existentes no glossário são reaproveitados: acrescente a nova série ao campo `series` do termo.
- **Exportar slides para PDF** (Windows, PowerPoint instalado; slides ocultos ficam de fora automaticamente):
  ```powershell
  $ppt = New-Object -ComObject PowerPoint.Application
  $p = $ppt.Presentations.Open("<origem>.pptx", -1, 0, 0); $p.SaveAs("<destino>.pdf", 32); $p.Close(); $ppt.Quit()
  ```
- **Ler um .pptx** (texto, notas, slides ocultos): descompacte em uma pasta temporária e leia `ppt/slides/slideN.xml` e `ppt/notesSlides/notesSlideN.xml`. Slides ocultos têm `show="0"`.

## Verificação antes de commitar

1. `npm run build` sem erros (inclui `astro check` e a validação de `[[termos]]`).
2. `npm run preview` e conferir em `http://localhost:4321/hub-ebd/`:
   - a navegação;
   - que imagem e PDF carregam;
   - a busca;
   - largura de celular (375px) sem rolagem horizontal.
3. Nenhum arquivo de `fontes/` no `git status`.
