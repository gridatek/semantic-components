import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { buttonVariants, cn } from '@semantic-components/ui';
import { SC_VIDEO_PLAYER } from './video-player';

@Component({
  selector: 'button[scVideoPlayerPlayPause]',
  template: '<ng-content />',
  host: {
    type: 'button',
    '[class]': 'class()',
    '[attr.aria-label]': 'player.isPlaying() ? "Pause" : "Play"',
    '(click)': 'player.togglePlay()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScVideoPlayerPlayPause {
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
}
