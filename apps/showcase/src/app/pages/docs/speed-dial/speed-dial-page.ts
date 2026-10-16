import { Component, ViewEncapsulation } from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ArcSpeedDialDemoContainer } from './demos/arc-speed-dial-demo-container';
import { BackdropSpeedDialDemoContainer } from './demos/backdrop-speed-dial-demo-container';
import { BasicSpeedDialDemoContainer } from './demos/basic-speed-dial-demo-container';
import { ControlledSpeedDialDemoContainer } from './demos/controlled-speed-dial-demo-container';
import { DirectionsSpeedDialDemoContainer } from './demos/directions-speed-dial-demo-container';

@Component({
  selector: 'app-speed-dial-page',
  imports: [
    BasicSpeedDialDemoContainer,
    DirectionsSpeedDialDemoContainer,
    ArcSpeedDialDemoContainer,
    BackdropSpeedDialDemoContainer,
    ControlledSpeedDialDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Speed Dial</h1>
        <p class="text-muted-foreground">
          A floating button that opens a few actions — a menu — in a line or on
          a quarter circle, each named by its label, with the arrow keys of its
          direction.
        </p>
        <app-component-badges path="speed-dial" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Basic</h2>
        <p class="text-muted-foreground">
          A button in a corner; its actions open upward, each named by the label
          beside it. From the keyboard: Enter, Space or an arrow opens it on the
          first action; the arrows move along, Escape closes.
        </p>
        <app-basic-speed-dial-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Directions</h2>
        <p class="text-muted-foreground">
          Up, down, left or right — the arrow keys follow: away from the button
          is the next action.
        </p>
        <app-directions-speed-dial-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Arc</h2>
        <p class="text-muted-foreground">
          Toward a corner — up-left for a button at the bottom right — the
          actions fan out on a quarter circle. Their labels are read, not shown.
        </p>
        <app-arc-speed-dial-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Backdrop</h2>
        <p class="text-muted-foreground">
          On a phone: the page dims behind the actions; a tap on it closes them.
        </p>
        <app-backdrop-speed-dial-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Controlled</h2>
        <p class="text-muted-foreground">
          Open is two-way — here opened from outside too (a press outside closes
          it). A disabled action stays reachable, and does nothing.
        </p>
        <app-controlled-speed-dial-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class SpeedDialPage {}
