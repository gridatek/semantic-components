import { Directive, TemplateRef, inject } from '@angular/core';

@Directive({
  selector: 'ng-template[scNavigationMenuPortal]',
})
export class ScNavigationMenuPortal {
  readonly templateRef = inject(TemplateRef);
}
