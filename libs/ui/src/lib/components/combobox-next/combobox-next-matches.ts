/** Lower case, without accents. */
const normalize = (text: string) =>
  text
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLocaleLowerCase();

/**
 * Whether a text matches a query, accents and case ignored — for filtering a
 * combobox's options by its `query()`. Everything matches an empty query.
 */
export function scComboboxNextMatches(text: string, query: string): boolean {
  const wanted = normalize(query.trim());
  return !wanted || normalize(text).includes(wanted);
}
