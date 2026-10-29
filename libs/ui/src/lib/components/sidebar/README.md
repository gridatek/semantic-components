# Sidebar

An app's side panel, as shadcn's (nova): beside the page on wide screens — collapsed off the screen (`offcanvas`), to icons (`icon`) or never (`none`) — and a sheet over it on phones. The parts follow shadcn's names, so its examples carry over.

## Features

- **Variants** — `sidebar`, `floating`, `inset` (the page a raised card)
- **`side`** — `start` or `end` of the line: right-to-left just works
- **`[(open)]`**, kept between visits (`storageKey`: a cookie the server reads too, plus `localStorage`)
- **Ctrl/⌘+B** (`shortcut`, `null` to turn off)
- **Phones** — a sheet: a named dialog, the focus kept inside, Escape closes it and gives the trigger back the focus; following a link closes it
- **Collapsed to icons** — each button keeps its name (its hidden text); `tooltip` shows our Tooltip, only then
- **No landmark of its own** — the navigation is the named `nav` you put in it; header and footer stay outside

## Quick Start

```html
<div scSidebarProvider>
  <div scSidebar aria-label="Navigation" collapsible="icon">
    <div scSidebarHeader>…</div>
    <nav scSidebarContent aria-label="Main">
      <div scSidebarGroup>
        <div scSidebarGroupLabel>Application</div>
        <div scSidebarGroupContent>
          <ul scSidebarMenu>
            <li scSidebarMenuItem>
              <a scSidebarMenuButton routerLink="/inbox" tooltip="Inbox" active>
                <svg siInboxIcon></svg>
                <span>Inbox</span>
              </a>
              <div scSidebarMenuBadge>12</div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div scSidebarFooter>…</div>
    <button scSidebarRail></button>
  </div>

  <main scSidebarInset>
    <button scSidebarTrigger>
      <svg siPanelLeftIcon></svg>
      <span class="sr-only">Sidebar</span>
    </button>
    …
  </main>
</div>
```

**Rules**

- Name the sidebar (`aria-label`): it names the sheet on phones (a `div` has no name of its own, so it isn't written on it).
- Put the navigation in a named `nav[scSidebarContent]`.
- A menu button's text goes in a `span`, last: it is truncated, hidden when collapsed to icons, and still names the button.
- The trigger's name is yours (`sr-only`); the rail needs none — it is for the pointer only.

## Sub-menus

Our Collapsible around an item:

```html
<li scSidebarMenuItem scCollapsible>
  <button scSidebarMenuButton scCollapsibleTrigger [panel]="docs.panel"><svg siBookOpenIcon></svg><span>Docs</span></button>
  <div scCollapsiblePanel #docs="scCollapsiblePanel">
    <ng-template scCollapsibleContent>
      <div scCollapsibleBody>
        <ul scSidebarMenuSub>
          <li scSidebarMenuSubItem>
            <a scSidebarMenuSubButton routerLink="/docs/install">Installation</a>
          </li>
        </ul>
      </div>
    </ng-template>
  </div>
</li>
```

## API

### ScSidebarProvider — `div[scSidebarProvider]`

| Input        | Type                | Default              | Description                               |
| ------------ | ------------------- | -------------------- | ----------------------------------------- |
| `open`       | `boolean` (two-way) | `true`               | Open on wide screens                      |
| `storageKey` | `string \| null`    | `'sc-sidebar-state'` | Where the state is kept; `null`: nowhere  |
| `shortcut`   | `string \| null`    | `'b'`                | With Ctrl/⌘, toggles; `null`: no shortcut |

### ScSidebar — `div[scSidebar]`

| Input         | Type                                 | Default       | Description               |
| ------------- | ------------------------------------ | ------------- | ------------------------- |
| `side`        | `'start' \| 'end'`                   | `'start'`     | Its side of the line      |
| `variant`     | `'sidebar' \| 'floating' \| 'inset'` | `'sidebar'`   | Its look                  |
| `collapsible` | `'offcanvas' \| 'icon' \| 'none'`    | `'offcanvas'` | How it collapses          |
| `aria-label`  | `string`                             | —             | Names the sheet on phones |

`data-state="expanded|collapsed"`, `data-collapsible`, `data-variant`, `data-side` for styling.

### ScSidebarTrigger — `button[scSidebarTrigger]`

Toggles the sidebar (the sheet on phones): `aria-expanded`, `aria-controls`. `variant` (`'ghost'`), `size` (`'icon-sm'`).

### ScSidebarRail — `button[scSidebarRail]`

The edge: a click toggles. `aria-hidden`, out of the tab order.

### ScSidebarMenuButton — `a|button[scSidebarMenuButton]`

| Input     | Type                        | Default     | Description                                |
| --------- | --------------------------- | ----------- | ------------------------------------------ |
| `active`  | `boolean`                   | `false`     | The page shown (`aria-current="page"`)     |
| `tooltip` | `string`                    | —           | Our Tooltip, shown only collapsed to icons |
| `variant` | `'default' \| 'outline'`    | `'default'` |                                            |
| `size`    | `'default' \| 'sm' \| 'lg'` | `'default'` |                                            |

### ScSidebarMenuSubButton — `a|button[scSidebarMenuSubButton]`

`active`, `size` (`'sm' | 'md'`).

### ScSidebarMenuAction — `button[scSidebarMenuAction]`

`showOnHover`: seen only while its item is hovered or focused (wide screens). Your icon and its name.

### The others

`scSidebarHeader`, `scSidebarContent` (`div|nav`), `scSidebarFooter`, `scSidebarSeparator`, `scSidebarInput`, `scSidebarGroup`, `scSidebarGroupLabel` (`div|button`), `scSidebarGroupAction`, `scSidebarGroupContent`, `scSidebarMenu`, `scSidebarMenuItem`, `scSidebarMenuBadge`, `scSidebarMenuSkeleton` (`showIcon`), `scSidebarMenuSub`, `scSidebarMenuSubItem`, `scSidebarInset` (`main`).

`ScSidebarState` (provided by the provider): `open`, `openMobile`, `isMobile`, `state`, `expanded`, `toggle()`.

## Accessibility

- No landmark of its own: your named `nav` is the navigation; on phones, a named modal dialog.
- The trigger: `aria-expanded`, `aria-controls`; the rail is hidden from screen readers.
- Collapsed to icons, buttons keep their names; the tooltip shows them on hover and focus.
- `aria-current="page"` on the active link.

## Left out

Resizing by drag.
