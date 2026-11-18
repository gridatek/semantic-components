import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';

@Directive({
  selector: 'div[scAttachmentContent]',
  host: {
    'data-slot': 'attachment-content',
    '[class]': 'class()',
  },
})
export class ScAttachmentContent {
  private readonly styles = injectStyle().attachment;
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() =>
    cn(this.styles.content, this.classInput()),
  );
}
