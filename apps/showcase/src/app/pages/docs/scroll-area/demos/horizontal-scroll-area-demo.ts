import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScScrollArea } from '@semantic-components/ui';

@Component({
  selector: 'app-horizontal-scroll-area-demo',
  imports: [ScScrollArea],
  template: `
    <div scScrollArea class="w-96 rounded-md border whitespace-nowrap">
      <div class="flex w-max space-x-4 p-4">
        @for (artwork of artworks; track artwork.artist) {
          <figure class="shrink-0">
            <div class="overflow-hidden rounded-md">
              <div
                class="bg-muted text-muted-foreground flex h-[150px] w-[150px] items-center justify-center text-xs"
              >
                {{ artwork.art }}
              </div>
            </div>
            <figcaption class="text-muted-foreground pt-2 text-xs">
              Photo by
              <span class="text-foreground font-semibold">
                {{ artwork.artist }}
              </span>
            </figcaption>
          </figure>
        }
      </div>
    </div>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HorizontalScrollAreaDemo {
  readonly artworks = [
    { art: 'Artwork 1', artist: 'Ornella Binni' },
    { art: 'Artwork 2', artist: 'Tom Byrom' },
    { art: 'Artwork 3', artist: 'Vladimir Malyavko' },
    { art: 'Artwork 4', artist: 'Double Brain' },
    { art: 'Artwork 5', artist: 'Eugene Golovesov' },
    { art: 'Artwork 6', artist: 'Rezli' },
    { art: 'Artwork 7', artist: 'Claudio Schwarz' },
  ];
}
