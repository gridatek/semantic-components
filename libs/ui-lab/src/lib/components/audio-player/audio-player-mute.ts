import { Directive, computed, inject, input } from '@angular/core';
import {
  type ScButtonVariants,
  cn,
  injectPreset,
  ɵwarnIfUnnamed,
} from '@semantic-components/ui';
import { ScAudioPlayer } from './audio-player';

/** Mutes, pressed while muted. Write its icon and name it ("Mute"). */
@Directive({
  selector: 'button[scAudioPlayerMute]',
  host: {
    type: 'button',
    'data-slot': 'audio-player-mute',
    '[attr.aria-pressed]': 'player.muted()',
    '[class]': 'class()',
    '(click)': 'player.muted.set(!player.muted())',
  },
})
export class ScAudioPlayerMute {
  private readonly buttonStyles = injectPreset().button;

  protected readonly player = inject(ScAudioPlayer);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('ghost');
  readonly size = input<ScButtonVariants['size']>('icon');

  protected readonly class = computed(() =>
    cn(
      this.buttonStyles({ variant: this.variant(), size: this.size() }),
      'aria-pressed:bg-accent aria-pressed:text-accent-foreground',
      this.classInput(),
    ),
  );

  constructor() {
    ɵwarnIfUnnamed('scAudioPlayerMute');
  }
}
