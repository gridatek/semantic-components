import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';

/** The sheet's title and description, at its top. */
@Directive({
  selector: 'div[scSheetHeader]',
  host: { '[class]': 'class()' },
})
export class ScSheetHeader {
  private readonly styles = injectStyle().sheet;
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() =>
    cn(this.styles.header, this.classInput()),
  );
}
