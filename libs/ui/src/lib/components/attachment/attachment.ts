import { Directive, computed, input } from '@angular/core';
import type {
  ScAttachmentOrientation,
  ScAttachmentSize,
} from '@semantic-components/presets';
import { cn } from 'cn';
import { injectPreset } from '../../config/preset';

export type ScAttachmentState =
  'idle' | 'uploading' | 'processing' | 'error' | 'done';

@Directive({
  selector: 'div[scAttachment]',
  host: {
    'data-slot': 'attachment',
    '[attr.data-state]': 'state()',
    '[attr.data-size]': 'size()',
    '[attr.data-orientation]': 'orientation()',
    '[class]': 'class()',
  },
})
export class ScAttachment {
  private readonly styles = injectPreset().attachment;
  readonly classInput = input<string>('', { alias: 'class' });
  readonly state = input<ScAttachmentState>('done');
  readonly size = input<ScAttachmentSize>('default');
  readonly orientation = input<ScAttachmentOrientation>('horizontal');

  protected readonly class = computed(() =>
    cn(
      this.styles.root({
        size: this.size(),
        orientation: this.orientation(),
      }),
      this.classInput(),
    ),
  );
}
