# Remaining Icon Migration: String-based SVGs

## Context

We converted 157 raw inline SVGs from `xmlns="http://www.w3.org/2000/svg"` to `@semantic-icons/lucide-icons` components across 58+ files. The remaining **117 occurrences across 23 files** use SVGs as **strings** (not Angular templates), so they require API/component changes to convert.

## Remaining Files

### 1. `libs/ui-lab/src/lib/components/image-annotator/image-annotator.ts` (9 SVGs)

- **Pattern**: SVG strings passed to `this.trustHtml()` and rendered via `[innerHTML]="tool.icon"` and `[innerHTML]="undoIcon"` etc.
- **Icons used**: Pen (Pencil), Line, Rectangle (Square), Circle, Arrow (ArrowRight), Eraser, Undo, Trash2, Download
- **Fix approach**: Refactor the `tools` array and action icons to use Angular content projection or template refs instead of `[innerHTML]`. For example:
  - Change `icon: SafeHtml` to use `ng-template` or a component-based approach
  - Or create a mapping from tool ID to icon directive and use `@switch` in the template

### 2. Dock demos (10 files, 60 SVGs)

- **Pattern**: `DockItem.icon: string` — SVG strings in data objects
- **Type definition**: `libs/ui-lab/src/lib/components/dock/dock-types.ts` → `icon: string`
- **Component**: `ScDockItem` renders the icon via innerHTML
- **Files**:
  - `apps/showcase/src/app/pages/docs/dock/demos/basic-dock-demo.ts` + container
  - `apps/showcase/src/app/pages/docs/dock/demos/badges-dock-demo.ts` + container
  - `apps/showcase/src/app/pages/docs/dock/demos/sizes-dock-demo.ts` + container
  - `apps/showcase/src/app/pages/docs/dock/demos/no-magnification-dock-demo.ts` + container
  - `apps/showcase/src/app/pages/docs/dock/demos/magnification-scale-dock-demo.ts` + container
- **Icons used**: Folder, Compass, Mail, Image, Music, Settings (repeated across all 5 demos)
- **Fix approach**: Change `DockItem.icon` from `string` to accept a `Type<any>` (component type) or use a different pattern. The `ScDockItem` component would need to dynamically render the icon component instead of using innerHTML.

### 3. Speed-dial demos (12 files, 48 SVGs)

- **Pattern**: `SpeedDialAction.icon: string` — SVG strings in data objects
- **Type definition**: Check `libs/ui-lab/src/lib/components/speed-dial/` for the type
- **Files**:
  - `apps/showcase/src/app/pages/docs/speed-dial/demos/basic-speed-dial-demo.ts` + container
  - `apps/showcase/src/app/pages/docs/speed-dial/demos/sizes-speed-dial-demo.ts` + container
  - `apps/showcase/src/app/pages/docs/speed-dial/demos/directions-speed-dial-demo.ts` + container
  - `apps/showcase/src/app/pages/docs/speed-dial/demos/disabled-actions-speed-dial-demo.ts` + container
  - `apps/showcase/src/app/pages/docs/speed-dial/demos/custom-icons-speed-dial-demo.ts` + container
  - `apps/showcase/src/app/pages/docs/speed-dial/demos/without-labels-speed-dial-demo.ts` + container
- **Icons used**: Pencil, Copy, Share2, Trash2, Plus, Mail, Phone, MessageSquare, Heart, Star, Bookmark, Settings, Home, User, Search, Bell
- **Fix approach**: Same as dock — change `icon: string` to a component-based approach.

## Suggested Implementation Strategy

1. **For dock and speed-dial**: Change the `icon` property type from `string` to `Type<unknown>` and use `NgComponentOutlet` to render icons dynamically. Update demos to pass icon component classes instead of SVG strings.

2. **For image-annotator**: Replace the `tools` array `icon: SafeHtml` with an `@switch` block in the template that renders the correct `Si*Icon` based on `tool.id`.

3. **Remember**: Each demo file has a corresponding `-container.ts` file that duplicates the source code as a string — both must be updated together.
