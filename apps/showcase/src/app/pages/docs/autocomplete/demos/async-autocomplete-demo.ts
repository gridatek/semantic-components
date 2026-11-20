import {
  Component,
  ViewEncapsulation,
  effect,
  signal,
  viewChild,
} from '@angular/core';
import {
  ScAutocomplete,
  ScComboboxEmpty,
  ScComboboxInput,
  ScComboboxItem,
  ScComboboxList,
  ScComboboxPopup,
  ScComboboxPortal,
  ScComboboxStatus,
  ScInput,
} from '@semantic-components/ui';

/** Suggestions from a server: your search runs on query(), a status says it is searching. */
@Component({
  selector: 'app-async-autocomplete-demo',
  imports: [
    ScAutocomplete,
    ScComboboxEmpty,
    ScComboboxInput,
    ScComboboxItem,
    ScComboboxList,
    ScComboboxPopup,
    ScComboboxPortal,
    ScInput,
    ScComboboxStatus,
  ],
  template: `
    <div scAutocomplete [(value)]="city" class="w-64">
      <input
        scInput
        scComboboxInput
        aria-label="City"
        placeholder="Search a city"
      />
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
            <div scComboboxEmpty>No city found.</div>
          }
          <div scComboboxList aria-label="Cities">
            @for (name of results(); track name) {
              <div scComboboxItem [value]="name">{{ name }}</div>
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
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class AsyncAutocompleteDemo {
  private readonly autocomplete = viewChild.required(ScAutocomplete);
  private readonly city = signal('');
  private readonly results = signal<readonly string[]>([]);
  private readonly loading = signal(false);
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
      const query = this.autocomplete().query().trim().toLowerCase();
      this.loading.set(true);
      const timer = setTimeout(() => {
        this.results.set(
          this.cities.filter((name) => name.toLowerCase().includes(query)),
        );
        this.loading.set(false);
      }, 400);
      onCleanup(() => clearTimeout(timer));
    });
  }
}
