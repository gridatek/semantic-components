import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScButton,
  ScCard,
  ScCardBody,
  ScCardDescription,
  ScCardFooter,
  ScCardHeader,
  ScCardTitle,
  ScDialog,
  ScDialogClose,
  ScDialogDescription,
  ScDialogHeader,
  ScDialogPortal,
  ScDialogProvider,
  ScDialogTitle,
  ScDialogTrigger,
  ScProgress,
  ScProgressLabel,
  ScProgressRange,
  ScProgressTrack,
  ScProgressValueText,
} from '@semantic-components/ui';
import { SiMoveRightIcon, SiXIcon } from '@semantic-icons/lucide-icons';

export const AGES = [
  { age: '18 - 24', percentage: 22 },
  { age: '25 - 34', percentage: 64 },
  { age: '35 - 44', percentage: 12 },
  { age: '45+', percentage: 5 },
];

/** Where the readers come from: the demographics card's "View all sources". */
export const SOURCES = [
  { source: 'Search', percentage: 38 },
  { source: 'Newsletter', percentage: 24 },
  { source: 'Direct', percentage: 17 },
  { source: 'Social', percentage: 14 },
  { source: 'Referral', percentage: 7 },
];

/** The readers by age, as bars; their sources in a dialog. */
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
    ScDialog,
    ScDialogClose,
    ScDialogDescription,
    ScDialogHeader,
    ScDialogPortal,
    ScDialogProvider,
    ScDialogTitle,
    ScDialogTrigger,
    ScProgress,
    ScProgressLabel,
    ScProgressRange,
    ScProgressTrack,
    ScProgressValueText,
    SiMoveRightIcon,
    SiXIcon,
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
        <div scDialogProvider>
          <button scButton scDialogTrigger variant="link" class="w-full">
            View all sources
            <svg siMoveRightIcon data-icon="inline-end"></svg>
          </button>
          <ng-template scDialogPortal>
            <div scDialog>
              <button scDialogClose>
                <svg siXIcon></svg>
                <span class="sr-only">Close</span>
              </button>
              <div scDialogHeader>
                <h2 scDialogTitle>Reader Sources</h2>
                <p scDialogDescription>
                  Where this period's readers came from.
                </p>
              </div>
              <div class="flex flex-col gap-6">
                @for (item of sources; track item.source) {
                  <div scProgress [value]="item.percentage">
                    <span scProgressLabel>{{ item.source }}</span>
                    <span scProgressValueText>{{ item.percentage }}%</span>
                    <div scProgressTrack><div scProgressRange></div></div>
                  </div>
                }
              </div>
            </div>
          </ng-template>
        </div>
      </div>
    </div>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
})
export class Demographics {
  protected readonly ages = AGES;
  private readonly sources = SOURCES;
}
