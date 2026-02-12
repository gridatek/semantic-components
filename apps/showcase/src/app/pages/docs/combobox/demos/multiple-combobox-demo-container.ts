import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { MultipleComboboxDemo } from './multiple-combobox-demo';

@Component({
  selector: 'app-multiple-combobox-demo-container',
  imports: [DemoContainer, MultipleComboboxDemo],
  template: `
    <app-demo-container title="Multiple Selection" [code]="code">
      <app-multiple-combobox-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultipleComboboxDemoContainer {
  readonly code = `import {
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
  selector: 'app-multiple-combobox-demo',
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
  template: \`
    <div class="space-y-4">
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
          searchPlaceholder="Search language..."
          [(searchValue)]="search"
        >
          @if (filteredOptions().length === 0) {
            <div sc-combobox-empty>No results found.</div>
          }
          <div sc-combobox-list [multi]="true" [(values)]="selectedValues">
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
      @if (selectedValues().length > 0) {
        <p class="text-sm text-muted-foreground">
          Selected: {{ selectedLabels() }}
        </p>
      }
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultipleComboboxDemo {
  readonly search = signal('');
  readonly selectedValues = signal<string[]>([]);

  readonly languages: ComboboxOption[] = [
    { value: 'en', label: 'English' },
    { value: 'fr', label: 'French' },
    { value: 'de', label: 'German' },
    { value: 'es', label: 'Spanish' },
    { value: 'pt', label: 'Portuguese' },
    { value: 'ja', label: 'Japanese' },
    { value: 'zh', label: 'Chinese' },
  ];

  readonly filteredOptions = computed(() => {
    const query = this.search().toLowerCase();
    if (!query) return this.languages;
    return this.languages.filter((o) => o.label.toLowerCase().includes(query));
  });

  readonly displayValue = computed(() => {
    const vals = this.selectedValues();
    if (vals.length === 0) return 'Select languages...';
    if (vals.length === 1) {
      const option = this.languages.find((o) => o.value === vals[0]);
      return option?.label ?? 'Select languages...';
    }
    return \`\${vals.length} selected\`;
  });

  readonly selectedLabels = computed(() => {
    const vals = this.selectedValues();
    return vals
      .map((v) => this.languages.find((o) => o.value === v)?.label ?? v)
      .join(', ');
  });
}`;
}
