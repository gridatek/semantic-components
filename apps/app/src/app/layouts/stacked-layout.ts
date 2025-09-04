import { ChangeDetectionStrategy, Component, ViewEncapsulation, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Footer } from '../components/footer';
import { Header } from '../components/header';

@Component({
  selector: 'app-stacked-layout',
  imports: [RouterOutlet, Header, Footer],
  template: `
    <div class="flex min-h-screen flex-col max-w-(--breakpoint-2xl) mx-auto">
      <!-- Navigation -->
      <header
        class="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      >
        <app-header />
      </header>

      <main class="flex-1">
        <router-outlet />
      </main>

      <!-- Footer -->
      <footer class="py-6 md:px-8 md:py-0 border-t border-border/40">
        <app-footer />
      </footer>
    </div>
  `,
  host: {
    '[class]': 'class()',
  },
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class StackedLayout {
  protected readonly class = signal('min-h-screen bg-background text-foreground');
}
