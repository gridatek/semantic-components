import {
  Component,
  ViewEncapsulation,
  effect,
  signal,
  viewChild,
} from '@angular/core';
import {
  ScComboboxNext,
  ScComboboxNextEmpty,
  ScComboboxNextInput,
  ScComboboxNextItem,
  ScComboboxNextItemIndicator,
  ScComboboxNextList,
  ScComboboxNextPopup,
  ScComboboxNextPortal,
  ScComboboxNextStatus,
  ScComboboxNextTrigger,
  ScInput,
  ScInputGroup,
  ScInputGroupAddon,
} from '@semantic-components/ui';
import { SiCheckIcon, SiChevronDownIcon } from '@semantic-icons/lucide-icons';

/** Options from a server: your search runs on query(), the options are its results; the status says when it searches. */
@Component({
  selector: 'app-async-combobox-next-demo',
  imports: [
    ScComboboxNext,
    ScComboboxNextEmpty,
    ScComboboxNextInput,
    ScComboboxNextItem,
    ScComboboxNextItemIndicator,
    ScComboboxNextList,
    ScComboboxNextPopup,
    ScComboboxNextPortal,
    ScComboboxNextStatus,
    ScComboboxNextTrigger,
    ScInput,
    ScInputGroup,
    ScInputGroupAddon,
    SiCheckIcon,
    SiChevronDownIcon,
  ],
  template: `
    <div scComboboxNext [(value)]="city" class="w-56">
      <div scInputGroup>
        <input
          scInput
          scComboboxNextInput
          placeholder="Search a city"
          aria-label="City"
        />
        <div scInputGroupAddon align="inline-end">
          <button scComboboxNextTrigger>
            <svg siChevronDownIcon></svg>
            <span class="sr-only">Show the list</span>
          </button>
        </div>
      </div>
      <ng-template scComboboxNextPortal>
        <div scComboboxNextPopup>
          @if (loading()) {
            <p
              class="text-muted-foreground py-2 text-center text-sm"
              aria-hidden="true"
            >
              Searching…
            </p>
          } @else {
            <div scComboboxNextEmpty>No cities found.</div>
          }
          <div scComboboxNextList aria-label="Cities">
            @for (name of results(); track name) {
              <div scComboboxNextItem [value]="name">
                {{ name }}
                <span scComboboxNextItemIndicator><svg siCheckIcon></svg></span>
              </div>
            }
          </div>
          <div scComboboxNextStatus>
            @if (loading()) {
              Searching…
            } @else {
              {{ results().length }} results
            }
          </div>
        </div>
      </ng-template>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class AsyncComboboxNextDemo {
  private readonly combobox = viewChild.required(ScComboboxNext);
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
}
