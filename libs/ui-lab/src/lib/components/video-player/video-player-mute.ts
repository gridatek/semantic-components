import { Directive, computed, inject, input } from '@angular/core';
import { buttonVariants, cn, ɵwarnIfUnnamed } from '@semantic-components/ui';
import { SC_VIDEO_PLAYER } from './video-player';

/** Mutes and unmutes (`aria-pressed` while muted): one name ("Mute"); show your icon from `player.isMuted()`. Write its icon and name it. */
@Directive({
  selector: 'button[scVideoPlayerMute]',
  host: {
    type: 'button',
    'data-slot': 'video-player-mute',
    '[attr.aria-pressed]': 'player.isMuted()',
    '(click)': 'player.toggleMute()',
    '[class]': 'class()',
  },
})
export class ScVideoPlayerMute {
  protected readonly player = inject(SC_VIDEO_PLAYER);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      buttonVariants({ variant: 'ghost', size: 'icon' }),
      'text-foreground',
      '[&_svg]:size-5',
      this.classInput(),
    ),
  );

  constructor() {
    ɵwarnIfUnnamed('scVideoPlayerMute');
  }
}
