import { Directive, TemplateRef, inject } from '@angular/core';

@Directive({
  selector: 'ng-template[scNativeDialogContent]',
})
export class ScNativeDialogContent {
  readonly templateRef = inject(TemplateRef);
}
