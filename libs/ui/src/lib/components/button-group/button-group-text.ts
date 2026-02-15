import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'div[sc-button-group-text]',
  host: {
    'data-slot': 'button-group-text',
    '[class]': 'class()',
  },
})
export class ScButtonGroupText {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      "bg-muted gap-2 rounded-lg border px-2.5 text-sm font-medium [&_svg:not([class*='size-'])]:size-4 flex items-center [&_svg]:pointer-events-none",
      this.classInput(),
    ),
  );
}
