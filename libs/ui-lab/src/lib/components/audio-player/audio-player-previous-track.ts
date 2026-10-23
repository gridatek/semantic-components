import { Directive, computed, inject, input } from '@angular/core';
import {
  type ScButtonVariants,
  cn,
  injectPreset,
  ɵwarnIfUnnamed,
} from '@semantic-components/ui';
import { ScAudioPlayer } from './audio-player';

/** Back to the track's start, or — near it — the track before. Write its icon and name it ("Previous track"). */
@Directive({
  selector: 'button[scAudioPlayerPreviousTrack]',
  host: {
    type: 'button',
    'data-slot': 'audio-player-previous-track',
    '[class]': 'class()',
    '(click)': 'player.previousTrack()',
  },
})
export class ScAudioPlayerPreviousTrack {
  private readonly buttonStyles = injectPreset().button;

  protected readonly player = inject(ScAudioPlayer);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('ghost');
  readonly size = input<ScButtonVariants['size']>('icon');

  protected readonly class = computed(() =>
    cn(
      this.buttonStyles({ variant: this.variant(), size: this.size() }),
      this.classInput(),
    ),
  );

  constructor() {
    ɵwarnIfUnnamed('scAudioPlayerPreviousTrack');
  }
}
