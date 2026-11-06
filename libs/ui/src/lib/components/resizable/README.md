# Resizable

Panels resized by the handles between them, by pointer or keyboard — shadcn's Resizable (react-resizable-panels) in the look of the app's preset (`resizable` key: the grip, shadcn's in each of the eight styles).

## Usage

```html
<div scResizablePanelGroup class="min-h-[200px]">
  <div scResizablePanel [defaultSize]="25">Sidebar</div>
  <div scResizableHandle aria-label="Resize Sidebar">
    <div scResizableHandleGrip></div>
  </div>
  <div scResizablePanel [defaultSize]="75">Content</div>
</div>
```

The panels are the group's direct children, a handle between each two. A group nests inside a panel.

## Parts

| Part                    | Selector                     | What it does                                                                                                                          |
| ----------------------- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `ScResizablePanelGroup` | `div[scResizablePanelGroup]` | `orientation` (`horizontal`, `vertical`); `[(layout)]`: the panels' sizes in %, in order — to save a layout and restore it            |
| `ScResizablePanel`      | `div[scResizablePanel]`      | `defaultSize` (else a share of what is left), `minSize`, `maxSize` (%); `collapsible`, `collapsedSize`; `data-collapsed`              |
| `ScResizableHandle`     | `div[scResizableHandle]`     | The splitter: drag, or the keyboard. `role="separator"`, `aria-valuenow` / `-min` / `-max`, `aria-controls`; `data-dragging`. Name it |
| `ScResizableHandleGrip` | `div[scResizableHandleGrip]` | Its grip, in the preset's look; `aria-hidden`                                                                                         |

A collapsible panel shuts to `collapsedSize` when dragged below half its minimum, or on Enter; Enter opens it again to its size before.

## Keyboard and screen readers

WAI-ARIA's window splitter:

- A handle is a focusable separator; its value is the size of the panel before it, which it controls. Name it (`aria-label="Resize Sidebar"`).
- ← → (a horizontal group; mirrored right to left) or ↑ ↓ (a vertical one) resize by 10%. Home and End go to the panel's minimum and maximum. Enter shuts or opens a collapsible panel beside it.

## Not shadcn's

- **Sizes in % only** (react-resizable-panels also takes px, rem, vh).
- **The grip is a part you write** (`scResizableHandleGrip`), not `withHandle`.
- **`[(layout)]`** in place of `defaultLayout` / `onLayoutChanged`.
- Not taken: react-resizable-panels' Grid, its separator preview mode, `groupResizeBehavior`, `disabled`.
