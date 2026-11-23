import { Component, ViewEncapsulation } from '@angular/core';
import { ScKbd, ScTypeset } from '@semantic-components/ui';
import { Anatomy } from '../../../components/anatomy/anatomy';
import {
  type ApiInput,
  ApiTable,
} from '../../../components/api-table/api-table';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { PartsTable } from '../../../components/parts-table/parts-table';
import { TocHeading } from '../../../components/toc/toc-heading';
import { CompareUsageDemoContainer } from './demos/compare-usage-demo-container';
import { ContentCompareDemoContainer } from './demos/content-compare-demo-container';
import { HandleCompareDemoContainer } from './demos/handle-compare-demo-container';
import { HoverCompareDemoContainer } from './demos/hover-compare-demo-container';
import { RtlCompareDemoContainer } from './demos/rtl-compare-demo-container';
import { VerticalCompareDemoContainer } from './demos/vertical-compare-demo-container';

@Component({
  selector: 'app-compare-page',
  imports: [
    ScKbd,
    ScTypeset,
    Anatomy,
    ApiTable,
    ComponentBadges,
    PartsTable,
    TocHeading,
    CompareUsageDemoContainer,
    ContentCompareDemoContainer,
    VerticalCompareDemoContainer,
    HoverCompareDemoContainer,
    HandleCompareDemoContainer,
    RtlCompareDemoContainer,
  ],
  template: `
    <div class="space-y-12">
      <div class="space-y-2">
        <h1 scTypeset>Compare</h1>
        <p class="text-muted-foreground">
          Two things compared, one over the other, split by a divider you drag —
          photos before and after an edit, two themes of a design, any content.
        </p>
        <app-component-badges path="compare" />
      </div>

      <section class="space-y-4">
        <h2 scTypeset appToc>Usage</h2>
        <app-compare-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Anatomy</h2>
        <p>
          The before sizes the box; the after lies over it, shown past the
          divider. Labels and the handle&apos;s icon are yours.
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Dragging</h2>
        <ul class="list-disc space-y-2 ps-6">
          <li>
            With a mouse or a pen, a press anywhere moves the divider there and
            drags it; on a touch screen only the handle drags, so the page still
            scrolls over the photo (<code scTypeset>handleOnly</code>:
            <code scTypeset>'touch'</code> by default;
            <code scTypeset>true</code> everywhere,
            <code scTypeset>false</code> nowhere).
          </li>
          <li>
            <code scTypeset>hover</code>: the divider follows the pointer,
            without a press. <code scTypeset>bounds</code>: how close to the
            edges it goes.
          </li>
          <li>
            The after is clipped at <code scTypeset>--sc-compare-position</code>
            — no layout in script. Images and videos cover the box, so two of
            different sizes line up.
          </li>
        </ul>
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Keyboard</h2>
        <ul class="list-disc space-y-2 ps-6">
          <li>
            The arrows move the divider their way — as the text reads, and up or
            down when vertical — by <code scTypeset>step</code> (1%); with
            <kbd scKbd>Shift</kbd>, ten steps.
          </li>
          <li>
            <kbd scKbd>Page Up</kbd> / <kbd scKbd>Page Down</kbd>: ten percent
            up the slider and down; <kbd scKbd>Home</kbd> /
            <kbd scKbd>End</kbd>: to the ends.
          </li>
          <li>
            Moved by the keys, the divider glides there — not under reduced
            motion; dragged, it follows at once.
          </li>
        </ul>
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Accessibility</h2>
        <ul class="list-disc space-y-2 ps-6">
          <li>
            The handle is a slider: name it. It reads its position as a
            percentage in the app&apos;s language; write your words in
            <code scTypeset>aria-valuetext</code> (&quot;30% before&quot;).
          </li>
          <li>
            Give each photo its <code scTypeset>alt</code>: they are two images.
          </li>
          <li>
            Labels are your text; each fades while the divider covers its side.
          </li>
        </ul>
      </section>

      <section class="space-y-8">
        <h2 scTypeset appToc>Examples</h2>
        <app-content-compare-demo-container />
        <app-vertical-compare-demo-container />
        <app-hover-compare-demo-container />
        <app-handle-compare-demo-container />
        <app-rtl-compare-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>API reference</h2>
        <p>
          Each part takes <code scTypeset>class</code>, merged over its own. The
          knob&apos;s and the labels&apos; corners are the style&apos;s (<code
            scTypeset
            >compare</code
          >); restyle the handle from its class —
          <code scTypeset>before:</code> the line,
          <code scTypeset>after:</code> the knob.
        </p>
        <app-parts-table label="Compare parts" [parts]="parts" />
        <app-api-table label="ScCompare inputs" [inputs]="inputs" />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class ComparePage {
  private readonly anatomy = {
    imports:
      "import { ScCompare, ScCompareAfter, ScCompareBefore, ScCompareHandle, ScCompareLabel } from '@semantic-components/ui';",
    markup: [
      '<div scCompare scFrame class="aspect-3/2">',
      '  <img scCompareBefore ngSrc="before.jpg" fill alt="…" />',
      '  <img scCompareAfter ngSrc="after.jpg" fill alt="…" />',
      '  <span scCompareLabel="before">Before</span>',
      '  <span scCompareLabel="after">After</span>',
      '  <div scCompareHandle aria-label="Before and after"><svg siChevronsLeftRightIcon></svg></div>',
      '</div>',
    ].join('\n'),
  };

  private readonly parts = [
    {
      name: 'ScCompare',
      selector: '[scCompare]',
      description: 'The box: the position, dragging. exportAs: setPosition().',
    },
    {
      name: 'ScCompareBefore / After',
      selector: '[scCompareBefore], [scCompareAfter]',
      description: 'Your two things; the after clipped past the divider.',
    },
    {
      name: 'ScCompareLabel',
      selector: '[scCompareLabel]',
      description: '"before" or "after": your text in its corner.',
    },
    {
      name: 'ScCompareHandle',
      selector: '[scCompareHandle]',
      description: 'The divider’s slider: line and knob, your icon inside.',
    },
  ];

  private readonly inputs: ApiInput[] = [
    {
      name: 'position',
      type: 'number',
      default: '50',
      description: 'Two-way: how much of the before shows, 0–100.',
    },
    {
      name: 'orientation',
      type: "'horizontal' | 'vertical'",
      default: "'horizontal'",
      description: 'Across, or up and down.',
    },
    {
      name: 'handleOnly',
      type: "boolean | 'touch'",
      default: "'touch'",
      description: 'Only the handle drags: on touch screens, always, or never.',
    },
    {
      name: 'hover',
      type: 'boolean',
      default: 'false',
      description: 'The divider follows the pointer.',
    },
    {
      name: 'bounds',
      type: 'number',
      default: '0',
      description: 'How close to the edges it goes (%).',
    },
    {
      name: 'step',
      type: 'number',
      default: '1',
      description: 'An arrow key’s step (%); Shift: ten.',
    },
  ];
}
