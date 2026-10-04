import { getCollection, type CollectionEntry } from 'astro:content';
import { url } from './url';

export type Serie = CollectionEntry<'series'>;
export type Aula = CollectionEntry<'aulas'>;
export type Termo = CollectionEntry<'glossario'>;

export const nn = (n: number) => String(n).padStart(2, '0');

export const urlSerie = (serieId: string) => url(`/series/${serieId}/`);
export const urlAula = (aula: Aula) => url(`/series/${aula.data.serie.id}/aula-${nn(aula.data.numero)}/`);
export const urlTermo = (termoId: string) => url(`/glossario/${termoId}/`);

export async function getSeries(): Promise<Serie[]> {
  return (await getCollection('series')).sort((a, b) => a.data.ordem - b.data.ordem);
}

/** Aulas publicadas, por série e número. Em `npm run dev`, inclui os rascunhos para revisão. */
export async function getAulas(serieId?: string): Promise<Aula[]> {
  const aulas = await getCollection(
    'aulas',
    (a) => (import.meta.env.DEV || !a.data.rascunho) && (!serieId || a.data.serie.id === serieId),
  );
  return aulas.sort(
    (a, b) => a.data.serie.id.localeCompare(b.data.serie.id) || a.data.numero - b.data.numero,
  );
}

export async function getTermos(): Promise<Termo[]> {
  return (await getCollection('glossario')).sort((a, b) =>
    a.data.termo.localeCompare(b.data.termo, 'pt-BR', { sensitivity: 'base' }),
  );
}

export const formatarData = (d: Date) =>
  d.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

/** Primeira letra sem acento, para o índice A–Z. */
export const inicial = (s: string) =>
  s.normalize('NFD').replace(/\p{Diacritic}/gu, '').charAt(0).toUpperCase();
