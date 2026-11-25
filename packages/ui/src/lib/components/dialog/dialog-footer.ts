import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';

@Directive({
  selector: 'div[scDialogFooter]',
  host: {
    '[class]': 'class()',
  },
})
export class ScDialogFooter {
  private readonly styles = injectStyle().dialog;
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() =>
    cn(this.styles.footer, this.classInput()),
  );
}
