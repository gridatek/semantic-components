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
  selector: '[sc-image-compare-slider]',
  template: `
    <div [class]="handleClass()">
      <ng-content>
        <!-- Default handle icons -->
        @if (imageCompare.orientation() === 'horizontal') {
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            class="size-5"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            class="size-5 rotate-180"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        } @else {
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            class="size-5 -rotate-90"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            class="size-5 rotate-90"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        }
      </ng-content>
    </div>
  `,
  host: {
    'data-slot': 'image-compare-slider',
    '[class]': 'lineClass()',
    '[style]': 'lineStyle()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
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
      'flex items-center justify-center',
      this.imageCompare.orientation() === 'horizontal'
        ? 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10'
        : 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 flex-col',
    ),
  );
}
