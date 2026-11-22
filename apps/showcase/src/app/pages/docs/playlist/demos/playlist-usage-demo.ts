import { NgOptimizedImage } from '@angular/common';
import {
  Component,
  DestroyRef,
  ViewEncapsulation,
  afterNextRender,
  computed,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import {
  ScButton,
  ScItem,
  ScItemBody,
  ScItemDescription,
  ScItemGroup,
  ScItemMedia,
  ScItemTitle,
  ScMediaPlayer,
  ScMediaPlayerMedia,
  ScMediaPlayerMute,
  ScMediaPlayerPlay,
  ScMediaPlayerTime,
  ScMediaPlayerVolume,
  ScMediaPlayerWaveform,
  ScToggle,
} from '@semantic-components/ui';
import {
  SiPauseIcon,
  SiPlayIcon,
  SiRepeat1Icon,
  SiRepeatIcon,
  SiShuffleIcon,
  SiSkipBackIcon,
  SiSkipForwardIcon,
  SiVolume2Icon,
  SiVolumeXIcon,
} from '@semantic-icons/lucide-icons';

interface Song {
  readonly src: string;
  readonly title: string;
  readonly artist: string;
  readonly cover: string;
}

type Repeat = 'off' | 'all' | 'one';

/** A playlist on a Media Player: the songs, the one playing, shuffle and repeat are yours — the player plays the one you give it. */
@Component({
  selector: 'app-playlist-usage-demo',
  imports: [
    NgOptimizedImage,
    ScButton,
    ScItem,
    ScItemBody,
    ScItemDescription,
    ScItemGroup,
    ScItemMedia,
    ScItemTitle,
    ScMediaPlayer,
    ScMediaPlayerMedia,
    ScMediaPlayerMute,
    ScMediaPlayerPlay,
    ScMediaPlayerWaveform,
    ScMediaPlayerTime,
    ScMediaPlayerVolume,
    ScToggle,
    SiPauseIcon,
    SiPlayIcon,
    SiRepeat1Icon,
    SiRepeatIcon,
    SiShuffleIcon,
    SiSkipBackIcon,
    SiSkipForwardIcon,
    SiVolume2Icon,
    SiVolumeXIcon,
  ],
  template: `
    <div
      scMediaPlayer
      #player="scMediaPlayer"
      aria-label="Player"
      class="grid w-full max-w-md gap-4"
      [metadata]="metadata()"
      [loop]="repeat() === 'one'"
      (loopChange)="repeat.set($event ? 'one' : 'off')"
    >
      <!-- At a song's end: the next one. -->
      <audio
        scMediaPlayerMedia
        preload="metadata"
        [autoplay]="autoplay()"
        [src]="song().src"
        (ended)="next()"
      ></audio>

      <div class="flex items-center gap-3">
        <img
          [ngSrc]="song().cover"
          width="64"
          height="64"
          priority
          alt=""
          class="size-16 rounded-md"
        />
        <div class="min-w-0">
          <p class="truncate font-medium" data-testid="now-playing">
            {{ song().title }}
          </p>
          <p class="text-muted-foreground truncate text-sm">
            {{ song().artist }}
          </p>
        </div>
      </div>

      <div class="grid gap-1">
        <div scMediaPlayerWaveform aria-label="Seek"></div>
        <div class="flex justify-between">
          <time scMediaPlayerTime></time>
          <time scMediaPlayerTime="remaining"></time>
        </div>
      </div>

      <div class="flex items-center justify-center gap-2">
        <button
          scToggle
          size="sm"
          [pressed]="shuffle()"
          (pressedChange)="setShuffle($event)"
        >
          <svg siShuffleIcon></svg>
          <span class="sr-only">Shuffle</span>
        </button>
        <button scButton variant="ghost" size="icon" (click)="previous()">
          <svg siSkipBackIcon></svg>
          <span class="sr-only">Previous song</span>
        </button>
        <button scMediaPlayerPlay variant="default" size="icon-lg">
          @if (player.paused()) {
            <svg siPlayIcon></svg>
            <span class="sr-only">Play</span>
          } @else {
            <svg siPauseIcon></svg>
            <span class="sr-only">Pause</span>
          }
        </button>
        <button scButton variant="ghost" size="icon" (click)="next()">
          <svg siSkipForwardIcon></svg>
          <span class="sr-only">Next song</span>
        </button>
        <!-- Three states: its name says which. -->
        <button
          scButton
          size="icon"
          [variant]="repeat() === 'off' ? 'ghost' : 'secondary'"
          (click)="cycleRepeat()"
        >
          @if (repeat() === 'one') {
            <svg siRepeat1Icon></svg>
          } @else {
            <svg siRepeatIcon></svg>
          }
          <span class="sr-only">{{ repeatNames[repeat()] }}</span>
        </button>
      </div>

      <div class="flex items-center gap-2">
        <button scMediaPlayerMute>
          @if (player.muted()) {
            <svg siVolumeXIcon></svg>
          } @else {
            <svg siVolume2Icon></svg>
          }
          <span class="sr-only">Mute</span>
        </button>
        <input scMediaPlayerVolume aria-label="Volume" class="flex-1" />
      </div>

      <div scItemGroup role="list" aria-label="Playlist" class="border-t pt-3">
        @for (item of songs; track item.src; let i = $index) {
          <div role="listitem">
            <button
              scItem
              size="sm"
              class="w-full"
              [variant]="i === track() ? 'muted' : 'default'"
              [attr.aria-current]="i === track() || null"
              (click)="choose(i)"
            >
              <div scItemMedia variant="image">
                <img [ngSrc]="item.cover" width="32" height="32" alt="" />
              </div>
              <div scItemBody>
                <div scItemTitle>{{ item.title }}</div>
                <p scItemDescription>{{ item.artist }}</p>
              </div>
            </button>
          </div>
        }
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class PlaylistUsageDemo {
  private readonly player = viewChild.required(ScMediaPlayer);

  private readonly songs: readonly Song[] = [
    {
      src: '/media/carefree.mp3',
      title: 'Carefree',
      artist: 'Kevin MacLeod',
      cover: '/media/carefree.jpg',
    },
    {
      src: '/media/sneaky-snitch.mp3',
      title: 'Sneaky Snitch',
      artist: 'Kevin MacLeod',
      cover: '/media/sneaky-snitch.jpg',
    },
    {
      src: '/media/gymnopedie-no-1.mp3',
      title: 'Gymnopédie No. 1',
      artist: 'Kevin MacLeod',
      cover: '/media/gymnopedie-no-1.jpg',
    },
  ];

  private readonly repeatNames: Record<Repeat, string> = {
    off: 'Repeat: off',
    all: 'Repeat: all',
    one: 'Repeat: one',
  };

  /** The song playing: its place in `songs`. */
  private readonly track = signal(0);
  private readonly shuffle = signal(false);
  private readonly repeat = signal<Repeat>('off');
  /** A song chosen while one plays: it plays at once. */
  private readonly autoplay = signal(false);
  /** The shuffled order, made when shuffle comes on. */
  private readonly shuffled = signal<readonly number[]>([]);

  private readonly song = computed(() => this.songs[this.track()]);
  /** The order they play in. */
  private readonly queue = computed(() =>
    this.shuffle() ? this.shuffled() : this.songs.map((_, i) => i),
  );
  private readonly metadata = computed(() => ({
    title: this.song().title,
    artist: this.song().artist,
    artwork: [{ src: this.song().cover, sizes: '400x400', type: 'image/jpeg' }],
  }));

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      // The system's media controls: next and previous too.
      const session = globalThis.navigator?.mediaSession;
      session?.setActionHandler('nexttrack', () => this.next());
      session?.setActionHandler('previoustrack', () => this.previous());
      destroyRef.onDestroy(() => {
        session?.setActionHandler('nexttrack', null);
        session?.setActionHandler('previoustrack', null);
      });
    });
  }

  /** Shuffle on: every song once, in a random order, the one playing first. */
  private setShuffle(on: boolean): void {
    if (on) {
      const rest = this.songs
        .map((_, i) => i)
        .filter((i) => i !== this.track())
        .sort(() => Math.random() - 0.5);
      this.shuffled.set([this.track(), ...rest]);
    }
    this.shuffle.set(on);
  }

  private choose(index: number): void {
    const player = this.player();
    if (index === this.track()) {
      player.toggle();
      return;
    }
    this.autoplay.set(true);
    this.track.set(index);
  }

  /** The next in the queue; after the last, the first again with repeat all — or it stops. */
  private next(): void {
    const queue = this.queue();
    const at = queue.indexOf(this.track());
    const following =
      queue[at + 1] ?? (this.repeat() === 'all' ? queue[0] : null);
    const player = this.player();
    if (following === null) {
      // The end: back to the first, stopped.
      this.autoplay.set(false);
      this.track.set(queue[0]);
      player.paused.set(true);
      return;
    }
    this.autoplay.set(!player.paused() || player.ended());
    this.track.set(following);
  }

  /** The start of the song — or, within 3 seconds of it, the one before. */
  private previous(): void {
    const player = this.player();
    const queue = this.queue();
    const at = queue.indexOf(this.track());
    if (player.currentTime() > 3 || at === 0) {
      player.seekTo(0);
      return;
    }
    this.autoplay.set(!player.paused());
    this.track.set(queue[at - 1]);
  }

  private cycleRepeat(): void {
    const order: Repeat[] = ['off', 'all', 'one'];
    this.repeat.update((r) => order[(order.indexOf(r) + 1) % order.length]);
  }
}
