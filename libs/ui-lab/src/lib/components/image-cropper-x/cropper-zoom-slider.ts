import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { cn, ScSlider } from '@semantic-components/ui';
import { SC_CROPPER } from './cropper';

@Component({
  selector: '[scCropperZoomSlider]',
  imports: [ScSlider],
  template: `
    <input
      scSlider
      [min]="0.1"
      [max]="3"
      [step]="0.1"
      [value]="cropper.zoom()"
      (input)="onInput($event)"
    />
    <span class="text-muted-foreground min-w-[50px] text-center text-sm">
      {{ zoomPercentage() }}
    </span>
  `,
  host: {
    'data-slot': 'cropper-zoom-slider',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScCropperZoomSlider {
  protected readonly cropper = inject(SC_CROPPER);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('flex items-center gap-2', this.classInput()),
  );

  protected readonly zoomPercentage = computed(
    () => `${(this.cropper.zoom() * 100).toFixed(0)}%`,
  );

  protected onInput(event: Event): void {
    const value = parseFloat((event.target as HTMLInputElement).value);
    this.cropper.setZoom(value);
  }
}
