import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';
import { injectPreset } from '../../config/preset';

/** The bar's track: the whole line, the range inside it. */
@Directive({
  selector: 'div[scProgressTrack]',
  host: {
    'data-slot': 'progress-track',
    '[class]': 'class()',
  },
})
export class ScProgressTrack {
  private readonly styles = injectPreset().progress;
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(this.styles.track, this.classInput()),
  );
}
