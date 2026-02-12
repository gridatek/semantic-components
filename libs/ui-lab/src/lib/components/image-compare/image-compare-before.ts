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
  selector: 'img[sc-image-compare-before]',
  template: '',
  host: {
    'data-slot': 'image-compare-before',
    '[class]': 'class()',
    draggable: 'false',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScImageCompareBefore {
  readonly imageCompare = inject(SC_IMAGE_COMPARE);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('absolute inset-0 size-full object-cover', this.classInput()),
  );
}
