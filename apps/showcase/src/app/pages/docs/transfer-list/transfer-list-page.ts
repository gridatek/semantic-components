import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ScKbd, ScLink, ScTypeset } from '@semantic-components/ui';
import { Anatomy } from '../../../components/anatomy/anatomy';
import { TocHeading } from '../../../components/toc/toc-heading';
import { FormTransferListDemoContainer } from './demos/form-transfer-list-demo-container';
import { OrderedTransferListDemoContainer } from './demos/ordered-transfer-list-demo-container';
import { RtlTransferListDemoContainer } from './demos/rtl-transfer-list-demo-container';
import { TransferListUsageDemoContainer } from './demos/transfer-list-usage-demo-container';

@Component({
  selector: 'app-transfer-list-page',
  imports: [
    RouterLink,
    ScKbd,
    ScLink,
    ScTypeset,
    Anatomy,
    TocHeading,
    TransferListUsageDemoContainer,
    OrderedTransferListDemoContainer,
    FormTransferListDemoContainer,
    RtlTransferListDemoContainer,
  ],
  template: `
    <div class="space-y-12">
      <div class="space-y-2">
        <h1 scTypeset>Transfer List</h1>
        <p class="text-muted-foreground">
          A recipe: items moved between two lists — two
          <a scLink routerLink="/docs/components/listbox">Listboxes</a>
          and one value, the chosen ids in order. No component of its own.
        </p>
      </div>

      <section class="space-y-4">
        <h2 scTypeset appToc>Usage</h2>
        <app-transfer-list-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>How it is made</h2>
        <p>
          The value is yours: a signal of the chosen ids (or a field of your
          form&apos;s model). Each side is computed from it — the rest of the
          items in theirs, the chosen in the value&apos;s order — and is a
          <code scTypeset>scListbox multiple</code> bound to what is selected
          there. One template for both sides (a
          <code scTypeset>&#64;for</code> over two side descriptions), the
          buttons between them by grid order.
        </p>
        <ul class="list-disc space-y-2 ps-6">
          <li>
            Move: the selected ids across — still selected on their new side, so
            a move back is one key away. Move all: what the side shows
            (searched), not disabled.
          </li>
          <li>
            <kbd scKbd>Enter</kbd> on a list, or a double-click on an item,
            moves too: a <code scTypeset>(keydown.enter)</code> and a
            <code scTypeset>(dblclick)</code>.
          </li>
          <li>
            Search: a text per side, filtering what it shows. Select all: a
            checkbox, checked when every movable item is selected, indeterminate
            when some are.
          </li>
          <li>
            Reorder: the chosen side&apos;s selection moved up or down by one,
            together; the buttons disabled at the ends.
          </li>
        </ul>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Accessibility</h2>
        <ul class="list-disc space-y-2 ps-6">
          <li>
            Each list is a Listbox, one Tab stop, named by its title: arrows,
            <kbd scKbd>Space</kbd> to select, <kbd scKbd>Shift</kbd> for a
            range, <kbd scKbd>Ctrl + A</kbd> for all, typing to jump.
          </li>
          <li>
            Name every icon button (&quot;Add selected&quot;), the searches and
            the select-all checkboxes; buttons with nothing to do are disabled.
          </li>
          <li>
            In right-to-left pages the arrows turn (<code scTypeset
              >rtl:rotate-180</code
            >), so they point across as the text reads.
          </li>
        </ul>
      </section>

      <section class="space-y-8">
        <h2 scTypeset appToc>Examples</h2>
        <app-ordered-transfer-list-demo-container />
        <app-form-transfer-list-demo-container />
        <app-rtl-transfer-list-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class TransferListPage {
  private readonly anatomy = {
    imports:
      "import { ScButton, ScCheckbox, ScInput, ScListbox, ScListboxItem, ScListboxMultiple } from '@semantic-components/ui';",
    markup: [
      '@for (side of sides; track side.key) {',
      '  <input type="checkbox" scCheckbox [checked]="allSelected(side.key)" (checkedChange)="selectAll(side.key, $event)" />',
      '  <input scInput type="search" [value]="query[side.key]()" (input)="search(side.key, $event)" />',
      '  <div scListbox multiple [(value)]="…selected" (keydown.enter)="move(side.key)">',
      '    @for (item of lists()[side.key]; track item.id) {',
      '      <div scListboxItem [value]="item.id" (dblclick)="move(side.key, [item.id])">{{ item.label }}</div>',
      '    }',
      '  </div>',
      '}',
      '<button scButton (click)="move(\'source\')">…</button>  <!-- move all, back, reorder -->',
    ].join('\n'),
  };
}
