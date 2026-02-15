import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '@semantic-components/ui';

@Component({
  selector: '[scAccordionItem]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    'data-slot': 'accordion-item',
    '[class]': 'class()',
  },
  template: `
    <ng-content />
  `,
})
export class ScAccordionItem {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly class = computed(() => cn('not-last:border-b', this.classInput()));
}
