import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
  output,
  signal,
} from '@angular/core';

import { cn } from '@semantic-components/utils';

@Component({
  selector: 'sc-command',
  imports: [],
  template: `
    <ng-content />
  `,
  host: {
    '[class]': 'classes()',
    '[attr.role]': '"combobox"',
    '[attr.aria-expanded]': 'true',
    '[attr.aria-haspopup]': '"listbox"',
    '(keydown)': 'onKeyDown($event)',
  },
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScCommand {
  class = input<string>('');

  classes = computed(() =>
    cn(
      'flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground',
      this.class(),
    ),
  );

  readonly loading = input<boolean>(false);
  readonly empty = input<boolean>(false);
  readonly query = signal<string>('');

  readonly commandSelect = output<string>();
  readonly queryChange = output<string>();

  onKeyDown(event: KeyboardEvent) {
    // Handle escape key
    if (event.key === 'Escape') {
      event.preventDefault();
      this.query.set('');
      this.queryChange.emit('');
    }
  }

  updateQuery(query: string) {
    this.query.set(query);
    this.queryChange.emit(query);
  }
}
