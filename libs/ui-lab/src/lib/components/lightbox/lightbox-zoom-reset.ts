import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_LIGHTBOX_PROVIDER } from './lightbox-provider';

@Directive({
  selector: 'button[scLightboxZoomReset]',
  host: {
    '[class]': 'class()',
    type: 'button',
    '(click)': 'provider.resetZoom()',
    '[attr.aria-label]': "'Reset zoom'",
  },
})
export class ScLightboxZoomReset {
  readonly provider = inject(SC_LIGHTBOX_PROVIDER);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      "p-2 text-white/80 transition-colors hover:text-white [&_svg:not([class*='size-'])]:size-5",
      this.classInput(),
    ),
  );
}
