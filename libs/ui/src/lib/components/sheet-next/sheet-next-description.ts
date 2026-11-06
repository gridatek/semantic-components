import { _IdGenerator } from '@angular/cdk/a11y';
import { DestroyRef, Directive, computed, inject, input } from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';
import { ScSheetNextProvider } from './sheet-next-provider';

/** The sheet's description: read with it. */
@Directive({
  selector: 'p[scSheetNextDescription]',
  host: {
    '[id]': 'id',
    '[class]': 'class()',
  },
})
export class ScSheetNextDescription {
  private readonly styles = injectPreset().sheet;
  readonly classInput = input<string>('', { alias: 'class' });
  protected readonly id = inject(_IdGenerator).getId('sc-sheet-desc-');

  protected readonly class = computed(() =>
    cn(this.styles.description, this.classInput()),
  );

  constructor() {
    const sheet = inject(ScSheetNextProvider);
    sheet.descriptionId.set(this.id);
    inject(DestroyRef).onDestroy(() => sheet.descriptionId.set(null));
  }
}
