import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_LIGHTBOX_PROVIDER } from './lightbox-provider';

@Directive({
  selector: '[scLightboxGalleryItem]',
  host: {
    'data-slot': 'lightbox-gallery-item',
    '[class]': 'class()',
    '(click)': 'onClick()',
  },
})
export class ScLightboxGalleryItem {
  private readonly provider = inject(SC_LIGHTBOX_PROVIDER);

  readonly index = input<number>(0);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'aspect-square cursor-pointer overflow-hidden rounded-lg transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
      this.classInput(),
    ),
  );

  onClick(): void {
    this.provider.open(this.index());
  }
}
