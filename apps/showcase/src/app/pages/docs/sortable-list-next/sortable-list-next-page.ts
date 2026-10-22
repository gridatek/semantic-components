import { Component, ViewEncapsulation } from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { BasicSortableListNextDemoContainer } from './demos/basic-sortable-list-next-demo-container';
import { ButtonsSortableListNextDemoContainer } from './demos/buttons-sortable-list-next-demo-container';
import { DisabledSortableListNextDemoContainer } from './demos/disabled-sortable-list-next-demo-container';
import { GridSortableListNextDemoContainer } from './demos/grid-sortable-list-next-demo-container';
import { HandleSortableListNextDemoContainer } from './demos/handle-sortable-list-next-demo-container';
import { HorizontalSortableListNextDemoContainer } from './demos/horizontal-sortable-list-next-demo-container';

@Component({
  selector: 'app-sortable-list-next-page',
  imports: [
    BasicSortableListNextDemoContainer,
    HandleSortableListNextDemoContainer,
    HorizontalSortableListNextDemoContainer,
    GridSortableListNextDemoContainer,
    ButtonsSortableListNextDemoContainer,
    DisabledSortableListNextDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Sortable List Next</h1>
        <p class="text-muted-foreground">
          The sortable list, rebuilt: your array, reordered — dragged by mouse,
          touch or pen, or lifted and moved by the keyboard, each step announced
          in your words; down, along, or as a grid.
        </p>
        <app-component-badges path="sortable-list-next" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Basic</h2>
        <p class="text-muted-foreground">
          Your array, reordered: drag an item with the mouse, a finger (hold,
          then move) or a pen — or lift it with Space, move it with ↑ ↓, drop it
          with Space; Escape puts it back. Each keyboard step is announced in
          your words.
        </p>
        <app-basic-sortable-list-next-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Handle</h2>
        <p class="text-muted-foreground">
          With a handle, only the grip drags — the rest of the item is free for
          a checkbox and its label. The keyboard still lifts the whole item.
        </p>
        <app-handle-sortable-list-next-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Horizontal</h2>
        <p class="text-muted-foreground">
          Along a row — tags, tabs, steps: ← → move a lifted item, in the
          reading direction (reversed right to left).
        </p>
        <app-horizontal-sortable-list-next-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Grid</h2>
        <p class="text-muted-foreground">
          As a grid — photos: the place follows the reading order; ← → move a
          lifted item by one, ↑ ↓ by a row.
        </p>
        <app-grid-sortable-list-next-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Move buttons</h2>
        <p class="text-muted-foreground">
          move(item, index) — for Move up and Move down buttons, the simplest
          way for those who neither drag nor lift.
        </p>
        <app-buttons-sortable-list-next-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Disabled</h2>
        <p class="text-muted-foreground">
          disabled: shown in order, but not moved — the items are not Tab stops
          then.
        </p>
        <app-disabled-sortable-list-next-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class SortableListNextPage {}
