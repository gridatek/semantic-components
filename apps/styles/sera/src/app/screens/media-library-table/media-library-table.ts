import {
  Component,
  ViewEncapsulation,
  inject,
  model,
  signal,
  viewChild,
} from '@angular/core';
import { ScSeparator } from '@semantic-components/ui';
import { type Asset, type AssetFilters } from '../media-library/media-data';
import { MediaHeader } from '../media-library/media-header';
import { MediaStore } from '../media-library/media-store';
import { AssetTable } from './asset-table';
import { FilterLibrary } from './filter-library';

/**
 * Media Library as a table (shadcn's sera/media-library-table): the assets,
 * and the library's filters beside. Its header is the grid's.
 */
@Component({
  selector: 'app-media-library-table',
  imports: [AssetTable, FilterLibrary, MediaHeader, ScSeparator],
  template: `
    <div
      class="bg-muted ring-foreground/5 w-full flex-1 pt-4 font-sans ring-1 [--gap:--spacing(4)] sm:pt-0 md:[--gap:--spacing(6)] xl:[--gap:--spacing(8)] 2xl:py-8"
    >
      <app-media-header [(view)]="view" (filters)="filterPanel().focus()" />
      <div scSeparator class="hidden sm:block"></div>
      <div
        class="grid w-full grid-cols-1 items-start gap-(--gap) px-(--page-gutter) py-(--gap) xl:grid-cols-[minmax(0,1fr)_320px]"
      >
        <app-asset-table [filters]="filters()" (preview)="preview($event)" />
        <app-filter-library (applied)="filters.set($event)" />
      </div>
    </div>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
})
export class MediaLibraryTable {
  private readonly store = inject(MediaStore);

  /** Grid or table, two-way: the header's switch. */
  readonly view = model<'grid' | 'table' | null>(null);

  private readonly filters = signal<AssetFilters | null>(null);
  private readonly filterPanel = viewChild.required(FilterLibrary);

  /** A row's Preview: the asset, selected, in the grid beside its details. */
  private preview(asset: Asset): void {
    this.store.selectedId.set(asset.id);
    this.view.set('grid');
  }
}
