# Denner Vidal — personal site

Site pessoal com resumo profissional em inglês e artigos sobre arquitetura, ferramentas e práticas de engenharia de software.

## Desenvolvimento

Use Node.js 24 LTS (mínimo: 22.23.4). As versões das dependências estão fixadas no manifesto e no lockfile. O TypeScript fica na versão estável mais recente compatível com o verificador do Astro (6.x).

```sh
npm ci
npm run dev
npm run check
npm run build
npm run preview
```

O Astro gera o HTML estático em `dist/`, e o Pagefind acrescenta os arquivos da busca. A busca funciona no preview e na hospedagem; o servidor de desenvolvimento não gera o índice.

## Publicar um artigo

Crie um arquivo Markdown ou MDX em `src/content/blog/`. O nome do arquivo determina a URL; evite renomeá-lo depois de publicar. Use slugs descritivos como `cache-no-build`; os números sem texto são reservados à paginação.

O arquivo de artigos fica em `/articles/`, relativo ao caminho-base do Pages (por exemplo, `/blog/articles/`). O idioma padrão dos artigos é inglês. Para publicar em português, inclua `lang: pt-BR` no frontmatter. A busca usa um único índice para encontrar artigos nos dois idiomas.

```md
---
title: Cache no build
description: Quando vale a pena reutilizar os artefatos do build.
publishedAt: 2026-11-17
tags: [publicação, desempenho]
category: Engenharia de Software
draft: true
---

Comece o texto aqui. O layout já usa o título como H1;
comece as seções internas com H2.
```

A coleção valida os metadados. `updatedAt` e `cover` são opcionais; para a capa, use um caminho como `/images/cache.webp` e salve o arquivo em `public/images/`. Para imagens no corpo, prefira referências locais relativas ao arquivo Markdown ou imports no MDX, para que o Astro possa processá-las. MDX também permite importar componentes Astro e adicionar interatividade quando fizer sentido.

Rascunhos aparecem em desenvolvimento e não entram nas páginas, taxonomias, RSS, sitemap ou busca de produção. **Não use rascunhos para conteúdo privado**: arquivos em um repositório público continuam visíveis. Ao publicar, remova `draft` ou defina `draft: false`.

## Deploy no GitHub Pages

1. Crie o repositório no GitHub e envie este diretório como raiz do repositório, na branch `main`.
2. Em **Settings → Pages → Build and deployment**, selecione **GitHub Actions** como origem.
3. Faça push em `main` ou execute manualmente **Publicar no GitHub Pages** na aba Actions. Novos pushes publicam automaticamente.

O workflow usa a URL de origem e o caminho-base informados pelo Pages. Para testar um site de projeto antes do deploy, execute:

```sh
export SITE_URL=https://seu-usuario.github.io BASE_PATH=/seu-repositorio
npm run build
npm run preview
```

Para domínio personalizado, configure o domínio e os registros DNS no GitHub Pages. Rode o workflow novamente para atualizar URLs canônicas, feed e sitemap. Sites na raiz usam `BASE_PATH=/`. Nenhum segredo ou servidor Node.js é necessário em produção.

Ao manter o site, confira o build e abra as páginas de início, artigo e busca no preview. Rode o Lighthouse no site publicado ou preview com perfil mobile; as metas são 95 ou mais em Performance, Accessibility e SEO.
