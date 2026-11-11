# Command Next

A search over commands: typing filters them, the arrows move the highlight while focus stays in the search, Enter runs it. shadcn's Command (built on cmdk) in the look of the app's preset (the `command` key). Built beside [Command](../command/README.md), to compare.

## Usage

```html
<div scCommandNext #cmd="scCommandNext" scFrame>
  <div scCommandNextInputGroup>
    <svg siSearchIcon></svg>
    <input scCommandNextInput placeholder="Type a command or search..." aria-label="Search commands" />
  </div>
  <div scCommandNextList aria-label="Commands">
    <div scCommandNextEmpty>No results found.</div>
    <div scCommandNextGroup>
      <div scCommandNextGroupLabel>Settings</div>
      <div scCommandNextItem [keywords]="['account']" (select)="openProfile()">
        <svg siUserIcon></svg>
        <span>Profile</span>
        <span scCommandNextShortcut>⌘P</span>
      </div>
    </div>
    <div scCommandNextSeparator></div>
  </div>
  <div scCommandNextStatus>{{ cmd.count() }} results</div>
</div>
```

In a dialog, on the dialog itself: `<div scDialog scCommandNextDialog>`, with an `sr-only` title and description.

## Parts

| Part                                            | Selector                                               | What it does                                                                                                                                                    |
| ----------------------------------------------- | ------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ScCommandNext`                                 | `div[scCommandNext]`                                   | Filters its items by the search. `filter`, `shouldFilter`, `loopFocus`, `vimBindings`, `highlightItemOnHover`; exportAs: `count()`, `active()`, `search()`      |
| `ScCommandNextInputGroup`                       | `div[scCommandNextInputGroup]`                         | Around the search: your search icon (an SVG, placed first) and the input, in the input group's look                                                             |
| `ScCommandNextInput`                            | `input[scCommandNextInput]`                            | The search (`role="combobox"`, `aria-activedescendant`): `[(value)]` is its text; the keys. Name it                                                             |
| `ScCommandNextList`                             | `div[scCommandNextList]`                               | The items (`role="listbox"`), scrolling, the highlighted one kept in view. Name it                                                                              |
| `ScCommandNextEmpty`                            | `div[scCommandNextEmpty]`                              | Your text when no item shows                                                                                                                                    |
| `ScCommandNextGroup`, `ScCommandNextGroupLabel` | `div[scCommandNextGroup]`, `[scCommandNextGroupLabel]` | Related items (`role="group"`), named by the label; hidden while none of its items shows                                                                        |
| `ScCommandNextItem`                             | `div[scCommandNextItem]`, `a[scCommandNextItem]`       | A command (`role="option"`): `(select)` on Enter or a click, a link followed. `value`, `keywords`, `disabled`, `forceMount`; `data-selected="true"` highlighted |
| `ScCommandNextShortcut`                         | `span[scCommandNextShortcut]`                          | A key hint at the end of an item: shown, not bound                                                                                                              |
| `ScCommandNextSeparator`                        | `div[scCommandNextSeparator]`                          | A line between groups, hidden while searching; decorative (`aria-hidden`: not allowed in a listbox)                                                             |
| `ScCommandNextStatus`                           | `div[scCommandNextStatus]`                             | Read, not shown (`role="status"`): your text about the results. Outside the list                                                                                |
| `ScCommandNextDialog`                           | `div[scCommandNextDialog]`                             | On the `scDialog` a command opens in: no padding, the preset's corners (important over the dialog's); its items' corners follow                                 |

## Filtering

Built in: a "contains", accents and case ignored, on the item's `value` (its text when not set) and its `keywords`. Your order is kept (cmdk re-sorts by a score, which fights `@for`). `filter: (text, search, keywords) => boolean` replaces the match; `[shouldFilter]="false"` shows every item, filtered by you (an async search: the Async search example). `forceMount` shows an item whatever the search.

The search reaches the list as it is typed, not on the next render: an Enter right after typing runs a match, never a hidden item.

## Keyboard

Focus stays in the search.

| Key                              | Does                                                                     |
| -------------------------------- | ------------------------------------------------------------------------ |
| ↓ / ↑                            | The next / previous item (round with `loopFocus`); disabled ones skipped |
| Ctrl+N / Ctrl+J, Ctrl+P / Ctrl+K | The same (`vimBindings`)                                                 |
| Alt+↓ / Alt+↑                    | The first item of the next / previous group                              |
| Enter                            | Runs the highlighted item                                                |
| Home / End                       | The search's own (the caret)                                             |

The first match is always highlighted; the pointer highlights what it moves over (`highlightItemOnHover`).

## Built on

Our own engine on the CDK's `ActiveDescendantKeyManager`, not Angular Aria's Combobox: Aria's popup must be an `ng-template` (the old Command's `scCommandListContainer`), it coalesces keys pressed in one frame (three ArrowDowns moved one, checked on 22.2.6), and its listbox doesn't know the items filtering hides. The roles are cmdk's.

## Left out

Re-sorting by score; a grid (Base UI's `grid`, Bits UI's `columns`); virtualization; a built-in ⌘K listener (the Dialog example's `scHotkey`); nested pages (the Pages example, app code as cmdk and kbar show it); shadcn's check icon on items (choosing a value is Select's and Combobox's); cmdk's Loading part (your text, announced by the status).
