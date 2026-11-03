import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScButton,
  ScCard,
  ScCardContent,
  ScCardDescription,
  ScCardFooter,
  ScCardHeader,
  ScCardTitle,
} from '@semantic-components/ui';
import { SiChevronRightIcon } from '@semantic-icons/lucide-icons';

/** size="sm": less spacing, a smaller title. */
@Component({
  selector: 'app-size-card-demo',
  imports: [
    ScButton,
    ScCard,
    ScCardContent,
    ScCardDescription,
    ScCardFooter,
    ScCardHeader,
    ScCardTitle,
    SiChevronRightIcon,
  ],
  template: `
    <div scCard size="sm" class="w-full max-w-xs">
      <div scCardHeader>
        <h4 scCardTitle>Scheduled reports</h4>
        <p scCardDescription>Weekly snapshots. No more manual exports.</p>
      </div>
      <div scCardContent>
        <ul class="grid gap-2 py-2 text-sm">
          @for (item of items; track item) {
            <li class="flex gap-2">
              <svg
                siChevronRightIcon
                class="text-muted-foreground mt-0.5 size-4 shrink-0"
              ></svg>
              <span>{{ item }}</span>
            </li>
          }
        </ul>
      </div>
      <div scCardFooter class="flex-col gap-2">
        <button scButton size="sm" class="w-full">
          Set up scheduled reports
        </button>
        <button scButton variant="outline" size="sm" class="w-full">
          See what&apos;s new
        </button>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class SizeCardDemo {
  protected readonly items = [
    'Choose a schedule (daily, or weekly).',
    'Send to channels or specific teammates.',
    'Include charts, tables, and key metrics.',
  ];
}
