import { Component, ViewEncapsulation, computed, input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { cn } from '../../utils/cn/cn';

@Component({
  selector: 'div[scStackedLayout]',
  imports: [RouterOutlet],
  template: `
    <!-- Stuck to the top; the navbar itself is the page's header (banner). -->
    <div class="sticky top-0 z-50">
      <ng-content select="[scNavbar]" />
    </div>

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
})
export class ScStackedLayout {
  readonly classInput = input<string>('', {
    alias: 'class',
  });

  protected readonly class = computed(() =>
    cn('min-h-screen flex flex-col', this.classInput()),
  );
}
