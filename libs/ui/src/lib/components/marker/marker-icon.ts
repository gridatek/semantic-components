import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';
import { injectPreset } from '../../config/preset';

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
  private readonly styles = injectPreset().marker;
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(this.styles.icon, this.classInput()),
  );
}
