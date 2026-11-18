import { Directive, ElementRef, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';
import { ɵwarnIfUnnamed } from '../../utils/accessible-name/accessible-name';
import { type ScButtonVariants } from '../button/button';
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
  private readonly buttonStyles = injectStyle().button;

  private readonly dial = inject(ScSpeedDial);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('default');
  readonly size = input<ScButtonVariants['size']>('icon-lg');

  private readonly class = computed(() =>
    cn(
      this.buttonStyles({ variant: this.variant(), size: this.size() }),
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

  private toggle(): void {
    if (this.dial.open()) this.dial.close();
    else this.dial.openOnFirst();
  }

  private onKeydown(event: KeyboardEvent): void {
    if (!event.key.startsWith('Arrow')) return;
    event.preventDefault();
    this.dial.openOnFirst();
  }
}
