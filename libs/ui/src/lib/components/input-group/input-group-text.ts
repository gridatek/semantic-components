import { Directive, computed, input } from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';

/** Text (and its icons) in a group's addon, in the preset's look. */
@Directive({
  selector: 'span[scInputGroupText]',
  host: {
    '[class]': 'class()',
  },
})
export class ScInputGroupText {
  private readonly styles = injectPreset().inputGroupText;

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn(this.styles, this.classInput()));
}
