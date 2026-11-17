import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';
import { injectPreset } from '../../config/preset';

@Directive({
  selector: 'div[scAttachmentGroup]',
  host: {
    'data-slot': 'attachment-group',
    '[class]': 'class()',
  },
})
export class ScAttachmentGroup {
  private readonly styles = injectPreset().attachment;
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() =>
    cn(this.styles.group, this.classInput()),
  );
}
