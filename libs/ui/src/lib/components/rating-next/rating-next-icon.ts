import { Directive, TemplateRef, inject } from '@angular/core';

/** What a star's icon is drawn with: which star (1 for the first), and which layer. */
export interface ScRatingNextIconContext {
  /** The star: 1 for the first. */
  $implicit: number;
  /** The full layer (drawn over the empty one, up to the star's fill); else the empty one. */
  full: boolean;
}

/**
 * Your icon, once: `<ng-template scRatingNextIcon><svg siStarIcon></svg></ng-template>`. The rating
 * draws it for each star, twice — empty, and full over it up to the fill. A
 * different icon for each layer: `let-full="full"`, then `@if (full)`.
 */
@Directive({ selector: 'ng-template[scRatingNextIcon]' })
export class ScRatingNextIcon {
  readonly template = inject<TemplateRef<ScRatingNextIconContext>>(TemplateRef);

  static ngTemplateContextGuard(
    _dir: ScRatingNextIcon,
    context: unknown,
  ): context is ScRatingNextIconContext {
    return !!context;
  }
}
