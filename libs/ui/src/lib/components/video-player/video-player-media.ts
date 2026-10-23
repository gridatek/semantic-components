import { DOCUMENT } from '@angular/common';
import {
  type AfterRenderRef,
  ChangeDetectorRef,
  DestroyRef,
  Directive,
  ElementRef,
  Injector,
  afterNextRender,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '../../utils/cn/cn';
import { ScVideoPlayer } from './video-player';

/**
 * Your `video`, in the player: its `src` (or `<source>`s), `poster`, and
 * `<track>`s — captions, subtitles, chapters. No `controls`: yours are the
 * player's parts. A click plays or pauses it; on a touch screen, once played,
 * a tap shows or hides the controls instead, as phone players do.
 */
@Directive({
  selector: 'video[scVideoPlayerMedia]',
  host: {
    'data-slot': 'video-player-media',
    playsinline: '',
    '[class]': 'class()',
    '(pointerdown)': 'onPointerDown($event)',
    '(click)': 'onClick()',
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

  private readonly injector = inject(Injector);
  private readonly window = inject(DOCUMENT).defaultView;
  private readonly changes = inject(ChangeDetectorRef);
  private pending: AfterRenderRef | null = null;
  private frame: number | null = null;

  constructor() {
    inject(DestroyRef).onDestroy(() => {
      if (this.frame !== null) this.window?.cancelAnimationFrame(this.frame);
    });
    // The video, to the player once rendered in the browser — on the server
    // there is no real one to play, pause or read tracks from.
    afterNextRender(() => {
      this.player.ɵmedia.set(this.element);
      // Already loaded (from the cache): no event comes.
      if (this.element.readyState >= 1) this.onMetadata();
    });
  }

  /**
   * Reads the video into the player once rendered: a change made outside
   * (a bound signal set) reaches the player first, and is not overwritten.
   * Playing, it reads again every animation frame — still after a render,
   * but not after every render: a read changes the time, which renders,
   * which would read again in the same pass (NG0103).
   */
  protected sync(): void {
    if (this.pending) return;
    this.pending = afterNextRender(
      () => {
        this.pending = null;
        this.player.ɵsync(this.element);
        this.playing();
      },
      { injector: this.injector },
    );
  }

  /** While it plays: next frame, a render, then a read. */
  private playing(): void {
    if (this.frame !== null || this.element.paused || !this.window) return;
    this.frame = this.window.requestAnimationFrame(() => {
      this.frame = null;
      this.changes.markForCheck();
      this.sync();
    });
  }

  /** The kind of pointer of the last press: a tap is `touch`. */
  private pointerType = '';
  /** Whether the controls were hidden when it began: its focus wakes them. */
  private hiddenAtPress = false;

  protected onPointerDown(event: PointerEvent): void {
    this.pointerType = event.pointerType;
    this.hiddenAtPress = this.player.idle();
  }

  protected onClick(): void {
    if (this.pointerType === 'touch' && this.player.started()) {
      this.player.toggleControls(this.hiddenAtPress);
    } else {
      this.player.toggle();
    }
  }

  protected onMetadata(): void {
    this.sync();
    this.player.ɵreadTracks(this.element);
  }
}
