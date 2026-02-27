import { Directive, input } from '@angular/core';
import { computed } from 'node_modules/@angular/aria/types/_list-navigation-chunk';
import { cn } from '../../utils';

@Directive({
  selector: '[scResizableHandleIndicator]',
  host: {
    'data-slot': 'resizable-handle-indicator',
    '[class]': 'class()',
  },
})
export class ScResizableHandleIndicator {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('bg-border z-10 flex h-6 w-1 shrink-0 rounded-lg', this.classInput()),
  );
}
