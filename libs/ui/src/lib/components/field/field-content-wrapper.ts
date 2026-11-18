import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';

@Directive({
  selector: '[scFieldContentWrapper]',
  host: {
    'data-slot': 'field-content-wrapper',
    '[class]': 'class()',
  },
})
export class ScFieldContentWrapper {
  private readonly styles = injectStyle().field;
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() =>
    cn(this.styles.contentWrapper, this.classInput()),
  );
}
