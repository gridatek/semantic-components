import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BasicComboboxDemo } from './basic-combobox-demo';

@Component({
  selector: 'app-basic-combobox-demo-container',
  imports: [DemoContainer, BasicComboboxDemo],
  template: `
    <app-demo-container title="Basic" [code]="code">
      <app-basic-combobox-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicComboboxDemoContainer {
  readonly code = `import {
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
  selector: 'app-basic-combobox-demo',
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
          searchPlaceholder="Search framework..."
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
      @if (selectedValues().length > 0) {
        <p class="text-sm text-muted-foreground">
          Selected: {{ selectedValues()[0] }}
        </p>
      }
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicComboboxDemo {
  readonly search = signal('');
  readonly selectedValues = signal<string[]>([]);

  readonly frameworks: ComboboxOption[] = [
    { value: 'next', label: 'Next.js' },
    { value: 'sveltekit', label: 'SvelteKit' },
    { value: 'nuxt', label: 'Nuxt.js' },
    { value: 'remix', label: 'Remix' },
    { value: 'astro', label: 'Astro' },
    { value: 'angular', label: 'Angular' },
  ];

  readonly filteredOptions = computed(() => {
    const query = this.search().toLowerCase();
    if (!query) return this.frameworks;
    return this.frameworks.filter((o) => o.label.toLowerCase().includes(query));
  });

  readonly displayValue = computed(() => {
    const vals = this.selectedValues();
    if (vals.length === 0) return 'Select framework...';
    const option = this.frameworks.find((o) => o.value === vals[0]);
    return option?.label ?? 'Select framework...';
  });

  constructor() {
    afterRenderEffect(() => {
      const vals = this.selectedValues();
      if (vals.length > 0) {
        this.search.set('');
      }
    });
  }
}`;
}
