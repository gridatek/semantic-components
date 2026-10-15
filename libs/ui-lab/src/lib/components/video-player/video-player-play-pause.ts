import {
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { buttonVariants, cn, ɵwarnIfUnnamed } from '@semantic-components/ui';
import { SC_VIDEO_PLAYER } from './video-player';

@Component({
  selector: 'button[scVideoPlayerPlayPause]',
  template: '<ng-content />',
  host: {
    type: 'button',
    '[class]': 'class()',
    '(click)': 'player.togglePlay()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScVideoPlayerPlayPause {
  constructor() {
    ɵwarnIfUnnamed('scVideoPlayerPlayPause');
  }

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
