import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { TourTourGuideDemo } from './tour-tour-guide-demo';

@Component({
  selector: 'app-tour-tour-guide-demo-container',
  imports: [DemoContainer, TourTourGuideDemo],
  template: `
    <app-demo-container
      title="Tour"
      [code]="code"
      demoUrl="/demos/tour-guide/tour-tour-guide-demo"
    >
      <app-tour-tour-guide-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class TourTourGuideDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { ScButton, ScInput, ScTourGuide, ScTourGuideClose, ScTourGuideDescription, ScTourGuideNext, ScTourGuidePrevious, ScTourGuideStep, ScTourGuideTitle } from '@semantic-components/ui';
import { SiXIcon } from '@semantic-icons/lucide-icons';

/** A welcome (centred, no target), three steps on their targets — the page dimmed but for each — and a farewell. ← → step; Escape, or the ×, ends it. */
@Component({
  selector: 'app-tour-tour-guide-demo',
  imports: [
    ScTourGuide,
    ScTourGuideStep,
    ScTourGuideTitle,
    ScTourGuideDescription,
    ScTourGuideNext,
    ScTourGuidePrevious,
    ScTourGuideClose,
    ScButton,
    ScInput,
    SiXIcon,
  ],
  template: \`
    <div class="w-full max-w-2xl overflow-hidden rounded-lg border">
      <header class="flex items-center gap-3 border-b p-3">
        <span class="font-semibold">Acme</span>
        <input
          #search
          scInput
          type="search"
          aria-label="Search"
          placeholder="Search"
          class="ms-auto h-8 w-48"
        />
      </header>
      <div class="grid gap-3 p-3 sm:grid-cols-[10rem_1fr]">
        <div #menu class="bg-muted/50 space-y-1 rounded-md p-2 text-sm">
          <p>Inbox</p>
          <p>Projects</p>
          <p>Reports</p>
        </div>
        <div class="space-y-3">
          <div class="bg-card rounded-md border p-4 text-sm">
            Your week, at a glance.
          </div>
          <button #create scButton>New project</button>
        </div>
      </div>
    </div>
    <button scButton variant="outline" (click)="tour.start()">
      Take the tour
    </button>

    <div scTourGuide #tour="scTourGuide">
      <ng-template scTourGuideStep>
        <h2 scTourGuideTitle>Welcome to Acme</h2>
        <p scTourGuideDescription>
          A minute to see around — or close it, and find your own way.
        </p>
      </ng-template>
      <ng-template scTourGuideStep [for]="search">
        <h2 scTourGuideTitle>Search everything</h2>
        <p scTourGuideDescription>Projects, people and files, from here.</p>
      </ng-template>
      <ng-template scTourGuideStep [for]="menu" side="end">
        <h2 scTourGuideTitle>Your sections</h2>
        <p scTourGuideDescription>
          Inbox, projects and reports are always on the side.
        </p>
      </ng-template>
      <ng-template scTourGuideStep [for]="create" side="top">
        <h2 scTourGuideTitle>Start a project</h2>
        <p scTourGuideDescription>Everything begins here.</p>
      </ng-template>
      <ng-template scTourGuideStep>
        <h2 scTourGuideTitle>That is all</h2>
        <p scTourGuideDescription>
          Take the tour again any time, from the help menu.
        </p>
      </ng-template>
      <button scTourGuideClose>
        <svg siXIcon></svg>
        <span class="sr-only">Close tour</span>
      </button>
      <div class="flex items-center gap-2 pt-1">
        <span class="text-muted-foreground text-xs tabular-nums">
          {{ tour.step() + 1 }} of {{ tour.count() }}
        </span>
        <button scTourGuidePrevious class="ms-auto">Back</button>
        <button scTourGuideNext>{{ tour.last() ? 'Done' : 'Next' }}</button>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full flex-col items-center gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class TourTourGuideDemo {}`;
}
