import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';

/** The bar's track: the whole line, the range inside it. */
@Directive({
  selector: 'div[scProgressTrack]',
  host: {
    'data-slot': 'progress-track',
    '[class]': 'class()',
  },
})
export class ScProgressTrack {
  private readonly styles = injectStyle().progress;
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() =>
    cn(this.styles.track, this.classInput()),
  );
}
