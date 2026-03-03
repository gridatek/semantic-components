import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
} from '@angular/core';
import { cn } from '../../utils';

@Component({
  selector: 'div[scAutocompletePopup]',
  template: `
    <ng-content />
  `,
  host: {
    'data-slot': 'autocomplete-popup',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScAutocompletePopup {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'bg-popover text-popover-foreground mt-2 max-h-44 w-full overflow-auto rounded-lg border p-1 shadow-md',
      this.classInput(),
    ),
  );
}
