import { Combobox } from '@angular/aria/combobox';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
} from '@angular/core';
import { cn } from '../../utils';

@Component({
  selector: 'div[scComboboxSearch]',
  exportAs: 'scComboboxSearch',
  imports: [Combobox],
  template: `
    <div ngCombobox filterMode="manual" [alwaysExpanded]="true">
      <ng-content />
    </div>
  `,
  host: {
    'data-slot': 'combobox-search',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScComboboxSearch {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'relative flex w-full flex-col rounded-md border-none',
      this.classInput(),
    ),
  );
}
