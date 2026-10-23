import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ControlledLightboxDemo } from './controlled-lightbox-demo';

@Component({
  selector: 'app-controlled-lightbox-demo-container',
  imports: [DemoContainer, ControlledLightboxDemo],
  template: `
    <app-demo-container
      title="Controlled"
      [code]="code"
      demoUrl="/demos/lightbox/controlled-lightbox-demo"
    >
      <app-controlled-lightbox-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class ControlledLightboxDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScButton, ScLightbox, ScLightboxClose, ScLightboxDialog, ScLightboxImage, ScLightboxNext, ScLightboxPrevious, ScLightboxThumbnail, ScLightboxTrigger } from '@semantic-components/ui';
import {
  SiChevronLeftIcon,
  SiChevronRightIcon,
  SiXIcon,
} from '@semantic-icons/lucide-icons';

interface Photo {
  readonly name: string;
  readonly alt: string;
  readonly author: string;
}

/** Open and the index are two-way — here from outside; it stops at the ends (no loop). */
@Component({
  selector: 'app-controlled-lightbox-demo',
  imports: [
    ScLightbox,
    ScLightboxTrigger,
    ScLightboxDialog,
    ScLightboxImage,
    ScLightboxClose,
    ScLightboxPrevious,
    ScLightboxNext,
    ScLightboxThumbnail,
    ScButton,
    SiXIcon,
    SiChevronLeftIcon,
    SiChevronRightIcon,
  ],
  template: \`
    <div
      scLightbox
      #lightbox="scLightbox"
      [(open)]="open"
      [(index)]="index"
      [loop]="false"
      class="w-full space-y-3"
    >
      <div class="flex flex-wrap gap-2">
        <button scButton variant="outline" (click)="open.set(true)">
          Open at {{ photos[index()].alt }}
        </button>
        <button
          scButton
          variant="outline"
          (click)="index.set(photos.length - 1)"
        >
          Choose the last
        </button>
      </div>
      <div class="grid grid-cols-2 gap-2 sm:grid-cols-4">
        @for (photo of photos; track photo.name) {
          <a
            scLightboxTrigger
            [href]="'/images/gallery/' + photo.name + '.jpg'"
          >
            <img
              [src]="'/images/gallery/' + photo.name + '-thumb.jpg'"
              [alt]="photo.alt"
              width="400"
              height="267"
              class="aspect-[3/2] w-full object-cover"
            />
          </a>
        }
      </div>
      <dialog scLightboxDialog aria-label="Photo viewer, controlled">
        <div class="flex items-center gap-1 p-2">
          <p class="ms-2 text-sm tabular-nums" aria-live="polite">
            {{ lightbox.index() + 1 }} of {{ lightbox.items().length }}
          </p>
          <div class="ms-auto flex gap-1">
            <button scLightboxClose>
              <svg siXIcon></svg>
              <span class="sr-only">Close</span>
            </button>
          </div>
        </div>
        <div
          class="relative grid min-h-0 flex-1 place-items-center overflow-hidden px-14"
        >
          <img scLightboxImage [alt]="lightbox.current()?.alt ?? ''" />
          <button
            scLightboxPrevious
            class="absolute start-2 top-1/2 -translate-y-1/2"
          >
            <svg siChevronLeftIcon></svg>
            <span class="sr-only">Previous image</span>
          </button>
          <button
            scLightboxNext
            class="absolute end-2 top-1/2 -translate-y-1/2"
          >
            <svg siChevronRightIcon></svg>
            <span class="sr-only">Next image</span>
          </button>
        </div>
        @if (lightbox.current(); as current) {
          <p class="p-3 text-center text-sm">
            {{ current.alt }}
            <span class="text-white/60"
              >— {{ photos[lightbox.index()].author }}</span
            >
          </p>
        }
        <div class="flex justify-center gap-2 overflow-x-auto p-3">
          @for (item of lightbox.items(); track item.src; let i = $index) {
            <button [scLightboxThumbnail]="i">
              <img [src]="item.thumbnail" [alt]="item.alt" />
            </button>
          }
        </div>
      </dialog>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ControlledLightboxDemo {
  readonly photos: readonly Photo[] = [
    {
      name: 'forest',
      alt: 'A pine forest above the sea',
      author: 'Paul Jarvis',
    },
    {
      name: 'waterfall',
      alt: 'A waterfall in a rocky gorge',
      author: 'Paul Jarvis',
    },
    {
      name: 'gorge',
      alt: 'A river through a green forest',
      author: 'Jerry Adney',
    },
    {
      name: 'mountains',
      alt: 'Snowy mountains under clouds',
      author: 'Go Wild',
    },
    {
      name: 'coast',
      alt: 'Wild roses above a misty sea',
      author: 'Austin Neill',
    },
    {
      name: 'cafe',
      alt: 'A wooden table in a quiet café',
      author: 'Luke Chesser',
    },
    {
      name: 'summit',
      alt: 'A wooded summit under white clouds',
      author: 'Nicholas Swanson',
    },
    {
      name: 'shed',
      alt: 'A green bicycle against a wooden shed',
      author: 'Alexander Shustov',
    },
  ];
  readonly open = signal(false);
  readonly index = signal(0);
}`;
}
