import { Directive, TemplateRef, inject } from '@angular/core';

/** The chart tooltip's content, rendered while a category is active. */
@Directive({ selector: 'ng-template[scChartTooltipPortal]' })
export class ScChartTooltipPortal {
  readonly templateRef = inject(TemplateRef);
}
