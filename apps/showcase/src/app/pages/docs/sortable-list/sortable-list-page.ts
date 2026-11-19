import { Component, ViewEncapsulation } from '@angular/core';
import { ScKbd, ScTypeset } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { BasicSortableListDemoContainer } from './demos/basic-sortable-list-demo-container';
import { ButtonsSortableListDemoContainer } from './demos/buttons-sortable-list-demo-container';
import { DisabledSortableListDemoContainer } from './demos/disabled-sortable-list-demo-container';
import { GridSortableListDemoContainer } from './demos/grid-sortable-list-demo-container';
import { HandleSortableListDemoContainer } from './demos/handle-sortable-list-demo-container';
import { HorizontalSortableListDemoContainer } from './demos/horizontal-sortable-list-demo-container';

@Component({
  selector: 'app-sortable-list-page',
  imports: [
    ScKbd,
    BasicSortableListDemoContainer,
    HandleSortableListDemoContainer,
    HorizontalSortableListDemoContainer,
    GridSortableListDemoContainer,
    ButtonsSortableListDemoContainer,
    DisabledSortableListDemoContainer,
    TocHeading,
    ComponentBadges,
    ScTypeset,
  ],
  template: `
    <div class="space-y-12">
      <div class="space-y-2">
        <h1 scTypeset>Sortable List</h1>
        <p class="text-muted-foreground">
          Your array, reordered — dragged by mouse, touch or pen, or lifted and
          moved by the keyboard, each step announced in your words; down, along,
          or as a grid.
        </p>
        <app-component-badges path="sortable-list" />
      </div>

      <section class="space-y-4">
        <h2 scTypeset appToc>Basic</h2>
        <p>
          Your array, reordered: drag an item with the mouse, a finger (hold,
          then move) or a pen — or lift it with <kbd scKbd>Space</kbd>, move it
          with <kbd scKbd>↑</kbd> <kbd scKbd>↓</kbd>, drop it with
          <kbd scKbd>Space</kbd>; <kbd scKbd>Escape</kbd> puts it back. Each
          keyboard step is announced in your words.
        </p>
        <app-basic-sortable-list-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Handle</h2>
        <p>
          With a handle, only the grip drags — the rest of the item is free for
          a checkbox and its label. The keyboard still lifts the whole item.
        </p>
        <app-handle-sortable-list-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Horizontal</h2>
        <p>
          Along a row — tags, tabs, steps: <kbd scKbd>←</kbd>
          <kbd scKbd>→</kbd> move a lifted item, in the reading direction
          (reversed right to left).
        </p>
        <app-horizontal-sortable-list-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Grid</h2>
        <p>
          As a grid — photos: the place follows the reading order;
          <kbd scKbd>←</kbd> <kbd scKbd>→</kbd> move a lifted item by one,
          <kbd scKbd>↑</kbd> <kbd scKbd>↓</kbd> by a row.
        </p>
        <app-grid-sortable-list-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Move buttons</h2>
        <p>
          move(item, index) — for Move up and Move down buttons, the simplest
          way for those who neither drag nor lift.
        </p>
        <app-buttons-sortable-list-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Disabled</h2>
        <p>
          disabled: shown in order, but not moved — the items are not
          <kbd scKbd>Tab</kbd> stops then.
        </p>
        <app-disabled-sortable-list-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class SortableListPage {}
