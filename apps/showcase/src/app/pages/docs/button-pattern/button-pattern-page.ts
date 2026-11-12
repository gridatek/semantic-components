import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScHeading,
  ScTable,
  ScTableBody,
  ScTableCell,
  ScTableContainer,
  ScTableHeader,
  ScTableHeaderCell,
  ScTableRow,
} from '@semantic-components/ui';
import { Anatomy } from '../../../components/anatomy/anatomy';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ButtonPatternUsageDemoContainer } from './demos/button-pattern-usage-demo-container';
import { ConditionalButtonPatternDemoContainer } from './demos/conditional-button-pattern-demo-container';

@Component({
  selector: 'app-button-pattern-page',
  imports: [
    Anatomy,
    ScTable,
    ScTableBody,
    ScTableCell,
    ScTableContainer,
    ScTableHeader,
    ScTableHeaderCell,
    ScTableRow,
    ConditionalButtonPatternDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
    ButtonPatternUsageDemoContainer,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Button Pattern</h1>
        <p class="text-muted-foreground">
          A directive that adds button behavior to non-button elements.
        </p>
        <app-component-badges path="button-pattern" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Usage</h2>
        <app-button-pattern-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Anatomy</h2>
        <p class="text-muted-foreground">
          One directive on an element that must act as a button but cannot be
          one: it gets the role, a place in the Tab order and the keys. A real
          button is better whenever you can.
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>What It Does</h2>
        <ul class="text-muted-foreground list-inside list-disc space-y-1">
          <li>
            Adds
            <code>role="button"</code>
            to the host element.
          </li>
          <li>
            Adds
            <code>tabindex="0"</code>
            for keyboard focusability.
          </li>
          <li>
            Handles
            <code>Enter</code>
            and
            <code>Space</code>
            key presses by triggering a click event.
          </li>
        </ul>
      </section>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-conditional-button-pattern-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>API reference</h2>
        <p class="text-muted-foreground">A behaviour only, on any element.</p>
        <div
          scTableContainer
          tabindex="0"
          role="region"
          aria-label="Button Pattern parts"
        >
          <table scTable>
            <thead scTableHeader>
              <tr scTableRow>
                <th scTableHeaderCell>Part</th>
                <th scTableHeaderCell>Selector</th>
                <th scTableHeaderCell>Description</th>
              </tr>
            </thead>
            <tbody scTableBody>
              @for (part of parts; track part.name) {
                <tr scTableRow>
                  <td scTableCell>
                    <code class="font-mono text-sm">{{ part.name }}</code>
                  </td>
                  <td scTableCell>
                    <code class="font-mono text-sm">{{ part.selector }}</code>
                  </td>
                  <td
                    scTableCell
                    class="text-muted-foreground whitespace-normal"
                  >
                    {{ part.description }}
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class ButtonPatternPage {
  protected readonly anatomy = {
    imports: [
      "import { ScButtonPattern } from '@semantic-components/ui';",
    ].join('\n'),
    markup: [
      '<div scButtonPattern (click)="…">…</div>',
      '<div [scButtonPattern]="enabled()" (click)="…">…</div>',
    ].join('\n'),
  };

  protected readonly parts = [
    {
      name: 'ScButtonPattern',
      selector: '[scButtonPattern]',
      description:
        '[scButtonPattern] (true): role="button", tabindex="0", and Enter or Space click it. false: none of these — a plain element again.',
    },
  ];
}
