import { DestroyRef, Directive, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';
import { ScTriggerMenu } from './trigger-menu';

/**
 * Shown when nothing is found. With it, the menu stays open with nothing
 * found (and while items load); without it, the menu closes until something
 * matches.
 */
@Directive({
  selector: '[scTriggerMenuEmpty]',
  host: {
    'data-slot': 'trigger-menu-empty',
    '[class]': 'class()',
  },
})
export class ScTriggerMenuEmpty {
  private readonly styles = injectStyle().combobox;
  private readonly menu = inject(ScTriggerMenu);

  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() =>
    cn(this.styles.empty, this.classInput()),
  );

  constructor() {
    this.menu.ɵempties.update((count) => count + 1);
    inject(DestroyRef).onDestroy(() =>
      this.menu.ɵempties.update((count) => count - 1),
    );
  }
}
