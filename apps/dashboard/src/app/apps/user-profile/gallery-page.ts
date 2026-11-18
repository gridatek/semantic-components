import { NgOptimizedImage } from '@angular/common';
import { Component, ViewEncapsulation, computed, signal } from '@angular/core';
import {
  ScButton,
  ScDialog,
  ScDialogClose,
  ScDialogDescription,
  ScDialogHeader,
  ScDialogPortal,
  ScDialogProvider,
  ScDialogTitle,
  ScToggleGroup,
  ScToggleGroupItem,
} from '@semantic-components/ui';
import {
  SiChevronLeftIcon,
  SiChevronRightIcon,
  SiXIcon,
} from '@semantic-icons/lucide-icons';
import { label } from '../../shared/labels';
import { ProfileHeader } from './profile-header';

type Album = 'All' | 'Nature' | 'Work' | 'Travel';

interface Photo {
  readonly src: string;
  readonly title: string;
  readonly album: Exclude<Album, 'All'>;
  readonly date: string;
}

const PHOTOS: readonly Photo[] = [
  {
    src: 'images/image-ai/masonry-1.jpg',
    title: $localize`:@@userProfile.gallery.morningWalk:Morning walk`,
    album: 'Nature',
    date: 'Apr 26, 2026',
  },
  {
    src: 'images/image-ai/leptop1.jpg',
    title: $localize`:@@userProfile.gallery.deskEarly:Desk, early`,
    album: 'Work',
    date: 'Apr 24, 2026',
  },
  {
    src: 'images/image-ai/masonry-2.jpg',
    title: $localize`:@@userProfile.gallery.springGarden:Spring garden`,
    album: 'Nature',
    date: 'Apr 21, 2026',
  },
  {
    src: 'images/image-ai/masonry-3.jpg',
    title: $localize`:@@userProfile.gallery.harbour:Harbour`,
    album: 'Travel',
    date: 'Apr 18, 2026',
  },
  {
    src: 'images/image-ai/leptop3.jpg',
    title: $localize`:@@userProfile.gallery.studio:Studio`,
    album: 'Work',
    date: 'Apr 15, 2026',
  },
  {
    src: 'images/image-ai/masonry-4.jpg',
    title: $localize`:@@userProfile.gallery.oldTown:Old town`,
    album: 'Travel',
    date: 'Apr 12, 2026',
  },
  {
    src: 'images/image-ai/masonry-5.jpg',
    title: $localize`:@@userProfile.gallery.field:Field`,
    album: 'Nature',
    date: 'Apr 9, 2026',
  },
  {
    src: 'images/image-ai/masonry-6.jpg',
    title: $localize`:@@userProfile.gallery.coastRoad:Coast road`,
    album: 'Travel',
    date: 'Apr 5, 2026',
  },
  {
    src: 'images/image-ai/leptop4.jpg',
    title: $localize`:@@userProfile.gallery.notes:Notes`,
    album: 'Work',
    date: 'Apr 2, 2026',
  },
  {
    src: 'images/image-ai/masonry-7.jpg',
    title: $localize`:@@userProfile.gallery.blossom:Blossom`,
    album: 'Nature',
    date: 'Mar 30, 2026',
  },
  {
    src: 'images/image-ai/masonry-8.jpg',
    title: $localize`:@@userProfile.gallery.station:Station`,
    album: 'Travel',
    date: 'Mar 27, 2026',
  },
  {
    src: 'images/image-ai/masonry-9.jpg',
    title: $localize`:@@userProfile.gallery.lake:Lake`,
    album: 'Nature',
    date: 'Mar 22, 2026',
  },
];

/** Gallery (Pro User Profile): albums, the photos, one seen large. */
@Component({
  selector: 'app-gallery-page',
  imports: [
    NgOptimizedImage,
    ScButton,
    ScDialog,
    ScDialogClose,
    ScDialogDescription,
    ScDialogHeader,
    ScDialogPortal,
    ScDialogProvider,
    ScDialogTitle,
    ScToggleGroup,
    ScToggleGroupItem,
    SiChevronLeftIcon,
    SiChevronRightIcon,
    SiXIcon,
    ProfileHeader,
  ],
  template: `
    <app-profile-header
      i18n-title="@@userProfile.gallery.gallery"
      title="Gallery"
    />

    <div class="flex flex-wrap items-center justify-between gap-3">
      <h2 i18n="@@userProfile.gallery.photos" class="text-lg font-semibold">
        Photos
        <span class="text-muted-foreground font-normal">{{
          shown().length
        }}</span>
      </h2>
      <div
        i18n-aria-label="@@userProfile.gallery.album"
        scToggleGroup
        variant="outline"
        size="sm"
        aria-label="Album"
        [value]="[album()]"
        (valueChange)="chooseAlbum($event)"
      >
        @for (a of albums; track a) {
          <button scToggleGroupItem [value]="a">{{ labelOf(a) }}</button>
        }
      </div>
    </div>

    <ul class="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">
      @for (photo of shown(); track photo.src; let i = $index) {
        <li>
          <button
            type="button"
            class="focus-visible:ring-ring/50 group relative block aspect-square w-full overflow-hidden rounded-lg outline-none focus-visible:ring-3"
            (click)="view(i)"
          >
            <img
              [ngSrc]="photo.src"
              fill
              sizes="(min-width: 1280px) 20vw, (min-width: 768px) 30vw, 45vw"
              alt=""
              class="object-cover transition-transform group-hover:scale-105"
            />
            <span
              class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 text-start text-sm font-medium text-white"
            >
              {{ photo.title }}
            </span>
          </button>
        </li>
      }
    </ul>

    <div scDialogProvider [(open)]="viewing">
      <ng-template scDialogPortal>
        <div scDialog class="sm:max-w-3xl">
          <button scDialogClose>
            <svg siXIcon></svg>
            <span i18n="@@userProfile.gallery.close" class="sr-only"
              >Close</span
            >
          </button>
          @if (current(); as photo) {
            <div scDialogHeader>
              <h2 scDialogTitle>{{ photo.title }}</h2>
              <p scDialogDescription>
                {{ labelOf(photo.album) }} · {{ photo.date }}
              </p>
            </div>
            <div class="relative aspect-[4/3] overflow-hidden rounded-lg">
              <img
                [ngSrc]="photo.src"
                fill
                sizes="(min-width: 768px) 48rem, 90vw"
                alt=""
                class="object-contain"
              />
            </div>
            <div class="flex items-center justify-between">
              <button scButton variant="outline" size="icon" (click)="step(-1)">
                <svg siChevronLeftIcon class="rtl:-scale-x-100"></svg>
                <span i18n="@@userProfile.gallery.previousPhoto" class="sr-only"
                  >Previous photo</span
                >
              </button>
              <span
                i18n="@@userProfile.gallery.of"
                class="text-muted-foreground text-sm tabular-nums"
              >
                {{ index() + 1 }} of {{ shown().length }}
              </span>
              <button scButton variant="outline" size="icon" (click)="step(1)">
                <svg siChevronRightIcon class="rtl:-scale-x-100"></svg>
                <span i18n="@@userProfile.gallery.nextPhoto" class="sr-only"
                  >Next photo</span
                >
              </button>
            </div>
          }
        </div>
      </ng-template>
    </div>
  `,
  host: { class: 'flex flex-col gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class GalleryPage {
  private readonly labelOf = label;
  private readonly albums: readonly Album[] = [
    'All',
    'Nature',
    'Work',
    'Travel',
  ];
  private readonly album = signal<Album>('All');
  private readonly shown = computed(() =>
    this.album() === 'All'
      ? PHOTOS
      : PHOTOS.filter((p) => p.album === this.album()),
  );
  private readonly viewing = signal(false);
  private readonly index = signal(0);
  private readonly current = computed(() => this.shown()[this.index()] ?? null);

  private chooseAlbum(value: readonly string[]): void {
    const next = this.albums.find((a) => a === value[0]);
    this.album.set(next ?? 'All');
  }

  private view(index: number): void {
    this.index.set(index);
    this.viewing.set(true);
  }

  private step(by: number): void {
    const count = this.shown().length;
    this.index.update((i) => (i + by + count) % count);
  }
}
