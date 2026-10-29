import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils';

/**
 * The trigger's chevron — your SVG, pointing to the end (a chevron right):
 * turned down when open, mirrored in right-to-left when closed.
 */
@Directive({
  selector: 'span[scTraceCollapsibleIcon]',
  host: {
    'data-slot': 'trace-collapsible-icon',
    'aria-hidden': 'true',
    '[class]': 'class()',
  },
})
export class ScTraceCollapsibleIcon {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'flex size-4 shrink-0 items-center justify-center transition-transform group-aria-expanded/trace-collapsible-trigger:rotate-90 rtl:group-not-aria-expanded/trace-collapsible-trigger:-scale-x-100 [&_svg]:pointer-events-none [&_svg:not([class*=size-])]:size-4',
      this.classInput(),
    ),
  );
}
