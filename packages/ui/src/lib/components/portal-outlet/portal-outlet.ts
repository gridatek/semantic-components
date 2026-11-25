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
 * Renders a consumer-declared portal template (select, multiselect,
 * autocomplete, combobox, command…) inside a
 * combobox's `ngComboboxPopup`.
 *
 * The portal template is declared by the consumer, so its element injector
 * never sees the popup. Passing this outlet's injector lets `ComboboxWidget`
 * (on the list) resolve `COMBOBOX_POPUP`.
 */
@Directive({
  selector: 'ng-container[scPortalOutlet]',
})
export class ScPortalOutlet {
  readonly portal = input.required<{
    readonly templateRef: TemplateRef<unknown>;
  }>({
    alias: 'scPortalOutlet',
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
