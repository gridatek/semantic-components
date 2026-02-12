# Stat Card Refactoring Plan

## Overview

Refactor the `ScStatCard` component from a monolithic, input-driven component to a composable set of directive-based sub-components following the same pattern as the `card` component.

## Current Issues

### ❌ Problems with Current Implementation

1. **Hardcoded Content Structure**
   - Component controls all content via inputs (`label`, `value`, `icon`, `description`, `change`, `changeLabel`)
   - Consumers cannot customize layout or add custom elements
   - Not flexible for different use cases

2. **Hardcoded Icons**
   - Trend icons (up/down arrows) are hardcoded as SVG strings
   - Uses `[innerHTML]` which is a security concern
   - Consumers cannot use their preferred icon library

3. **Monolithic Design**
   - Single component doing everything
   - Complex template with nested conditionals
   - Difficult to customize individual parts

4. **Not Composable**
   - Cannot rearrange sections
   - Cannot omit sections without complex logic
   - Cannot add custom sections

## Refactoring Goal

Transform into a composable set of directives that:

- Provide styling and structure
- Allow full content control via `<ng-content />`
- Follow the same pattern as the existing `card` component
- Are verbose but easy to customize

## New Component Structure

### Components to Create

Following the pattern from `libs/ui/src/lib/components/card/`:

1. **`sc-stat-card`** (Container)
   - File: `stat-card.ts`
   - Selector: `[sc-stat-card]`
   - Purpose: Main container with base card styling
   - Styling: Border, background, padding, rounded corners

2. **`sc-stat-card-label`** (Label Text)
   - File: `stat-card-label.ts`
   - Selector: `[sc-stat-card-label]`
   - Purpose: Label/title text styling
   - Styling: Font size, color (muted), font weight

3. **`sc-stat-card-value`** (Primary Value)
   - File: `stat-card-value.ts`
   - Selector: `[sc-stat-card-value]`
   - Purpose: Main value/metric display
   - Styling: Large font, bold, tracking

4. **`sc-stat-card-icon`** (Icon Container)
   - File: `stat-card-icon.ts`
   - Selector: `[sc-stat-card-icon]`
   - Purpose: Icon container styling
   - Styling: Background, padding, rounded, icon size

5. **`sc-stat-card-change`** (Change Indicator)
   - File: `stat-card-change.ts`
   - Selector: `[sc-stat-card-change]`
   - Purpose: Trend/change indicator styling
   - Inputs: `trend: 'up' | 'down' | 'neutral'`
   - Styling: Color based on trend (green/red), font size, flex layout

6. **`sc-stat-card-description`** (Description Text)
   - File: `stat-card-description.ts`
   - Selector: `[sc-stat-card-description]`
   - Purpose: Additional description text styling
   - Styling: Small font, muted color

### Files to Create/Modify

#### New Files to Create:

- `stat-card-label.ts`
- `stat-card-icon.ts`
- `stat-card-change.ts`
- `stat-card-description.ts`

#### Files to Refactor:

- `stat-card.ts` - Convert from Component to Directive
- `stat-card-types.ts` - Update types, remove `StatCardData` interface
- `index.ts` - Export all new sub-components
- `README.md` - Update documentation with new usage

#### Files to Remove:

- None (keep types file for `StatCardTrend` type)

## Implementation Details

### 1. `stat-card.ts` - Main Container

```typescript
import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';
import type { StatCardVariant, StatCardSize } from './stat-card-types';

@Directive({
  selector: '[sc-stat-card]',
  host: {
    'data-slot': 'stat-card',
    '[class]': 'class()',
  },
})
export class ScStatCard {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<StatCardVariant>('default');
  readonly size = input<StatCardSize>('md');

  protected readonly class = computed(() => {
    const variant = this.variant();
    const size = this.size();

    return cn(
      'rounded-lg transition-colors',
      // Variants
      variant === 'default' && 'border bg-card text-card-foreground',
      variant === 'outline' && 'border-2 bg-transparent',
      variant === 'filled' && 'bg-primary text-primary-foreground',
      // Sizes
      size === 'sm' && 'p-4',
      size === 'md' && 'p-6',
      size === 'lg' && 'p-8',
      this.classInput(),
    );
  });
}
```

### 2. `stat-card-label.ts`

```typescript
import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';
import type { StatCardSize } from './stat-card-types';

@Directive({
  selector: '[sc-stat-card-label]',
  host: {
    'data-slot': 'stat-card-label',
    '[class]': 'class()',
  },
})
export class ScStatCardLabel {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly size = input<StatCardSize>('md');

  protected readonly class = computed(() => {
    const size = this.size();

    return cn('font-medium text-muted-foreground', size === 'sm' && 'text-xs', size === 'md' && 'text-sm', size === 'lg' && 'text-base', this.classInput());
  });
}
```

### 3. `stat-card-value.ts`

```typescript
import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';
import type { StatCardSize } from './stat-card-types';

@Directive({
  selector: '[sc-stat-card-value]',
  host: {
    'data-slot': 'stat-card-value',
    '[class]': 'class()',
  },
})
export class ScStatCardValue {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly size = input<StatCardSize>('md');

  protected readonly class = computed(() => {
    const size = this.size();

    return cn('font-bold tracking-tight', size === 'sm' && 'text-xl', size === 'md' && 'text-2xl', size === 'lg' && 'text-4xl', this.classInput());
  });
}
```

### 4. `stat-card-icon.ts`

```typescript
import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';
import type { StatCardSize } from './stat-card-types';

@Directive({
  selector: '[sc-stat-card-icon]',
  host: {
    'data-slot': 'stat-card-icon',
    '[class]': 'class()',
  },
})
export class ScStatCardIcon {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly size = input<StatCardSize>('md');

  protected readonly class = computed(() => {
    const size = this.size();

    return cn('rounded-md bg-muted p-2', 'inline-flex items-center justify-center', size === 'sm' && '[&>svg]:w-4 [&>svg]:h-4', size === 'md' && '[&>svg]:w-5 [&>svg]:h-5', size === 'lg' && '[&>svg]:w-6 [&>svg]:h-6', this.classInput());
  });
}
```

### 5. `stat-card-change.ts`

```typescript
import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';
import type { StatCardTrend } from './stat-card-types';

@Directive({
  selector: '[sc-stat-card-change]',
  host: {
    'data-slot': 'stat-card-change',
    '[class]': 'class()',
  },
})
export class ScStatCardChange {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly trend = input<StatCardTrend>('neutral');

  protected readonly class = computed(() => {
    const trend = this.trend();

    return cn('inline-flex items-center gap-1 text-xs font-medium', trend === 'up' && 'text-green-600', trend === 'down' && 'text-red-600', trend === 'neutral' && 'text-muted-foreground', this.classInput());
  });
}
```

### 6. `stat-card-description.ts`

```typescript
import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: '[sc-stat-card-description]',
  host: {
    'data-slot': 'stat-card-description',
    '[class]': 'class()',
  },
})
export class ScStatCardDescription {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn('text-xs text-muted-foreground', this.classInput()));
}
```

### 7. `stat-card-types.ts` - Update

```typescript
export type StatCardTrend = 'up' | 'down' | 'neutral';
export type StatCardVariant = 'default' | 'outline' | 'filled';
export type StatCardSize = 'sm' | 'md' | 'lg';

// Remove StatCardData interface - no longer needed
```

### 8. `index.ts` - Update Exports

```typescript
export { ScStatCard } from './stat-card';
export { ScStatCardLabel } from './stat-card-label';
export { ScStatCardValue } from './stat-card-value';
export { ScStatCardIcon } from './stat-card-icon';
export { ScStatCardChange } from './stat-card-change';
export { ScStatCardDescription } from './stat-card-description';
export type { StatCardSize, StatCardTrend, StatCardVariant } from './stat-card-types';
```

## Usage Examples

### Basic Stat Card

```html
<div sc-stat-card>
  <div class="space-y-1">
    <p sc-stat-card-label>Total Revenue</p>
    <p sc-stat-card-value>$45,231.89</p>
  </div>
  <p sc-stat-card-description>Revenue for the current period</p>
</div>
```

### With Icon

```html
<div sc-stat-card>
  <div class="flex items-start justify-between">
    <div class="space-y-1">
      <p sc-stat-card-label>Active Users</p>
      <p sc-stat-card-value>2,350</p>
    </div>
    <div sc-stat-card-icon>
      <svg><!-- users icon --></svg>
    </div>
  </div>
</div>
```

### With Trend

```html
<div sc-stat-card>
  <div class="space-y-1">
    <p sc-stat-card-label>Sales</p>
    <p sc-stat-card-value>12,234</p>
  </div>

  <div class="mt-3 flex items-center gap-2">
    <span sc-stat-card-change trend="up">
      <svg><!-- up arrow icon --></svg>
      <span>+20.1%</span>
    </span>
    <span sc-stat-card-description>from last month</span>
  </div>
</div>
```

### Complex Example (Replaces Current Implementation)

```html
<div sc-stat-card variant="default" size="md">
  <div class="flex items-start justify-between">
    <div class="space-y-1">
      <p sc-stat-card-label size="md">Total Revenue</p>
      <p sc-stat-card-value size="md">$45,231.89</p>
    </div>
    <div sc-stat-card-icon size="md">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    </div>
  </div>

  <div class="mt-3 flex items-center gap-2">
    <span sc-stat-card-change trend="up">
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="m18 15-6-6-6 6" />
      </svg>
      <span>+20.1%</span>
    </span>
    <span class="text-xs text-muted-foreground">from last month</span>
  </div>

  <p sc-stat-card-description class="mt-2">Your revenue increased significantly this month</p>
</div>
```

## Migration Guide for Consumers

### Before (Current)

```html
<sc-stat-card label="Total Revenue" value="$45,231.89" [change]="20.1" changeLabel="from last month" trend="up" [icon]="revenueIcon" description="Revenue increased" variant="default" size="md" />
```

### After (Refactored)

```html
<div sc-stat-card variant="default" size="md">
  <div class="flex items-start justify-between">
    <div class="space-y-1">
      <p sc-stat-card-label size="md">Total Revenue</p>
      <p sc-stat-card-value size="md">$45,231.89</p>
    </div>
    <div sc-stat-card-icon size="md">
      <svg><!-- revenue icon --></svg>
    </div>
  </div>

  <div class="mt-3 flex items-center gap-2">
    <span sc-stat-card-change trend="up">
      <svg><!-- up arrow --></svg>
      <span>+20.1%</span>
    </span>
    <span class="text-xs text-muted-foreground">from last month</span>
  </div>

  <p sc-stat-card-description class="mt-2">Revenue increased</p>
</div>
```

## Benefits After Refactoring

1. **✅ Full Customization**
   - Consumers control exact layout
   - Can rearrange any section
   - Can add custom elements anywhere

2. **✅ Icon Flexibility**
   - Use any icon library (lucide, heroicons, custom)
   - Type-safe icon components
   - No security concerns with innerHTML

3. **✅ Composable & Flexible**
   - Use only needed directives
   - Mix and match sections
   - Create custom variations easily

4. **✅ Follows Established Patterns**
   - Matches card component structure
   - Consistent with design principles
   - Easy to learn and use

5. **✅ Library Provides Value**
   - All styling handled automatically
   - Responsive and accessible
   - Variant/size support maintained

## Implementation Steps

1. ✅ Write this refactoring plan document
2. ⬜ Create new directive files
3. ⬜ Update stat-card.ts to directive
4. ⬜ Update types file
5. ⬜ Update index.ts exports
6. ⬜ Update README.md with new documentation
7. ⬜ Find and update all demo files
8. ⬜ Test all variants and sizes
9. ⬜ Update showcase examples

## Demo Files to Update

Search for files that import or use `ScStatCard` and update them to use the new composable pattern.

```bash
# Find demo files
grep -r "ScStatCard" apps/showcase/
```

## Testing Checklist

- [ ] All variants work (default, outline, filled)
- [ ] All sizes work (sm, md, lg)
- [ ] Trend colors work (up=green, down=red, neutral=muted)
- [ ] Icons display correctly at all sizes
- [ ] Custom classes can be applied to all directives
- [ ] Layout is flexible and customizable
- [ ] Accessibility attributes are preserved
- [ ] Documentation is complete and accurate

## Notes

- Follow the exact pattern from `card` component
- All components are **Directives**, not Components (no templates)
- Use attribute selectors: `[sc-stat-card]`
- Include `data-slot` attribute
- Support `class` input for all directives
- Remove all `innerHTML` usage
- Remove all hardcoded content
- Consumers provide ALL content via projection
