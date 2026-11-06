import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScButton,
  ScDrawerNext,
  ScDrawerNextClose,
  ScDrawerNextDescription,
  ScDrawerNextFooter,
  ScDrawerNextHandle,
  ScDrawerNextHeader,
  ScDrawerNextPortal,
  ScDrawerNextProvider,
  ScDrawerNextTitle,
  ScDrawerNextTrigger,
} from '@semantic-components/ui';

/** snapPoints: heights it rests at, fractions of the screen or pixels; drag between them. A handle on a button (named) moves to the next one. */
@Component({
  selector: 'app-snap-points-drawer-next-demo',
  imports: [
    ScButton,
    ScDrawerNext,
    ScDrawerNextClose,
    ScDrawerNextDescription,
    ScDrawerNextFooter,
    ScDrawerNextHandle,
    ScDrawerNextHeader,
    ScDrawerNextPortal,
    ScDrawerNextProvider,
    ScDrawerNextTitle,
    ScDrawerNextTrigger,
  ],
  template: `
    <div
      scDrawerNextProvider
      [snapPoints]="snapPoints"
      [(snapPoint)]="snapPoint"
    >
      <button scButton scDrawerNextTrigger variant="outline">
        Open snap drawer
      </button>
      <ng-template scDrawerNextPortal>
        <div scDrawerNext>
          <button scDrawerNextHandle>
            <span class="sr-only">Next height</span>
          </button>
          <div scDrawerNextHeader>
            <h2 scDrawerNextTitle>Snap points</h2>
            <p scDrawerNextDescription>
              Drag the drawer to snap between a compact peek and a near
              full-height view.
            </p>
          </div>
          <div class="flex-1 p-4">
            <div class="bg-muted h-80 w-full rounded-2xl"></div>
          </div>
          <div scDrawerNextFooter>
            <button scDrawerNextClose variant="default">Close</button>
          </div>
        </div>
      </ng-template>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class SnapPointsDrawerNextDemo {
  protected readonly snapPoints = [0.4, 0.9];
  protected readonly snapPoint = signal<number | null>(null);
}
