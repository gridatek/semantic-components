/** A named color for the editor tools' swatches. */
export interface ScPdfEditorColor {
  name: string;
  value: string;
}

export const SC_PDF_HIGHLIGHT_COLORS: readonly ScPdfEditorColor[] = [
  { name: 'Yellow', value: '#FFFF00' },
  { name: 'Green', value: '#00FF00' },
  { name: 'Cyan', value: '#00FFFF' },
  { name: 'Pink', value: '#FF69B4' },
  { name: 'Red', value: '#FF0000' },
];

export const SC_PDF_INK_COLORS: readonly ScPdfEditorColor[] = [
  { name: 'Black', value: '#000000' },
  { name: 'Red', value: '#DC2626' },
  { name: 'Orange', value: '#EA580C' },
  { name: 'Green', value: '#16A34A' },
  { name: 'Blue', value: '#2563EB' },
  { name: 'Purple', value: '#9333EA' },
];
