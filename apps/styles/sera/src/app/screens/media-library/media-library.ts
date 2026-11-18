import {
  Component,
  ViewEncapsulation,
  computed,
  inject,
  model,
} from '@angular/core';
import { ScSeparator } from '@semantic-components/ui';
import { AssetDetails } from './asset-details';
import { AssetGrid } from './asset-grid';
import { MediaHeader } from './media-header';
import { MediaStore } from './media-store';

/** Media Library (shadcn's sera/media-library): the assets, and the selected one's details. */
@Component({
  selector: 'app-media-library',
  imports: [AssetDetails, AssetGrid, MediaHeader, ScSeparator],
  template: `
    <div
      class="bg-muted ring-foreground/5 w-full flex-1 pt-4 font-sans ring-1 [--gap:--spacing(4)] sm:pt-0 md:[--gap:--spacing(6)] xl:[--gap:--spacing(8)] 2xl:py-8"
    >
      <app-media-header [(view)]="view" />
      <div scSeparator class="hidden sm:block"></div>
      <div
        class="grid w-full grid-cols-1 items-start gap-(--gap) px-(--page-gutter) py-(--gap) xl:grid-cols-[minmax(0,1fr)_320px]"
      >
        <app-asset-grid />
        @if (selected(); as asset) {
          <app-asset-details [asset]="asset" />
        }
      </div>
    </div>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
})
export class MediaLibrary {
  private readonly store = inject(MediaStore);

  /** Grid or table, two-way: the header's switch. */
  readonly view = model<'grid' | 'table' | null>(null);

  /** The selected asset, or the first when it was deleted. */
  private readonly selected = computed(
    () =>
      this.store.get(this.store.selectedId()) ?? this.store.assets()[0] ?? null,
  );
}
