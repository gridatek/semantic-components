import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';

/** The box around the input and the toggle: one border, one focus ring. */
@Directive({
  selector: 'div[scPasswordGroup]',
  host: {
    'data-slot': 'input-group',
    '[class]': 'class()',
  },
})
export class ScPasswordGroup {
  private readonly groupStyles = injectStyle().inputGroup;
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() =>
    cn(this.groupStyles, 'pe-1', this.classInput()),
  );
}
