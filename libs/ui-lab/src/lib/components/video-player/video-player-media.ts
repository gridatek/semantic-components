import {
  DestroyRef,
  Directive,
  ElementRef,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { ScVideoPlayer } from './video-player';

/**
 * Your `video`, in the player: its `src` (or `<source>`s), `poster`, and
 * `<track>`s — captions, subtitles, chapters. No `controls`: yours are the
 * player's parts. A click plays or pauses it.
 */
@Directive({
  selector: 'video[scVideoPlayerMedia]',
  host: {
    'data-slot': 'video-player-media',
    playsinline: '',
    '[class]': 'class()',
    '(click)': 'player.toggle()',
    '(play)': 'sync()',
    '(pause)': 'sync()',
    '(timeupdate)': 'sync()',
    '(durationchange)': 'sync()',
    '(progress)': 'sync()',
    '(volumechange)': 'sync()',
    '(ratechange)': 'sync()',
    '(ended)': 'sync()',
    '(seeked)': 'sync()',
    '(loadedmetadata)': 'onMetadata()',
    '(waiting)': 'player.waiting.set(true)',
    '(playing)': 'player.waiting.set(false); sync()',
    '(canplay)': 'player.waiting.set(false)',
    '(enterpictureinpicture)': 'player.pictureInPicture.set(true)',
    '(leavepictureinpicture)': 'player.pictureInPicture.set(false)',
  },
})
export class ScVideoPlayerMedia {
  protected readonly player = inject(ScVideoPlayer);
  private readonly element =
    inject<ElementRef<HTMLVideoElement>>(ElementRef).nativeElement;

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('block size-full bg-black object-contain', this.classInput()),
  );

  private frame = 0;

  constructor() {
    this.player.ɵmedia.set(this.element);
    // Already loaded (from the cache): no event comes.
    if (this.element.readyState >= 1) this.onMetadata();
    inject(DestroyRef).onDestroy(() => cancelAnimationFrame(this.frame));
  }

  protected sync(): void {
    this.player.ɵsync(this.element);
    // Playing: the time follows every frame, not only on timeupdate.
    cancelAnimationFrame(this.frame);
    if (!this.element.paused) {
      this.frame = requestAnimationFrame(() => this.sync());
    }
  }

  protected onMetadata(): void {
    this.sync();
    this.player.ɵreadTracks(this.element);
  }
}
