import { AccordionContent, AccordionPanel } from '@angular/aria/accordion';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';

@Component({
  selector: 'div[sc-accordion-panel]',
  imports: [AccordionContent],
  hostDirectives: [
    {
      directive: AccordionPanel,
      inputs: ['panelId'],
    },
  ],
  template: `
    <ng-template ngAccordionContent>
      <div
        class="text-sm overflow-hidden"
        animate.enter="animate-accordion-down"
        animate.leave="animate-accordion-up"
      >
        <ng-content />
      </div>
    </ng-template>
  `,
  host: {
    'data-slot': 'accordion-panel',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScAccordionPanel {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn('', this.classInput()));
}
