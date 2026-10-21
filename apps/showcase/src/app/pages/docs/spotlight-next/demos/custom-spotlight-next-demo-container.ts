import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { CustomSpotlightNextDemo } from './custom-spotlight-next-demo';

@Component({
  selector: 'app-custom-spotlight-next-demo-container',
  imports: [DemoContainer, CustomSpotlightNextDemo],
  template: `
    <app-demo-container
      title="Custom dim"
      [code]="code"
      demoUrl="/demos/spotlight-next/custom-spotlight-next-demo"
    >
      <app-custom-spotlight-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class CustomSpotlightNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { ScButton } from '@semantic-components/ui';
import {
  ScSpotlightNext,
  ScSpotlightNextClose,
  ScSpotlightNextDescription,
  ScSpotlightNextTitle,
} from '@semantic-components/ui-lab';
import { SiXIcon } from '@semantic-icons/lucide-icons';

/** The dim and the cutout are classes: here a round cutout around an avatar, and a deeper dim. */
@Component({
  selector: 'app-custom-spotlight-next-demo',
  imports: [
    ScSpotlightNext,
    ScSpotlightNextTitle,
    ScSpotlightNextDescription,
    ScSpotlightNextClose,
    ScButton,
    SiXIcon,
  ],
  template: \`
    <div class="flex w-full max-w-xl items-center gap-3 rounded-lg border p-4">
      <span
        #avatar
        class="bg-primary text-primary-foreground grid size-10 place-items-center rounded-full font-medium"
        >AL</span
      >
      <span class="text-sm">Ada Lovelace</span>
    </div>
    <button scButton (click)="spot.show()">Meet your profile</button>

    <div
      scSpotlightNext
      #spot="scSpotlightNext"
      [for]="avatar"
      [padding]="6"
      side="end"
      dimClass="rounded-full shadow-[0_0_0_200vmax_rgb(0_0_0/0.75)]"
    >
      <button scSpotlightNextClose>
        <svg siXIcon></svg>
        <span class="sr-only">Close</span>
      </button>
      <h2 scSpotlightNextTitle class="pe-6 font-semibold">Your profile</h2>
      <p scSpotlightNextDescription class="text-muted-foreground text-sm">
        Your picture, your name, and how others see you.
      </p>
    </div>
  \`,
  host: { class: 'flex w-full flex-col items-center gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class CustomSpotlightNextDemo {}`;
}
