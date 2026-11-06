import { Directive, computed, input } from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';

/** The popover's title and description, together. */
@Directive({
  selector: 'div[scPopoverNextHeader]',
  host: { '[class]': 'class()' },
})
export class ScPopoverNextHeader {
  private readonly styles = injectPreset().popover;
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(this.styles.header, this.classInput()),
  );
}
