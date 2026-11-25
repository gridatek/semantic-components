import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';

@Directive({
  selector: '[scFieldGroup]',
  host: {
    'data-slot': 'field-group',
    '[class]': 'class()',
  },
})
export class ScFieldGroup {
  private readonly styles = injectStyle().field;
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() =>
    cn(this.styles.group, this.classInput()),
  );
}
