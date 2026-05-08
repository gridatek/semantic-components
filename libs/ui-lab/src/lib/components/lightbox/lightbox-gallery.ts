import { Directive, computed, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

@Directive({
  selector: '[scLightboxGallery]',
  host: {
    '[class]': 'class()',
  },
})
export class ScLightboxGallery {
  readonly classInput = input<string>('', { alias: 'class' });
  protected readonly class = computed(() =>
    cn('grid grid-cols-3 gap-4', this.classInput()),
  );
}
