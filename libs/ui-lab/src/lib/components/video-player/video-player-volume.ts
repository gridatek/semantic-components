import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { ScSlider, buttonVariants, cn } from '@semantic-components/ui';
import { SC_VIDEO_PLAYER } from './video-player';

@Component({
  selector: 'div[scVideoPlayerVolume]',
  imports: [ScSlider],
  template: `
    <button
      type="button"
      (click)="player.toggleMute()"
      [class]="buttonClass()"
      [attr.aria-label]="player.isMuted() ? 'Unmute' : 'Mute'"
    >
      <ng-content select="[volume-icon]" />
    </button>
    <input
      scSlider
      class="h-1 w-0 cursor-pointer opacity-0 transition-all duration-200 group-hover/volume:w-20 group-hover/volume:opacity-100"
      [max]="1"
      [step]="0.01"
      [value]="player.volume()"
      (valueChange)="player.setVolume($event)"
      aria-label="Volume"
    />
  `,
  host: {
    '[class]': 'class()',
    '[style.--primary]': '"oklch(1 0 0)"',
    '[style.--muted]': '"oklch(1 0 0 / 0.3)"',
    '[style.--ring]': '"oklch(1 0 0 / 0.5)"',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScVideoPlayerVolume {
  protected readonly player = inject(SC_VIDEO_PLAYER);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('group/volume flex items-center gap-1', this.classInput()),
  );

  protected readonly buttonClass = computed(() =>
    cn(
      buttonVariants({ variant: 'ghost', size: 'icon' }),
      'text-foreground',
      '[&_svg]:size-5',
    ),
  );
}
