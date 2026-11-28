# Tree

A hierarchy of files, pages or choices, its branches opening on their children — files in folders, pages in a docs sidebar. Its parts, features and examples follow ui-sdk's Tree; its behaviour is Angular Aria's tree (`@angular/aria/tree`: `Tree`, `TreeItem`, `TreeItemGroup`) — the keyboard, selection, typeahead and the ARIA tree. Its items find their tree and their parent by their place: no `parent` to pass. Aria's item and group require `parent` and `ownedBy`, and a host directive's required inputs must be exposed; so `ScTreeAriaItem` and `ScTreeAriaGroup` subclass them with those inputs optional, and the parts set them from their place. They are a workaround, waiting for Angular: to be removed once a directive can feed its host directives' required inputs (angular/angular#50510), or Aria makes them optional. Public Aria only — nothing from `@angular/aria/private`.

## Usage

```html
<ul scTree aria-label="Project files" [(expanded)]="open" [(value)]="selected">
  <li scTreeItem value="src">
    <div scTreeItemLabel>
      <span scTreeItemIndicator><svg siChevronRightIcon></svg></span>
      src
    </div>
    <ul scTreeGroup>
      <ng-template scTreeGroupContent>
        <li scTreeItem value="src/index.ts">
          <div scTreeItemLabel>
            <span scTreeItemIndicator><svg siChevronRightIcon></svg></span>
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
<ul scTree aria-label="Files">
  <ng-container [ngTemplateOutlet]="branch" [ngTemplateOutletContext]="{ $implicit: files }" ngTemplateOutletInjector="outlet" />
</ul>

<ng-template #branch let-nodes>
  @for (node of nodes; track node.id) {
  <li scTreeItem [value]="node.id">
    <div scTreeItemLabel>…{{ node.name }}</div>
    @if (node.children) {
    <ul scTreeGroup>
      <ng-template scTreeGroupContent>
        <ng-container [ngTemplateOutlet]="branch" [ngTemplateOutletContext]="{ $implicit: node.children }" ngTemplateOutletInjector="outlet" />
      </ng-template>
    </ul>
    }
  </li>
  }
</ng-template>
```

## Parts

| Part                  | Selector                                     | Does                                                                                                                                                                                                                                                                                                                                                    |
| --------------------- | -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ScTree`              | `ul[scTree]`                                 | The tree (name it). `[(value)]`, `mode` (`single`, `multiple`, `none`), `activation` (`manual`, `automatic`), `[(expanded)]`, `expandOnPress` (true), `checkable`, `[(checked)]`, `checkStrategy` (`trunk`, `independent`), `current`, `disabled`, `focusableWhenDisabled` (true). `exportAs` `scTree`: `expandAll()`, `collapseAll()`, `reveal(value)` |
| `ScTreeItem`          | `li[scTreeItem]`                             | An item: `value` (required), `disabled`, `selectable` (true; false: it only opens — a folder), `label` (typeahead; its row's text by default), `loading`, `failed`. A branch when it holds a group. `exportAs` `scTreeItem`: `expanded()`, `selected()`, `current()`, `branch()`, `level()`, `checkState()`                                             |
| `ScTreeItemLabel`     | `div[scTreeItemLabel]`, `a[scTreeItemLabel]` | Its row: pressed and styled. On an `a`, a link Enter follows (out of the tab order). `data-selected`, `data-expanded`, `data-branch`, `data-current`, `data-disabled`, `data-loading`, `data-failed`                                                                                                                                                    |
| `ScTreeItemIndicator` | `span[scTreeItemIndicator]`                  | Your chevron, pointing to the end: turned down when open, mirrored right to left. It opens or closes the branch — nothing selected — even when the row doesn't. Unseen on a leaf: one in every row keeps the names in line                                                                                                                              |
| `ScTreeItemCheckbox`  | `input[type="checkbox"][scTreeItemCheckbox]` | On an `scCheckbox` (checkable tree): ticked, empty or half-ticked from the tree; out of the tab order and hidden from screen readers — the item says it (`aria-checked`), Space checks it; named by its item all the same (`aria-labelledby`): a form control with no label is an error to WAVE, hidden or not                                          |
| `ScTreeGroup`         | `ul[scTreeGroup]`                            | A branch's children (`role="group"`): indented, animated open and closed (the Collapsible's animation), hidden closed                                                                                                                                                                                                                                   |
| `ScTreeGroupContent`  | `ng-template[scTreeGroupContent]`            | Inside the group: its items, rendered the first time the branch opens, then kept                                                                                                                                                                                                                                                                        |

## State

- **Selection** (`[(value)]`, an array): one, several or none (`mode`); an item with `[selectable]="false"` only opens. `activation="automatic"`: the focus selects. Several: a click adds or removes one, Shift + click a range, Shift + arrows extend it, Ctrl or ⌘ + A all (Aria's).
- **Open branches** (`[(expanded)]`), held by the tree. A press on a row opens or closes its branch; `[expandOnPress]="false"`: only its indicator.
- **Checkboxes** (`checkable`, `[(checked)]`), apart from the selection. A branch checks all it holds, half-ticked while only some is. `trunk` (the default): `checked` holds the outermost fully checked items — a branch stands for all it holds, opened or not, so your data gives its leaves. `independent`: each item on its own. (ui-sdk's `leaf` and `branch` are left out: a branch never opened has no items rendered to list.)
- **Current page** (`current`): a navigation tree — `aria-current="page"`. Open its ancestors with `expanded`.
- **Children loaded on first open**: load on `(expandedChange)`; `[loading]` (`aria-busy`) while they come, `[failed]` after. A branch is an item with a group: an empty group until they arrive.
- **From code**: `expandAll()` (and the branches that appear while it's on), `collapseAll()`, `reveal(value)` — its ancestors opened and scrolled to, once it is rendered (one never opened: open it with `expanded`).

## Keyboard

Aria's tree: one tab stop (the selected item, or the first). ↓ ↑ the rows shown, Home and End, a letter; → opens a branch or goes to its first child, ← closes it or goes to its parent (mirrored right to left); Shift + `*` opens a row's siblings; Space or Enter selects. Ours: Space checks (checkable), Enter follows a link.

## Styles

The style's `tree` key: `label`, a row as the style's menu item — its size, spacing and corners. The rest is the same in every style (in the parts): the selected or current row `bg-accent`, the hovered one `bg-accent/50`, the focus ring on the row (the item has the focus), a group indented by `ps-4`.

## Left out

ui-sdk's `items` and `paths` data props (the markup is yours, a template for data), virtualization, `onAction` and its pending state (a `(click)` of yours), `hiddenUntilFound`, `keepMounted`, a custom `announcement` function, `debug`.
