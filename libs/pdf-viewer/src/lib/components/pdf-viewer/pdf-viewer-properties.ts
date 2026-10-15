import type { PDFDocumentProxy } from 'pdfjs-dist';
import { PDFDateString } from 'pdfjs-dist';
import type {
  ScPdfDocumentProperties,
  ScPdfPaperSize,
} from './pdf-viewer-types';

/** Standard paper sizes in millimetres (portrait), as pdf.js names them. */
const PAPER_SIZES: [ScPdfPaperSize, number, number][] = [
  ['a3', 297, 420],
  ['a4', 210, 297],
  ['letter', 216, 279],
  ['legal', 216, 356],
];

const MM_PER_POINT = 25.4 / 72;

/** A non-empty string from the document's info, or null. */
function text(value: unknown): string | null {
  return typeof value === 'string' && value.trim() ? value : null;
}

/**
 * A PDF date (`D:YYYYMMDDHHmmSSOHH'mm'`) as an instant. pdf.js parses it —
 * into a `Date`, the one place one is used, made an instant at once.
 */
function date(value: unknown): Temporal.Instant | null {
  const parsed =
    typeof value === 'string' ? PDFDateString.toDateObject(value) : null;
  return parsed
    ? Temporal.Instant.fromEpochMilliseconds(parsed.getTime())
    : null;
}

/** The paper size a page is (either way round), if a standard one. */
function paperSize(width: number, height: number): ScPdfPaperSize | null {
  const short = Math.round(Math.min(width, height) * MM_PER_POINT);
  const long = Math.round(Math.max(width, height) * MM_PER_POINT);
  const match = PAPER_SIZES.find(([, w, h]) => w === short && h === long);
  return match ? match[0] : null;
}

/** The document's properties, with the size of `pageNumber`. */
export async function loadDocumentProperties(
  doc: PDFDocumentProxy,
  pageNumber: number,
  fileName: string,
): Promise<ScPdfDocumentProperties> {
  const [meta, download, page] = await Promise.all([
    doc.getMetadata(),
    doc.getDownloadInfo().catch(() => null),
    doc.getPage(pageNumber).catch(() => null),
  ]);
  const { info, metadata } = meta;
  // The size the server gave, when it did (pdf.js returns it, untyped).
  const { contentLength } = meta as { contentLength?: number | null };
  const fields = info as Record<string, unknown>;
  // As shown: the page's own rotation (the viewer's isn't the document's).
  const viewport = page?.getViewport({ scale: 1 });
  return {
    fileName,
    fileSize: contentLength ?? download?.length ?? null,
    // The XMP title wins over the info dictionary's, as in pdf.js.
    title: text(metadata?.get('dc:title')) ?? text(fields['Title']),
    author: text(fields['Author']),
    subject: text(fields['Subject']),
    keywords: text(fields['Keywords']),
    creationDate: date(fields['CreationDate']),
    modificationDate: date(fields['ModDate']),
    creator: text(fields['Creator']),
    producer: text(fields['Producer']),
    version: text(fields['PDFFormatVersion']),
    language: text(fields['Language']),
    pageCount: doc.numPages,
    pageSize: viewport
      ? {
          width: viewport.width,
          height: viewport.height,
          paper: paperSize(viewport.width, viewport.height),
          orientation:
            viewport.width > viewport.height ? 'landscape' : 'portrait',
        }
      : null,
    linearized: fields['IsLinearized'] === true,
  };
}
