import { Directive, computed, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

@Directive({
  selector: 'span[scMarkerIcon]',
  host: {
    'data-slot': 'marker-icon',
    'aria-hidden': 'true',
    '[class]': 'class()',
  },
})
export class ScMarkerIcon {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      "size-4 shrink-0 [&_svg:not([class*='size-'])]:size-4",
      this.classInput(),
    ),
  );
}
