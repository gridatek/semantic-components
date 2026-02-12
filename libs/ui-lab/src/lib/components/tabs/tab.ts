import { Tab } from '@angular/aria/tabs';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';

@Component({
  selector: 'button[sc-tab]',
  hostDirectives: [
    {
      directive: Tab,
      inputs: ['value', 'disabled'],
    },
  ],
  template: `
    <ng-content />
  `,
  host: {
    'data-slot': 'tab',
    '[attr.data-state]': 'tab.selected() ? "active" : "inactive"',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScTab {
  protected readonly tab = inject(Tab);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      'disabled:pointer-events-none disabled:opacity-50',
      'data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow',
      this.classInput(),
    ),
  );
}
