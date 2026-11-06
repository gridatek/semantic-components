import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScButton,
  ScDrawer,
  ScDrawerClose,
  ScDrawerDescription,
  ScDrawerFooter,
  ScDrawerHandle,
  ScDrawerHeader,
  ScDrawerPortal,
  ScDrawerProvider,
  ScDrawerTitle,
  ScDrawerTrigger,
} from '@semantic-components/ui';

/** snapPoints: heights it rests at, fractions of the screen or pixels; drag between them. A handle on a button (named) moves to the next one. */
@Component({
  selector: 'app-snap-points-drawer-demo',
  imports: [
    ScButton,
    ScDrawer,
    ScDrawerClose,
    ScDrawerDescription,
    ScDrawerFooter,
    ScDrawerHandle,
    ScDrawerHeader,
    ScDrawerPortal,
    ScDrawerProvider,
    ScDrawerTitle,
    ScDrawerTrigger,
  ],
  template: `
    <div scDrawerProvider [snapPoints]="snapPoints" [(snapPoint)]="snapPoint">
      <button scButton scDrawerTrigger variant="outline">
        Open snap drawer
      </button>
      <ng-template scDrawerPortal>
        <div scDrawer>
          <button scDrawerHandle>
            <span class="sr-only">Next height</span>
          </button>
          <div scDrawerHeader>
            <h2 scDrawerTitle>Snap points</h2>
            <p scDrawerDescription>
              Drag the drawer to snap between a compact peek and a near
              full-height view.
            </p>
          </div>
          <div class="flex-1 p-4">
            <div class="bg-muted h-80 w-full rounded-2xl"></div>
          </div>
          <div scDrawerFooter>
            <button scDrawerClose variant="default">Close</button>
          </div>
        </div>
      </ng-template>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class SnapPointsDrawerDemo {
  protected readonly snapPoints = [0.4, 0.9];
  protected readonly snapPoint = signal<number | null>(null);
}
