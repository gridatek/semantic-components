import { Component, ViewEncapsulation } from '@angular/core';
import { ScKbd, ScTypeset } from '@semantic-components/ui';
import { Anatomy } from '../../../components/anatomy/anatomy';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { PartsTable } from '../../../components/parts-table/parts-table';
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
    ScKbd,
    PartsTable,
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
    ScTypeset,
  ],
  template: `
    <div class="space-y-12">
      <div class="space-y-2">
        <h1 scTypeset>Accordion</h1>
        <p class="text-muted-foreground">
          Items whose panels open and close under their heading. In the look of
          the app&apos;s style.
        </p>
        <app-component-badges path="accordion" />
      </div>

      <section class="space-y-4">
        <h2 scTypeset appToc>Usage</h2>
        <app-accordion-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Anatomy</h2>
        <p>
          Every part is a directive on your element; the heading&apos;s level,
          the text and the chevron are yours. The item connects its trigger and
          its panel: nothing to wire.
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Limitation: panel content</h2>
        <p>
          Angular Aria, which the accordion is built on, renders a panel only
          through its template: a panel&apos;s content goes in an ng-template
          scAccordionPanelContent. It is created when the panel first opens,
          then kept — so the panel animates as it closes. Until then the
          browser&apos;s find-in-page doesn&apos;t see it.
        </p>
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Keyboard</h2>
        <ul class="list-disc space-y-2 ps-6">
          <li>
            <kbd scKbd>Tab</kbd> moves between the triggers;
            <kbd scKbd>Enter</kbd> or <kbd scKbd>Space</kbd> opens or closes.
          </li>
          <li>
            <kbd scKbd>ArrowDown</kbd> and <kbd scKbd>ArrowUp</kbd> move between
            the triggers too, <kbd scKbd>Home</kbd> and <kbd scKbd>End</kbd> to
            the first and last (Angular Aria&apos;s).
          </li>
          <li>A disabled item is reached, not opened.</li>
        </ul>
      </section>

      <section class="space-y-8">
        <h2 scTypeset appToc>Examples</h2>
        <app-basic-accordion-demo-container />
        <app-multiple-accordion-demo-container />
        <app-disabled-accordion-demo-container />
        <app-borders-accordion-demo-container />
        <app-card-accordion-demo-container />
        <app-rtl-accordion-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>API reference</h2>
        <p>
          Each part takes
          <code scTypeset>class</code>, merged over the style (cn: a later class
          wins).
        </p>
        <app-parts-table label="Accordion parts" [parts]="parts" />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class AccordionPage {
  private readonly anatomy = {
    imports: [
      'import {',
      '  ScAccordion, ScAccordionItem, ScAccordionHeader,',
      '  ScAccordionTrigger, ScAccordionTriggerIcon,',
      '  ScAccordionPanel, ScAccordionPanelContent,',
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
      '      <ng-template scAccordionPanelContent>…</ng-template>',
      '    </div>',
      '  </div>',
      '</div>',
    ].join('\n'),
  };

  private readonly parts = [
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
      name: 'ScAccordionPanel, ScAccordionPanelContent',
      selector: '[scAccordionPanel], ng-template[scAccordionPanelContent]',
      description:
        'The panel (role region, named by its trigger) and its content, in a template.',
    },
  ];
}
