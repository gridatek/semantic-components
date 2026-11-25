import { _IdGenerator } from '@angular/cdk/a11y';
import { DestroyRef, Directive, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';
import { ScSheetProvider } from './sheet-provider';

/** The sheet's description: read with it. */
@Directive({
  selector: 'p[scSheetDescription]',
  host: {
    '[id]': 'id',
    '[class]': 'class()',
  },
})
export class ScSheetDescription {
  private readonly styles = injectStyle().sheet;
  readonly classInput = input<string>('', { alias: 'class' });
  private readonly id = inject(_IdGenerator).getId('sc-sheet-desc-');

  private readonly class = computed(() =>
    cn(this.styles.description, this.classInput()),
  );

  constructor() {
    const sheet = inject(ScSheetProvider);
    sheet.descriptionId.set(this.id);
    inject(DestroyRef).onDestroy(() => sheet.descriptionId.set(null));
  }
}
