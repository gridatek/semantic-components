import { Directive, computed, input } from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';

/** The sheet's actions, at its bottom. */
@Directive({
  selector: 'div[scSheetFooter]',
  host: { '[class]': 'class()' },
})
export class ScSheetFooter {
  private readonly styles = injectPreset().sheet;
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(this.styles.footer, this.classInput()),
  );
}
