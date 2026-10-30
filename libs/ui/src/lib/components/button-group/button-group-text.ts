import { Directive, computed, input } from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';

/**
 * Text beside a group's buttons, in the preset's look. On a `label`, it
 * names the group's input (`for`).
 */
@Directive({
  selector: 'div[scButtonGroupText], label[scButtonGroupText]',
  host: {
    '[class]': 'class()',
  },
})
export class ScButtonGroupText {
  private readonly styles = injectPreset().buttonGroupText;

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn(this.styles, this.classInput()));
}
