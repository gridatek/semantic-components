import { Directive, TemplateRef, inject } from '@angular/core';

@Directive({
  selector: 'ng-template[scVirtualListItem]',
  host: {
    'data-slot': 'virtual-list-item',
  },
})
export class ScVirtualListItem<T> {
  readonly templateRef = inject(TemplateRef<{ $implicit: T; index: number }>);
}
