import { Directive, TemplateRef, inject } from '@angular/core';
import type { ScJsonViewerNode } from './json-viewer-nodes';

/** What an object's or array's summary is given. */
export interface ScJsonViewerSummaryContext {
  /** The object, array or range. */
  readonly $implicit: ScJsonViewerNode;
}

/**
 * The words in an object's or array's summary, between its brackets:
 * `<ng-template scJsonViewerSummary let-node>{{ node.size }} keys</ng-template>`
 * gives `{ 3 keys }`. Without it, the count alone: `{ 3 }`.
 */
@Directive({
  selector: 'ng-template[scJsonViewerSummary]',
})
export class ScJsonViewerSummary {
  readonly template =
    inject<TemplateRef<ScJsonViewerSummaryContext>>(TemplateRef);

  static ngTemplateContextGuard(
    _directive: ScJsonViewerSummary,
    _context: unknown,
  ): _context is ScJsonViewerSummaryContext {
    return true;
  }
}
