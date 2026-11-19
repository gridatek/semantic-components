import {
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { cn } from 'cn';
import { filter, map } from 'rxjs';
import { CommandPalette } from './components/command-palette/command-palette';
import { NavigationProgress } from './components/navigation-progress/navigation-progress';
import { Toaster } from './components/toaster/toaster';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommandPalette, NavigationProgress, Toaster],
  template: `
    <!-- A slow navigation: a thin bar at the top while it runs. -->
    <app-navigation-progress />
    <router-outlet />
    <app-command-palette />
    <app-toaster />
  `,
  host: {
    '[class]': 'class()',
  },
  styles: ``,
  encapsulation: ViewEncapsulation.None,
})
export class App {
  private readonly router = inject(Router);

  readonly classInput = input<string>('', {
    alias: 'class',
  });

  /**
   * A demo on its own route (`/demos/…`): a page's side gutter, as in an app —
   * its content not against the screen's edges (a phone's). Not for a
   * full-page demo (`data.fullPage`: a navbar, a sidebar, a layout), framed
   * at the docs at its own width. The route, so the server's render too.
   */
  private readonly demoGutter = toSignal(
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => {
        let route = this.router.routerState.snapshot.root;
        while (route.firstChild) route = route.firstChild;
        return this.router.url.startsWith('/demos/') && !route.data['fullPage'];
      }),
    ),
    { initialValue: false },
  );

  private readonly class = computed(() =>
    cn('block', this.demoGutter() && 'px-4', this.classInput()),
  );
}
