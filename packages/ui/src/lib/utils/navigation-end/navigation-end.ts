import { inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationSkipped,
  Router,
} from '@angular/router';
import { filter } from 'rxjs';

/**
 * Runs `fn` each time a navigation is over — done, cancelled, failed or
 * skipped (the same page) — whatever started it: a popup with links closes,
 * never left open on a page it no longer matches (the Back button, a link
 * elsewhere). Nothing without a Router. In an injection context; stops with
 * it. See docs/principles/component-design-principles.md, "A Link Closes Its Popup at
 * Once".
 */
export function onNavigationEnd(fn: () => void): void {
  inject(Router, { optional: true })
    ?.events.pipe(
      filter(
        (event) =>
          event instanceof NavigationEnd ||
          event instanceof NavigationCancel ||
          event instanceof NavigationError ||
          event instanceof NavigationSkipped,
      ),
      takeUntilDestroyed(),
    )
    .subscribe(() => fn());
}
