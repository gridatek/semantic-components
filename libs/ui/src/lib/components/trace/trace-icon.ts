import { Directive, computed, input } from '@angular/core';
import { injectPreset } from '../../config/preset';
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
  private readonly styles = injectPreset().trace;
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(this.styles.icon, this.classInput()),
  );
}
