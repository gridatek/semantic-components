# Calendar View System Documentation

## Overview

The calendar component supports three view modes with full **Angular ARIA Grid** integration, providing accessible navigation through years, months, and days using an inline grid interface. All views use semantic `<table>` elements for proper accessibility and screen reader support.

## Three View Modes

### 1. Day View (Default)

- **What it shows**: A traditional month calendar with individual days in a grid
- **Purpose**: Select specific dates
- **Grid**: 7 columns (weeks) × 5-6 rows (days)
- **Example**: Shows January 2025 with dates 1-31

### 2. Month View

- **What it shows**: All 12 months of the currently viewed year
- **Purpose**: Quickly jump to a different month in the same year
- **Grid**: 3 columns × 4 rows (12 months total)
- **Example**: Shows Jan, Feb, Mar... Dec for 2025

### 3. Year View

- **What it shows**: 12 years spanning a decade
- **Purpose**: Quickly jump to a different year
- **Grid**: 3 columns × 4 rows (12 years total)
- **Example**: Shows 2020, 2021, 2022... 2031

---

## Navigation Flow

### Current Implementation

```
┌─────────────┐
│  Day View   │ ◄── START HERE (default view)
│ (Jan 2025)  │
└──────┬──────┘
       │ Click header "January 2025"
       ▼
┌─────────────┐
│ Month View  │
│   (2025)    │
└──────┬──────┘
       │ Click header "2025"
       ▼
┌─────────────┐
│  Year View  │
│ (2020-2031) │
└─────────────┘
```

**Drilling Down (click header):**

1. Day View → Click "January 2025" → Month View
2. Month View → Click "2025" → Year View
3. Year View → (can't go further)

**Selecting & Going Back (click item):**

1. Year View → Click "2024" → Month View (for 2024)
2. Month View → Click "March" → Day View (for March 2024)

---

## User Interaction Guide

### Clicking the Header

The header (month/year label) acts as a **drill-down button**:

| Current View | Header Shows   | Click Action       |
| ------------ | -------------- | ------------------ |
| Day          | "January 2025" | → Go to Month View |
| Month        | "2025"         | → Go to Year View  |
| Year         | "2020 - 2031"  | → (no action)      |

### Clicking Previous/Next Buttons

The previous/next arrow buttons are **context-aware**:

| Current View | Buttons Navigate                    |
| ------------ | ----------------------------------- |
| Day          | Previous/Next **Month**             |
| Month        | Previous/Next **Year**              |
| Year         | Previous/Next **Decade** (12 years) |

### Selecting Items

Clicking an item **selects it and returns to the previous view**:

| Current View | Click Action  | Result                                  |
| ------------ | ------------- | --------------------------------------- |
| Year View    | Click "2024"  | → Goes to Month View for 2024           |
| Month View   | Click "March" | → Goes to Day View for March            |
| Day View     | Click a date  | → Selects that date (stays in Day View) |

---

## Example User Flows

### Flow 1: Jump to a Different Month

```
Starting: Day View (January 2025)
Goal: Jump to March 2025

1. Click header "January 2025" → Month View appears
2. Click "Mar" → Back to Day View showing March 2025
```

### Flow 2: Jump to a Different Year

```
Starting: Day View (January 2025)
Goal: Jump to June 2027

1. Click header "January 2025" → Month View (2025)
2. Click header "2025" → Year View (2020-2031)
3. Click "2027" → Month View (2027)
4. Click "Jun" → Day View (June 2027)
```

### Flow 3: Jump Far Back in Time

```
Starting: Day View (January 2025)
Goal: Jump to March 1995

1. Click header "January 2025" → Month View (2025)
2. Click header "2025" → Year View (2020-2031)
3. Click "Previous" 2 times → Year View shows 1996-2007
4. Click "1995" → Oops! Need to click Previous one more time
5. Click "Previous" → Year View shows 1984-1995
6. Click "1995" → Month View (1995)
7. Click "Mar" → Day View (March 1995)
```

---

## Keyboard Navigation

All views use **Angular ARIA Grid** for full keyboard accessibility.

### Day View

- **Arrow Keys**: Navigate between dates (handled by Angular ARIA Grid)
  - ⬅️ Left/➡️ Right: Previous/Next day
  - ⬆️ Up/⬇️ Down: Previous/Next week (±7 days)
- **Enter/Space**: Select the focused date
- **Auto-scroll**: Navigating past month edges automatically scrolls to previous/next month
- **Focus Management**: Focus is maintained on the corresponding day after month change

### Month View

- **Arrow Keys**: Navigate between months (handled by Angular ARIA Grid)
  - ⬅️ Left/➡️ Right: Previous/Next month
  - ⬆️ Up/⬇️ Down: Previous/Next row of months
- **Enter/Space**: Select the focused month and return to Day View
- **Auto-scroll**: Navigating past January (left/up) or December (right/down) scrolls to previous/next year
- **Focus Management**: Focus moves to first/last month of new year

### Year View

- **Arrow Keys**: Navigate between years (handled by Angular ARIA Grid)
  - ⬅️ Left/➡️ Right: Previous/Next year
  - ⬆️ Up/⬇️ Down: Previous/Next row of years
- **Enter/Space**: Select the focused year and go to Month View
- **Auto-scroll**: Navigating past decade edges automatically scrolls to previous/next decade (12 years)
- **Focus Management**: Focus moves to first/last year of new decade

### Grid Navigation Features

- **Continuous Column Wrap**: Arrow keys wrap around columns continuously
- **Row Navigation**: Arrow keys navigate between rows
- **Selection State**: Visual and ARIA feedback for selected items
- **Disabled State**: Proper handling of disabled dates/cells

---

## Visual States

### Highlighting

Each view mode highlights relevant items:

| View Mode | Highlighted Items                                                                                            |
| --------- | ------------------------------------------------------------------------------------------------------------ |
| Day       | • **Today's date** (accent color)<br>• **Selected date(s)** (primary color)<br>• Outside month days (dimmed) |
| Month     | • **Current month** (accent color)<br>• **Displayed month** (primary color)                                  |
| Year      | • **Current year** (accent color)<br>• **Displayed year** (primary color)                                    |

---

## Accessibility

### Angular ARIA Grid Integration

The component uses **Angular ARIA Grid** (`@angular/aria/grid`) for full accessibility compliance:

- **Semantic HTML**: All views use `<table>` elements with proper `<thead>`, `<tbody>`, `<tr>`, `<td>` structure
- **ARIA Directives**:
  - `ngGrid` on `<table>` for grid container
  - `ngGridRow` on `<tr>` for grid rows
  - `ngGridCell` on `<td>` for grid cells with selection state
  - `ngGridCellWidget` on `<button>` for interactive elements

### ARIA Labels

Context-aware ARIA labels for all interactive elements:

- **Header button**:
  - Day view: "Switch to month view"
  - Month view: "Switch to year view"
  - Year view: "Year view - select a year"

- **Previous button**:
  - Day view: "Go to previous month"
  - Month view: "Go to previous year"
  - Year view: "Go to previous decade"

- **Next button**:
  - Day view: "Go to next month"
  - Month view: "Go to next year"
  - Year view: "Go to next decade"

- **Grid cells**:
  - Day view: Full date string (e.g., "Mon Jan 15 2025")
  - Month view: Month name (e.g., "January")
  - Year view: Year number (e.g., "2025")

### ARIA Attributes

Automatically managed by Angular ARIA Grid:

- `role="grid"` on all calendar tables
- `role="row"` on all table rows
- `role="gridcell"` on all table cells
- `aria-selected="true/false"` on selected cells
- `aria-disabled="true"` on disabled cells
- `aria-current="date"` on today's date/current month/current year
- `aria-expanded` on header button
- `aria-label` on all interactive elements

### Screen Reader Support

- **Grid Navigation Announcements**: Screen readers announce current position in grid
- **Selection State**: Selected items are announced with aria-selected
- **Current Date/Month/Year**: Marked with aria-current="date"
- **Cell Content**: Each cell has descriptive aria-label

---

## Technical Details

### Component Architecture

The calendar is split into focused, reusable components:

- **`calendar.ts`** - Main orchestrator component
  - Manages view mode switching
  - Handles navigation between views
  - Coordinates date selection

- **`calendar-header.ts`** - Navigation header
  - Clickable month/year label
  - Previous/Next buttons with Lucide icons
  - Context-aware ARIA labels

- **`calendar-day-view.ts`** - Day grid (7×5-6 table)
  - Angular ARIA Grid integration
  - Date selection logic
  - Auto-scroll to prev/next month

- **`calendar-month-view.ts`** - Month grid (3×4 table)
  - Angular ARIA Grid integration
  - Month selection
  - Auto-scroll to prev/next year

- **`calendar-year-view.ts`** - Year grid (3×4 table)
  - Angular ARIA Grid integration
  - Year selection
  - Auto-scroll to prev/next decade

### State Management

The component uses Angular signals for reactive state:

```typescript
viewMode: Signal<'day' | 'month' | 'year'>; // Current view mode
viewDate: Signal<Date>; // Currently displayed month/year
decadeStart: Signal<number>; // Starting year for year view
```

### Angular ARIA Grid

Each view uses Angular ARIA Grid directives:

```typescript
// Grid configuration
ngGrid; // Applied to <table>
ngGridRow; // Applied to <tr>
ngGridCell; // Applied to <td> with [(selected)] binding
ngGridCellWidget; // Applied to <button>
```

**Configuration:**

- `colWrap="continuous"` - Continuous column wrapping
- `rowWrap="continuous/nowrap"` - Row wrapping behavior
- `enableSelection="true"` - Enable cell selection
- `selectionMode="explicit"` - Explicit selection mode

### Computed Grids

Each view mode has computed grids with selection state:

- **Day View**:
  - `weeks()` - 2D array of day objects with `selected` signal
  - Each day has: date, isToday, isOutsideMonth, disabled, selected

- **Month View**:
  - `months()` - Array of 12 month objects with `selected` signal
  - `monthRows()` - Grouped into 4 rows of 3 months
  - Each month has: label, value, isCurrentMonth, isSelected, selected

- **Year View**:
  - `years()` - Array of 12 year objects with `selected` signal
  - `yearRows()` - Grouped into 4 rows of 3 years
  - Each year has: label, value, isCurrentYear, isSelected, selected

### Focus Management

All views use `viewChildren(GridCellWidget)` for focus management:

- Track all grid cell widgets
- Programmatically focus cells after navigation
- Maintain focus when scrolling to adjacent periods

---

## Design Decisions

### Why Month View Comes Before Year View?

The current implementation follows a **zoom out** pattern:

1. **Day View**: Most detailed (individual days)
2. **Month View**: Medium zoom (12 months)
3. **Year View**: Most zoomed out (12 years)

This is similar to how map applications work - you zoom out progressively.

### Alternative: Year First

Some users might prefer selecting year first, then month:

1. **Day View** → **Year View** (select year)
2. **Year View** → **Month View** (select month)
3. **Month View** → **Day View** (select day)

This is more of a **drill down** pattern and might be more intuitive for date selection.

**Current**: Zoom out (Day → Month → Year)
**Alternative**: Drill down (Day → Year → Month)

---

## Future Enhancements

Potential improvements to consider:

1. **Configurable Navigation Flow**: Allow users to choose Day→Month→Year vs Day→Year→Month
2. **Keyboard Navigation**: Full arrow key support for month/year grids
3. **Animation Transitions**: Smooth fade/slide transitions between views
4. **Gesture Support**: Swipe to change months/years on touch devices
5. **Quick Jump**: Type to jump (e.g., type "2020" to jump to that year)
6. **Min/Max Date Constraints**: Disable unavailable years/months
7. **View Mode Input**: Allow programmatic control of initial view mode

---

## Questions to Consider

Before finalizing the navigation pattern, consider:

1. **What is the primary use case?**
   - Quick month changes → Month view first makes sense
   - Jumping across years → Year view first makes sense

2. **What do users expect?**
   - Desktop calendar apps often use Month → Year pattern
   - iOS date pickers use Year → Month → Day pattern
   - Material Design uses Year first for date pickers

3. **What feels more natural?**
   - Test with users to see which flow is more intuitive

---

## Summary

The calendar supports three view modes with **Angular ARIA Grid** integration:

### Features

- ✅ **Angular ARIA Grid** - Full accessibility with official Angular directive
- ✅ **Semantic HTML** - All views use `<table>` elements
- ✅ **Keyboard Navigation** - Complete arrow key support with auto-scrolling
- ✅ **Focus Management** - Programmatic focus control with viewChildren
- ✅ **Selection State** - Signal-based selection with two-way binding
- ✅ **Screen Reader Support** - Proper ARIA roles and labels
- ✅ **Context-Aware Navigation** - Smart previous/next buttons
- ✅ **Visual Feedback** - Current and selected items highlighted
- ✅ **Touch-Friendly** - Full-width buttons in month/year views

### Component Structure

- 🎯 **Main Component** - `calendar.ts` (orchestrator)
- 📅 **Day View** - `calendar-day-view.ts` (7×5-6 table)
- 📆 **Month View** - `calendar-month-view.ts` (3×4 table)
- 🗓️ **Year View** - `calendar-year-view.ts` (3×4 table)
- 🔝 **Header** - `calendar-header.ts` (navigation with Lucide icons)

### Navigation Flow

**Current**: Day → Month → Year (zoom out pattern)

**Keyboard Shortcuts:**

- ⬅️➡️⬆️⬇️ Navigate within current view
- ↩️ Enter/Space to select
- 🔄 Auto-scroll at edges to adjacent periods

### Standards Compliance

- ✅ **WCAG AA** - Meets accessibility standards
- ✅ **ARIA 1.2** - Uses official Angular ARIA Grid
- ✅ **Semantic HTML** - Proper table markup
- ✅ **Keyboard Accessible** - Full keyboard support
- ✅ **Screen Reader Tested** - Works with NVDA/JAWS
