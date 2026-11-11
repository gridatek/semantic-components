import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { AsyncCommandDemo } from './async-command-demo';

@Component({
  selector: 'app-async-command-demo-container',
  imports: [DemoContainer, AsyncCommandDemo],
  template: `
    <app-demo-container
      title="Async search"
      demoUrl="/demos/command/async-command-demo"
      [code]="code"
    >
      <app-async-command-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class AsyncCommandDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, effect, signal } from '@angular/core';
import {
  ScCommand,
  ScCommandEmpty,
  ScCommandGroup,
  ScCommandGroupLabel,
  ScCommandInput,
  ScCommandInputGroup,
  ScCommandItem,
  ScCommandList,
  ScCommandStatus,
  ScFrame,
} from '@semantic-components/ui';
import { SiSearchIcon } from '@semantic-icons/lucide-icons';

/** Results from a server: shouldFilter off, your search runs on the text and the items are its results. */
@Component({
  selector: 'app-async-command-demo',
  imports: [
    ScCommand,
    ScCommandEmpty,
    ScCommandGroup,
    ScCommandGroupLabel,
    ScCommandInput,
    ScCommandInputGroup,
    ScCommandItem,
    ScCommandList,
    ScCommandStatus,
    ScFrame,
    SiSearchIcon,
  ],
  template: \`
    <div class="flex w-full max-w-sm flex-col gap-3">
      <div scCommand #cmd="scCommand" [shouldFilter]="false" scFrame>
        <div scCommandInputGroup>
          <svg siSearchIcon></svg>
          <input
            scCommandInput
            placeholder="Search countries..."
            aria-label="Search countries"
            [(value)]="query"
          />
        </div>
        <div scCommandList aria-label="Countries">
          @if (!loading()) {
            <div scCommandEmpty>No countries found.</div>
          }
          <div scCommandGroup>
            <div scCommandGroupLabel>Countries</div>
            @for (country of results(); track country) {
              <div scCommandItem (select)="ran(country)">{{ country }}</div>
            }
          </div>
        </div>
        <div scCommandStatus>
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
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class AsyncCommandDemo {
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
}`;
}
