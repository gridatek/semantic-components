import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';
import { SC_IMAGE_CROPPER } from './image-cropper';

@Component({
  selector: '[sc-image-cropper-aspect-ratio]',
  template: `
    <div class="flex items-center gap-1">
      @for (option of options(); track option.value) {
        <button
          type="button"
          class="px-3 py-1 text-sm rounded-md border transition-colors"
          [class]="
            isSelected(option.value)
              ? 'bg-primary text-primary-foreground'
              : 'bg-background hover:bg-accent'
          "
          (click)="selectAspectRatio(option.value)"
        >
          {{ option.label }}
        </button>
      }
    </div>
  `,
  host: {
    'data-slot': 'image-cropper-aspect-ratio',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScImageCropperAspectRatio {
  readonly cropper = inject(SC_IMAGE_CROPPER);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly options = input<{ label: string; value: number | null }[]>([
    { label: 'Free', value: null },
    { label: '1:1', value: 1 },
    { label: '4:3', value: 4 / 3 },
    { label: '16:9', value: 16 / 9 },
  ]);

  readonly aspectRatioChange = output<number | null>();

  protected readonly class = computed(() => cn('', this.classInput()));

  isSelected(value: number | null): boolean {
    const current = this.cropper.aspectRatio();
    if (value === null && current === null) return true;
    if (value === null || current === null) return false;
    return Math.abs(current - value) < 0.001;
  }

  selectAspectRatio(value: number | null): void {
    this.aspectRatioChange.emit(value);
  }
}
