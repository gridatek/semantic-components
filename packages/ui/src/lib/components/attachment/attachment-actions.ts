import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';

@Directive({
  selector: 'div[scAttachmentActions]',
  host: {
    'data-slot': 'attachment-actions',
    '[class]': 'class()',
  },
})
export class ScAttachmentActions {
  private readonly styles = injectStyle().attachment;
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() =>
    cn(this.styles.actions, this.classInput()),
  );
}
