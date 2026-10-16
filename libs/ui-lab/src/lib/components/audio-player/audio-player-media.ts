import {
  type AfterRenderRef,
  Directive,
  ElementRef,
  Injector,
  afterNextRender,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { ScAudioPlayer } from './audio-player';

/**
 * Your `audio`, in the player. With a playlist, the player gives it each
 * track's file; without one, give it a `src`. No `controls`: yours are the
 * player's parts.
 */
@Directive({
  selector: 'audio[scAudioPlayerMedia]',
  host: {
    'data-slot': 'audio-player-media',
    '[class]': 'class()',
    '(play)': 'sync()',
    '(pause)': 'sync()',
    '(timeupdate)': 'sync()',
    '(durationchange)': 'sync()',
    '(progress)': 'sync()',
    '(volumechange)': 'sync()',
    '(ratechange)': 'sync()',
    '(seeked)': 'sync()',
    '(loadedmetadata)': 'sync()',
    // Loaded: a duration estimated from the first bytes is now right.
    '(canplaythrough)': 'sync()',
    '(suspend)': 'sync()',
    '(ended)': 'onEnded()',
    '(waiting)': 'player.waiting.set(true)',
    '(playing)': 'player.waiting.set(false); sync()',
    '(canplay)': 'player.waiting.set(false)',
  },
})
export class ScAudioPlayerMedia {
  protected readonly player = inject(ScAudioPlayer);
  private readonly element =
    inject<ElementRef<HTMLAudioElement>>(ElementRef).nativeElement;

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn('hidden', this.classInput()));

  private readonly injector = inject(Injector);
  private pending: AfterRenderRef | null = null;

  constructor() {
    this.player.ɵmedia.set(this.element);
    // Already loaded (from the cache): no event comes.
    if (this.element.readyState >= 1) this.sync();
  }

  protected onEnded(): void {
    this.sync();
    this.player.ɵended(this.element);
  }

  /**
   * Reads the audio into the player once rendered: a change made outside
   * (a bound signal set) reaches the player first, and is not overwritten.
   * Playing, it reads again every render — every frame.
   */
  protected sync(): void {
    if (this.pending) return;
    this.pending = afterNextRender(
      () => {
        this.pending = null;
        this.player.ɵsync(this.element);
        if (!this.element.paused) this.sync();
      },
      { injector: this.injector },
    );
  }
}
