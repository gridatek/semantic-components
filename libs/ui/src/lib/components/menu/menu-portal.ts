import { Directive, inject, signal, TemplateRef } from '@angular/core';
import type { Menu } from '@angular/aria/menu';

@Directive({
  selector: '[scMenuPortal]',
})
export class ScMenuPortal {
  readonly templateRef = inject(TemplateRef);
  readonly menu = signal<Menu<unknown> | undefined>(undefined);
}
