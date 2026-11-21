import { Component, ViewEncapsulation } from '@angular/core';
import { ScTypeset } from '@semantic-components/ui';
import { Anatomy } from '../../../components/anatomy/anatomy';
import {
  type ApiInput,
  ApiTable,
} from '../../../components/api-table/api-table';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { EntryInstall } from '../../../components/entry-install/entry-install';
import { PartsTable } from '../../../components/parts-table/parts-table';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ConfettiUsageDemoContainer } from './demos/confetti-usage-demo-container';
import { CustomConfettiDemoContainer } from './demos/custom-confetti-demo-container';
import { ElementConfettiDemoContainer } from './demos/element-confetti-demo-container';
import { EventConfettiDemoContainer } from './demos/event-confetti-demo-container';
import { FireworksConfettiDemoContainer } from './demos/fireworks-confetti-demo-container';
import { FormConfettiDemoContainer } from './demos/form-confetti-demo-container';
import { SidesConfettiDemoContainer } from './demos/sides-confetti-demo-container';

@Component({
  selector: 'app-confetti-page',
  imports: [
    Anatomy,
    ApiTable,
    PartsTable,
    EntryInstall,
    ConfettiUsageDemoContainer,
    ElementConfettiDemoContainer,
    SidesConfettiDemoContainer,
    FireworksConfettiDemoContainer,
    CustomConfettiDemoContainer,
    FormConfettiDemoContainer,
    EventConfettiDemoContainer,
    TocHeading,
    ComponentBadges,
    ScTypeset,
  ],
  template: `
    <div class="space-y-12">
      <div class="space-y-2">
        <h1 scTypeset>Confetti</h1>
        <p class="text-muted-foreground">
          A burst, two cannons or fireworks, in the theme’s colours — on a
          click, or from code. Decorative only, and none for reduced motion.
        </p>
        <app-component-badges path="confetti" />
      </div>

      <section class="space-y-4">
        <h2 scTypeset appToc>Installation</h2>
        <app-entry-install
          entry="confetti"
          library="canvas-confetti"
          href="https://github.com/catdad/canvas-confetti"
          names="ScConfetti, ScConfettiTrigger"
        />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Usage</h2>
        <app-confetti-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Anatomy</h2>
        <p>
          Two ways in, one effect: a trigger on your button (a click sets it
          off), or the service from your code (after a form, on an event). Both
          draw on one full-screen canvas, made on the first one; canvas-confetti
          is loaded only then.
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Effects and colours</h2>
        <p>
          <code scTypeset>burst</code> (the default) bursts from the element
          clicked — or the bottom middle, from code;
          <code scTypeset>sides</code> fires two cannons from the edges of the
          screen; <code scTypeset>fireworks</code> bursts here and there for
          three seconds.
        </p>
        <p>
          The colours are the theme&apos;s own confetti colours,
          <code scTypeset>--sc-confetti-1</code> to
          <code scTypeset>--sc-confetti-5</code>: five tokens in your
          <code scTypeset>styles.css</code>, light and dark, as shadcn&apos;s
          chart colours are — read each time it is fired, so they follow your
          theme and dark mode. Without them, canvas-confetti&apos;s colours (and
          a warning in development); pass <code scTypeset>colors</code> for
          others.
        </p>
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Accessibility</h2>
        <ul class="list-disc space-y-2 ps-6">
          <li>
            Decorative: the canvas is hidden from screen readers and never in
            the way of the pointer.
          </li>
          <li>None at all when the reader asks for reduced motion.</li>
          <li>
            Say what it celebrates in words too — a status of yours («Welcome
            aboard!»), as the form and event examples do.
          </li>
        </ul>
      </section>

      <section class="space-y-8">
        <h2 scTypeset appToc>Examples</h2>
        <app-element-confetti-demo-container />
        <app-sides-confetti-demo-container />
        <app-fireworks-confetti-demo-container />
        <app-custom-confetti-demo-container />
        <app-form-confetti-demo-container />
        <app-event-confetti-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>API reference</h2>
        <app-parts-table label="Confetti parts" [parts]="parts" />
        <app-api-table label="ScConfettiTrigger inputs" [inputs]="inputs" />
        <app-api-table label="Confetti options" [inputs]="options" />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class ConfettiPage {
  private readonly anatomy = {
    imports:
      "import { ScConfetti, ScConfettiTrigger } from '@semantic-components/ui/confetti';",
    markup: [
      '<!-- On a click -->',
      '<button scButton scConfettiTrigger>Celebrate</button>',
      '<button scButton scConfettiTrigger confettiEffect="sides">Launch</button>',
      '',
      '<!-- From code -->',
      'private readonly confetti = inject(ScConfetti);',
      'await this.confetti.sides();',
    ].join('\n'),
  };

  private readonly parts = [
    {
      name: 'ScConfettiTrigger',
      selector: '[scConfettiTrigger]',
      description:
        'On your button (or any element): a click sets it off — a burst from its centre by default. Behaviour only: the element keeps its look. exportAs scConfettiTrigger: fire().',
    },
    {
      name: 'ScConfetti',
      selector: 'service',
      description:
        'From code: burst(options), sides(options), fireworks(options), reset(). Each settles when the confetti has fallen.',
    },
  ];

  private readonly inputs: ApiInput[] = [
    {
      name: 'scConfettiTrigger',
      type: 'ScConfettiFireworksOptions',
      default: '{}',
      description: 'The options (its value).',
    },
    {
      name: 'confettiEffect',
      type: "'burst' | 'sides' | 'fireworks'",
      default: "'burst'",
      description: 'Which effect a click sets off.',
    },
  ];

  private readonly options: ApiInput[] = [
    {
      name: 'colors',
      type: 'string[]',
      default: '--sc-confetti-1 … 5',
      description: 'Any CSS colours.',
    },
    {
      name: 'shapes',
      type: "('square' | 'circle' | 'star')[]",
      default: "['square', 'circle']",
      description: 'The pieces’ shapes.',
    },
    {
      name: 'count, spread',
      type: 'number',
      default: '100, 70 (a burst)',
      description: 'How many pieces, how wide (degrees).',
    },
    {
      name: 'angle, velocity',
      type: 'number',
      default: 'canvas-confetti’s',
      description: 'Which way (degrees), how fast.',
    },
    {
      name: 'size, gravity',
      type: 'number',
      default: 'canvas-confetti’s (1)',
      description: 'Bigger pieces; how fast they fall.',
    },
    {
      name: 'origin',
      type: '{ x, y } | Element',
      default: 'the element clicked',
      description: 'Where a burst starts: 0 to 1 of the screen, or an element.',
    },
    {
      name: 'duration',
      type: 'number',
      default: '3000',
      description: 'Fireworks: how long, in ms.',
    },
  ];
}
