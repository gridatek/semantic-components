import { Component, ViewEncapsulation, computed, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

@Component({
  selector: 'div[scAudioPlayerControls]',
  template: '<ng-content />',
  host: {
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScAudioPlayerControls {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('flex items-center justify-center gap-2', this.classInput()),
  );
}
