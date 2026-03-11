import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_LIGHTBOX_PROVIDER } from './lightbox-provider';

@Directive({
  selector: '[scLightboxContainer]',
  host: {
    'data-slot': 'lightbox-container',
    '[class]': 'class()',
    role: 'dialog',
    'aria-modal': 'true',
    '[attr.aria-label]':
      "'Image gallery, showing image ' + (provider.currentIndex() + 1) + ' of ' + provider.images().length",
  },
})
export class ScLightboxContainer {
  readonly provider = inject(SC_LIGHTBOX_PROVIDER);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('fixed inset-0 z-10 flex flex-col', this.classInput()),
  );
}
