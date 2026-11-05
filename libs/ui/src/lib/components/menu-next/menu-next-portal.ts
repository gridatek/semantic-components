import type { Menu } from '@angular/aria/menu';
import { Directive, TemplateRef, inject, signal } from '@angular/core';

/** The menu's template, rendered while it is open. */
@Directive({
  selector: 'ng-template[scMenuNextPortal]',
})
export class ScMenuNextPortal {
  readonly templateRef = inject(TemplateRef);
  readonly menu = signal<Menu<unknown> | undefined>(undefined);
}
