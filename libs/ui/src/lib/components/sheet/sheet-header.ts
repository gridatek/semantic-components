import { Directive, computed, input } from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';

/** The sheet's title and description, at its top. */
@Directive({
  selector: 'div[scSheetHeader]',
  host: { '[class]': 'class()' },
})
export class ScSheetHeader {
  private readonly styles = injectPreset().sheet;
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(this.styles.header, this.classInput()),
  );
}
