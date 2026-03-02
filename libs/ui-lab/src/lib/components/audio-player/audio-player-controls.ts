import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
} from '@angular/core';
import { cn } from '@semantic-components/ui';

@Component({
  selector: 'div[scAudioPlayerControls]',
  template: '<ng-content />',
  host: {
    'data-slot': 'audio-player-controls',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScAudioPlayerControls {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('flex items-center justify-center gap-2', this.classInput()),
  );
}
