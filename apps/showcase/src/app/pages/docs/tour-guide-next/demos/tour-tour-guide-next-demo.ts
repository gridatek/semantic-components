import { Component, ViewEncapsulation } from '@angular/core';
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

/** A welcome (centred, no target), three steps on their targets — the page dimmed but for each — and a farewell. ← → step; Escape, or the ×, ends it. */
@Component({
  selector: 'app-tour-tour-guide-next-demo',
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
  template: `
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

    <div scTourGuideNext #tour="scTourGuideNext">
      <ng-template scTourGuideNextStep>
        <h2 scTourGuideNextTitle>Welcome to Acme</h2>
        <p scTourGuideNextDescription>
          A minute to see around — or close it, and find your own way.
        </p>
      </ng-template>
      <ng-template scTourGuideNextStep [for]="search">
        <h2 scTourGuideNextTitle>Search everything</h2>
        <p scTourGuideNextDescription>Projects, people and files, from here.</p>
      </ng-template>
      <ng-template scTourGuideNextStep [for]="menu" side="end">
        <h2 scTourGuideNextTitle>Your sections</h2>
        <p scTourGuideNextDescription>
          Inbox, projects and reports are always on the side.
        </p>
      </ng-template>
      <ng-template scTourGuideNextStep [for]="create" side="top">
        <h2 scTourGuideNextTitle>Start a project</h2>
        <p scTourGuideNextDescription>Everything begins here.</p>
      </ng-template>
      <ng-template scTourGuideNextStep>
        <h2 scTourGuideNextTitle>That is all</h2>
        <p scTourGuideNextDescription>
          Take the tour again any time, from the help menu.
        </p>
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
  `,
  host: { class: 'flex w-full flex-col items-center gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class TourTourGuideNextDemo {}
