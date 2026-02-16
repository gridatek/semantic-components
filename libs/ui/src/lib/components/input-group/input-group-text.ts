import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'span[sc-input-group-text]',
  host: {
    'data-slot': 'input-group-text',
    '[class]': 'class()',
  },
})
export class ScInputGroupText {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      "text-muted-foreground gap-2 text-sm [&_svg:not([class*='size-'])]:size-4 flex items-center [&_svg]:pointer-events-none",
      this.classInput(),
    ),
  );
}
