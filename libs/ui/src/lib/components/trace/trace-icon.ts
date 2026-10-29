import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils';

/** A step's icon — your SVG inside; hidden from screen readers: the title says it. */
@Directive({
  selector: 'span[scTraceIcon]',
  host: {
    'data-slot': 'trace-icon',
    'aria-hidden': 'true',
    '[class]': 'class()',
  },
})
export class ScTraceIcon {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'flex size-4 shrink-0 items-center justify-center [&_svg]:pointer-events-none [&_svg:not([class*=size-])]:size-4 [[data-slot=trace-title]~&]:-ms-1',
      this.classInput(),
    ),
  );
}
