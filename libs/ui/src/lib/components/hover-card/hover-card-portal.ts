import { Directive, inject, TemplateRef } from '@angular/core';

@Directive({
  selector: 'ng-template[scHoverCardPortal]',
})
export class ScHoverCardPortal {
  readonly templateRef = inject(TemplateRef);
}
