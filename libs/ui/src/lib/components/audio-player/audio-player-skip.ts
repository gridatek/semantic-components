import { Directive, computed, inject, input } from '@angular/core';
import { injectPreset } from '../../config/preset';
import { ɵwarnIfUnnamed } from '../../utils/accessible-name/accessible-name';
import { cn } from '../../utils/cn/cn';
import { type ScButtonVariants } from '../button/button';
import { ScAudioPlayer } from './audio-player';

/** Skips by its seconds (`[scAudioPlayerSkip]="-15"`). Write its icon and name it ("Back 15 seconds"). */
@Directive({
  selector: 'button[scAudioPlayerSkip]',
  host: {
    type: 'button',
    'data-slot': 'audio-player-skip',
    '[class]': 'class()',
    '(click)': 'player.seekBy(seconds())',
  },
})
export class ScAudioPlayerSkip {
  private readonly buttonStyles = injectPreset().button;

  protected readonly player = inject(ScAudioPlayer);

  readonly seconds = input.required<number>({
    alias: 'scAudioPlayerSkip',
  });
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
    ɵwarnIfUnnamed('scAudioPlayerSkip');
  }
}
