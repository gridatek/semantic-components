# Command

A search over commands: typing filters them, the arrows move the highlight while focus stays in the search, Enter runs it. shadcn's Command (built on cmdk) in the look of the app's preset (the `command` key).

## Usage

```html
<div scCommand #cmd="scCommand" scFrame>
  <div scCommandInputGroup>
    <svg siSearchIcon></svg>
    <input scCommandInput placeholder="Type a command or search..." aria-label="Search commands" />
  </div>
  <div scCommandList aria-label="Commands">
    <div scCommandEmpty>No results found.</div>
    <div scCommandGroup>
      <div scCommandGroupLabel>Settings</div>
      <div scCommandItem [keywords]="['account']" (select)="openProfile()">
        <svg siUserIcon></svg>
        <span>Profile</span>
        <span scCommandShortcut>⌘P</span>
      </div>
    </div>
    <div scCommandSeparator></div>
  </div>
  <div scCommandStatus>{{ cmd.count() }} results</div>
</div>
```

In a dialog, on the dialog itself: `<div scDialog scCommandDialog>`, with an `sr-only` title and description.

## Parts

| Part                                    | Selector                                       | What it does                                                                                                                                                    |
| --------------------------------------- | ---------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ScCommand`                             | `div[scCommand]`                               | Filters its items by the search. `filter`, `shouldFilter`, `loopFocus`, `vimBindings`, `highlightItemOnHover`; exportAs: `count()`, `active()`, `search()`      |
| `ScCommandInputGroup`                   | `div[scCommandInputGroup]`                     | Around the search: your search icon (an SVG, placed first) and the input, in the input group's look                                                             |
| `ScCommandInput`                        | `input[scCommandInput]`                        | The search (`role="combobox"`, `aria-activedescendant`): `[(value)]` is its text; the keys. Name it                                                             |
| `ScCommandList`                         | `div[scCommandList]`                           | The items (`role="listbox"`), scrolling, the highlighted one kept in view; its scrollbar shown (`hideScrollbar` hides it). Name it                              |
| `ScCommandEmpty`                        | `div[scCommandEmpty]`                          | Your text when no item shows                                                                                                                                    |
| `ScCommandGroup`, `ScCommandGroupLabel` | `div[scCommandGroup]`, `[scCommandGroupLabel]` | Related items (`role="group"`), named by the label; hidden while none of its items shows                                                                        |
| `ScCommandItem`                         | `div[scCommandItem]`, `a[scCommandItem]`       | A command (`role="option"`): `(select)` on Enter or a click, a link followed. `value`, `keywords`, `disabled`, `forceMount`; `data-selected="true"` highlighted |
| `ScCommandShortcut`                     | `span[scCommandShortcut]`                      | A key hint at the end of an item: shown, not bound                                                                                                              |
| `ScCommandSeparator`                    | `div[scCommandSeparator]`                      | A line between groups, hidden while searching; decorative (`aria-hidden`: not allowed in a listbox)                                                             |
| `ScCommandStatus`                       | `div[scCommandStatus]`                         | Read, not shown (`role="status"`): your text about the results. Outside the list                                                                                |
| `ScCommandDialog`                       | `div[scCommandDialog]`                         | On the `scDialog` a command opens in: no padding, the preset's corners (important over the dialog's); its items' corners follow                                 |

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
