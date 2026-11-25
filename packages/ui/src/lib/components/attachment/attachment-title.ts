import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';

@Directive({
  selector: 'div[scAttachmentTitle]',
  host: {
    'data-slot': 'attachment-title',
    '[class]': 'class()',
  },
})
export class ScAttachmentTitle {
  private readonly styles = injectStyle().attachment;
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() =>
    cn(this.styles.title, this.classInput()),
  );
}
