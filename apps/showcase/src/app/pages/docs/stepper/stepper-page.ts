import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ScKbd, ScLink, ScTypeset } from '@semantic-components/ui';
import { Anatomy } from '../../../components/anatomy/anatomy';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { PartsTable } from '../../../components/parts-table/parts-table';
import { TocHeading } from '../../../components/toc/toc-heading';
import { LinearStepperDemoContainer } from './demos/linear-stepper-demo-container';
import { NumbersStepperDemoContainer } from './demos/numbers-stepper-demo-container';
import { RtlStepperDemoContainer } from './demos/rtl-stepper-demo-container';
import { StepperUsageDemoContainer } from './demos/stepper-usage-demo-container';
import { VerticalStepperDemoContainer } from './demos/vertical-stepper-demo-container';

@Component({
  selector: 'app-stepper-page',
  imports: [
    RouterLink,
    ScKbd,
    ScLink,
    ScTypeset,
    Anatomy,
    PartsTable,
    TocHeading,
    ComponentBadges,
    StepperUsageDemoContainer,
    NumbersStepperDemoContainer,
    VerticalStepperDemoContainer,
    LinearStepperDemoContainer,
    RtlStepperDemoContainer,
  ],
  template: `
    <div class="space-y-12">
      <div class="space-y-2">
        <h1 scTypeset>Stepper</h1>
        <p class="text-muted-foreground">
          A flow in steps — sign-up, checkout, a form too long for one screen:
          each step a tab and its panel, in order if you like, each step&apos;s
          form valid before the next. It looks like the
          <a scLink routerLink="/docs/components/timeline">Timeline</a>.
        </p>
        <app-component-badges path="stepper" />
      </div>

      <section class="space-y-4">
        <h2 scTypeset appToc>Usage</h2>
        <app-stepper-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Anatomy</h2>
        <p>
          The steps are a list of items, each with its trigger (the indicator,
          the title and a description in it) and the connector to the next;
          their panels come after the list. Steps are numbered in page order; a
          panel says which step it belongs to with
          <code scTypeset>[step]</code>.
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Linear and validation</h2>
        <ul class="list-disc space-y-2 ps-6">
          <li>
            Give a step a <code scTypeset>stepControl</code> — a Signal Forms
            field (<code scTypeset>form.account</code>): the step is complete
            once it is valid and has been left once.
          </li>
          <li>
            <code scTypeset>linear</code>: a step can&apos;t be passed while one
            before it is not complete — by Next, a later trigger or the keys. A
            refused Next marks the step&apos;s fields as touched, so their
            errors show, and the step becomes failed.
          </li>
          <li>
            <code scTypeset>optional</code> steps may be skipped;
            <code scTypeset>editable</code> false: a complete step can&apos;t be
            gone back to; <code scTypeset>completed</code> and
            <code scTypeset>hasError</code> say it yourself.
          </li>
          <li>
            <code scTypeset>status()</code> — complete, current, upcoming,
            failed — the Timeline&apos;s words, chooses your indicator&apos;s
            content (a check, a cross, the number).
          </li>
        </ul>
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Keyboard</h2>
        <ul class="list-disc space-y-2 ps-6">
          <li>
            The steps are one Tab stop: <kbd scKbd>←</kbd> and
            <kbd scKbd>→</kbd> (mirrored right to left), <kbd scKbd>↑</kbd> and
            <kbd scKbd>↓</kbd> when vertical, <kbd scKbd>Home</kbd> and
            <kbd scKbd>End</kbd> move between them; the step shown follows when
            it can be reached.
          </li>
          <li>
            A step that can&apos;t be reached yet is
            <code scTypeset>aria-disabled</code>, still focusable.
          </li>
          <li>
            The list is a tablist (name it), each trigger a tab, each panel its
            tabpanel; put the title in the trigger, it names the tab.
          </li>
        </ul>
      </section>

      <section class="space-y-8">
        <h2 scTypeset appToc>Examples</h2>
        <app-numbers-stepper-demo-container />
        <app-vertical-stepper-demo-container />
        <app-linear-stepper-demo-container />
        <app-rtl-stepper-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>API reference</h2>
        <p>
          Each part takes
          <code scTypeset>class</code>, merged over the style (cn: a later class
          wins). The look is the style&apos;s Timeline: its markers&apos;
          corners and ring, its line, its titles, its focus ring.
        </p>
        <app-parts-table label="Stepper parts" [parts]="parts" />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class StepperPage {
  private readonly anatomy = {
    imports: [
      'import {',
      '  ScStepper, ScStepperList, ScStepperItem, ScStepperTrigger,',
      '  ScStepperIndicator, ScStepperTitle, ScStepperDescription,',
      '  ScStepperConnector, ScStepperPanel, ScStepperPrevious, ScStepperNext,',
      "} from '@semantic-components/ui';",
    ].join('\n'),
    markup: [
      '<div scStepper [(selectedIndex)]="step">',
      '  <div scStepperList aria-label="…">',
      '    <div scStepperItem #item="scStepperItem">',
      '      <button scStepperTrigger>',
      '        <span scStepperIndicator>…</span>',
      '        <span scStepperTitle>…</span>',
      '        <span scStepperDescription>…</span>',
      '      </button>',
      '      <div scStepperConnector></div>',
      '    </div>',
      '    …',
      '  </div>',
      '  <div scStepperPanel [step]="0">…</div>',
      '  …',
      '  <button scStepperPrevious>…</button>',
      '  <button scStepperNext>…</button>',
      '</div>',
    ].join('\n'),
  };

  private readonly parts = [
    {
      name: 'ScStepper',
      selector: 'div[scStepper]',
      description:
        "[(selectedIndex)] (from 0), orientation ('horizontal', 'vertical'), linear. exportAs scStepper: stepCount(), isFirstStep(), isLastStep(), next(), previous(), goToStep(index), reset(), canReach(index). --sc-stepper-indicator: the indicators' size (the style's icon button's).",
    },
    {
      name: 'ScStepperList',
      selector: 'div[scStepperList]',
      description:
        'The steps, a tablist (name it): one Tab stop, the arrows, Home and End between steps.',
    },
    {
      name: 'ScStepperItem',
      selector: 'div[scStepperItem]',
      description:
        'A step: stepControl (a Signal Forms field), optional, editable (true), completed, hasError. exportAs scStepperItem: status() (complete, current, upcoming, failed), index(), reachable(); data-complete, data-current, data-upcoming, data-failed.',
    },
    {
      name: 'ScStepperTrigger',
      selector: 'button[scStepperTrigger]',
      description:
        'Its tab: goes to the step; aria-disabled while it can’t be reached. Holds the indicator, the title and a description.',
    },
    {
      name: 'ScStepperIndicator',
      selector: 'span[scStepperIndicator]',
      description:
        'Its mark, your number or icon: filled when complete, ringed when current, muted when upcoming, destructive when failed — as the Timeline’s markers.',
    },
    {
      name: 'ScStepperTitle, ScStepperDescription',
      selector: 'span[scStepperTitle], span[scStepperDescription]',
      description: 'Its name (it names the tab) and a line under it.',
    },
    {
      name: 'ScStepperConnector',
      selector: 'div[scStepperConnector]',
      description:
        'The line to the next step, after the trigger: the primary colour once the step is complete; none after the last.',
    },
    {
      name: 'ScStepperPanel',
      selector: 'div[scStepperPanel]',
      description:
        'Step [step]’s content, a tabpanel named by its trigger; shown while that step is.',
    },
    {
      name: 'ScStepperPrevious, ScStepperNext',
      selector: 'button[scStepperPrevious], button[scStepperNext]',
      description:
        'The style’s button (outline, default): the previous step (disabled on the first), the next (refused: the step’s errors show).',
    },
  ];
}
