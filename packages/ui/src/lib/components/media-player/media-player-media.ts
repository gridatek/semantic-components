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
import { cn } from 'cn';
import { ScMediaPlayer } from './media-player';

/**
 * Your `video` or `audio`, in a `scMediaPlayer`: its `src` or `<source>`s,
 * `poster`, `<track>`s (captions, subtitles, chapters). The player reads it
 * and drives it. A click on a video plays or pauses; on a touch screen, once
 * played, a tap shows or hides the controls.
 */
@Directive({
  selector: 'video[scMediaPlayerMedia], audio[scMediaPlayerMedia]',
  host: {
    'data-slot': 'media-player-media',
    playsinline: '',
    '[class]': 'class()',
    '(pointerdown)': 'onPointerDown($event)',
    '(click)': 'onClick()',
    // Started at once: a read after the next render may already find it
    // paused again.
    '(play)': 'player.started.set(true); sync()',
    '(pause)': 'sync()',
    '(timeupdate)': 'sync()',
    '(durationchange)': 'sync()',
    '(progress)': 'sync()',
    '(volumechange)': 'sync()',
    '(ratechange)': 'sync()',
    '(ended)': 'sync()',
    '(seeked)': 'sync()',
    '(loadedmetadata)': 'onMetadata()',
    '(loadstart)': 'player.error.set(null); player.src.set(element.currentSrc)',
    '(error)': 'player.error.set(element.error); player.waiting.set(false)',
    '(waiting)': 'player.waiting.set(true)',
    '(playing)': 'player.waiting.set(false); sync()',
    '(canplay)': 'player.waiting.set(false)',
    '(enterpictureinpicture)': 'player.pictureInPicture.set(true)',
    '(leavepictureinpicture)': 'player.pictureInPicture.set(false)',
  },
})
export class ScMediaPlayerMedia {
  private readonly player = inject(ScMediaPlayer);
  private readonly element =
    inject<ElementRef<HTMLMediaElement>>(ElementRef).nativeElement;

  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() =>
    cn(
      this.player.kind() === 'video'
        ? 'block size-full bg-black object-contain'
        : 'hidden',
      this.classInput(),
    ),
  );

  private readonly injector = inject(Injector);
  private readonly window = inject(DOCUMENT).defaultView;
  private readonly changes = inject(ChangeDetectorRef);
  private pending: AfterRenderRef | null = null;
  private frame: number | null = null;

  constructor() {
    // Known as it is made: the server renders the same look.
    this.player.kind.set(
      this.element.tagName.toLowerCase() === 'audio' ? 'audio' : 'video',
    );
    const destroyRef = inject(DestroyRef);
    destroyRef.onDestroy(() => {
      if (this.frame !== null) this.window?.cancelAnimationFrame(this.frame);
    });
    // The media, to the player once rendered in the browser — on the server
    // there is no real one to play, pause or read tracks from.
    afterNextRender(() => {
      this.player.ɵmedia.set(this.element);
      // Already loaded (from the cache, or while the server's page was
      // hydrating): no event comes — nor a render, without one asked for.
      if (this.element.readyState >= 1) {
        this.changes.markForCheck();
        this.onMetadata();
      }
      if (this.element.error) this.player.error.set(this.element.error);
      // Loading began before the page was live (a page from the server).
      this.player.src.set(this.element.currentSrc);
      // Tracks listed after the metadata (WebKit, a page from the server):
      // read again.
      const tracks = this.element.textTracks;
      const read = () => {
        this.changes.markForCheck();
        this.player.ɵreadTracks(this.element);
      };
      tracks.addEventListener('addtrack', read);
      tracks.addEventListener('removetrack', read);
      destroyRef.onDestroy(() => {
        tracks.removeEventListener('addtrack', read);
        tracks.removeEventListener('removetrack', read);
      });
    });
  }

  /**
   * Reads the media into the player once rendered: a change made outside
   * (a bound signal set) reaches the player first, and is not overwritten.
   * Playing, it reads again every animation frame — still after a render,
   * but not after every render: a read changes the time, which renders,
   * which would read again in the same pass (NG0103).
   */
  private sync(): void {
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

  private onPointerDown(event: Event): void {
    // A union selector types its events loosely.
    this.pointerType = (event as PointerEvent).pointerType;
    this.hiddenAtPress = this.player.idle();
  }

  private onClick(): void {
    if (this.pointerType === 'touch' && this.player.started()) {
      this.player.toggleControls(this.hiddenAtPress);
    } else {
      this.player.toggle();
    }
  }

  private onMetadata(): void {
    this.sync();
    this.player.ɵreadTracks(this.element);
  }
}
