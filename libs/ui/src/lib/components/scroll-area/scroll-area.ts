import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';

@Component({
  selector: 'div[scScrollArea]',
  host: {
    'data-slot': 'scroll-area',
    '[attr.data-show]': 'show()',
    '[class]': 'class()',
  },
  template: `
    <ng-content />
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScScrollArea {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly show = input<'always' | 'onhover'>('onhover');

  protected readonly class = computed(() =>
    cn('overflow-auto', this.classInput()),
  );
}
