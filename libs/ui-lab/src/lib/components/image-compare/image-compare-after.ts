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
  selector: 'img[sc-image-compare-after]',
  template: '',
  host: {
    'data-slot': 'image-compare-after',
    '[class]': 'class()',
    '[style.clip-path]': 'clipPath()',
    draggable: 'false',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScImageCompareAfter {
  readonly imageCompare = inject(SC_IMAGE_COMPARE);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('absolute inset-0 size-full object-cover', this.classInput()),
  );

  protected readonly clipPath = computed(() => {
    const pos = this.imageCompare.position();
    if (this.imageCompare.orientation() === 'horizontal') {
      return `inset(0 0 0 ${pos}%)`;
    }
    return `inset(${pos}% 0 0 0)`;
  });
}
