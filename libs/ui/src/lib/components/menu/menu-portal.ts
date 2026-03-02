import type { Menu } from '@angular/aria/menu';
import { Directive, TemplateRef, inject, signal } from '@angular/core';

@Directive({
  selector: '[scMenuPortal]',
})
export class ScMenuPortal {
  readonly templateRef = inject(TemplateRef);
  readonly menu = signal<Menu<unknown> | undefined>(undefined);
}
