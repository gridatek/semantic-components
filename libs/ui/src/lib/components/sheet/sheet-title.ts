import { _IdGenerator } from '@angular/cdk/a11y';
import { DestroyRef, Directive, computed, inject, input } from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';
import { ScSheetProvider } from './sheet-provider';

/** The sheet's title: it names the sheet. */
@Directive({
  selector: 'h2[scSheetTitle]',
  host: {
    '[id]': 'id',
    '[class]': 'class()',
  },
})
export class ScSheetTitle {
  private readonly styles = injectPreset().sheet;
  readonly classInput = input<string>('', { alias: 'class' });
  protected readonly id = inject(_IdGenerator).getId('sc-sheet-title-');

  protected readonly class = computed(() =>
    cn(this.styles.title, this.classInput()),
  );

  constructor() {
    const sheet = inject(ScSheetProvider);
    sheet.titleId.set(this.id);
    inject(DestroyRef).onDestroy(() => sheet.titleId.set(null));
  }
}
