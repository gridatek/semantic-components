import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ImageGalleryMasonryGridDemo } from './image-gallery-masonry-grid-demo';

@Component({
  selector: 'app-image-gallery-masonry-grid-demo-container',
  imports: [DemoContainer, ImageGalleryMasonryGridDemo],
  template: `
    <app-demo-container title="Image Gallery" [code]="code">
      <app-image-gallery-masonry-grid-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageGalleryMasonryGridDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import { ScMasonryGrid, ScMasonryItem } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-image-gallery-masonry-grid-demo',
  imports: [ScMasonryGrid, ScMasonryItem],
  template: \`
    <div scMasonryGrid [columns]="3" [gap]="12">
      @for (image of images(); track image.id) {
        <div scMasonryItem>
          <div class="group bg-muted relative overflow-hidden rounded-lg">
            <img
              [src]="image.url"
              [alt]="image.title"
              class="h-auto w-full object-cover"
              loading="lazy"
            />
            <div
              class="absolute inset-0 flex items-end bg-black/60 opacity-0 transition-opacity group-hover:opacity-100"
            >
              <div class="p-4 text-white">
                <p class="font-medium">{{ image.title }}</p>
                <p class="text-sm opacity-75">{{ image.category }}</p>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageGalleryMasonryGridDemo {
  readonly images = signal([
    {
      id: 1,
      url: 'https://picsum.photos/seed/m1/400/300',
      title: 'Mountain View',
      category: 'Nature',
    },
    {
      id: 2,
      url: 'https://picsum.photos/seed/m2/400/500',
      title: 'City Lights',
      category: 'Urban',
    },
    {
      id: 3,
      url: 'https://picsum.photos/seed/m3/400/350',
      title: 'Ocean Waves',
      category: 'Nature',
    },
    {
      id: 4,
      url: 'https://picsum.photos/seed/m4/400/450',
      title: 'Forest Path',
      category: 'Nature',
    },
    {
      id: 5,
      url: 'https://picsum.photos/seed/m5/400/280',
      title: 'Desert Sunset',
      category: 'Nature',
    },
    {
      id: 6,
      url: 'https://picsum.photos/seed/m6/400/400',
      title: 'Street Art',
      category: 'Urban',
    },
    {
      id: 7,
      url: 'https://picsum.photos/seed/m7/400/320',
      title: 'Lake Reflection',
      category: 'Nature',
    },
    {
      id: 8,
      url: 'https://picsum.photos/seed/m8/400/380',
      title: 'Architecture',
      category: 'Urban',
    },
    {
      id: 9,
      url: 'https://picsum.photos/seed/m9/400/420',
      title: 'Autumn Leaves',
      category: 'Nature',
    },
  ]);
}`;
}
