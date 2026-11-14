import { Component, ViewEncapsulation, computed, signal } from '@angular/core';
import { ScSeparator } from '@semantic-components/ui';
import { AssetDetails } from './asset-details';
import { AssetGrid } from './asset-grid';
import { ASSETS } from './media-data';
import { MediaHeader } from './media-header';

/** shadcn's Sera screen "Media Library" (sera/media-library): the assets, and the selected one's details. */
@Component({
  selector: 'app-media-library',
  imports: [AssetDetails, AssetGrid, MediaHeader, ScSeparator],
  template: `
    <div
      class="bg-muted ring-foreground/5 w-full flex-1 pt-4 font-sans ring-1 [--gap:--spacing(4)] sm:pt-0 md:[--gap:--spacing(6)] xl:[--gap:--spacing(8)] 2xl:py-8"
    >
      <app-media-header />
      <div scSeparator class="hidden sm:block"></div>
      <div
        class="grid w-full grid-cols-1 items-start gap-(--gap) p-(--gap) xl:grid-cols-[minmax(0,1fr)_320px]"
      >
        <app-asset-grid [(selected)]="selectedId" />
        <app-asset-details [asset]="selectedAsset()" />
      </div>
    </div>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
})
export class MediaLibrary {
  protected readonly selectedId = signal(ASSETS[0].id);
  protected readonly selectedAsset = computed(
    () => ASSETS.find((asset) => asset.id === this.selectedId()) ?? ASSETS[0],
  );
}
