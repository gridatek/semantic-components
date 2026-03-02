import { Directive, TemplateRef, inject } from '@angular/core';

@Directive({
  selector: 'ng-template[scDrawerPortal]',
})
export class ScDrawerPortal {
  readonly templateRef = inject(TemplateRef);
}
