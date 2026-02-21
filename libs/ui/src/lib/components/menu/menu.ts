import { computed, Directive, inject, input } from '@angular/core';
import { Menu } from '@angular/aria/menu';
import { cn } from '../../utils';
import { ScMenuPortal } from './menu-portal';

@Directive({
  selector: '[scMenu]',
  exportAs: 'scMenu',
  hostDirectives: [
    {
      directive: Menu,
      inputs: ['id', 'wrap', 'disabled', 'typeaheadDelay', 'expansionDelay'],
      outputs: ['onSelect'],
    },
  ],
  host: {
    'data-slot': 'menu',
    '[class]': 'class()',
  },
})
export class ScMenu<V = string> {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly menu = inject<Menu<V>>(Menu);
  readonly visible = this.menu.visible;

  protected readonly class = computed(() =>
    cn(
      'bg-popover text-popover-foreground min-w-32 w-[15rem] rounded-lg p-1 shadow-md ring-1 ring-foreground/10 z-50 overflow-x-hidden overflow-y-auto data-[visible=false]:hidden',
      this.classInput(),
    ),
  );

  constructor() {
    const portal = inject(ScMenuPortal, { optional: true });
    portal?.menu.set(this.menu as Menu<unknown>);
  }
}
