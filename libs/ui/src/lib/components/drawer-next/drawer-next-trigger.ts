import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '../../utils';
import { ScDrawerNextProvider } from './drawer-next-provider';

/** Opens the drawer, on any button: behaviour only, the look is the button's. */
@Directive({
  selector: 'button[scDrawerNextTrigger]',
  host: {
    '[attr.aria-haspopup]': '"dialog"',
    '[attr.aria-expanded]': 'drawer.open()',
    '[attr.aria-controls]': 'drawer.open() ? drawer.id : null',
    '[class]': 'class()',
    '(click)': 'drawer.open.set(!drawer.open())',
  },
})
export class ScDrawerNextTrigger {
  protected readonly drawer = inject(ScDrawerNextProvider);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn(this.classInput()));
}
