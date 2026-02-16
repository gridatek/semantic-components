import { computed, Directive, inject, input } from '@angular/core';
import { cn } from '../../utils';
import { ScPopoverProvider } from './popover-provider';

@Directive({
  selector: 'button[sc-popover-close]',
  host: {
    'data-slot': 'popover-close',
    '[class]': 'class()',
    '(click)': 'closePopover()',
  },
})
export class ScPopoverClose {
  private readonly popover = inject(ScPopoverProvider);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'absolute right-2 top-2 rounded-sm opacity-70 ring-offset-background transition-opacity',
      'hover:opacity-100',
      'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
      this.classInput(),
    ),
  );

  protected closePopover(): void {
    this.popover.open.set(false);
  }
}
