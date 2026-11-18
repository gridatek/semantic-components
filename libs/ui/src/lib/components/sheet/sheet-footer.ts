import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';

/** The sheet's actions, at its bottom. */
@Directive({
  selector: 'div[scSheetFooter]',
  host: { '[class]': 'class()' },
})
export class ScSheetFooter {
  private readonly styles = injectStyle().sheet;
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() =>
    cn(this.styles.footer, this.classInput()),
  );
}
