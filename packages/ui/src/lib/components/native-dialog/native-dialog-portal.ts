import { Directive, TemplateRef, inject } from '@angular/core';

/** The dialog's template (the `<dialog scNativeDialog>` in it), stamped while it is open. */
@Directive({
  selector: 'ng-template[scNativeDialogPortal]',
})
export class ScNativeDialogPortal {
  readonly templateRef = inject(TemplateRef);
}
