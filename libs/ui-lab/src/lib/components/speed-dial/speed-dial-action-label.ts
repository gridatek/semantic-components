import { Directive, computed, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

@Directive({
  selector: '[scSpeedDialActionLabel]',
  host: {
    'data-slot': 'speed-dial-action-label',
    '[class]': 'class()',
  },
})
export class ScSpeedDialActionLabel {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'text-sm font-medium whitespace-nowrap',
      'bg-popover text-popover-foreground',
      'px-2 py-1 rounded shadow-sm',
      this.classInput(),
    ),
  );
}
