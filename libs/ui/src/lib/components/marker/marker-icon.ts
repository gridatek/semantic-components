import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';

/** Your icon, hidden from screen readers: the content says it. */
@Directive({
  selector: 'span[scMarkerIcon]',
  host: {
    'data-slot': 'marker-icon',
    'aria-hidden': 'true',
    '[class]': 'class()',
  },
})
export class ScMarkerIcon {
  private readonly styles = injectStyle().marker;
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() =>
    cn(this.styles.icon, this.classInput()),
  );
}
