import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { SidesSpotlightDemo } from './sides-spotlight-demo';

@Component({
  selector: 'app-sides-spotlight-demo-container',
  imports: [DemoContainer, SidesSpotlightDemo],
  template: `
    <app-demo-container
      title="Sides"
      [code]="code"
      demoUrl="/demos/spotlight/sides-spotlight-demo"
    >
      <app-sides-spotlight-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class SidesSpotlightDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScButton,
  ScSpotlight,
  ScSpotlightClose,
  ScSpotlightDescription,
  type ScSpotlightSide,
  ScSpotlightTitle, ScFrame } from '@semantic-components/ui';
import { SiXIcon } from '@semantic-icons/lucide-icons';

/** The card on the side you ask — logical, start and end follow the direction — flipping when there is no room. */
@Component({
  selector: 'app-sides-spotlight-demo',
  imports: [ScFrame, 
    ScSpotlight,
    ScSpotlightTitle,
    ScSpotlightDescription,
    ScSpotlightClose,
    ScButton,
    SiXIcon,
  ],
  template: \`
    <div
      scFrame class="grid w-full max-w-xl place-items-center py-48"
    >
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

    <div scSpotlight #spot="scSpotlight" [for]="target" [side]="side$()">
      <button scSpotlightClose>
        <svg siXIcon></svg>
        <span class="sr-only">Close</span>
      </button>
      <h2 scSpotlightTitle class="pe-6 font-semibold">On the {{ side$() }}</h2>
      <p scSpotlightDescription class="text-muted-foreground text-sm">
        Asked: {{ side$() }}.
      </p>
    </div>
  \`,
  host: { class: 'flex w-full flex-col items-center gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class SidesSpotlightDemo {
  private readonly sides = [
    'top',
    'bottom',
    'inline-start',
    'inline-end',
  ] as const;
  private readonly side$ = signal<ScSpotlightSide>('bottom');
}`;
}
