import {
  Directive,
  Injector,
  type TemplateRef,
  ViewContainerRef,
  effect,
  inject,
  input,
} from '@angular/core';

/**
 * Renders a portal (`ScSelectPortal`, `ScMultiselectPortal`, …) inside a
 * combobox's `ngComboboxPopup`.
 *
 * The portal template is declared by the consumer, so its element injector
 * never sees the popup. Passing this outlet's injector lets `ComboboxWidget`
 * (on the list) resolve `COMBOBOX_POPUP`.
 */
@Directive({
  selector: 'ng-container[scSelectPortalOutlet]',
})
export class ScSelectPortalOutlet {
  readonly portal = input.required<{
    readonly templateRef: TemplateRef<unknown>;
  }>({
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
