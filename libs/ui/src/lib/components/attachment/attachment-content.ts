import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';
import { injectPreset } from '../../config/preset';

@Directive({
  selector: 'div[scAttachmentContent]',
  host: {
    'data-slot': 'attachment-content',
    '[class]': 'class()',
  },
})
export class ScAttachmentContent {
  private readonly styles = injectPreset().attachment;
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(this.styles.content, this.classInput()),
  );
}
