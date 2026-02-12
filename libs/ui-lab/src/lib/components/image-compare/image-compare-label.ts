import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';
import { SC_IMAGE_COMPARE } from './image-compare';

@Component({
  selector: '[sc-image-compare-label]',
  template: `
    <ng-content />
  `,
  host: {
    'data-slot': 'image-compare-label',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScImageCompareLabel {
  readonly imageCompare = inject(SC_IMAGE_COMPARE);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'absolute px-2 py-1 bg-black/60 text-white text-xs rounded',
      this.classInput(),
    ),
  );
}
