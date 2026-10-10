import {
  Directive,
  Injector,
  ViewContainerRef,
  effect,
  inject,
  input,
} from '@angular/core';
import type { ScSelectPortal } from './select-portal';

/**
 * Renders an `ScSelectPortal` inside the select's `ngComboboxPopup`.
 *
 * The portal template is declared by the consumer, so its element injector
 * never sees the popup. Passing this outlet's injector lets `ComboboxWidget`
 * (on `scSelectList`) resolve `COMBOBOX_POPUP`.
 */
@Directive({
  selector: 'ng-container[scSelectPortalOutlet]',
})
export class ScSelectPortalOutlet {
  readonly portal = input.required<ScSelectPortal>({
    alias: 'scSelectPortalOutlet',
  });

  constructor() {
    const viewContainerRef = inject(ViewContainerRef);
    const injector = inject(Injector);

    effect((onCleanup) => {
      const viewRef = viewContainerRef.createEmbeddedView(
        this.portal().templateRef,
        undefined,
        { injector },
      );
      onCleanup(() => viewRef.destroy());
    });
  }
}
