import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_LIGHTBOX_PROVIDER } from './lightbox-provider';

@Directive({
  selector: '[scLightboxThumbnail]',
  host: {
    'data-slot': 'lightbox-thumbnail',
    '[class]': 'class()',
    '(click)': 'onClick()',
    '[attr.aria-label]': "'Go to image ' + (index() + 1)",
  },
})
export class ScLightboxThumbnail {
  private readonly provider = inject(SC_LIGHTBOX_PROVIDER);

  readonly index = input.required<number>();
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'size-16 shrink-0 overflow-hidden rounded ring-2 ring-offset-2 ring-offset-black transition-all',
      this.index() === this.provider.currentIndex()
        ? 'ring-white'
        : 'ring-transparent hover:ring-white/50',
      this.classInput(),
    ),
  );

  onClick(): void {
    this.provider.goTo(this.index());
  }
}
