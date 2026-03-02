import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_VIDEO_PLAYER } from './video-player';

@Component({
  selector: 'button[scVideoPlayerBigPlay]',
  template: `
    <div
      class="flex size-20 items-center justify-center rounded-full bg-white/90 transition-transform hover:scale-110"
    >
      <ng-content />
    </div>
  `,
  host: {
    type: 'button',
    '[class]': 'class()',
    'aria-label': 'Play video',
    '(click)': 'player.play()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScVideoPlayerBigPlay {
  protected readonly player = inject(SC_VIDEO_PLAYER);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'absolute inset-0 z-10 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors group',
      '[&_svg]:size-5',
      (this.player.isPlaying() || this.player.isBuffering()) && 'hidden',
      this.classInput(),
    ),
  );
}
