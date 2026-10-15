import { Directive, computed, inject, input } from '@angular/core';
import { buttonVariants, cn, ɵwarnIfUnnamed } from '@semantic-components/ui';
import { SC_AUDIO_PLAYER } from './audio-player';

/** Mutes and unmutes (`aria-pressed` while muted): one name ("Mute"); show your icon from `player.isMuted()`. Write its icon and name it. */
@Directive({
  selector: 'button[scAudioPlayerMute]',
  host: {
    type: 'button',
    'data-slot': 'audio-player-mute',
    '[attr.aria-pressed]': 'player.isMuted()',
    '(click)': 'player.toggleMute()',
    '[class]': 'class()',
  },
})
export class ScAudioPlayerMute {
  protected readonly player = inject(SC_AUDIO_PLAYER);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      buttonVariants({ variant: 'ghost', size: 'sm' }),
      'size-7 rounded-full',
      this.classInput(),
    ),
  );

  constructor() {
    ɵwarnIfUnnamed('scAudioPlayerMute');
  }
}
