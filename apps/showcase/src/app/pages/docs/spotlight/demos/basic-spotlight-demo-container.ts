import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BasicSpotlightDemo } from './basic-spotlight-demo';

@Component({
  selector: 'app-basic-spotlight-demo-container',
  imports: [DemoContainer, BasicSpotlightDemo],
  template: `
    <app-demo-container
      title="Basic"
      [code]="code"
      demoUrl="/demos/spotlight/basic-spotlight-demo"
    >
      <app-basic-spotlight-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class BasicSpotlightDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { ScButton, ScSpotlight, ScSpotlightClose, ScSpotlightDescription, ScSpotlightTitle } from '@semantic-components/ui';
import { SiDownloadIcon, SiXIcon } from '@semantic-icons/lucide-icons';

/** A new feature, in the spotlight: the page dimmed and inert but for it, a card beside it, named by its title. Escape, a click on the dim, or Got it. */
@Component({
  selector: 'app-basic-spotlight-demo',
  imports: [
    ScSpotlight,
    ScSpotlightTitle,
    ScSpotlightDescription,
    ScSpotlightClose,
    ScButton,
    SiXIcon,
    SiDownloadIcon,
  ],
  template: \`
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

    <div scSpotlight #spot="scSpotlight" [for]="export">
      <button scSpotlightClose>
        <svg siXIcon></svg>
        <span class="sr-only">Close</span>
      </button>
      <h2 scSpotlightTitle class="pe-6 font-semibold">Export, now as PDF</h2>
      <p scSpotlightDescription class="text-muted-foreground text-sm">
        Your reports, ready to send — from here.
      </p>
      <div class="flex justify-end">
        <button scButton size="sm" (click)="spot.close()">Got it</button>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full flex-col items-center gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class BasicSpotlightDemo {}`;
}
