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
import { AccordionNextUsageDemoContainer } from './demos/accordion-next-usage-demo-container';
import { BasicAccordionNextDemoContainer } from './demos/basic-accordion-next-demo-container';
import { BordersAccordionNextDemoContainer } from './demos/borders-accordion-next-demo-container';
import { CardAccordionNextDemoContainer } from './demos/card-accordion-next-demo-container';
import { DisabledAccordionNextDemoContainer } from './demos/disabled-accordion-next-demo-container';
import { MultipleAccordionNextDemoContainer } from './demos/multiple-accordion-next-demo-container';
import { RtlAccordionNextDemoContainer } from './demos/rtl-accordion-next-demo-container';

@Component({
  selector: 'app-accordion-next-page',
  imports: [
    Anatomy,
    AccordionNextUsageDemoContainer,
    BasicAccordionNextDemoContainer,
    MultipleAccordionNextDemoContainer,
    DisabledAccordionNextDemoContainer,
    BordersAccordionNextDemoContainer,
    CardAccordionNextDemoContainer,
    RtlAccordionNextDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
    ScTable,
    ScTableBody,
    ScTableCell,
    ScTableContainer,
    ScTableHeader,
    ScTableHeaderCell,
    ScTableRow,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Accordion Next</h1>
        <p class="text-muted-foreground">
          Items whose panels open and close under their heading. In the look of
          the app&apos;s preset. The rewrite of Accordion, beside it until it is
          validated.
        </p>
        <app-component-badges path="accordion-next" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Usage</h2>
        <app-accordion-next-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Anatomy</h2>
        <p class="text-muted-foreground">
          Every part is a directive on your element; the heading&apos;s level,
          the text and the chevron are yours. The item connects its trigger and
          its panel: nothing to wire.
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Limitation: panel content</h2>
        <p class="text-muted-foreground">
          Angular Aria, which the accordion is built on, renders a panel only
          through its template: a panel&apos;s content goes in an ng-template
          scAccordionNextContent. It is created when the panel first opens, then
          kept — so the panel animates as it closes. Until then the
          browser&apos;s find-in-page doesn&apos;t see it.
        </p>
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Keyboard</h2>
        <ul class="text-muted-foreground list-disc space-y-2 ps-6">
          <li>
            Tab moves between the triggers; Enter or Space opens or closes.
          </li>
          <li>
            ArrowDown and ArrowUp move between the triggers too, Home and End to
            the first and last (Angular Aria&apos;s).
          </li>
          <li>A disabled item is reached, not opened.</li>
        </ul>
      </section>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-basic-accordion-next-demo-container />
        <app-multiple-accordion-next-demo-container />
        <app-disabled-accordion-next-demo-container />
        <app-borders-accordion-next-demo-container />
        <app-card-accordion-next-demo-container />
        <app-rtl-accordion-next-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>API reference</h2>
        <p class="text-muted-foreground">
          Each part takes
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">class</code>,
          merged over the preset (cn: a later class wins).
        </p>
        <div
          scTableContainer
          tabindex="0"
          role="region"
          aria-label="Accordion Next parts"
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
export default class AccordionNextPage {
  protected readonly anatomy = {
    imports: [
      'import {',
      '  ScAccordionNext, ScAccordionNextItem, ScAccordionNextHeader,',
      '  ScAccordionNextTrigger, ScAccordionNextTriggerIcon,',
      '  ScAccordionNextPanel, ScAccordionNextContent,',
      "} from '@semantic-components/ui';",
    ].join('\n'),
    markup: [
      '<div scAccordionNext [(value)]="open">',
      '  <div scAccordionNextItem value="shipping">',
      '    <h3 scAccordionNextHeader>',
      '      <button scAccordionNextTrigger>',
      '        …',
      '        <svg scAccordionNextTriggerIcon></svg>',
      '      </button>',
      '    </h3>',
      '    <div scAccordionNextPanel>',
      '      <ng-template scAccordionNextContent>…</ng-template>',
      '    </div>',
      '  </div>',
      '</div>',
    ].join('\n'),
  };

  protected readonly parts = [
    {
      name: 'ScAccordionNext',
      selector: '[scAccordionNext]',
      description:
        '[(value)], the open items’ values; multiple (several open at once); disabled.',
    },
    {
      name: 'ScAccordionNextItem',
      selector: '[scAccordionNextItem]',
      description:
        'An item: value (made up if left out), disabled. data-open while open.',
    },
    {
      name: 'ScAccordionNextHeader',
      selector: 'h2–h6[scAccordionNextHeader]',
      description: 'The heading around the trigger; its level is yours.',
    },
    {
      name: 'ScAccordionNextTrigger',
      selector: 'button[scAccordionNextTrigger]',
      description: 'Opens and closes its item’s panel; the item connects them.',
    },
    {
      name: 'ScAccordionNextTriggerIcon',
      selector: 'svg[scAccordionNextTriggerIcon]',
      description: 'Your chevron: at the trigger’s end, turned while open.',
    },
    {
      name: 'ScAccordionNextPanel, ScAccordionNextContent',
      selector: '[scAccordionNextPanel], ng-template[scAccordionNextContent]',
      description:
        'The panel (role region, named by its trigger) and its content, in a template.',
    },
  ];
}
