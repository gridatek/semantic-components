import {
  Component,
  ChangeDetectionStrategy,
  computed,
  input,
  inject,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';
import { SC_VIDEO_PLAYER } from './video-player';

@Component({
  selector: 'button[sc-video-player-big-play]',
  template: '<ng-content />',
  host: {
    type: 'button',
    '[class]': 'class()',
    'aria-label': 'Play video',
    '(click)': 'player.play()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScVideoPlayerBigPlayButton {
  protected readonly player = inject(SC_VIDEO_PLAYER);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors group',
      '[&_svg]:size-5',
      this.classInput(),
    ),
  );
}
