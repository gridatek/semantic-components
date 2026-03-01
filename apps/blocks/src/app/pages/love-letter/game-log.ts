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
    <div
      class="text-muted-foreground max-h-24 divide-y overflow-y-auto text-left text-xs lg:max-h-none"
    >
      @for (entry of reversedLog(); track $index) {
        <p class="py-1" [class.text-center]="entry.startsWith('---')">
          {{ entry }}
        </p>
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

  readonly log = input<string[]>([]);

  protected readonly reversedLog = computed(() => [...this.log()].reverse());
}
