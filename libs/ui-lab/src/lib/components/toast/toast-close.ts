import { computed, Directive, input, output } from '@angular/core';
import { cn } from '@semantic-components/ui';

@Directive({
  selector: 'button[scToastClose]',
  host: {
    'data-slot': 'toast-close',
    type: 'button',
    '[class]': 'class()',
    'aria-label': 'Close',
    '(click)': 'close.emit()',
  },
})
export class ScToastClose {
  readonly classInput = input<string>('', { alias: 'class' });

  /** Emitted when close button is clicked */
  readonly close = output<void>();

  protected readonly class = computed(() =>
    cn(
      'absolute right-1 top-1 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity',
      'hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-1 group-hover:opacity-100',
      'group-[.destructive]:text-red-800/50 group-[.destructive]:hover:text-red-800',
      'group-[.destructive]:focus:ring-red-400',
      this.classInput(),
    ),
  );
}
