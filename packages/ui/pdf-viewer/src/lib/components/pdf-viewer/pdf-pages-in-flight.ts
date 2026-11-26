import type { PDFDocumentProxy } from 'pdfjs-dist';

/**
 * A document's page requests still waiting for the worker. One answered once
 * its viewer has let go of the document breaks pdf.js's viewer (its page is
 * gone); once its transport is destroyed, pdf.js throws "Transport
 * destroyed". So a document is let go when none is waiting.
 */
const inFlight = new WeakMap<PDFDocumentProxy, Set<Promise<unknown>>>();

/** Counts the document's page requests (pdf.js's viewer, thumbnails, find…). */
export function trackPageRequests(doc: PDFDocumentProxy): void {
  if (inFlight.has(doc)) return;
  const pending = new Set<Promise<unknown>>();
  inFlight.set(doc, pending);
  const getPage = doc.getPage.bind(doc);
  doc.getPage = (pageNumber: number) => {
    const request = getPage(pageNumber);
    pending.add(request);
    const done = () => pending.delete(request);
    request.then(done, done);
    return request;
  };
}

/**
 * Calls `done` the moment none of the document's page requests is waiting —
 * in that same task, before pdf.js asks for more (it asks for the other pages
 * as the first comes in) — or after `ms` (a worker that never answers).
 */
export function afterPageRequests(
  doc: PDFDocumentProxy | null,
  ms: number,
  done: () => void,
): void {
  const pending = doc ? inFlight.get(doc) : undefined;
  const start = performance.now();
  let finished = false;
  const check = () => {
    if (finished) return;
    const left = ms - (performance.now() - start);
    if (!pending?.size || left <= 0) {
      finished = true;
      done();
      return;
    }
    const timer = setTimeout(check, left);
    void Promise.allSettled([...pending]).then(() => {
      clearTimeout(timer);
      check();
    });
  };
  check();
}

/** {@link afterPageRequests}, as a promise. */
export function pageRequestsAnswered(
  doc: PDFDocumentProxy | null,
  ms: number,
): Promise<void> {
  return new Promise((resolve) => afterPageRequests(doc, ms, resolve));
}
