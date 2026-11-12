import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';
import { injectPreset } from '../../config/preset';

@Directive({
  selector: 'div[scAttachmentTitle]',
  host: {
    'data-slot': 'attachment-title',
    '[class]': 'class()',
  },
})
export class ScAttachmentTitle {
  private readonly styles = injectPreset().attachment;
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(this.styles.title, this.classInput()),
  );
}
