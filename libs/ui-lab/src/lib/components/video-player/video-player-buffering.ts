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
  selector: 'div[sc-video-player-buffering]',
  template: `
    @if (player.isBuffering()) {
      <ng-content />
    }
  `,
  host: {
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScVideoPlayerBuffering {
  protected readonly player = inject(SC_VIDEO_PLAYER);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'absolute inset-0 flex items-center justify-center bg-black/20 pointer-events-none',
      '[&_svg]:size-12 [&_svg]:text-white [&_svg]:animate-spin',
      this.classInput(),
    ),
  );
}
