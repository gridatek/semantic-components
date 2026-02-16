import { computed, Directive, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

@Directive({
  selector: '[scNativeSelectIcon]',
  host: {
    'data-slot': 'native-select-icon',
    '[class]': 'class()',
  },
})
export class ScNativeSelectIcon {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'text-muted-foreground top-1/2 right-2.5 size-4 -translate-y-1/2 pointer-events-none absolute select-none',
      this.classInput(),
    ),
  );
}
