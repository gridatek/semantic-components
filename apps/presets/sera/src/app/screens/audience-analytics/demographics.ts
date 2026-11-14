import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScButton,
  ScCard,
  ScCardBody,
  ScCardDescription,
  ScCardFooter,
  ScCardHeader,
  ScCardTitle,
  ScProgress,
  ScProgressLabel,
  ScProgressRange,
  ScProgressTrack,
  ScProgressValueText,
} from '@semantic-components/ui';
import { SiMoveRightIcon } from '@semantic-icons/lucide-icons';

const AGES = [
  { age: '18 - 24', percentage: 22 },
  { age: '25 - 34', percentage: 64 },
  { age: '35 - 44', percentage: 12 },
  { age: '45+', percentage: 5 },
];

/** The readers by age, as bars. */
@Component({
  selector: 'app-demographics',
  imports: [
    ScButton,
    ScCard,
    ScCardBody,
    ScCardDescription,
    ScCardFooter,
    ScCardHeader,
    ScCardTitle,
    ScProgress,
    ScProgressLabel,
    ScProgressRange,
    ScProgressTrack,
    ScProgressValueText,
    SiMoveRightIcon,
  ],
  template: `
    <div scCard class="h-full">
      <div scCardHeader>
        <h2 scCardTitle class="text-2xl">Demographics</h2>
        <p scCardDescription>Reader Profile</p>
      </div>
      <div scCardBody class="flex flex-col gap-10">
        @for (item of ages; track item.age) {
          <div scProgress [value]="item.percentage">
            <span scProgressLabel>{{ item.age }}</span>
            <span scProgressValueText>{{ item.percentage }}%</span>
            <div scProgressTrack><div scProgressRange></div></div>
          </div>
        }
      </div>
      <div scCardFooter>
        <button scButton variant="link" class="w-full">
          View all source
          <svg siMoveRightIcon data-icon="inline-end"></svg>
        </button>
      </div>
    </div>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
})
export class Demographics {
  protected readonly ages = AGES;
}
