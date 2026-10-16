import { Directive, ElementRef, computed, inject, input } from '@angular/core';
import {
  type ScButtonVariants,
  buttonVariants,
  cn,
  ɵwarnIfUnnamed,
} from '@semantic-components/ui';
import { ScSpeedDial } from './speed-dial';

/**
 * Opens and closes the actions — on its first, from a click, Enter, Space or
 * an arrow. Write its icon (`data-open` on the dial turns it) and name it.
 */
@Directive({
  selector: 'button[scSpeedDialTrigger]',
  host: {
    type: 'button',
    'data-slot': 'speed-dial-trigger',
    'aria-haspopup': 'menu',
    '[id]': 'dial.triggerId',
    '[attr.aria-expanded]': 'dial.open()',
    '[attr.aria-controls]': 'dial.listId',
    '[class]': 'class()',
    '(click)': 'toggle()',
    '(keydown)': 'onKeydown($event)',
  },
})
export class ScSpeedDialTrigger {
  protected readonly dial = inject(ScSpeedDial);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('default');
  readonly size = input<ScButtonVariants['size']>('icon-lg');

  protected readonly class = computed(() =>
    cn(
      buttonVariants({ variant: this.variant(), size: this.size() }),
      'rounded-full shadow-lg',
      this.classInput(),
    ),
  );

  constructor() {
    ɵwarnIfUnnamed('scSpeedDialTrigger');
    this.dial.ɵtrigger.set(
      inject<ElementRef<HTMLElement>>(ElementRef).nativeElement,
    );
  }

  protected toggle(): void {
    if (this.dial.open()) this.dial.close();
    else this.dial.openOnFirst();
  }

  protected onKeydown(event: KeyboardEvent): void {
    if (!event.key.startsWith('Arrow')) return;
    event.preventDefault();
    this.dial.openOnFirst();
  }
}
