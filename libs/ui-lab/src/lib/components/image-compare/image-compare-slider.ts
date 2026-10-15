import {
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_IMAGE_COMPARE } from './image-compare';

/** The divider and its handle; write the handle's icons inside. */
@Component({
  selector: '[scImageCompareSlider]',
  template: `
    <div [class]="handleClass()">
      <ng-content />
    </div>
  `,
  host: {
    '[class]': 'lineClass()',
    '[style]': 'lineStyle()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScImageCompareSlider {
  readonly imageCompare = inject(SC_IMAGE_COMPARE);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly lineClass = computed(() =>
    cn(
      'absolute bg-white shadow-lg',
      this.imageCompare.orientation() === 'horizontal'
        ? 'top-0 bottom-0 w-0.5 -translate-x-1/2'
        : 'left-0 right-0 h-0.5 -translate-y-1/2',
      this.classInput(),
    ),
  );

  protected readonly lineStyle = computed(() => {
    const pos = this.imageCompare.position();
    if (this.imageCompare.orientation() === 'horizontal') {
      return `left: ${pos}%`;
    }
    return `top: ${pos}%`;
  });

  protected readonly handleClass = computed(() =>
    cn(
      'absolute bg-white rounded-full shadow-lg border-2 border-white',
      'flex items-center justify-center text-black [&_svg]:size-5',
      this.imageCompare.orientation() === 'horizontal'
        ? 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10'
        : 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 flex-col',
    ),
  );
}
