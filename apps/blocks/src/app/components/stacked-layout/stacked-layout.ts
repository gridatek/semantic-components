import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { cn } from '@semantic-components/ui';

@Component({
  selector: 'app-stacked-layout',
  imports: [RouterOutlet],
  template: `
    <header class="sticky top-0 z-50">
      <ng-content select="[slot=navbar]" />
    </header>

    <main class="flex-1">
      <router-outlet />
    </main>

    <ng-content select="[slot=footer]" />
  `,
  host: {
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StackedLayout {
  readonly classInput = input<string>('', { alias: 'class' });
  protected readonly class = computed(() =>
    cn('min-h-screen flex flex-col block', this.classInput()),
  );
}
