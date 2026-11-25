import { cn } from 'cn';
import type { ScMediaPlayerKind } from './media-player';

/**
 * A part that steps aside as the player narrows. `small`: under 36rem for a
 * video (as Vidstack's small layout), 24rem for an audio bar — the skips,
 * mute, the volume, picture-in-picture. `medium`: already under 42rem
 * (28rem) — the speeds and loop, the first to go.
 */
export function scMediaPlayerSmall(
  kind: ScMediaPlayerKind,
  tier: 'small' | 'medium' = 'small',
): string {
  if (tier === 'medium') {
    return kind === 'video' ? '@max-2xl/media:hidden' : '@max-md/media:hidden';
  }
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
