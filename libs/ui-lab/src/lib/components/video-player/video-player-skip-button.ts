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
  selector: 'button[sc-video-player-skip]',
  template: '<ng-content />',
  host: {
    type: 'button',
    '[class]': 'class()',
    '[attr.aria-label]': 'ariaLabel()',
    '(click)': 'onClick()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScVideoPlayerSkipButton {
  protected readonly player = inject(SC_VIDEO_PLAYER);

  readonly seconds = input.required<number>();
  readonly ariaLabel = input<string>('');
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

  protected onClick(): void {
    this.player.skip(this.seconds());
  }
}
