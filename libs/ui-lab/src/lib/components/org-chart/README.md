# Org Chart

A hierarchical organization chart built from composable directives. The consumer controls card content via `ng-template`.

## Installation

```typescript
import { ScOrgChart, ScOrgChartCard, ScOrgChartNode, ScOrgChartNodeDef } from '@semantic-components/ui-lab';
import type { ScOrgChartNodeData, ScOrgChartNodeExpandEvent } from '@semantic-components/ui-lab';
```

## Usage

### Basic Usage

```html
<div scOrgChart [collapsible]="true" (nodeExpand)="onNodeExpand($event)">
  <sc-org-chart-node [node]="orgData()" />

  <ng-template scOrgChartNodeDef let-node let-expanded="expanded" let-hasChildren="hasChildren" let-toggle="toggle">
    <div scOrgChartCard>
      <div class="bg-primary/10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full">
        <span class="text-primary text-lg font-semibold">{{ getInitials(node.name) }}</span>
      </div>
      <div class="min-w-0 flex-1 text-left">
        <p class="truncate text-sm font-semibold">{{ node.name }}</p>
        @if (node.title) {
        <p class="text-muted-foreground truncate text-xs">{{ node.title }}</p>
        }
      </div>
      @if (hasChildren) {
      <svg
        siChevronDownIcon
        [class]="expanded ? 'rotate-180 text-muted-foreground transition-transform duration-200'
            : 'text-muted-foreground transition-transform duration-200'"
      ></svg>
      }
    </div>
  </ng-template>
</div>
```

### Horizontal Layout

```html
<div scOrgChart aria-label="Organization chart" direction="horizontal">
  <sc-org-chart-node [node]="orgData()" />
  <ng-template scOrgChartNodeDef let-node let-toggle="toggle">
    <!-- card template -->
  </ng-template>
</div>
```

### Compact Mode

```html
<div scOrgChart aria-label="Organization chart" [compact]="true">
  <sc-org-chart-node [node]="orgData()" />
  <ng-template scOrgChartNodeDef let-node let-toggle="toggle">
    <!-- card template -->
  </ng-template>
</div>
```

### Non-collapsible

```html
<div scOrgChart aria-label="Organization chart" [collapsible]="false">
  <sc-org-chart-node [node]="orgData()" />
  <ng-template scOrgChartNodeDef let-node>
    <!-- card template (no toggle needed) -->
  </ng-template>
</div>
```

## API Reference

### ScOrgChart (`div[scOrgChart]`)

Root directive. Provides configuration to all child nodes via `SC_ORG_CHART` injection token.

#### Inputs

| Input         | Type                         | Default      | Description                 |
| ------------- | ---------------------------- | ------------ | --------------------------- |
| `direction`   | `'vertical' \| 'horizontal'` | `'vertical'` | Layout direction            |
| `collapsible` | `boolean`                    | `true`       | Allow nodes to be collapsed |
| `compact`     | `boolean`                    | `false`      | Use smaller node cards      |
| `class`       | `string`                     | `''`         | Additional CSS classes      |

#### Outputs

| Output       | Type                        | Description                               |
| ------------ | --------------------------- | ----------------------------------------- |
| `nodeExpand` | `ScOrgChartNodeExpandEvent` | Emitted when a node is expanded/collapsed |

### ScOrgChartNodeDef (`ng-template[scOrgChartNodeDef]`)

Captures the card template. Template context provides:

| Variable      | Type                 | Description                        |
| ------------- | -------------------- | ---------------------------------- |
| `$implicit`   | `ScOrgChartNodeData` | The node data (use `let-node`)     |
| `expanded`    | `boolean`            | Whether the node is expanded       |
| `hasChildren` | `boolean`            | Whether the node has children      |
| `toggle`      | `() => void`         | Function to toggle expand/collapse |

### ScOrgChartNode (`sc-org-chart-node`)

Handles recursion and connector lines. Reads config from the root `ScOrgChart` directive.

#### Inputs

| Input  | Type                 | Description          |
| ------ | -------------------- | -------------------- |
| `node` | `ScOrgChartNodeData` | Node data (required) |

### ScOrgChartCard (`[scOrgChartCard]`)

Card styling directive. Reads `compact` from root to toggle min-width. Use a `div`: the surrounding node (`role="treeitem"`) takes focus and handles clicks and keys, and is named from `node.name` and `node.title`.

## Type Definitions

### OrgChartNode

```typescript
interface ScOrgChartNodeData {
  id: string;
  name: string;
  title?: string;
  avatar?: string;
  department?: string;
  children?: ScOrgChartNodeData[];
  expanded?: boolean;
  data?: Record<string, unknown>;
}
```

### ScOrgChartNodeExpandEvent

```typescript
interface ScOrgChartNodeExpandEvent {
  node: ScOrgChartNodeData;
  expanded: boolean;
}
```

### ScOrgChartNodeDefContext

```typescript
interface ScOrgChartNodeDefContext {
  $implicit: ScOrgChartNodeData;
  expanded: boolean;
  hasChildren: boolean;
  toggle: () => void;
}
```

### ScOrgChartDirection

```typescript
type ScOrgChartDirection = 'vertical' | 'horizontal';
```

## Layout

- A chart wider than its box is centered only while it fits; otherwise it starts at the left (start) edge and scrolls. Wrap it in an `overflow-auto` container with `max-w-full` if the page should not scroll.
- In horizontal charts, connectors meet each card at `--sc-org-chart-anchor` from its top (default `2.25rem`, half the default card height). Set it on the chart if your cards are taller or shorter, e.g. `class="[--sc-org-chart-anchor:1.75rem]"`.

## Accessibility

Built on `@angular/aria`'s `Tree`:

- The chart is `role="tree"` (named "Organization chart" unless given an `aria-label`); each person is a `role="treeitem"` with `aria-level`, `aria-expanded` (when it has reports) and a name from `node.name` + `node.title`.
- Reports are rendered in a `role="group"`.
- One Tab stop: focus moves between people with the arrow keys.
- Avatar images include alt text; initials are the fallback.

## Keyboard Navigation

| Key               | Action                                        |
| ----------------- | --------------------------------------------- |
| `Tab`             | Into / out of the chart (one Tab stop)        |
| `↓` / `↑`         | Next / previous visible person                |
| `→`               | Expand; if expanded, move to the first report |
| `←`               | Collapse; if collapsed, move to the manager   |
| `Home` / `End`    | First / last visible person                   |
| `Enter` / `Space` | Select the person                             |

Clicking a person toggles their reports. With `[collapsible]="false"` everyone stays expanded.
