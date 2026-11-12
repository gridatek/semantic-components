import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';
import { injectPreset } from '../../config/preset';

@Directive({
  selector: 'div[scAttachmentActions]',
  host: {
    'data-slot': 'attachment-actions',
    '[class]': 'class()',
  },
})
export class ScAttachmentActions {
  private readonly styles = injectPreset().attachment;
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(this.styles.actions, this.classInput()),
  );
}
