import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';

/**
 * The content between the header and the footer: past half the screen it
 * scrolls, edge to edge (the style's `dialog.body`), while the header and the
 * footer stay.
 */
@Directive({
  selector: 'div[scDialogBody]',
  host: {
    '[class]': 'class()',
  },
})
export class ScDialogBody {
  private readonly styles = injectStyle().dialog;
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() =>
    cn(this.styles.body, this.classInput()),
  );
}
