import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ControlledTourGuideNextDemo } from './controlled-tour-guide-next-demo';

@Component({
  selector: 'app-controlled-tour-guide-next-demo-container',
  imports: [DemoContainer, ControlledTourGuideNextDemo],
  template: `
    <app-demo-container
      title="Controlled"
      [code]="code"
      demoUrl="/demos/tour-guide-next/controlled-tour-guide-next-demo"
    >
      <app-controlled-tour-guide-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class ControlledTourGuideNextDemoContainer {
  readonly code = `import {
  Component,
  ViewEncapsulation,
  effect,
  signal,
  untracked,
} from '@angular/core';
import { ScButton, ScInput } from '@semantic-components/ui';
import {
  ScTourGuideNext,
  ScTourGuideNextClose,
  ScTourGuideNextDescription,
  ScTourGuideNextNext,
  ScTourGuideNextPrevious,
  ScTourGuideNextStep,
  ScTourGuideNextTitle,
} from '@semantic-components/ui-lab';
import { SiXIcon } from '@semantic-icons/lucide-icons';

/** Open and step are two-way: start at any step from outside; (finished) at Done — closed is not finished. */
@Component({
  selector: 'app-controlled-tour-guide-next-demo',
  imports: [
    ScTourGuideNext,
    ScTourGuideNextStep,
    ScTourGuideNextTitle,
    ScTourGuideNextDescription,
    ScTourGuideNextNext,
    ScTourGuideNextPrevious,
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
    <div class="flex flex-wrap items-center gap-2">
      @for (label of labels; track label; let i = $index) {
        <button
          scButton
          variant="outline"
          size="sm"
          (click)="step.set(i); open.set(true)"
        >
          Start at {{ label }}
        </button>
      }
    </div>
    <p class="text-muted-foreground text-sm" role="status">{{ outcome() }}</p>

    <div
      scTourGuideNext
      #tour="scTourGuideNext"
      [(open)]="open"
      [(step)]="step"
      (finished)="outcome.set('Finished.')"
    >
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
      <div class="flex items-center gap-2 pt-1">
        <span class="text-muted-foreground text-xs tabular-nums">
          {{ tour.step() + 1 }} of {{ tour.count() }}
        </span>
        <button scTourGuideNextPrevious class="ms-auto">Back</button>
        <button scTourGuideNextNext>{{ tour.last() ? 'Done' : 'Next' }}</button>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full flex-col items-center gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class ControlledTourGuideNextDemo {
  readonly labels = ['Search', 'Sections', 'Create'];
  readonly open = signal(false);
  readonly step = signal(0);
  readonly outcome = signal('Not started.');

  constructor() {
    // Closed without finishing: said so.
    effect(() => {
      if (!this.open() && this.outcome() === 'Started.') {
        this.outcome.set('Closed at step ' + (this.step() + 1) + '.');
      }
      if (this.open()) untracked(() => this.outcome.set('Started.'));
    });
  }
}`;
}
