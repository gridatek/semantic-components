import { Component, ViewEncapsulation } from '@angular/core';
import { ScMasonryGrid, ScMasonryGridItem } from '@semantic-components/ui';

/** Photos of different heights, each into the shortest column — as many columns of at least 200 px as fit. In a list: the order is the source's, row by row. */
@Component({
  selector: 'app-photos-masonry-grid-demo',
  imports: [ScMasonryGrid, ScMasonryGridItem],
  template: `
    <ul scMasonryGrid [columnWidth]="200" [gap]="12" class="w-full">
      @for (photo of photos; track photo.name) {
        <li scMasonryGridItem>
          <img
            [src]="'/images/gallery/' + photo.name + '-thumb.jpg'"
            [alt]="photo.alt"
            width="400"
            height="267"
            class="w-full rounded-md object-cover"
            [class]="photo.shape"
          />
        </li>
      }
    </ul>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class PhotosMasonryGridDemo {
  readonly photos = [
    {
      name: 'forest',
      alt: 'A pine forest above the sea',
      shape: 'aspect-[3/4]',
    },
    {
      name: 'waterfall',
      alt: 'A waterfall in a rocky gorge',
      shape: 'aspect-[3/2]',
    },
    {
      name: 'gorge',
      alt: 'A river through a green forest',
      shape: 'aspect-square',
    },
    {
      name: 'mountains',
      alt: 'Snowy mountains under clouds',
      shape: 'aspect-[3/2]',
    },
    {
      name: 'coast',
      alt: 'Wild roses above a misty sea',
      shape: 'aspect-[2/3]',
    },
    {
      name: 'cafe',
      alt: 'A wooden table in a quiet café',
      shape: 'aspect-[4/3]',
    },
    {
      name: 'summit',
      alt: 'A wooded summit under white clouds',
      shape: 'aspect-[3/4]',
    },
    {
      name: 'shed',
      alt: 'A green bicycle against a wooden shed',
      shape: 'aspect-[3/2]',
    },
  ];
}
