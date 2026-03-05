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

@Component({
  selector: 'div[scMultiselectTrigger]',
  exportAs: 'scMultiselectTrigger',
  imports: [ComboboxInput],
  template: `
    <ng-content />
    <input
      ngComboboxInput
      aria-label="Label dropdown"
      placeholder="Select a label"
      class="absolute inset-0 h-full w-full cursor-pointer border-none bg-transparent opacity-0 outline-none"
    />
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
