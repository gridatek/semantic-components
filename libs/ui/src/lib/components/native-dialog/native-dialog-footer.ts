import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';

/** The actions, at the end (stacked, reversed, on a phone). */
@Directive({
  selector: 'div[scNativeDialogFooter]',
  host: {
    '[class]': 'class()',
  },
})
export class ScNativeDialogFooter {
  private readonly styles = injectStyle().dialog;
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() =>
    cn(this.styles.footer, this.classInput()),
  );
}
