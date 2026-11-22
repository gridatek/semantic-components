import { Directive, TemplateRef, inject } from '@angular/core';

/** The menu's template: stamped in an overlay at the trigger while one is typed. */
@Directive({
  selector: 'ng-template[scTriggerMenuPortal]',
})
export class ScTriggerMenuPortal {
  readonly templateRef = inject(TemplateRef);
}
