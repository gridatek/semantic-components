import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_LIGHTBOX_PROVIDER } from './lightbox-provider';

@Directive({
  selector: 'button[scLightboxClose]',
  host: {
    '[class]': 'class()',
    type: 'button',
    '(click)': 'provider.close()',
  },
})
export class ScLightboxClose {
  readonly provider = inject(SC_LIGHTBOX_PROVIDER);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      "absolute top-4 right-4 z-10 inline-flex size-10 items-center justify-center rounded-full text-white/80 hover:bg-white/10 hover:text-white [&_svg:not([class*='size-'])]:size-6",
      this.classInput(),
    ),
  );
}
