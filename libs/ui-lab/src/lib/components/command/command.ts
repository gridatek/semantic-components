import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';

@Component({
  selector: 'div[sc-command]',
  template: `
    <ng-content />
  `,
  host: {
    'data-slot': 'command',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScCommand {
  readonly classInput = input<string>('', { alias: 'class' });

  /** Current search/filter value */
  readonly value = model<string>('');

  protected readonly class = computed(() =>
    cn(
      'flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground',
      this.classInput(),
    ),
  );
}
