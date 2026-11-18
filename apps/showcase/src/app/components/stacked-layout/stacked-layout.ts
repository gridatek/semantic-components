import { Component, ViewEncapsulation, computed, input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { cn } from 'cn';
import { Footer } from '../footer/footer';
import Navbar from '../navbar/navbar';

/** The site's shell: the navbar stuck to the top, the page, the footer. */
@Component({
  selector: 'app-stacked-layout',
  imports: [RouterOutlet, Navbar, Footer],
  template: `
    <!-- Stuck to the top; the navbar itself is the page's header (banner). -->
    <div class="sticky top-0 z-50">
      <app-navbar />
    </div>
    <main class="flex-1">
      <router-outlet />
    </main>
    <app-footer />
  `,
  host: {
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class StackedLayout {
  readonly classInput = input<string>('', { alias: 'class' });
  private readonly class = computed(() =>
    cn('flex min-h-screen flex-col', this.classInput()),
  );
}
