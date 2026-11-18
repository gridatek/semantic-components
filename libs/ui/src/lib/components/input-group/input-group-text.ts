import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';

/** Text (and its icons) in a group's addon, in the style's look. */
@Directive({
  selector: 'span[scInputGroupText]',
  host: {
    '[class]': 'class()',
  },
})
export class ScInputGroupText {
  private readonly styles = injectStyle().inputGroupText;

  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() => cn(this.styles, this.classInput()));
}
