import { Component, ViewEncapsulation, computed, signal } from '@angular/core';
import {
  ScButton,
  ScMenu,
  ScMenuContent,
  ScMenuItemIndicator,
  ScMenuPortal,
  ScMenuProvider,
  ScMenuRadioGroup,
  ScMenuRadioItem,
  ScMenuTrigger,
} from '@semantic-components/ui';
import {
  SiCheckIcon,
  SiChevronDownIcon,
  SiDownloadIcon,
} from '@semantic-icons/lucide-icons';

const DATE_RANGES = [
  { label: 'Last 7 days', value: 'last-7-days' },
  { label: 'Last 30 days', value: 'last-30-days' },
  { label: 'This month', value: 'this-month' },
  { label: 'Last month', value: 'last-month' },
];

/** The dashboard's title, its date range and the export. */
@Component({
  selector: 'app-analytics-header',
  imports: [
    ScButton,
    ScMenu,
    ScMenuContent,
    ScMenuItemIndicator,
    ScMenuPortal,
    ScMenuProvider,
    ScMenuRadioGroup,
    ScMenuRadioItem,
    ScMenuTrigger,
    SiCheckIcon,
    SiChevronDownIcon,
    SiDownloadIcon,
  ],
  template: `
    <header
      class="mx-auto flex w-full flex-col items-center justify-center gap-(--gap) px-(--gap) py-(--gap) sm:flex-row sm:justify-between"
    >
      <div class="flex flex-col gap-2 text-center sm:text-start">
        <h1
          class="font-heading line-clamp-1 text-3xl tracking-wide uppercase md:text-3xl lg:text-4xl"
        >
          Audience Analytics
        </h1>
        <p
          class="text-muted-foreground line-clamp-1 text-sm font-medium tracking-wider uppercase"
        >
          Editorial Performance Dashboard
        </p>
      </div>
      <div class="flex gap-2 sm:ms-auto md:gap-4">
        <div scMenuProvider alignment="end">
          <button
            scButton
            scMenuTrigger
            variant="outline"
            class="bg-background hover:bg-background/80 aria-expanded:bg-background"
          >
            {{ rangeLabel() }}
            <svg siChevronDownIcon data-icon="inline-end"></svg>
          </button>
          <ng-template scMenuPortal>
            <div scMenu>
              <ng-template scMenuContent>
                <div scMenuRadioGroup [(value)]="range">
                  @for (option of ranges; track option.value) {
                    <div scMenuRadioItem closeOnClick [value]="option.value">
                      <span scMenuItemIndicator><svg siCheckIcon></svg></span>
                      {{ option.label }}
                    </div>
                  }
                </div>
              </ng-template>
            </div>
          </ng-template>
        </div>
        <button scButton>
          <svg siDownloadIcon data-icon="inline-start"></svg>
          <span class="lg:hidden">Export</span>
          <span class="hidden lg:inline">Export Report</span>
        </button>
      </div>
    </header>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
})
export class AnalyticsHeader {
  protected readonly ranges = DATE_RANGES;
  protected readonly range = signal('last-30-days');
  protected readonly rangeLabel = computed(
    () =>
      DATE_RANGES.find((option) => option.value === this.range())?.label ??
      'Last 30 days',
  );
}
