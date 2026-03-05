import { Combobox } from '@angular/aria/combobox';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '../../utils';

@Component({
  selector: 'div[scMultiselectPopup]',
  imports: [],
  template: `
    <ng-content />
  `,
  host: {
    'data-slot': 'multiselect-popup',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScMultiselectPopup {
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly combobox = inject(Combobox);

  protected readonly class = computed(() =>
    cn(
      'bg-popover text-popover-foreground mt-2 w-full rounded-lg border p-1 shadow-md transition-all duration-150',
      this.combobox.expanded() ? '' : 'invisible max-h-0 overflow-hidden',
      this.classInput(),
    ),
  );
}
