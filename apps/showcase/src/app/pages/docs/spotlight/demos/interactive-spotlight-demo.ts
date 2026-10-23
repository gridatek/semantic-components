import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScButton,
  ScInput,
  ScSpotlight,
  ScSpotlightClose,
  ScSpotlightDescription,
  ScSpotlightTitle,
} from '@semantic-components/ui';
import { SiXIcon } from '@semantic-icons/lucide-icons';

/** The element stays usable through the cutout — type in the search while it is lit; the rest of the page stays dimmed and blocked. Escape still closes. */
@Component({
  selector: 'app-interactive-spotlight-demo',
  imports: [
    ScSpotlight,
    ScSpotlightTitle,
    ScSpotlightDescription,
    ScSpotlightClose,
    ScButton,
    ScInput,
    SiXIcon,
  ],
  template: `
    <div class="flex w-full max-w-xl items-center gap-3 rounded-lg border p-4">
      <span class="font-medium">Library</span>
      <input
        #search
        scInput
        type="search"
        aria-label="Search the library"
        placeholder="Search"
        class="ms-auto w-56"
        (input)="typed.set(search.value)"
      />
    </div>
    <p class="text-muted-foreground text-sm" aria-live="polite">
      {{ typed() ? 'Searching for ' + typed() : '' }}
    </p>
    <button scButton (click)="spot.show()">Try the search</button>

    <div scSpotlight #spot="scSpotlight" [for]="search" interactive>
      <button scSpotlightClose>
        <svg siXIcon></svg>
        <span class="sr-only">Close</span>
      </button>
      <h2 scSpotlightTitle class="pe-6 font-semibold">Try it now</h2>
      <p scSpotlightDescription class="text-muted-foreground text-sm">
        Type a title or an author in the search.
      </p>
    </div>
  `,
  host: { class: 'flex w-full flex-col items-center gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class InteractiveSpotlightDemo {
  readonly typed = signal('');
}
