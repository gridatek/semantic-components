import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';

/** The title and description, stacked. */
@Directive({
  selector: 'div[scNativeDialogHeader]',
  host: {
    '[class]': 'class()',
  },
})
export class ScNativeDialogHeader {
  private readonly styles = injectStyle().dialog;
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() =>
    cn(this.styles.header, this.classInput()),
  );
}
