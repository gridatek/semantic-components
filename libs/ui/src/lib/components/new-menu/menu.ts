import { Menu } from '@angular/aria/menu';
import { Directive, computed, inject, input } from '@angular/core';

import { cn } from '@semantic-components/utils';

import { ScAriaMenuOverlay } from './menu-overlay';

@Directive({
  selector: '[scAriaMenu]',
  exportAs: 'scAriaMenu',
  hostDirectives: [Menu],
  host: {
    'data-slot': 'aria-menu',
    '[class]': 'class()',
    '[attr.animate.enter]': 'enterAnimation()',
    '[attr.animate.leave]': 'leaveAnimation()',
  },
})
export class ScAriaMenu {
  private readonly overlay = inject(ScAriaMenuOverlay, { optional: true });
  readonly menu = inject(Menu, { self: true });

  readonly classInput = input<string>('', {
    alias: 'class',
  });

  readonly visible = this.menu.visible;

  protected readonly class = computed(() =>
    cn(
      'z-50 min-w-[8rem] overflow-x-hidden overflow-y-auto rounded-md border bg-popover p-1 text-popover-foreground shadow-md',
      this.classInput(),
    ),
  );

  protected readonly enterAnimation = computed(() => {
    return this.overlay?.enterAnimation() ?? '';
  });

  protected readonly leaveAnimation = computed(() => {
    return this.overlay?.leaveAnimation() ?? '';
  });
}
