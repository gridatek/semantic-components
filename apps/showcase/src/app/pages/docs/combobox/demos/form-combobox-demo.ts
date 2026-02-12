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
}

@Component({
  selector: 'app-form-combobox-demo',
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
    <div class="grid gap-4 max-w-sm">
      <div class="space-y-2">
        <label class="text-sm font-medium">Timezone</label>
        <div sc-combobox>
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
            searchPlaceholder="Search timezone..."
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
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComboboxDemo {
  readonly search = signal('');
  readonly selectedValues = signal<string[]>([]);

  readonly timezones: ComboboxOption[] = [
    { value: 'utc', label: 'UTC' },
    { value: 'est', label: 'Eastern Time (ET)' },
    { value: 'cst', label: 'Central Time (CT)' },
    { value: 'mst', label: 'Mountain Time (MT)' },
    { value: 'pst', label: 'Pacific Time (PT)' },
    { value: 'gmt', label: 'Greenwich Mean Time (GMT)' },
    { value: 'cet', label: 'Central European Time (CET)' },
    { value: 'jst', label: 'Japan Standard Time (JST)' },
  ];

  readonly filteredOptions = computed(() => {
    const query = this.search().toLowerCase();
    if (!query) return this.timezones;
    return this.timezones.filter((o) => o.label.toLowerCase().includes(query));
  });

  readonly displayValue = computed(() => {
    const vals = this.selectedValues();
    if (vals.length === 0) return 'Select timezone...';
    const option = this.timezones.find((o) => o.value === vals[0]);
    return option?.label ?? 'Select timezone...';
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
