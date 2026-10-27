import { Directive, TemplateRef, inject } from '@angular/core';

/** The context of a fold's template: how many unchanged lines it hides. */
export interface ScDiffViewerFoldContext {
  readonly $implicit: number;
}

/**
 * The text of a fold's button (`let-count`): "Show 12 unchanged lines". With
 * it, the diff viewer folds long unchanged runs (its `context`); a click
 * shows them.
 */
@Directive({
  selector: 'ng-template[scDiffViewerFold]',
})
export class ScDiffViewerFold {
  readonly template = inject<TemplateRef<ScDiffViewerFoldContext>>(TemplateRef);

  static ngTemplateContextGuard(
    _dir: ScDiffViewerFold,
    context: unknown,
  ): context is ScDiffViewerFoldContext {
    return !!context;
  }
}
