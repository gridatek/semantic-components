import { AccordionTrigger } from '@angular/aria/accordion';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '@semantic-components/ui';

@Component({
  selector: '[scCollapsibleTrigger]',
  exportAs: 'scCollapsibleTrigger',
  hostDirectives: [
    {
      directive: AccordionTrigger,
      inputs: ['panelId', 'disabled', 'expanded'],
      outputs: ['expandedChange'],
    },
  ],
  template: `
    <ng-content />
  `,
  host: {
    'data-slot': 'collapsible-trigger',
    type: 'button',
    '[attr.data-state]': 'trigger.expanded() ? "open" : "closed"',
    '[attr.disabled]': 'trigger.disabled() || null',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScCollapsibleTrigger {
  readonly trigger = inject(AccordionTrigger);

  /**
   * Whether the collapsible is expanded
   */
  readonly expanded = this.trigger.expanded;

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('[&_svg]:pointer-events-none', this.classInput()),
  );
}
