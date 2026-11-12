import { Directive, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { ScDrawerProvider } from './drawer-provider';

/** Opens the drawer, on any button: behaviour only, the look is the button's. */
@Directive({
  selector: 'button[scDrawerTrigger]',
  host: {
    '[attr.aria-haspopup]': '"dialog"',
    '[attr.aria-expanded]': 'drawer.open()',
    '[attr.aria-controls]': 'drawer.open() ? drawer.id : null',
    '[class]': 'class()',
    '(click)': 'drawer.open.set(!drawer.open())',
  },
})
export class ScDrawerTrigger {
  protected readonly drawer = inject(ScDrawerProvider);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn(this.classInput()));
}
