import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';

@Directive({
  selector: 'div[scAttachmentGroup]',
  host: {
    'data-slot': 'attachment-group',
    '[class]': 'class()',
  },
})
export class ScAttachmentGroup {
  private readonly styles = injectStyle().attachment;
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() =>
    cn(this.styles.group, this.classInput()),
  );
}
