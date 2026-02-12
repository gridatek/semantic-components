import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';

@Component({
  selector: '[sc-timeline-connector]',
  template: ``,
  host: {
    'data-slot': 'timeline-connector',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScTimelineConnector {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'absolute left-[11px] top-5 h-[calc(100%-20px)] w-px bg-border',
      this.classInput(),
    ),
  );
}
