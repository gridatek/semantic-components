/**
 * Your words with the crop's numbers in them: `{x}`, `{y}`, `{width}`,
 * `{height}` replaced, written by `format` (the locale's). Empty: none.
 */
export function cropValueText(
  template: string,
  values: Readonly<Record<'x' | 'y' | 'width' | 'height', number>>,
  format: Intl.NumberFormat,
): string | null {
  if (!template) return null;
  return template.replace(/\{(x|y|width|height)\}/g, (_, key: string) =>
    format.format(values[key as keyof typeof values]),
  );
}
