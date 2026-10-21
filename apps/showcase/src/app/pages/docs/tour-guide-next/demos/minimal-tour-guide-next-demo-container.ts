import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { MinimalTourGuideNextDemo } from './minimal-tour-guide-next-demo';

@Component({
  selector: 'app-minimal-tour-guide-next-demo-container',
  imports: [DemoContainer, MinimalTourGuideNextDemo],
  template: `
    <app-demo-container
      title="Minimal"
      [code]="code"
      demoUrl="/demos/tour-guide-next/minimal-tour-guide-next-demo"
    >
      <app-minimal-tour-guide-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class MinimalTourGuideNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { ScButton, ScInput } from '@semantic-components/ui';
import {
  ScTourGuideNext,
  ScTourGuideNextClose,
  ScTourGuideNextDescription,
  ScTourGuideNextNext,
  ScTourGuideNextStep,
  ScTourGuideNextTitle,
} from '@semantic-components/ui-lab';
import { SiXIcon } from '@semantic-icons/lucide-icons';

/** Three steps, Next and Done — no progress, no Back. */
@Component({
  selector: 'app-minimal-tour-guide-next-demo',
  imports: [
    ScTourGuideNext,
    ScTourGuideNextStep,
    ScTourGuideNextTitle,
    ScTourGuideNextDescription,
    ScTourGuideNextNext,
    ScTourGuideNextClose,
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

    <div scTourGuideNext #tour="scTourGuideNext">
      <ng-template scTourGuideNextStep [for]="search">
        <h2 scTourGuideNextTitle>Search</h2>
        <p scTourGuideNextDescription>Find anything.</p>
      </ng-template>
      <ng-template scTourGuideNextStep [for]="menu" side="end">
        <h2 scTourGuideNextTitle>Sections</h2>
        <p scTourGuideNextDescription>Move around.</p>
      </ng-template>
      <ng-template scTourGuideNextStep [for]="create" side="top">
        <h2 scTourGuideNextTitle>Create</h2>
        <p scTourGuideNextDescription>Make something new.</p>
      </ng-template>
      <button scTourGuideNextClose>
        <svg siXIcon></svg>
        <span class="sr-only">Close tour</span>
      </button>
      <div class="flex justify-end">
        <button scTourGuideNextNext>{{ tour.last() ? 'Done' : 'Next' }}</button>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full flex-col items-center gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class MinimalTourGuideNextDemo {}`;
}
