import { Directive, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';
import { ScDialog } from './dialog';

@Directive({
  selector: 'h2[scDialogTitle]',
  host: {
    '[id]': 'dialog.titleId',
    '[class]': 'class()',
  },
})
export class ScDialogTitle {
  private readonly styles = injectStyle().dialog;
  private readonly dialog = inject(ScDialog);
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() =>
    cn(this.styles.title, this.classInput()),
  );
}
