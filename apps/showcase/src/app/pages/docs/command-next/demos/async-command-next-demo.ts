import { Component, ViewEncapsulation, effect, signal } from '@angular/core';
import {
  ScCommandNext,
  ScCommandNextEmpty,
  ScCommandNextGroup,
  ScCommandNextGroupLabel,
  ScCommandNextInput,
  ScCommandNextInputGroup,
  ScCommandNextItem,
  ScCommandNextList,
  ScCommandNextStatus,
  ScFrame,
} from '@semantic-components/ui';
import { SiSearchIcon } from '@semantic-icons/lucide-icons';

/** Results from a server: shouldFilter off, your search runs on the text and the items are its results. */
@Component({
  selector: 'app-async-command-next-demo',
  imports: [
    ScCommandNext,
    ScCommandNextEmpty,
    ScCommandNextGroup,
    ScCommandNextGroupLabel,
    ScCommandNextInput,
    ScCommandNextInputGroup,
    ScCommandNextItem,
    ScCommandNextList,
    ScCommandNextStatus,
    ScFrame,
    SiSearchIcon,
  ],
  template: `
    <div class="flex w-full max-w-sm flex-col gap-3">
      <div scCommandNext #cmd="scCommandNext" [shouldFilter]="false" scFrame>
        <div scCommandNextInputGroup>
          <svg siSearchIcon></svg>
          <input
            scCommandNextInput
            placeholder="Search countries..."
            aria-label="Search countries"
            [(value)]="query"
          />
        </div>
        <div scCommandNextList aria-label="Countries">
          @if (!loading()) {
            <div scCommandNextEmpty>No countries found.</div>
          }
          <div scCommandNextGroup>
            <div scCommandNextGroupLabel>Countries</div>
            @for (country of results(); track country) {
              <div scCommandNextItem (select)="ran(country)">{{ country }}</div>
            }
          </div>
        </div>
        <div scCommandNextStatus>
          @if (loading()) {
            Searching…
          } @else {
            {{ cmd.count() }} results
          }
        </div>
        @if (loading()) {
          <p
            class="text-muted-foreground py-6 text-center text-sm"
            aria-hidden="true"
          >
            Searching…
          </p>
        }
      </div>
      <p class="text-muted-foreground text-sm" aria-live="polite">
        @if (last()) {
          Ran {{ last() }}.
        }
      </p>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class AsyncCommandNextDemo {
  protected readonly query = signal('');
  protected readonly results = signal<readonly string[]>([]);
  protected readonly loading = signal(false);
  protected readonly last = signal('');

  private readonly countries = [
    'Algeria',
    'Argentina',
    'Australia',
    'Belgium',
    'Brazil',
    'Canada',
    'Chile',
    'Denmark',
    'Egypt',
    'France',
    'Germany',
    'Greece',
    'India',
    'Italy',
    'Japan',
    'Kenya',
    'Mexico',
    'Morocco',
    'Netherlands',
    'Norway',
    'Portugal',
    'Senegal',
    'Spain',
    'Sweden',
    'Tunisia',
    'Turkey',
    'United Kingdom',
    'United States',
  ];

  constructor() {
    // A server's answer, 400 ms later; a newer search replaces it.
    effect((onCleanup) => {
      const query = this.query().trim().toLowerCase();
      this.loading.set(true);
      const timer = setTimeout(() => {
        this.results.set(
          this.countries
            .filter((c) => c.toLowerCase().includes(query))
            .slice(0, 8),
        );
        this.loading.set(false);
      }, 400);
      onCleanup(() => clearTimeout(timer));
    });
  }

  protected ran(name: string): void {
    this.last.set(name);
  }
}
