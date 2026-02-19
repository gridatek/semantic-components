import { Directive, inject, TemplateRef } from '@angular/core';

@Directive({
  selector: 'ng-template[scMenuPortal]',
})
export class ScMenuPortal {
  readonly templateRef = inject(TemplateRef);
}
