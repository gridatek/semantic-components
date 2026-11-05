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
import { AccordionUsageDemoContainer } from './demos/accordion-usage-demo-container';
import { BasicAccordionDemoContainer } from './demos/basic-accordion-demo-container';
import { BordersAccordionDemoContainer } from './demos/borders-accordion-demo-container';
import { CardAccordionDemoContainer } from './demos/card-accordion-demo-container';
import { DisabledAccordionDemoContainer } from './demos/disabled-accordion-demo-container';
import { MultipleAccordionDemoContainer } from './demos/multiple-accordion-demo-container';
import { RtlAccordionDemoContainer } from './demos/rtl-accordion-demo-container';

@Component({
  selector: 'app-accordion-page',
  imports: [
    Anatomy,
    AccordionUsageDemoContainer,
    BasicAccordionDemoContainer,
    MultipleAccordionDemoContainer,
    DisabledAccordionDemoContainer,
    BordersAccordionDemoContainer,
    CardAccordionDemoContainer,
    RtlAccordionDemoContainer,
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
        <h1 scHeading>Accordion</h1>
        <p class="text-muted-foreground">
          Items whose panels open and close under their heading. In the look of
          the app&apos;s preset.
        </p>
        <app-component-badges path="accordion" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Usage</h2>
        <app-accordion-usage-demo-container />
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
          scAccordionContent. It is created when the panel first opens, then
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
        <app-basic-accordion-demo-container />
        <app-multiple-accordion-demo-container />
        <app-disabled-accordion-demo-container />
        <app-borders-accordion-demo-container />
        <app-card-accordion-demo-container />
        <app-rtl-accordion-demo-container />
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
          aria-label="Accordion parts"
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
export default class AccordionPage {
  protected readonly anatomy = {
    imports: [
      'import {',
      '  ScAccordion, ScAccordionItem, ScAccordionHeader,',
      '  ScAccordionTrigger, ScAccordionTriggerIcon,',
      '  ScAccordionPanel, ScAccordionContent,',
      "} from '@semantic-components/ui';",
    ].join('\n'),
    markup: [
      '<div scAccordion [(value)]="open">',
      '  <div scAccordionItem value="shipping">',
      '    <h3 scAccordionHeader>',
      '      <button scAccordionTrigger>',
      '        …',
      '        <svg scAccordionTriggerIcon></svg>',
      '      </button>',
      '    </h3>',
      '    <div scAccordionPanel>',
      '      <ng-template scAccordionContent>…</ng-template>',
      '    </div>',
      '  </div>',
      '</div>',
    ].join('\n'),
  };

  protected readonly parts = [
    {
      name: 'ScAccordion',
      selector: '[scAccordion]',
      description:
        '[(value)], the open items’ values; multiple (several open at once); disabled.',
    },
    {
      name: 'ScAccordionItem',
      selector: '[scAccordionItem]',
      description:
        'An item: value (made up if left out), disabled. data-open while open.',
    },
    {
      name: 'ScAccordionHeader',
      selector: 'h2–h6[scAccordionHeader]',
      description: 'The heading around the trigger; its level is yours.',
    },
    {
      name: 'ScAccordionTrigger',
      selector: 'button[scAccordionTrigger]',
      description: 'Opens and closes its item’s panel; the item connects them.',
    },
    {
      name: 'ScAccordionTriggerIcon',
      selector: 'svg[scAccordionTriggerIcon]',
      description: 'Your chevron: at the trigger’s end, turned while open.',
    },
    {
      name: 'ScAccordionPanel, ScAccordionContent',
      selector: '[scAccordionPanel], ng-template[scAccordionContent]',
      description:
        'The panel (role region, named by its trigger) and its content, in a template.',
    },
  ];
}
