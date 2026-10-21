import { Component, ViewEncapsulation } from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { BasicTransferListNextDemoContainer } from './demos/basic-transfer-list-next-demo-container';
import { FormTransferListNextDemoContainer } from './demos/form-transfer-list-next-demo-container';
import { ManyTransferListNextDemoContainer } from './demos/many-transfer-list-next-demo-container';
import { OrderedTransferListNextDemoContainer } from './demos/ordered-transfer-list-next-demo-container';

@Component({
  selector: 'app-transfer-list-next-page',
  imports: [
    BasicTransferListNextDemoContainer,
    FormTransferListNextDemoContainer,
    OrderedTransferListNextDemoContainer,
    ManyTransferListNextDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Transfer List Next</h1>
        <p class="text-muted-foreground">
          The transfer list, rebuilt: one value — the chosen ids, in order, a
          form field — and two sides that are listboxes: select with the keys,
          move with Enter or a double-click, search, reorder.
        </p>
        <app-component-badges path="transfer-list-next" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Basic</h2>
        <p class="text-muted-foreground">
          Two sides, one value: the chosen ids. Each side a listbox — ↑ ↓, Space
          selects, Shift extends, Ctrl+A all, Enter (or a double-click) moves
          across; one Tab stop each. Billing is disabled.
        </p>
        <app-basic-transfer-list-next-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Form</h2>
        <p class="text-muted-foreground">
          A [formField]: the chosen ids; at least two, in the schema — left
          short, the error shows.
        </p>
        <app-form-transfer-list-next-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Ordered</h2>
        <p class="text-muted-foreground">
          The value keeps its order: choose a table's columns, then move them up
          and down.
        </p>
        <app-ordered-transfer-list-next-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Many</h2>
        <p class="text-muted-foreground">
          Two hundred items: search to narrow a side; Add all moves what the
          search shows.
        </p>
        <app-many-transfer-list-next-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class TransferListNextPage {}
