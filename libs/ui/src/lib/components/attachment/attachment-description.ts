import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';

@Directive({
  selector: 'div[scAttachmentDescription]',
  host: {
    'data-slot': 'attachment-description',
    '[class]': 'class()',
  },
})
export class ScAttachmentDescription {
  private readonly styles = injectStyle().attachment;
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() =>
    cn(this.styles.description, this.classInput()),
  );
}
