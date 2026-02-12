import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScScrollArea, ScScrollBar } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-horizontal-scroll-area-demo',
  imports: [ScScrollArea, ScScrollBar],
  template: `
    <div sc-scroll-area class="w-96 whitespace-nowrap rounded-md border">
      <div class="flex w-max space-x-4 p-4">
        @for (artwork of artworks; track artwork.artist) {
          <figure class="shrink-0">
            <div class="overflow-hidden rounded-md">
              <div
                class="h-[150px] w-[150px] bg-muted flex items-center justify-center text-muted-foreground text-xs"
              >
                {{ artwork.art }}
              </div>
            </div>
            <figcaption class="pt-2 text-xs text-muted-foreground">
              Photo by
              <span class="font-semibold text-foreground">
                {{ artwork.artist }}
              </span>
            </figcaption>
          </figure>
        }
      </div>
      <div sc-scroll-bar orientation="horizontal"></div>
    </div>
  `,
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
