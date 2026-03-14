import { Directive, computed, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

@Directive({
  selector: '[scLightboxToolbar]',
  host: {
    '[class]': 'class()',
  },
})
export class ScLightboxToolbar {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'flex items-center justify-center gap-2 bg-black/50 px-4 py-3',
      this.classInput(),
    ),
  );
}
