import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';

/**
 * Text beside a group's buttons, in the style's look. On a `label`, it
 * names the group's input (`for`).
 */
@Directive({
  selector: 'div[scControlGroupText], label[scControlGroupText]',
  host: {
    '[class]': 'class()',
  },
})
export class ScControlGroupText {
  private readonly styles = injectStyle().controlGroupText;

  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() => cn(this.styles, this.classInput()));
}
