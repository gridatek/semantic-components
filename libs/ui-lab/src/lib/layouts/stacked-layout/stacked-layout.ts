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
  selector: 'sc-stacked-layout',
  imports: [RouterOutlet],
  template: `
    <header class="sticky top-0 z-50">
      <ng-content select="[scNavbar]" />
    </header>

    <main class="flex-1">
      <router-outlet />
    </main>

    <ng-content select="[scFooter]" />
  `,
  host: {
    '[class]': 'class()',
  },
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScStackedLayout {
  readonly classInput = input<string>('', {
    alias: 'class',
  });

  protected readonly class = computed(() =>
    cn('min-h-screen flex flex-col', this.classInput()),
  );
}
