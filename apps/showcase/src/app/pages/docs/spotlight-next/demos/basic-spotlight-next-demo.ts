import { Component, ViewEncapsulation } from '@angular/core';
import { ScButton } from '@semantic-components/ui';
import {
  ScSpotlightNext,
  ScSpotlightNextClose,
  ScSpotlightNextDescription,
  ScSpotlightNextTitle,
} from '@semantic-components/ui-lab';
import { SiDownloadIcon, SiXIcon } from '@semantic-icons/lucide-icons';

/** A new feature, in the spotlight: the page dimmed and inert but for it, a card beside it, named by its title. Escape, a click on the dim, or Got it. */
@Component({
  selector: 'app-basic-spotlight-next-demo',
  imports: [
    ScSpotlightNext,
    ScSpotlightNextTitle,
    ScSpotlightNextDescription,
    ScSpotlightNextClose,
    ScButton,
    SiXIcon,
    SiDownloadIcon,
  ],
  template: `
    <div
      class="flex w-full max-w-xl items-center justify-between rounded-lg border p-4"
    >
      <span class="font-medium">Monthly report</span>
      <button #export scButton variant="outline" size="sm">
        <svg siDownloadIcon></svg>
        Export
      </button>
    </div>
    <button scButton (click)="spot.show()">What's new</button>

    <div scSpotlightNext #spot="scSpotlightNext" [for]="export">
      <button scSpotlightNextClose>
        <svg siXIcon></svg>
        <span class="sr-only">Close</span>
      </button>
      <h2 scSpotlightNextTitle class="pe-6 font-semibold">
        Export, now as PDF
      </h2>
      <p scSpotlightNextDescription class="text-muted-foreground text-sm">
        Your reports, ready to send — from here.
      </p>
      <div class="flex justify-end">
        <button scButton size="sm" (click)="spot.close()">Got it</button>
      </div>
    </div>
  `,
  host: { class: 'flex w-full flex-col items-center gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class BasicSpotlightNextDemo {}
