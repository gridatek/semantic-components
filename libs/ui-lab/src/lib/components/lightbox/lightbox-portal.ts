import { Directive, TemplateRef, inject } from '@angular/core';

@Directive({
  selector: 'ng-template[scLightboxPortal]',
})
export class ScLightboxPortal {
  readonly templateRef = inject(TemplateRef);
}
