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
  selector: 'button[sc-video-player-fullscreen]',
  template: '<ng-content />',
  host: {
    type: 'button',
    '[class]': 'class()',
    '[attr.aria-label]':
      'player.isFullscreen() ? "Exit fullscreen" : "Enter fullscreen"',
    '(click)': 'player.toggleFullscreen()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScVideoPlayerFullscreenButton {
  protected readonly player = inject(SC_VIDEO_PLAYER);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'size-8 rounded flex items-center justify-center',
      'text-white hover:bg-white/20 transition-colors',
      'focus:outline-none focus:ring-2 focus:ring-white/50',
      '[&_svg]:size-5',
      this.classInput(),
    ),
  );
}
