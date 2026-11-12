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

/** A week's workout load: a day each, its load as a filled bar. */
@Component({
  selector: 'app-preview-weekly-fitness-summary',
  imports: [
    ScButton,
    ScCard,
    ScCardContent,
    ScCardDescription,
    ScCardFooter,
    ScCardHeader,
    ScCardTitle,
  ],
  template: `
    <div scCard>
      <div scCardHeader>
        <h2 scCardTitle>Weekly Fitness Summary</h2>
        <p scCardDescription>Calories and workout load by day</p>
      </div>
      <div scCardContent class="flex flex-col gap-4">
        <ul class="grid grid-cols-7 gap-1.5" aria-label="Workout load by day">
          @for (day of week; track $index) {
            <li class="ring-border rounded-md p-1.5 text-center ring">
              <div class="text-muted-foreground text-sm" aria-hidden="true">
                {{ day.day }}
              </div>
              <span class="sr-only">{{ day.name }}: {{ day.load }}%</span>
              <div
                class="bg-muted relative mt-1 h-16 overflow-hidden rounded-sm"
                aria-hidden="true"
              >
                <div
                  class="bg-chart-3 absolute inset-x-0 bottom-0 rounded-sm"
                  [style.height.%]="day.load"
                ></div>
              </div>
            </li>
          }
        </ul>
      </div>
      <div scCardFooter>
        <button scButton class="w-full">View details</button>
      </div>
    </div>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class PreviewWeeklyFitnessSummary {
  protected readonly week = [
    { day: 'M', name: 'Monday', load: 84 },
    { day: 'T', name: 'Tuesday', load: 52 },
    { day: 'W', name: 'Wednesday', load: 73 },
    { day: 'T', name: 'Thursday', load: 66 },
    { day: 'F', name: 'Friday', load: 91 },
    { day: 'S', name: 'Saturday', load: 48 },
    { day: 'S', name: 'Sunday', load: 61 },
  ];
}
