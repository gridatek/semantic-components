import { computed, Directive, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_CROPPER } from './cropper';

@Directive({
  selector: 'button[scCropperAspectRatio]',
  host: {
    'data-slot': 'cropper-aspect-ratio',
    '[class]': 'class()',
    '[attr.data-selected]': 'selected() || null',
    '[attr.aria-pressed]': 'selected()',
    '(click)': 'selectAspectRatio()',
  },
})
export class ScCropperAspectRatio {
  private readonly cropper = inject(SC_CROPPER);

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
    alias: 'scCropperAspectRatio',
  });

  readonly selected = computed(() => {
    const current = this.cropper.aspectRatio();
    const value = this.value();
    if (value === null && current === null) return true;
    if (value === null || current === null) return false;
    return Math.abs(current - value) < 0.001;
  });

  selectAspectRatio(): void {
    this.cropper.aspectRatio.set(this.value());
  }
}
