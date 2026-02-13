import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { cn } from '@semantic-components/ui';

@Component({
  selector: 'app-stacked-layout',
  imports: [RouterOutlet],
  template: `
    <header data-slot="stacked-layout-header" class="sticky top-0 z-50">
      <ng-content select="[slot=navbar]" />
    </header>

    <main data-slot="stacked-layout-content" class="flex-1">
      <router-outlet />
    </main>

    <ng-content select="[slot=footer]" />
  `,
  host: {
    'data-slot': 'stacked-layout',
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
