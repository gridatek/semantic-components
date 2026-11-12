import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';
import { injectPreset } from '../../config/preset';

/**
 * Text beside a group's buttons, in the preset's look. On a `label`, it
 * names the group's input (`for`).
 */
@Directive({
  selector: 'div[scControlGroupText], label[scControlGroupText]',
  host: {
    '[class]': 'class()',
  },
})
export class ScControlGroupText {
  private readonly styles = injectPreset().controlGroupText;

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn(this.styles, this.classInput()));
}
