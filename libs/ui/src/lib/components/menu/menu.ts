import { Menu } from '@angular/aria/menu';
import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '../../utils';
import { ScMenuPortal } from './menu-portal';

@Directive({
  selector: '[scMenu]',
  exportAs: 'scMenu',
  hostDirectives: [
    {
      directive: Menu,
      inputs: ['id', 'wrap', 'disabled', 'typeaheadDelay', 'expansionDelay'],
      outputs: ['itemSelected'],
    },
  ],
  host: {
    'data-slot': 'menu',
    '[class]': 'class()',
    'animate.enter': 'animate-in fade-in-0 zoom-in-95 duration-150',
    'animate.leave': 'animate-out fade-out-0 zoom-out-95 duration-150',
  },
})
export class ScMenu<V = string> {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly menu = inject<Menu<V>>(Menu);
  readonly visible = this.menu.visible;

  protected readonly class = computed(() =>
    cn(
      'bg-popover text-popover-foreground min-w-32 w-60 rounded-lg p-1 shadow-md ring-1 ring-foreground/10 z-50 overflow-x-hidden overflow-y-auto data-[visible=false]:hidden',
      this.classInput(),
    ),
  );

  constructor() {
    const portal = inject(ScMenuPortal, { optional: true });
    portal?.menu.set(this.menu as Menu<unknown>);
  }
}
