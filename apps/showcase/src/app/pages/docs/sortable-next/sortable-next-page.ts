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
import { ButtonsSortableNextDemoContainer } from './demos/buttons-sortable-next-demo-container';
import { DisabledSortableNextDemoContainer } from './demos/disabled-sortable-next-demo-container';
import { GridSortableNextDemoContainer } from './demos/grid-sortable-next-demo-container';
import { HandleSortableNextDemoContainer } from './demos/handle-sortable-next-demo-container';
import { HorizontalSortableNextDemoContainer } from './demos/horizontal-sortable-next-demo-container';
import { LinkedSortableNextDemoContainer } from './demos/linked-sortable-next-demo-container';
import { RtlSortableNextDemoContainer } from './demos/rtl-sortable-next-demo-container';
import { SortableNextUsageDemoContainer } from './demos/sortable-next-usage-demo-container';

@Component({
  selector: 'app-sortable-next-page',
  imports: [
    ScKbd,
    ScTypeset,
    Anatomy,
    ApiTable,
    ComponentBadges,
    PartsTable,
    TocHeading,
    SortableNextUsageDemoContainer,
    HandleSortableNextDemoContainer,
    HorizontalSortableNextDemoContainer,
    GridSortableNextDemoContainer,
    ButtonsSortableNextDemoContainer,
    LinkedSortableNextDemoContainer,
    DisabledSortableNextDemoContainer,
    RtlSortableNextDemoContainer,
  ],
  template: `
    <div class="space-y-12">
      <div class="space-y-2">
        <h1 scTypeset>Sortable Next</h1>
        <p class="text-muted-foreground">
          Your array, reordered — dragged by mouse, touch or pen, or lifted and
          moved by the keyboard, each step announced in your words; a list, a
          row, a grid, or items carried between linked lists.
        </p>
        <app-component-badges path="sortable-next" />
      </div>

      <section class="space-y-4">
        <h2 scTypeset appToc>Usage</h2>
        <app-sortable-next-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Anatomy</h2>
        <p>
          The list on your element, an item for each of yours (rendered from
          <code scTypeset>items()</code>: while one is moved, the moving order),
          an optional handle. Linked lists sit in a group, which holds them all.
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Moving</h2>
        <ul class="list-disc space-y-2 ps-6">
          <li>
            Mouse and pen: a press that moves a few pixels drags; touch: a press
            held a moment, then moved (a quick swipe scrolls). The item follows
            the pointer; near the list&apos;s edges, it scrolls. A press on the
            item&apos;s buttons, links or fields is theirs; with a handle, only
            the handle drags.
          </li>
          <li>
            The others make room, gliding to their new places (150ms, as
            dnd-kit); dropped, the item shows it a moment (Atlassian&apos;s
            flash). Neither under reduced motion. The looks are the style&apos;s
            (<code scTypeset>sortable</code>).
          </li>
          <li>
            The value is replaced on the drop — a new array, your items
            untouched. <code scTypeset>move(item, index)</code> moves one at
            once: for Move up / Move down buttons, the way that needs neither a
            drag nor the keys.
          </li>
          <li>
            <code scTypeset>orientation</code>: <code scTypeset>vertical</code>,
            <code scTypeset>horizontal</code> (a row, as the text reads), or
            <code scTypeset>grid</code> (your columns).
          </li>
        </ul>
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Keyboard</h2>
        <ul class="list-disc space-y-2 ps-6">
          <li>
            <kbd scKbd>Space</kbd> or <kbd scKbd>Enter</kbd> lifts the focused
            item; again, drops it. <kbd scKbd>Escape</kbd> puts it back.
          </li>
          <li>
            Lifted, the arrows move it — ↑ ↓ down a list, ← → along a row (as
            the text reads), by one and by a row in a grid, across lists in a
            group; <kbd scKbd>Home</kbd> / <kbd scKbd>End</kbd> to the start and
            the end.
          </li>
        </ul>
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Accessibility</h2>
        <ul class="list-disc space-y-2 ps-6">
          <li>
            Each item is a Tab stop; describe the keys once (<code scTypeset
              >aria-describedby</code
            >). Name each list.
          </li>
          <li>
            <code scTypeset>announce</code> puts each keyboard step into your
            words — positions, not indexes (&quot;Dropped Performance at 2 of
            5&quot;); the library writes none.
          </li>
          <li>
            Offer <code scTypeset>move()</code> in buttons too: some can neither
            drag nor lift.
          </li>
        </ul>
      </section>

      <section class="space-y-8">
        <h2 scTypeset appToc>Examples</h2>
        <app-handle-sortable-next-demo-container />
        <app-horizontal-sortable-next-demo-container />
        <app-grid-sortable-next-demo-container />
        <app-buttons-sortable-next-demo-container />
        <app-linked-sortable-next-demo-container />
        <app-disabled-sortable-next-demo-container />
        <app-rtl-sortable-next-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>API reference</h2>
        <p>
          Each part takes <code scTypeset>class</code>, merged over its own.
        </p>
        <app-parts-table label="Sortable Next parts" [parts]="parts" />
        <app-api-table label="ScSortableNext inputs" [inputs]="inputs" />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class SortableNextPage {
  private readonly anatomy = {
    imports:
      "import { ScSortableNext, ScSortableNextGroup, ScSortableNextHandle, ScSortableNextItem } from '@semantic-components/ui';",
    markup: [
      '<ul scSortableNext #list="scSortableNext" [(value)]="items" [announce]="announce" aria-label="Priorities">',
      '  @for (item of list.items(); track item.id) {',
      '    <li [scSortableNextItem]="item" aria-describedby="help">',
      '      <span scSortableNextHandle>…</span> {{ item.label }}',
      '    </li>',
      '  }',
      '</ul>',
      '',
      '<div scSortableNextGroup #board="scSortableNextGroup" [(value)]="board">',
      "  <ul [scSortableNext]=\"'todo'\">@for (task of board.items('todo'); …) { … }</ul>",
      '</div>',
    ].join('\n'),
  };

  private readonly parts = [
    {
      name: 'ScSortableNext',
      selector: '[scSortableNext]',
      description:
        'A list, a row or a grid. exportAs: items(), move(), active(), dragging(), lifted(), dropped().',
    },
    {
      name: 'ScSortableNextItem',
      selector: '[scSortableNextItem]',
      description:
        'An item: dragged, lifted; data-dragging, data-lifted, data-dropped.',
    },
    {
      name: 'ScSortableNextHandle',
      selector: '[scSortableNextHandle]',
      description:
        'Optional: only it starts a drag (decorative to screen readers).',
    },
    {
      name: 'ScSortableNextGroup',
      selector: '[scSortableNextGroup]',
      description:
        'Linked lists: one value for all; items(key), move(item, key, index).',
    },
  ];

  private readonly inputs: ApiInput[] = [
    {
      name: 'value',
      type: 'T[]',
      default: '[]',
      description: 'Two-way: your items, in order (in a group, the group’s).',
    },
    {
      name: 'scSortableNext',
      type: 'string',
      default: "''",
      description: 'In a group: this list’s key.',
    },
    {
      name: 'orientation',
      type: "'vertical' | 'horizontal' | 'grid'",
      default: "'vertical'",
      description: 'How it is laid out, and so which arrows move.',
    },
    {
      name: 'announce',
      type: '(event) => string',
      default: '—',
      description: 'Each keyboard step, in your words.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Shown, not moved; not Tab stops.',
    },
  ];
}
