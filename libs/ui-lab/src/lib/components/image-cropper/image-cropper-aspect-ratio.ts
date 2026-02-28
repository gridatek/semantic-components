import { computed, Directive, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_IMAGE_CROPPER } from './image-cropper';

@Directive({
  selector: 'button[scImageCropperAspectRatio]',
  host: {
    'data-slot': 'image-cropper-aspect-ratio',
    '[class]': 'class()',
    '[attr.data-selected]': 'selected() || null',
    '[attr.aria-pressed]': 'selected()',
    '(click)': 'selectAspectRatio()',
  },
})
export class ScImageCropperAspectRatio {
  private readonly cropper = inject(SC_IMAGE_CROPPER);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'rounded-md border px-3 py-1 text-sm transition-colors',
      this.selected()
        ? 'bg-primary text-primary-foreground'
        : 'bg-background hover:bg-accent',
      this.classInput(),
    ),
  );

  readonly value = input<number | null>(null, {
    alias: 'scImageCropperAspectRatio',
  });

  readonly selected = computed(() => {
    const current = this.cropper.aspectRatio();
    const value = this.value();
    if (value === null && current === null) return true;
    if (value === null || current === null) return false;
    return Math.abs(current - value) < 0.001;
  });

  selectAspectRatio(): void {
    this.cropper.setAspectRatio(this.value());
  }
}
