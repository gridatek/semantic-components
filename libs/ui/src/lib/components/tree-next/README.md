# Tree Next

A hierarchy of files, pages or choices, its branches opening on their children — files in folders, pages in a docs sidebar. Its parts, features and examples follow ui-sdk's Tree; its behaviour is Angular Aria's tree pattern (`TreePattern`, `TreeItemPattern`, `DeferredContent` from `@angular/aria/private`): the keyboard, selection, typeahead and the ARIA tree. Its items find their tree and their parent by their place: no `parent` to pass (Aria's `ngTreeItem` requires one, and a host directive can't hide a required input — so the parts are built on Aria's patterns, as Aria's own directives are).

The `Next` suffix: built beside the Tree, to be compared before it takes its name.

## Usage

```html
<ul scTreeNext aria-label="Project files" [(expanded)]="open" [(value)]="selected">
  <li scTreeNextItem value="src">
    <div scTreeNextItemLabel>
      <span scTreeNextItemIndicator><svg siChevronRightIcon></svg></span>
      src
    </div>
    <ul scTreeNextGroup>
      <ng-template scTreeNextGroupContent>
        <li scTreeNextItem value="src/index.ts">
          <div scTreeNextItemLabel>
            <span scTreeNextItemIndicator><svg siChevronRightIcon></svg></span>
            index.ts
          </div>
        </li>
      </ng-template>
    </ul>
  </li>
</ul>
```

Children from data: one template of yours, stamped for each level with `ngTemplateOutletInjector="outlet"` — the items then find the group they are in.

```html
<ul scTreeNext aria-label="Files">
  <ng-container [ngTemplateOutlet]="branch" [ngTemplateOutletContext]="{ $implicit: files }" ngTemplateOutletInjector="outlet" />
</ul>

<ng-template #branch let-nodes>
  @for (node of nodes; track node.id) {
  <li scTreeNextItem [value]="node.id">
    <div scTreeNextItemLabel>…{{ node.name }}</div>
    @if (node.children) {
    <ul scTreeNextGroup>
      <ng-template scTreeNextGroupContent>
        <ng-container [ngTemplateOutlet]="branch" [ngTemplateOutletContext]="{ $implicit: node.children }" ngTemplateOutletInjector="outlet" />
      </ng-template>
    </ul>
    }
  </li>
  }
</ng-template>
```

## Parts

| Part                      | Selector                                             | Does                                                                                                                                                                                                                                                                                                                                                                        |
| ------------------------- | ---------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ScTreeNext`              | `ul[scTreeNext]`                                     | The tree (name it). `[(value)]`, `mode` (`single`, `multiple`, `none`), `activation` (`manual`, `automatic`), `[(expanded)]`, `expandOnPress` (true), `checkable`, `[(checked)]`, `checkStrategy` (`trunk`, `independent`), `current`, `disabled`, `focusableWhenDisabled` (true). `exportAs` `scTreeNext`: `expandAll()`, `collapseAll()`, `reveal(value)`, `focus(value)` |
| `ScTreeNextItem`          | `li[scTreeNextItem]`                                 | An item: `value` (required), `disabled`, `label` (typeahead; its row's text by default), `loading`, `failed`. A branch when it holds a group. `exportAs` `scTreeNextItem`: `expanded()`, `selected()`, `current()`, `branch()`, `level()`, `checkState()`                                                                                                                   |
| `ScTreeNextItemLabel`     | `div[scTreeNextItemLabel]`, `a[scTreeNextItemLabel]` | Its row: pressed and styled. On an `a`, a link Enter follows (out of the tab order). `data-selected`, `data-expanded`, `data-branch`, `data-current`, `data-disabled`, `data-loading`, `data-failed`                                                                                                                                                                        |
| `ScTreeNextItemIndicator` | `span[scTreeNextItemIndicator]`                      | Your chevron, pointing to the end: turned down when open, mirrored right to left. It opens or closes the branch — nothing selected — even when the row doesn't. Unseen on a leaf: one in every row keeps the names in line                                                                                                                                                  |
| `ScTreeNextItemCheckbox`  | `input[type="checkbox"][scTreeNextItemCheckbox]`     | On an `scCheckbox` (checkable tree): ticked, empty or half-ticked from the tree; out of the tab order and hidden from screen readers — the item says it (`aria-checked`), Space checks it                                                                                                                                                                                   |
| `ScTreeNextGroup`         | `ul[scTreeNextGroup]`                                | A branch's children (`role="group"`): indented, animated open and closed (the Collapsible's animation), hidden closed                                                                                                                                                                                                                                                       |
| `ScTreeNextGroupContent`  | `ng-template[scTreeNextGroupContent]`                | Inside the group: its items, rendered the first time the branch opens, then kept                                                                                                                                                                                                                                                                                            |

## State

- **Selection** (`[(value)]`, an array): one, several or none (`mode`). `activation="automatic"`: the focus selects. Several: a click adds or removes one, Shift + click a range, Shift + arrows extend it, Ctrl or ⌘ + A all (Aria's).
- **Open branches** (`[(expanded)]`), held by the tree. A press on a row opens or closes its branch; `[expandOnPress]="false"`: only its indicator.
- **Checkboxes** (`checkable`, `[(checked)]`), apart from the selection. A branch checks all it holds, half-ticked while only some is. `trunk` (the default): `checked` holds the outermost fully checked items — a branch stands for all it holds, opened or not, so your data gives its leaves. `independent`: each item on its own. (ui-sdk's `leaf` and `branch` are left out: a branch never opened has no items rendered to list.)
- **Current page** (`current`): a navigation tree — `aria-current="page"`, its tab stop. Open its ancestors with `expanded`.
- **Children loaded on first open**: load on `(expandedChange)`; `[loading]` (`aria-busy`) while they come, `[failed]` after. A branch is an item with a group: an empty group until they arrive.
- **From code**: `expandAll()` (and the branches that appear while it's on), `collapseAll()`, `reveal(value)` — its ancestors opened, scrolled to, focused, once it is rendered (one never opened: open it with `expanded`).

## Keyboard

Aria's tree pattern: one tab stop (the selected item, the current one, or the first). ↓ ↑ the rows shown, Home and End, a letter; → opens a branch or goes to its first child, ← closes it or goes to its parent (mirrored right to left); Shift + `*` opens a row's siblings; Space or Enter selects. Ours: Space checks (checkable), Enter follows a link.

## Styles

The style's `treeNext` key: `label`, a row as the style's menu item — its size, spacing and corners. The rest is the same in every style (in the parts): the selected or current row `bg-accent`, the hovered one `bg-accent/50`, the focus ring on the row (the item has the focus), a group indented by `ps-4`.

## Left out

ui-sdk's `items` and `paths` data props (the markup is yours, a template for data), virtualization, `onAction` and its pending state (a `(click)` of yours), `hiddenUntilFound`, `keepMounted`, a custom `announcement` function, `debug`.
