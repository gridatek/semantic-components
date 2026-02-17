import { Directive, inject } from '@angular/core';
import { ScDrawerProvider } from './drawer-provider';

@Directive({
  selector: 'button[scDrawerClose]',
  host: {
    'data-slot': 'drawer-close',
    type: 'button',
    '(click)': 'closeDrawer()',
  },
})
export class ScDrawerClose {
  private readonly drawer = inject(ScDrawerProvider);

  protected closeDrawer(): void {
    this.drawer.open.set(false);
  }
}
