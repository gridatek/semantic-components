import { ComboboxInput } from '@angular/aria/combobox';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SiChevronDownIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'div[scMultiselectTrigger]',
  exportAs: 'scMultiselectTrigger',
  imports: [ComboboxInput, SiChevronDownIcon],
  template: `
    <ng-content />
    <input
      ngComboboxInput
      aria-label="Label dropdown"
      placeholder="Select a label"
      class="absolute inset-0 h-full w-full cursor-pointer border-none bg-transparent opacity-0 outline-none"
    />
    <svg
      siChevronDownIcon
      class="text-muted-foreground pointer-events-none absolute end-3 size-4 shrink-0 transition-transform duration-150 [[aria-expanded=true]_&]:rotate-180"
    ></svg>
  `,
  host: {
    'data-slot': 'multiselect-trigger',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScMultiselectTrigger {
  readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'bg-background text-foreground hover:bg-accent relative flex items-center rounded-lg border transition-colors',
      this.classInput(),
    ),
  );
}
