import { Directive, computed, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

@Directive({
  selector: '[scLightboxThumbnailBar]',
  host: {
    '[class]': 'class()',
  },
})
export class ScLightboxThumbnailBar {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'flex items-center justify-center gap-2 overflow-x-auto bg-black/50 px-4 py-3',
      this.classInput(),
    ),
  );
}
