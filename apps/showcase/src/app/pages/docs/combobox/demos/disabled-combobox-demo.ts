import {
  afterRenderEffect,
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScCombobox,
  ScComboboxPortal,
  ScComboboxEmpty,
  ScComboboxIcon,
  ScComboboxInput,
  ScComboboxItem,
  ScComboboxItemIndicator,
  ScComboboxList,
  ScComboboxTrigger,
} from '@semantic-components/ui-lab';

interface ComboboxOption {
  value: string;
  label: string;
  disabled?: boolean;
}

@Component({
  selector: 'app-disabled-combobox-demo',
  imports: [
    ScCombobox,
    ScComboboxTrigger,
    ScComboboxInput,
    ScComboboxIcon,
    ScComboboxPortal,
    ScComboboxList,
    ScComboboxItem,
    ScComboboxItemIndicator,
    ScComboboxEmpty,
  ],
  template: `
    <div sc-combobox class="w-[200px]">
      <div sc-combobox-trigger>
        <span class="pointer-events-none absolute left-3 truncate">
          {{ displayValue() }}
        </span>
        <input sc-combobox-input />
        <svg
          sc-combobox-icon
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="m7 15 5 5 5-5" />
          <path d="m7 9 5-5 5 5" />
        </svg>
      </div>
      <div
        sc-combobox-portal
        searchPlaceholder="Search status..."
        [(searchValue)]="search"
      >
        @if (filteredOptions().length === 0) {
          <div sc-combobox-empty>No results found.</div>
        }
        <div sc-combobox-list [(values)]="selectedValues">
          @for (option of filteredOptions(); track option.value) {
            <div
              sc-combobox-item
              [value]="option.value"
              [label]="option.label"
              [disabled]="option.disabled ?? false"
            >
              <span>{{ option.label }}</span>
              <svg
                sc-combobox-item-indicator
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </div>
          }
        </div>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisabledComboboxDemo {
  readonly search = signal('');
  readonly selectedValues = signal<string[]>([]);

  readonly statuses: ComboboxOption[] = [
    { value: 'backlog', label: 'Backlog' },
    { value: 'todo', label: 'Todo' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'done', label: 'Done' },
    { value: 'cancelled', label: 'Cancelled', disabled: true },
  ];

  readonly filteredOptions = computed(() => {
    const query = this.search().toLowerCase();
    if (!query) return this.statuses;
    return this.statuses.filter((o) => o.label.toLowerCase().includes(query));
  });

  readonly displayValue = computed(() => {
    const vals = this.selectedValues();
    if (vals.length === 0) return 'Select status...';
    const option = this.statuses.find((o) => o.value === vals[0]);
    return option?.label ?? 'Select status...';
  });

  constructor() {
    afterRenderEffect(() => {
      const vals = this.selectedValues();
      if (vals.length > 0) {
        this.search.set('');
      }
    });
  }
}
