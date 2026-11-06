import { Directive, computed, input } from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';

/**
 * A placeholder while content loads, in the preset's look: a pulsing muted
 * block (still when the user asks for less motion). Its size and shape are
 * yours (`h-4 w-48`, `rounded-full`…). Empty and silent: say the region is
 * loading with `aria-busy="true"` on it.
 */
@Directive({
  selector: 'div[scSkeleton]',
  host: {
    '[class]': 'class()',
  },
})
export class ScSkeleton {
  private readonly styles = injectPreset().skeleton;
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(this.styles, 'motion-reduce:animate-none', this.classInput()),
  );
}
