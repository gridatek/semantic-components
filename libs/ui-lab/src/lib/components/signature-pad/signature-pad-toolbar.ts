import { Directive, computed, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

@Directive({
  selector: 'div[scSignaturePadToolbar]',
  host: {
    '[class]': 'class()',
  },
})
export class ScSignaturePadToolbar {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('flex items-center gap-3', this.classInput()),
  );
}
