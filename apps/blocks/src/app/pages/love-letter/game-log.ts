import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';

import { cn } from '@semantic-components/ui';

@Component({
  selector: 'app-game-log',
  template: `
    <p class="mb-2 text-left font-semibold">{{ message() }}</p>
    <div
      class="text-muted-foreground max-h-24 space-y-1 overflow-y-auto text-left text-xs"
    >
      @for (entry of reversedLog(); track $index) {
        <p>{{ entry }}</p>
      }
    </div>
  `,
  host: {
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameLog {
  readonly classInput = input<string>('', { alias: 'class' });
  protected readonly class = computed(() =>
    cn('block w-full text-left', this.classInput()),
  );

  readonly message = input('');
  readonly log = input<string[]>([]);

  protected readonly reversedLog = computed(() => [...this.log()].reverse());
}
