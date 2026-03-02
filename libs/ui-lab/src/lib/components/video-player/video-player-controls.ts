import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
} from '@angular/core';
import { cn } from '@semantic-components/ui';

@Component({
  selector: 'div[scVideoPlayerControls]',
  template: '<ng-content />',
  host: {
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScVideoPlayerControls {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'absolute inset-x-0 bottom-0 bg-linear-to-t from-black/80 to-transparent p-4 opacity-0 transition-opacity group-hover/video-player:opacity-100 group-[.touched]/video-player:opacity-100 group-[.cursor-idle]/video-player:!opacity-0',
      this.classInput(),
    ),
  );
}
