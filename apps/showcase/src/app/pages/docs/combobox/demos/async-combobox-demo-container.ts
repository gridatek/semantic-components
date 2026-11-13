import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { AsyncComboboxDemo } from './async-combobox-demo';

@Component({
  selector: 'app-async-combobox-demo-container',
  imports: [DemoContainer, AsyncComboboxDemo],
  template: `
    <app-demo-container
      title="Async search"
      demoUrl="/demos/combobox/async-combobox-demo"
      [code]="code"
    >
      <app-async-combobox-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class AsyncComboboxDemoContainer {
  readonly code = `import {
  Component,
  ViewEncapsulation,
  effect,
  signal,
  viewChild,
} from '@angular/core';
import {
  ScCombobox,
  ScComboboxEmpty,
  ScComboboxInput,
  ScComboboxItem,
  ScComboboxItemIndicator,
  ScComboboxList,
  ScComboboxPopup,
  ScComboboxPortal,
  ScComboboxStatus,
  ScComboboxTrigger,
  ScInput,
  ScInputGroup,
  ScInputGroupAddon,
} from '@semantic-components/ui';
import { SiCheckIcon, SiChevronDownIcon } from '@semantic-icons/lucide-icons';

/** Options from a server: your search runs on query(), the options are its results; the status says when it searches. */
@Component({
  selector: 'app-async-combobox-demo',
  imports: [
    ScCombobox,
    ScComboboxEmpty,
    ScComboboxInput,
    ScComboboxItem,
    ScComboboxItemIndicator,
    ScComboboxList,
    ScComboboxPopup,
    ScComboboxPortal,
    ScComboboxStatus,
    ScComboboxTrigger,
    ScInput,
    ScInputGroup,
    ScInputGroupAddon,
    SiCheckIcon,
    SiChevronDownIcon,
  ],
  template: \`
    <div scCombobox [(value)]="city" class="w-56">
      <div scInputGroup>
        <input
          scInput
          scComboboxInput
          placeholder="Search a city"
          aria-label="City"
        />
        <div scInputGroupAddon side="inline-end">
          <button scComboboxTrigger>
            <svg siChevronDownIcon></svg>
            <span class="sr-only">Show the list</span>
          </button>
        </div>
      </div>
      <ng-template scComboboxPortal>
        <div scComboboxPopup>
          @if (loading()) {
            <p
              class="text-muted-foreground py-2 text-center text-sm"
              aria-hidden="true"
            >
              Searching…
            </p>
          } @else {
            <div scComboboxEmpty>No cities found.</div>
          }
          <div scComboboxList aria-label="Cities">
            @for (name of results(); track name) {
              <div scComboboxItem [value]="name">
                {{ name }}
                <span scComboboxItemIndicator><svg siCheckIcon></svg></span>
              </div>
            }
          </div>
          <div scComboboxStatus>
            @if (loading()) {
              Searching…
            } @else {
              {{ results().length }} results
            }
          </div>
        </div>
      </ng-template>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class AsyncComboboxDemo {
  private readonly combobox = viewChild.required(ScCombobox);
  protected readonly city = signal<string | null>(null);
  protected readonly results = signal<readonly string[]>([]);
  protected readonly loading = signal(false);

  private readonly cities = [
    'Algiers',
    'Amsterdam',
    'Barcelona',
    'Berlin',
    'Cairo',
    'Casablanca',
    'Lisbon',
    'London',
    'Madrid',
    'Marrakesh',
    'Paris',
    'Rome',
    'Tokyo',
    'Tunis',
  ];

  constructor() {
    // A server's answer, 400 ms later; a newer search replaces it.
    effect((onCleanup) => {
      const query = this.combobox().query().trim().toLowerCase();
      this.loading.set(true);
      const timer = setTimeout(() => {
        this.results.set(
          this.cities
            .filter((name) => name.toLowerCase().includes(query))
            .slice(0, 6),
        );
        this.loading.set(false);
      }, 400);
      onCleanup(() => clearTimeout(timer));
    });
  }
}`;
}
