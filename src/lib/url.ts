const base = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Caminho interno respeitando o `base` do site (GitHub Pages em /hub-ebd). */
export function url(caminho = '/'): string {
  const limpo = caminho.startsWith('/') ? caminho : `/${caminho}`;
  return `${base}${limpo}`;
}
