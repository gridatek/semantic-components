import { Directive, computed, inject, input } from '@angular/core';
import { injectPreset } from '../../config/preset';
import { ɵwarnIfUnnamed } from '../../utils/accessible-name/accessible-name';
import { cn } from '../../utils/cn/cn';
import { type ScButtonVariants } from '../button/button';
import { ScAudioPlayer } from './audio-player';

/** The next track; disabled after the last (unless repeating them all). Write its icon and name it ("Next track"). */
@Directive({
  selector: 'button[scAudioPlayerNextTrack]',
  host: {
    type: 'button',
    'data-slot': 'audio-player-track',
    '[disabled]': 'player.upcoming() === null',
    '[class]': 'class()',
    '(click)': 'player.nextTrack()',
  },
})
export class ScAudioPlayerNextTrack {
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
    ɵwarnIfUnnamed('scAudioPlayerNextTrack');
  }
}
