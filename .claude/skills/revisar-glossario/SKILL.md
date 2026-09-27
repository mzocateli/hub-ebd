---
name: revisar-glossario
description: Revisa, corrige e complementa termos do glossário usando verbetes de dicionários bíblicos e teológicos colocados em fontes/glossario/, sem copiar os textos. Use quando o usuário adicionar arquivos de dicionários ou pedir para revisar ou ampliar o glossário.
---

# Revisar o glossário com dicionários

## Princípios

- Os verbetes em `fontes/glossario/` (geralmente em inglês) são **protegidos por direito autoral**: não copie nem traduza integralmente. Use-os para **comparar, corrigir e complementar**, com suas próprias palavras.
- **Prevalece o que foi ensinado em aula** (resumo do aluno em `src/content/aulas/...` e notas dos slides). Se o dicionário usar o termo de outro modo, mantenha a convenção da aula e, no máximo, mencione a divergência.
- Não importe posições contrárias à Confissão de Westminster ou à Constituição da IPB, nem práticas de outras denominações como se fossem da IPB.
- Não antecipe aulas futuras além de uma frase.
- `fontes/` está no `.gitignore`. Confirme que continua lá antes de qualquer commit.

## Fluxo

1. Liste `fontes/glossario/` e mapeie cada arquivo para o slug do termo (os nomes nem sempre coincidem, ex.: `remonstrancia3.txt` → `remonstrantes`).
2. Se forem muitos arquivos (mais de ~100 KB), divida por grupos de termos entre agentes `general-purpose` em paralelo. Cada agente deve:
   - **não editar arquivos**;
   - ler as fontes do seu grupo, os termos atuais, o resumo da aula e as notas dos slides;
   - devolver, por termo: erros ou imprecisões com evidência; 2 a 4 complementos com redação proposta; conflitos com a convenção da aula; e a identificação da obra **só com evidência no texto** (bibliografia ao fim do arquivo, autor assinado).
3. Aplique as mudanças você mesmo, para manter voz e formato uniformes:
   - correções primeiro;
   - complementos curtos e úteis para leigos;
   - listas em vez de blocos longos.
4. Registre as obras consultadas no campo `fontes` do termo, no formato `AUTOR. Verbete. In: ORG. (org.). Obra. Editora, ano, p. X.`
5. `npm run build` e resumo para o usuário:
   - o que foi corrigido e o que foi acrescentado;
   - o que foi **deliberadamente rejeitado**, e por quê;
   - pontos que as fontes não confirmam.
