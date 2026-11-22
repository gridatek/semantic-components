import { cn } from 'cn';
import type { ScMediaPlayerKind } from './media-player';

/**
 * A part that steps aside on a small player: under 36rem for a video (as
 * Vidstack's small layout), under 24rem for an audio bar.
 */
export function scMediaPlayerSmall(kind: ScMediaPlayerKind): string {
  return kind === 'video' ? '@max-xl/media:hidden' : '@max-sm/media:hidden';
}

/** Over a video, the buttons are white; over audio, the style's own. */
export function scMediaPlayerButtonClass(kind: ScMediaPlayerKind): string {
  return cn(
    'aria-pressed:bg-accent',
    kind === 'video' &&
      'text-white hover:bg-white/15 hover:text-white aria-pressed:bg-white/20 dark:hover:bg-white/15',
  );
}
