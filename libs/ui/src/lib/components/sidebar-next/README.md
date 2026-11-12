# Sidebar Next

An app's side panel, as shadcn's, in the look of the app's preset (the `sidebar` key): beside the page on wide screens — collapsed off the screen (`offcanvas`), to icons (`icon`) or never (`none`) — and a sheet over it on phones. The parts follow shadcn's names, so its examples carry over. Built beside [Sidebar](../sidebar/README.md), to compare.

## Features

- **Variants** — `sidebar`, `floating`, `inset` (the page a raised card)
- **`side`** — `start` or `end` of the line: right-to-left just works
- **`[(open)]`**, kept between visits (`storageKey`: a cookie the server reads too, plus `localStorage`)
- **Ctrl/⌘+B** (`shortcut`, `null` to turn off)
- **Phones** — a sheet: a named dialog, the focus kept inside, Escape closes it and gives the trigger back the focus; following a link closes it
- **Collapsed to icons** — each button keeps its name (its hidden text); `tooltip` shows it in the Tooltip's own parts (`scTooltip`, `scTooltipArrow`), only then
- **Its scrollbar shown** — the content shows a thin scrollbar when it has more than fits; `hideScrollbar` hides it (shadcn's look)
- **Landmarks you choose** — on an `aside`, the whole sidebar is a named landmark (complementary), header and footer included; on a `div`, none. Either way the navigation is the named `nav` you put in it

## Quick Start

```html
<div scSidebarNextProvider>
  <aside scSidebarNext aria-label="Navigation" collapsible="icon">
    <div scSidebarNextHeader>…</div>
    <nav scSidebarNextContent aria-label="Main">
      <div scSidebarNextGroup>
        <div scSidebarNextGroupLabel>Application</div>
        <div scSidebarNextGroupContent>
          <ul scSidebarNextMenu>
            <li scSidebarNextMenuItem>
              <a scSidebarNextMenuButton routerLink="/inbox" tooltip="Inbox" active>
                <svg siInboxIcon></svg>
                <span>Inbox</span>
              </a>
              <div scSidebarNextMenuBadge>12</div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div scSidebarNextFooter>…</div>
    <button scSidebarNextRail></button>
  </aside>

  <main scSidebarNextInset>
    <button scSidebarNextTrigger>
      <svg siPanelLeftIcon></svg>
      <span class="sr-only">Sidebar</span>
    </button>
    …
  </main>
</div>
```

**Rules**

- Use an `aside` when the sidebar holds more than navigation (a team switcher, a user menu): its content is then in a landmark, as axe's `region` rule wants. A `div` suits a sidebar that is only its `nav`.
- Name the sidebar (`aria-label`): it names the `aside`, and the sheet on phones (on a `div` it isn't written: a `div` has no name of its own).
- Put the navigation in a named `nav[scSidebarNextContent]`.
- A menu button's text goes in a `span`, last: it is truncated, hidden when collapsed to icons, and still names the button.
- The trigger's name is yours (`sr-only`); the rail needs none — it is for the pointer only.

## Sub-menus

Our Collapsible around an item:

```html
<li scSidebarNextMenuItem scCollapsible>
  <button scSidebarNextMenuButton scCollapsibleTrigger><svg siBookOpenIcon></svg><span>Docs</span></button>
  <div scCollapsiblePanel>
    <ul scSidebarNextMenuSub>
      <li scSidebarNextMenuSubItem>
        <a scSidebarNextMenuSubButton routerLink="/docs/install">Installation</a>
      </li>
    </ul>
  </div>
</li>
```

## API

### ScSidebarNextProvider — `div[scSidebarNextProvider]`

| Input        | Type                | Default              | Description                               |
| ------------ | ------------------- | -------------------- | ----------------------------------------- |
| `open`       | `boolean` (two-way) | `true`               | Open on wide screens                      |
| `storageKey` | `string \| null`    | `'sc-sidebar-state'` | Where the state is kept; `null`: nowhere  |
| `shortcut`   | `string \| null`    | `'b'`                | With Ctrl/⌘, toggles; `null`: no shortcut |

### ScSidebarNext — `aside[scSidebarNext]`, `div[scSidebarNext]`

| Input         | Type                                 | Default       | Description               |
| ------------- | ------------------------------------ | ------------- | ------------------------- |
| `side`        | `'start' \| 'end'`                   | `'start'`     | Its side of the line      |
| `variant`     | `'sidebar' \| 'floating' \| 'inset'` | `'sidebar'`   | Its look                  |
| `collapsible` | `'offcanvas' \| 'icon' \| 'none'`    | `'offcanvas'` | How it collapses          |
| `aria-label`  | `string`                             | —             | Names the sheet on phones |

`data-state="expanded|collapsed"`, `data-collapsible`, `data-variant`, `data-side` for styling.

### ScSidebarNextTrigger — `button[scSidebarNextTrigger]`

Toggles the sidebar (the sheet on phones): `aria-expanded`, `aria-controls`. `variant` (`'ghost'`), `size` (`'icon-sm'`).

### ScSidebarNextRail — `button[scSidebarNextRail]`

The edge: a click toggles. `aria-hidden`, out of the tab order.

### ScSidebarNextMenuButton — `a|button[scSidebarNextMenuButton]`

| Input     | Type                        | Default     | Description                                          |
| --------- | --------------------------- | ----------- | ---------------------------------------------------- |
| `active`  | `boolean`                   | `false`     | The page shown (`aria-current="page"`)               |
| `tooltip` | `string`                    | —           | Its name in a tooltip, shown only collapsed to icons |
| `variant` | `'default' \| 'outline'`    | `'default'` |                                                      |
| `size`    | `'default' \| 'sm' \| 'lg'` | `'default'` |                                                      |

### ScSidebarNextMenuSubButton — `a|button[scSidebarNextMenuSubButton]`

`active`, `size` (`'sm' | 'md'`).

### ScSidebarNextMenuAction — `button[scSidebarNextMenuAction]`

`showOnHover`: seen only while its item is hovered or focused (wide screens). Your icon and its name.

### ScSidebarNextContent — `nav|div[scSidebarNextContent]`

The part that scrolls, between the header and the footer. `hideScrollbar`: no scrollbar (shadcn's look; nothing then shows that it scrolls).

### The others

`scSidebarNextHeader`, `scSidebarNextFooter`, `scSidebarNextSeparator`, `scSidebarNextInput`, `scSidebarNextGroup`, `scSidebarNextGroupLabel` (`div|button`), `scSidebarNextGroupAction`, `scSidebarNextGroupContent`, `scSidebarNextMenu`, `scSidebarNextMenuItem`, `scSidebarNextMenuBadge`, `scSidebarNextMenuSkeleton` (`showIcon`), `scSidebarNextMenuSub`, `scSidebarNextMenuSubItem`, `scSidebarNextInset` (`main`).

`ScSidebarNextState` (provided by the provider): `open`, `openMobile`, `isMobile`, `state`, `expanded`, `toggle()`.

## Accessibility

- An `aside` is a named complementary landmark; a `div` is no landmark. Your named `nav` is the navigation; on phones, a named modal dialog.
- The trigger: `aria-expanded`, `aria-controls`; the rail is hidden from screen readers.
- Collapsed to icons, buttons keep their names; the tooltip shows them on hover and focus.
- `aria-current="page"` on the active link.

## Styles

From the preset (`sidebar`): the inner panel (floating corners and ring), the inset page, the input, the header, the content, the group and its label, action and content, the menu, the menu button (`variant`, `size`), its action, badge and skeleton, the sub-button. What is the same in every style — the frame (gap, container, rail), the provider, the footer, the separator, the sub-menu — stays in the parts.

## Left out

Resizing by drag; shadcn's `useSidebar` (the provider's `exportAs` and `ScSidebarNextState` cover it).
