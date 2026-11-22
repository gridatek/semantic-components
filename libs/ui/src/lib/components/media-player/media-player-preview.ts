import {
  Directive,
  ElementRef,
  afterRenderEffect,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from 'cn';
import { ScMediaPlayer } from './media-player';

/**
 * Above the seek bar, where the pointer is: your text — its time
 * (`player.formatTime(player.preview().time)`), its chapter
 * (`player.chapterAt(…)`). Put it in the controls, in
 * `@if (player.preview(); as preview)`. Kept inside the player; decorative
 * (the slider says its value).
 */
@Directive({
  selector: '[scMediaPlayerPreview]',
  host: {
    'data-slot': 'media-player-preview',
    'aria-hidden': 'true',
    '[hidden]': '!player.preview()',
    '[class]': 'class()',
  },
})
export class ScMediaPlayerPreview {
  private readonly player = inject(ScMediaPlayer);
  private readonly element =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() =>
    cn(
      'pointer-events-none absolute z-30 -translate-y-full rounded-md px-2 py-1 text-center text-xs whitespace-nowrap tabular-nums',
      this.player.kind() === 'video'
        ? 'bg-black/85 text-white'
        : 'bg-popover text-popover-foreground shadow-md',
      this.classInput(),
    ),
  );

  constructor() {
    // Placed over the seek bar's point, kept inside its box (its parent's).
    afterRenderEffect({
      write: () => {
        const preview = this.player.preview();
        const seek = this.player.ɵseek();
        const box = this.element.offsetParent;
        if (!preview || !seek || !box) return;
        const seekRect = seek.getBoundingClientRect();
        const boxRect = box.getBoundingClientRect();
        const rtl = getComputedStyle(seek).direction === 'rtl';
        const x =
          seekRect.left +
          (rtl ? 1 - preview.at : preview.at) * seekRect.width -
          boxRect.left;
        const half = this.element.offsetWidth / 2;
        const left = Math.min(Math.max(x, half), boxRect.width - half) - half;
        this.element.style.left = `${left}px`;
        this.element.style.top = `${seekRect.top - boxRect.top - 6}px`;
      },
    });
  }
}
