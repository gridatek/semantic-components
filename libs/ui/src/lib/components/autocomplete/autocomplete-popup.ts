import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'div[scAutocompletePopup]',
  host: {
    '[class]': 'class()',
    'animate.enter': 'animate-in fade-in-0 zoom-in-95 duration-150',
    'animate.leave': 'animate-out fade-out-0 zoom-out-95 duration-150',
  },
})
export class ScAutocompletePopup {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'bg-popover text-popover-foreground ring-foreground/10 relative z-50 max-h-44 w-full min-w-36 overflow-y-auto rounded-lg p-1 shadow-md ring-1',
      this.classInput(),
    ),
  );
}
