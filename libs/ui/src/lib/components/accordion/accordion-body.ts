import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';

@Component({
  selector: 'sc-accordion-body',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    'data-slot': 'accordion-body',
    '[class]': 'class()',
    'animate.enter': 'animate-accordion-down',
    'animate.leave': 'animate-accordion-up',
  },
  template: `
    <div class="pt-0 pb-2.5">
      <ng-content />
    </div>
  `,
})
export class ScAccordionBody {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly class = computed(() =>
    cn('block overflow-hidden', this.classInput()),
  );
}
