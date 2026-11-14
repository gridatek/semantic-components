import { Component, ViewEncapsulation, model } from '@angular/core';
import { ScSeparator } from '@semantic-components/ui';
import { MediaHeader } from '../media-library/media-header';
import { AssetTable } from './asset-table';
import { FilterLibrary } from './filter-library';

/**
 * shadcn's Sera screen "Media Library Table" (sera/media-library-table): the
 * assets as a table, and the library's filters. Its header is Media
 * Library's, the same in shadcn's code.
 */
@Component({
  selector: 'app-media-library-table',
  imports: [AssetTable, FilterLibrary, MediaHeader, ScSeparator],
  template: `
    <div
      class="bg-muted ring-foreground/5 w-full flex-1 pt-4 font-sans ring-1 [--gap:--spacing(4)] sm:pt-0 md:[--gap:--spacing(6)] xl:[--gap:--spacing(8)] 2xl:py-8"
    >
      <app-media-header [(view)]="view" />
      <div scSeparator class="hidden sm:block"></div>
      <div
        class="grid w-full grid-cols-1 items-start gap-(--gap) px-(--page-gutter) py-(--gap) xl:grid-cols-[minmax(0,1fr)_320px]"
      >
        <app-asset-table />
        <app-filter-library />
      </div>
    </div>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
})
export class MediaLibraryTable {
  /** Grid or table, two-way: the header's switch. Left out, none (shadcn's). */
  readonly view = model<'grid' | 'table' | null>(null);
}
