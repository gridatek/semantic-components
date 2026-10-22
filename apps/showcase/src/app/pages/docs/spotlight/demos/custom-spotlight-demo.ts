import { Component, ViewEncapsulation } from '@angular/core';
import { ScButton } from '@semantic-components/ui';
import {
  ScSpotlight,
  ScSpotlightClose,
  ScSpotlightDescription,
  ScSpotlightTitle,
} from '@semantic-components/ui-lab';
import { SiXIcon } from '@semantic-icons/lucide-icons';

/** The dim and the cutout are classes: here a round cutout around an avatar, and a deeper dim. */
@Component({
  selector: 'app-custom-spotlight-demo',
  imports: [
    ScSpotlight,
    ScSpotlightTitle,
    ScSpotlightDescription,
    ScSpotlightClose,
    ScButton,
    SiXIcon,
  ],
  template: `
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
      scSpotlight
      #spot="scSpotlight"
      [for]="avatar"
      [padding]="6"
      side="end"
      dimClass="rounded-full shadow-[0_0_0_200vmax_rgb(0_0_0/0.75)]"
    >
      <button scSpotlightClose>
        <svg siXIcon></svg>
        <span class="sr-only">Close</span>
      </button>
      <h2 scSpotlightTitle class="pe-6 font-semibold">Your profile</h2>
      <p scSpotlightDescription class="text-muted-foreground text-sm">
        Your picture, your name, and how others see you.
      </p>
    </div>
  `,
  host: { class: 'flex w-full flex-col items-center gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class CustomSpotlightDemo {}
