import { Directive, inject, TemplateRef } from '@angular/core';

@Directive({
  selector: 'ng-template[scNavigationMenuPortal]',
})
export class ScNavigationMenuPortal {
  readonly templateRef = inject(TemplateRef);
}
