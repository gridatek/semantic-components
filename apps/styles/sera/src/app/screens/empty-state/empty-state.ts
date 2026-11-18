import { Component, ViewEncapsulation } from '@angular/core';
import { ScSeparator } from '@semantic-components/ui';
import { EmptyDirectory } from './empty-directory';
import { EmptyHeader } from './empty-header';

/** shadcn's Sera screen "Empty State" (sera/empty-state). */
@Component({
  selector: 'app-empty-state',
  imports: [EmptyDirectory, EmptyHeader, ScSeparator],
  template: `
    <div
      class="bg-muted ring-foreground/5 w-full flex-1 pt-4 font-sans ring-1 [--gap:--spacing(4)] sm:pt-0 md:[--gap:--spacing(6)] xl:[--gap:--spacing(8)] 2xl:py-8"
    >
      <app-empty-header />
      <div scSeparator class="hidden sm:block"></div>
      <div class="w-full px-(--page-gutter) py-(--gap)">
        <app-empty-directory />
      </div>
    </div>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
})
export class EmptyState {}
