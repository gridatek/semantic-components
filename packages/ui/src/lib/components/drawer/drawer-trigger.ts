import { Directive, ElementRef, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { ɵfocusOnPress } from '../../utils';
import { ScDrawerProvider } from './drawer-provider';

/** Opens the drawer, on any button: behaviour only, the look is the button's. */
@Directive({
  selector: 'button[scDrawerTrigger]',
  host: {
    '[attr.aria-haspopup]': '"dialog"',
    '[attr.aria-expanded]': 'drawer.open()',
    '[attr.aria-controls]': 'drawer.open() ? drawer.id : null',
    '[class]': 'class()',
    '(click)': 'toggle()',
  },
})
export class ScDrawerTrigger {
  private readonly drawer = inject(ScDrawerProvider);
  private readonly element =
    inject<ElementRef<HTMLButtonElement>>(ElementRef).nativeElement;
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() => cn(this.classInput()));

  private toggle(): void {
    ɵfocusOnPress(this.element);
    this.drawer.open.update((open) => !open);
  }
}
