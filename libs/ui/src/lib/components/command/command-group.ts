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
    '[class]': 'class()',
    '[attr.role]': '"group"',
    '[attr.aria-labelledby]': 'heading() ? "command-group-heading" : null',
    'data-slot': 'command-group',
  },
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScCommandGroup {
  readonly classInput = input<string>('', {
    alias: 'class',
  });

  protected readonly class = computed(() =>
    cn('text-foreground overflow-hidden p-1', this.classInput()),
  );

  heading = input('');
}
