import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';

@Component({
  selector: '[sc-timeline-content]',
  template: `
    <ng-content />
  `,
  host: {
    'data-slot': 'timeline-content',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScTimelineContent {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn('space-y-1', this.classInput()));
}
