/**
 * Hands the browser a file to save — from an event handler, with the page's
 * `document` (`inject(DOCUMENT)`).
 */
export function download(document: Document, name: string, blob: Blob): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = name;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url));
}
