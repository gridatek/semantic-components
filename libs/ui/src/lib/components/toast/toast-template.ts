import {
  DestroyRef,
  Directive,
  TemplateRef,
  inject,
  input,
} from '@angular/core';
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
  /**
   * The toasts' region name — write the toaster's `hotkey` in it, so it can be found
   * (e.g. "Notifications, Alt+T").
   */
  readonly label = input<string>();

  readonly ɵtemplate =
    inject<TemplateRef<{ $implicit: ScToastData }>>(TemplateRef);

  constructor() {
    const toaster = inject(ScToaster);
    toaster.ɵtemplate.set(this);
    inject(DestroyRef).onDestroy(() => {
      if (toaster.ɵtemplate() === this) toaster.ɵtemplate.set(null);
    });
  }

  static ngTemplateContextGuard(
    _directive: ScToastTemplate,
    _context: unknown,
  ): _context is { $implicit: ScToastData } {
    return true;
  }
}
