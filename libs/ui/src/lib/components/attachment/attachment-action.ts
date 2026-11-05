import { Directive, computed, input } from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn, ɵwarnIfUnnamed } from '../../utils';
import { type ScButtonVariants } from '../button/button';

/**
 * An action on an attachment (remove, download…), in its actions: the
 * preset's button, ghost and small. Write its icon and name it with the file
 * ("Remove report.pdf").
 */
@Directive({
  selector: 'button[scAttachmentAction]',
  host: {
    'data-slot': 'attachment-action',
    '[attr.type]': 'type()',
    '[class]': 'class()',
  },
})
export class ScAttachmentAction {
  private readonly buttonStyles = injectPreset().button;

  readonly classInput = input<string>('', { alias: 'class' });
  /** `button` by default, so it never submits a form round it. */
  readonly type = input<'button' | 'submit' | 'reset'>('button');
  readonly variant = input<ScButtonVariants['variant']>('ghost');
  readonly size = input<ScButtonVariants['size']>('icon-xs');

  constructor() {
    ɵwarnIfUnnamed('scAttachmentAction');
  }

  protected readonly class = computed(() =>
    cn(
      this.buttonStyles({ variant: this.variant(), size: this.size() }),
      this.classInput(),
    ),
  );
}
