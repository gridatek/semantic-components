import { Directive, computed, inject, input } from '@angular/core';
import {
  type ScButtonVariants,
  buttonVariants,
  cn,
  ɵwarnIfUnnamed,
} from '@semantic-components/ui';
import { ScAudioPlayerNext } from './audio-player-next';

/** Mutes, pressed while muted. Write its icon and name it ("Mute"). */
@Directive({
  selector: 'button[scAudioPlayerNextMute]',
  host: {
    type: 'button',
    'data-slot': 'audio-player-mute',
    '[attr.aria-pressed]': 'player.muted()',
    '[class]': 'class()',
    '(click)': 'player.muted.set(!player.muted())',
  },
})
export class ScAudioPlayerNextMute {
  protected readonly player = inject(ScAudioPlayerNext);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('ghost');
  readonly size = input<ScButtonVariants['size']>('icon');

  protected readonly class = computed(() =>
    cn(
      buttonVariants({ variant: this.variant(), size: this.size() }),
      'aria-pressed:bg-accent aria-pressed:text-accent-foreground',
      this.classInput(),
    ),
  );

  constructor() {
    ɵwarnIfUnnamed('scAudioPlayerNextMute');
  }
}
