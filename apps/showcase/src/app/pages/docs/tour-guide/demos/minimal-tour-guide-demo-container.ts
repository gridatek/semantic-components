import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { MinimalTourGuideDemo } from './minimal-tour-guide-demo';

@Component({
  selector: 'app-minimal-tour-guide-demo-container',
  imports: [DemoContainer, MinimalTourGuideDemo],
  template: `
    <app-demo-container
      title="Minimal"
      [code]="code"
      demoUrl="/demos/tour-guide/minimal-tour-guide-demo"
    >
      <app-minimal-tour-guide-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class MinimalTourGuideDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { ScButton, ScInput } from '@semantic-components/ui';
import {
  ScTourGuide,
  ScTourGuideClose,
  ScTourGuideDescription,
  ScTourGuideNext,
  ScTourGuideStep,
  ScTourGuideTitle,
} from '@semantic-components/ui-lab';
import { SiXIcon } from '@semantic-icons/lucide-icons';

/** Three steps, Next and Done — no progress, no Back. */
@Component({
  selector: 'app-minimal-tour-guide-demo',
  imports: [
    ScTourGuide,
    ScTourGuideStep,
    ScTourGuideTitle,
    ScTourGuideDescription,
    ScTourGuideNext,
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
    <button scButton variant="outline" (click)="tour.start()">Show me</button>

    <div scTourGuide #tour="scTourGuide">
      <ng-template scTourGuideStep [for]="search">
        <h2 scTourGuideTitle>Search</h2>
        <p scTourGuideDescription>Find anything.</p>
      </ng-template>
      <ng-template scTourGuideStep [for]="menu" side="end">
        <h2 scTourGuideTitle>Sections</h2>
        <p scTourGuideDescription>Move around.</p>
      </ng-template>
      <ng-template scTourGuideStep [for]="create" side="top">
        <h2 scTourGuideTitle>Create</h2>
        <p scTourGuideDescription>Make something new.</p>
      </ng-template>
      <button scTourGuideClose>
        <svg siXIcon></svg>
        <span class="sr-only">Close tour</span>
      </button>
      <div class="flex justify-end">
        <button scTourGuideNext>{{ tour.last() ? 'Done' : 'Next' }}</button>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full flex-col items-center gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class MinimalTourGuideDemo {}`;
}
