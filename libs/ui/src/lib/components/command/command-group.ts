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
    <sc-command-group-heading>{{ heading() }}</sc-command-group-heading>
    <ng-content />
  `,
  host: {
    '[class]': 'classes()',
  },
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScCommandGroup {
  class = input<string>('');

  classes = computed(() => cn('block overflow-hidden p-1 text-foreground px-2', this.class()));

  heading = input('');
}
