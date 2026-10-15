import { DestroyRef, Directive, TemplateRef, inject } from '@angular/core';
import type { ScToastData } from './toast.types';
import { ScToaster } from './toaster';

/**
 * How a toast looks — written once, in your app (`<ng-template scToastTemplate
 * let-toast>`): your icon, `scToastTitle`, `scToastDescription`,
 * `scToastAction`, `scToastClose`, from the toast's data. The toaster renders
 * it for each toast it shows.
 */
@Directive({
  selector: 'ng-template[scToastTemplate]',
})
export class ScToastTemplate {
  constructor() {
    const toaster = inject(ScToaster);
    const template =
      inject<TemplateRef<{ $implicit: ScToastData }>>(TemplateRef);
    toaster.ɵtemplate.set(template);
    inject(DestroyRef).onDestroy(() => {
      if (toaster.ɵtemplate() === template) toaster.ɵtemplate.set(null);
    });
  }

  static ngTemplateContextGuard(
    _directive: ScToastTemplate,
    _context: unknown,
  ): _context is { $implicit: ScToastData } {
    return true;
  }
}
