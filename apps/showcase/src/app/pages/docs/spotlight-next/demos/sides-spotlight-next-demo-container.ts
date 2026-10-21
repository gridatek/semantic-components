import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { SidesSpotlightNextDemo } from './sides-spotlight-next-demo';

@Component({
  selector: 'app-sides-spotlight-next-demo-container',
  imports: [DemoContainer, SidesSpotlightNextDemo],
  template: `
    <app-demo-container
      title="Sides"
      [code]="code"
      demoUrl="/demos/spotlight-next/sides-spotlight-next-demo"
    >
      <app-sides-spotlight-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class SidesSpotlightNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScButton } from '@semantic-components/ui';
import {
  type ScPlacementSide,
  ScSpotlightNext,
  ScSpotlightNextClose,
  ScSpotlightNextDescription,
  ScSpotlightNextTitle,
} from '@semantic-components/ui-lab';
import { SiXIcon } from '@semantic-icons/lucide-icons';

/** The card on the side you ask — logical, start and end follow the direction — flipping when there is no room. */
@Component({
  selector: 'app-sides-spotlight-next-demo',
  imports: [
    ScSpotlightNext,
    ScSpotlightNextTitle,
    ScSpotlightNextDescription,
    ScSpotlightNextClose,
    ScButton,
    SiXIcon,
  ],
  template: \`
    <div class="grid w-full max-w-xl place-items-center rounded-lg border py-48">
      <div #target class="bg-muted rounded-md px-6 py-3 text-sm font-medium">
        The target
      </div>
    </div>
    <div class="flex flex-wrap gap-2">
      @for (side of sides; track side) {
        <button
          scButton
          variant="outline"
          size="sm"
          (click)="side$.set(side); spot.show()"
        >
          {{ side }}
        </button>
      }
    </div>

    <div
      scSpotlightNext
      #spot="scSpotlightNext"
      [for]="target"
      [side]="side$()"
    >
      <button scSpotlightNextClose>
        <svg siXIcon></svg>
        <span class="sr-only">Close</span>
      </button>
      <h2 scSpotlightNextTitle class="pe-6 font-semibold">
        On the {{ side$() }}
      </h2>
      <p scSpotlightNextDescription class="text-muted-foreground text-sm">
        Asked: {{ side$() }}.
      </p>
    </div>
  \`,
  host: { class: 'flex w-full flex-col items-center gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class SidesSpotlightNextDemo {
  readonly sides = ['top', 'bottom', 'start', 'end'] as const;
  readonly side$ = signal<ScPlacementSide>('bottom');
}`;
}
