import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';

@Directive({
  selector: '[scLabelText]',
  host: {
    'data-slot': 'label-text',
    '[class]': 'class()',
  },
})
export class ScLabelText {
  private readonly styles = injectStyle().field;
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() =>
    cn(this.styles.title, this.classInput()),
  );
}
