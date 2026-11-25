import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';

/** The bar: its size — the style's progress track. */
@Directive({
  selector: 'div[scMeterTrack]',
  host: {
    'data-slot': 'meter-track',
    '[class]': 'class()',
  },
})
export class ScMeterTrack {
  private readonly styles = injectStyle().progress;

  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() =>
    cn(this.styles.track, this.classInput()),
  );
}
