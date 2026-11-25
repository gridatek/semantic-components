import { Component, ViewEncapsulation } from '@angular/core';
import { ScKbd, ScTypeset } from '@semantic-components/ui';
import { Anatomy } from '../../../components/anatomy/anatomy';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { PartsTable } from '../../../components/parts-table/parts-table';
import { TocHeading } from '../../../components/toc/toc-heading';
import { CheckboxesTreeDemoContainer } from './demos/checkboxes-tree-demo-container';
import { ControllerTreeDemoContainer } from './demos/controller-tree-demo-container';
import { DataTreeDemoContainer } from './demos/data-tree-demo-container';
import { DisabledTreeDemoContainer } from './demos/disabled-tree-demo-container';
import { LazyTreeDemoContainer } from './demos/lazy-tree-demo-container';
import { LinksTreeDemoContainer } from './demos/links-tree-demo-container';
import { MultipleTreeDemoContainer } from './demos/multiple-tree-demo-container';
import { RtlTreeDemoContainer } from './demos/rtl-tree-demo-container';
import { TreeUsageDemoContainer } from './demos/tree-usage-demo-container';

@Component({
  selector: 'app-tree-page',
  imports: [
    ScKbd,
    ScTypeset,
    Anatomy,
    ComponentBadges,
    PartsTable,
    TocHeading,
    TreeUsageDemoContainer,
    DataTreeDemoContainer,
    MultipleTreeDemoContainer,
    CheckboxesTreeDemoContainer,
    LinksTreeDemoContainer,
    DisabledTreeDemoContainer,
    LazyTreeDemoContainer,
    ControllerTreeDemoContainer,
    RtlTreeDemoContainer,
  ],
  template: `
    <div class="space-y-12">
      <div class="space-y-2">
        <h1 scTypeset>Tree</h1>
        <p class="text-muted-foreground">
          A hierarchy of files, pages or choices, its branches opening on their
          children — files in folders, pages in a docs sidebar. Start with
          nested items; add selection, checkboxes, links or children loaded on
          first open as you need them.
        </p>
        <app-component-badges path="tree" />
      </div>

      <section class="space-y-4">
        <h2 scTypeset appToc>Usage</h2>
        <app-tree-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Anatomy</h2>
        <p>
          A tree of items. An item&apos;s label is its row; an item holding a
          group is a branch, the group&apos;s content its children — rendered
          the first time it opens, then kept. Every part is a directive on your
          element; the items find their tree and their parent by their place.
          Children from data: a template of yours, stamped for each level with
          <code scTypeset>ngTemplateOutletInjector="outlet"</code> (the Items as
          Data example).
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Selection and checkboxes</h2>
        <ul class="list-disc space-y-2 ps-6">
          <li>
            <code scTypeset>mode</code>: one item (<code scTypeset>single</code
            >, the default), several (<code scTypeset>multiple</code>), or none
            (<code scTypeset>none</code>) — the selected values in
            <code scTypeset>[(value)]</code>.
            <code scTypeset>activation="automatic"</code>: moving the focus
            selects.
          </li>
          <li>
            The open branches in <code scTypeset>[(expanded)]</code>. A press on
            a row opens or closes its branch; with
            <code scTypeset>[expandOnPress]="false"</code> only its indicator
            does.
          </li>
          <li>
            <code scTypeset>checkable</code>: checkboxes apart from the
            selection, in <code scTypeset>[(checked)]</code>. A branch checks
            all it holds, half-ticked while only some is;
            <code scTypeset>checked</code> holds the outermost fully checked
            items (<code scTypeset>checkStrategy="trunk"</code>) — a branch
            stands for all it holds, opened or not —, or each item on its own
            (<code scTypeset>independent</code>).
          </li>
          <li>
            <code scTypeset>current</code>: a navigation tree — the page shown,
            <code scTypeset>aria-current="page"</code>, its rows links.
          </li>
        </ul>
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Keyboard</h2>
        <ul class="list-disc space-y-2 ps-6">
          <li>
            The tree is one tab stop: the selected item, or the first.
            <kbd scKbd>↓</kbd> and <kbd scKbd>↑</kbd>: the next and previous row
            shown; <kbd scKbd>Home</kbd> and <kbd scKbd>End</kbd>: the first and
            last; a letter: the next row starting with it.
          </li>
          <li>
            <kbd scKbd>→</kbd> opens a branch, or goes to its first child;
            <kbd scKbd>←</kbd> closes it, or goes to its parent — mirrored right
            to left. <kbd scKbd>Shift + *</kbd> opens a row&apos;s siblings.
          </li>
          <li>
            <kbd scKbd>Space</kbd> or <kbd scKbd>Enter</kbd> selects; checks, in
            a checkable tree (<kbd scKbd>Space</kbd>); follows a link (<kbd
              scKbd
              >Enter</kbd
            >).
          </li>
          <li>
            Several: <kbd scKbd>Shift + ↓</kbd> and
            <kbd scKbd>Shift + ↑</kbd> extend the selection,
            <kbd scKbd>Ctrl + A</kbd> selects all; with the pointer, a click
            adds or removes one, <kbd scKbd>Shift</kbd> + click selects a range.
          </li>
        </ul>
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Accessibility</h2>
        <ul class="list-disc space-y-2 ps-6">
          <li>
            A tree (WAI-ARIA, Angular Aria&apos;s pattern): name it. Each item
            says its level, its place among its siblings, whether it is open,
            selected or current — and, checkable, checked or mixed.
          </li>
          <li>
            The item takes the focus, not its row: a link&apos;s row is out of
            the tab order, a checkbox too, and hidden from screen readers (the
            item says it).
          </li>
          <li>
            Disabled items stay focusable, so they can be found and read;
            <code scTypeset>[focusableWhenDisabled]="false"</code> skips them.
          </li>
          <li>
            Children loading: the item is busy (<code scTypeset>[loading]</code
            >, <code scTypeset>aria-busy</code>); say the result in a live
            region.
          </li>
        </ul>
      </section>

      <section class="space-y-8">
        <h2 scTypeset appToc>Examples</h2>
        <app-data-tree-demo-container />
        <app-multiple-tree-demo-container />
        <app-checkboxes-tree-demo-container />
        <app-links-tree-demo-container />
        <app-disabled-tree-demo-container />
        <app-lazy-tree-demo-container />
        <app-controller-tree-demo-container />
        <app-rtl-tree-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>API reference</h2>
        <p>
          Each part takes <code scTypeset>class</code>, merged over its look
          (cn: a later class wins). A row&apos;s size, spacing and corners are
          the style&apos;s (its menu item&apos;s).
        </p>
        <app-parts-table label="Tree parts" [parts]="parts" />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class TreePage {
  private readonly anatomy = {
    imports: [
      'import {',
      '  ScTree, ScTreeItem, ScTreeItemLabel, ScTreeItemIndicator,',
      '  ScTreeItemCheckbox, ScTreeGroup, ScTreeGroupContent,',
      "} from '@semantic-components/ui';",
    ].join('\n'),
    markup: [
      '<ul scTree aria-label="…">',
      '  <li scTreeItem value="…">',
      '    <div scTreeItemLabel>',
      '      <span scTreeItemIndicator>…</span>',
      '      <input type="checkbox" scCheckbox scTreeItemCheckbox />',
      '      …',
      '    </div>',
      '    <ul scTreeGroup>',
      '      <ng-template scTreeGroupContent>',
      '        <li scTreeItem value="…">…</li>',
      '      </ng-template>',
      '    </ul>',
      '  </li>',
      '</ul>',
    ].join('\n'),
  };

  private readonly parts = [
    {
      name: 'ScTree',
      selector: 'ul[scTree]',
      description:
        "The tree (name it). [(value)], mode ('single', 'multiple', 'none'), activation ('manual', 'automatic'), [(expanded)], expandOnPress (true), checkable, [(checked)], checkStrategy ('trunk', 'independent'), current, disabled, focusableWhenDisabled (true). exportAs scTree: expandAll(), collapseAll(), reveal(value), focus(value).",
    },
    {
      name: 'ScTreeItem',
      selector: 'li[scTreeItem]',
      description:
        "An item: value (required), disabled, selectable (true; false: it only opens), label (for typeahead; its row's text by default), loading, failed. A branch when it holds a group. exportAs scTreeItem: expanded(), selected(), current(), branch(), level(), checkState().",
    },
    {
      name: 'ScTreeItemLabel',
      selector: 'div[scTreeItemLabel], a[scTreeItemLabel]',
      description:
        'Its row, pressed and styled; on an a, a link that Enter follows. data-selected, data-expanded, data-branch, data-current, data-disabled, data-loading, data-failed.',
    },
    {
      name: 'ScTreeItemIndicator',
      selector: 'span[scTreeItemIndicator]',
      description:
        "Your chevron (pointing to the end): turned down when open, mirrored right to left; it opens or closes the branch even when the row doesn't. Unseen on a leaf: put one in every row.",
    },
    {
      name: 'ScTreeItemCheckbox',
      selector: 'input[type="checkbox"][scTreeItemCheckbox]',
      description:
        'On an scCheckbox, in a checkable tree: ticked, empty or half-ticked from the tree; out of the tab order (Space on the item checks).',
    },
    {
      name: 'ScTreeGroup',
      selector: 'ul[scTreeGroup]',
      description:
        "A branch's children, a group: indented, animated open and closed, hidden closed.",
    },
    {
      name: 'ScTreeGroupContent',
      selector: 'ng-template[scTreeGroupContent]',
      description:
        'Inside the group: its items, rendered the first time the branch opens, then kept.',
    },
  ];
}
