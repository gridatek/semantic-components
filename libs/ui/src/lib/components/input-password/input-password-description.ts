import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
} from '@angular/core';

import { cn } from '@semantic-components/utils';

@Component({
  selector: 'p[sc-input-password-description]',
  imports: [],
  template: `
    @if (showHelp()) {
      <span class="text-muted-foreground">Password requirements:</span>
    }
  `,
  host: {
    '[id]': 'id()',
    '[class]': 'class()',
    '[attr.aria-live]': '"polite"',
    '[attr.aria-atomic]': '"true"',
  },
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScInputPasswordDescription {
  readonly id = input<string>('password-description');
  readonly showHelp = input<boolean>(true);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn('mb-2 text-sm font-medium', this.classInput()));
}
