# Remaining Icon Migration: String-based SVGs

## Context

We converted 157 raw inline SVGs from `xmlns="http://www.w3.org/2000/svg"` to `@semantic-icons/lucide-icons` components across 58+ files. The remaining **117 occurrences across 23 files** use SVGs as **strings** (not Angular templates), so they require API/component changes to convert.

## Remaining Files

### 1. ~~Image annotator~~ — done (2026-10-16)

Rewritten: its icons are the consumer's, written in the template, no SVG strings left.

### 2. Dock demos (10 files, 60 SVGs)

- **Pattern**: `ScDockItemData.icon: string` — SVG strings in data objects
- **Type definition**: `libs/ui/src/lib/components/dock/dock-types.ts` → `icon: string`
- **Component**: `ScDockItem` renders the icon via innerHTML
- **Files**:
  - `apps/showcase/src/app/pages/docs/dock/demos/basic-dock-demo.ts` + container
  - `apps/showcase/src/app/pages/docs/dock/demos/badges-dock-demo.ts` + container
  - `apps/showcase/src/app/pages/docs/dock/demos/sizes-dock-demo.ts` + container
  - `apps/showcase/src/app/pages/docs/dock/demos/no-magnification-dock-demo.ts` + container
  - `apps/showcase/src/app/pages/docs/dock/demos/magnification-scale-dock-demo.ts` + container
- **Icons used**: Folder, Compass, Mail, Image, Music, Settings (repeated across all 5 demos)
- **Fix approach**: Change `ScDockItemData.icon` from `string` to accept a `Type<any>` (component type) or use a different pattern. The `ScDockItem` component would need to dynamically render the icon component instead of using innerHTML.

### 3. Speed-dial demos (12 files, 48 SVGs)

- **Pattern**: `SpeedDialAction.icon: string` — SVG strings in data objects
- **Type definition**: Check `libs/ui/src/lib/components/speed-dial/` for the type
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

2. ~~**For image-annotator**~~: done — rewritten, its icons are in the consumer's template.

3. **Remember**: Each demo file has a corresponding `-container.ts` file that duplicates the source code as a string — both must be updated together.
