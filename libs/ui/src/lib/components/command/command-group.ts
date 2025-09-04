import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
} from '@angular/core';

import { cn } from '@semantic-components/utils';

import { ScCommandGroupHeading } from './command-group-heading';

@Component({
  selector: 'sc-command-group',
  imports: [ScCommandGroupHeading],
  template: `
    @if (heading()) {
      <sc-command-group-heading>{{ heading() }}</sc-command-group-heading>
    }
    <ng-content />
  `,
  host: {
    '[class]': 'classes()',
    '[attr.role]': '"group"',
    '[attr.aria-labelledby]': 'heading() ? "command-group-heading" : null',
    'data-slot': 'command-group',
  },
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScCommandGroup {
  class = input<string>('');

  classes = computed(() => cn('text-foreground overflow-hidden p-1', this.class()));

  heading = input('');
}
