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
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  afterRenderEffect,
  computed,
  signal,
} from '@angular/core';
import {
  ScCombobox,
  ScComboboxEmpty,
  ScComboboxIcon,
  ScComboboxInput,
  ScComboboxItem,
  ScComboboxItemIndicator,
  ScComboboxList,
  ScComboboxPortal,
  ScComboboxTrigger,
} from '@semantic-components/ui-lab';
import {
  SiCheckIcon,
  SiChevronsUpDownIcon,
} from '@semantic-icons/lucide-icons';

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
    SiChevronsUpDownIcon,
    SiCheckIcon,
  ],
  template: \`
    <div class="space-y-4">
      <div scCombobox class="w-[200px]">
        <div scComboboxTrigger>
          <span class="pointer-events-none absolute left-3 truncate">
            {{ displayValue() }}
          </span>
          <input scComboboxInput />
          <svg siChevronsUpDownIcon scComboboxIcon></svg>
        </div>
        <div
          scComboboxPortal
          searchPlaceholder="Search framework..."
          [(searchValue)]="search"
        >
          @if (filteredOptions().length === 0) {
            <div scComboboxEmpty>No results found.</div>
          }
          <div scComboboxList [(values)]="selectedValues">
            @for (option of filteredOptions(); track option.value) {
              <div scComboboxItem [value]="option.value" [label]="option.label">
                <span>{{ option.label }}</span>
                <svg siCheckIcon scComboboxItemIndicator></svg>
              </div>
            }
          </div>
        </div>
      </div>
      @if (selectedValues().length > 0) {
        <p class="text-muted-foreground text-sm">
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
