import { Component, ViewEncapsulation } from '@angular/core';
import { injectPreset } from '@semantic-components/ui';
import { cn } from 'cn';

/**
 * Marks what the showcase shows in dev mode only (`config.json`'s `devMode`):
 * a dashed box that says so, so its absence in production is no surprise.
 * The caller keeps the `@if (devMode())` — nothing is created in production.
 * Its corners are the preset's frame's (scFrame's); the dashed border stays
 * its own — a solid frame would read as part of the demo.
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
    '[class]': 'class',
  },
  encapsulation: ViewEncapsulation.None,
})
export class DevOnly {
  protected readonly class = cn(
    'block space-y-3 border border-dashed p-4',
    // The frame's corners only: its ring and shadow are a solid edge.
    injectPreset()
      .frame.split(/\s+/)
      .filter((c) => c.startsWith('rounded')),
  );
}
