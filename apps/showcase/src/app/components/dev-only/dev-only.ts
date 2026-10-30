import { Component, ViewEncapsulation } from '@angular/core';

/**
 * Marks what the showcase shows in dev mode only (`config.json`'s `devMode`):
 * a dashed box that says so, so its absence in production is no surprise.
 * The caller keeps the `@if (devMode())` — nothing is created in production.
 */
@Component({
  selector: 'app-dev-only',
  template: `
    <p class="text-muted-foreground text-xs font-medium">
      Dev mode only — not shown in production
    </p>
    <ng-content />
  `,
  host: {
    class: 'block space-y-3 rounded-lg border border-dashed p-4',
  },
  encapsulation: ViewEncapsulation.None,
})
export class DevOnly {}
