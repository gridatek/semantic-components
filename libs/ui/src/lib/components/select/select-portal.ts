import { Directive, inject, TemplateRef } from '@angular/core';

@Directive({
  selector: 'ng-template[scSelectPortal]',
})
export class ScSelectPortal {
  readonly templateRef = inject(TemplateRef);
}
