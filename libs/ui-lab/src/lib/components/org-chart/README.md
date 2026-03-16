# Org Chart

A hierarchical organization chart built from composable directives. The consumer controls card content via `ng-template`.

## Installation

```typescript
import { ScOrgChart, ScOrgChartCard, ScOrgChartNode, ScOrgChartNodeDef } from '@semantic-components/ui-lab';
import type { OrgChartNode, ScOrgChartNodeExpandEvent } from '@semantic-components/ui-lab';
```

## Usage

### Basic Usage

```html
<div scOrgChart [collapsible]="true" (nodeExpand)="onNodeExpand($event)">
  <sc-org-chart-node [node]="orgData()" />

  <ng-template scOrgChartNodeDef let-node let-expanded="expanded" let-hasChildren="hasChildren" let-toggle="toggle">
    <button scOrgChartCard [attr.aria-expanded]="hasChildren ? expanded : null" [attr.aria-label]="node.name + (node.title ? ', ' + node.title : '')" (click)="toggle()">
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
    </button>
  </ng-template>
</div>
```

### Horizontal Layout

```html
<div scOrgChart direction="horizontal">
  <sc-org-chart-node [node]="orgData()" />
  <ng-template scOrgChartNodeDef let-node let-toggle="toggle">
    <!-- card template -->
  </ng-template>
</div>
```

### Compact Mode

```html
<div scOrgChart [compact]="true">
  <sc-org-chart-node [node]="orgData()" />
  <ng-template scOrgChartNodeDef let-node let-toggle="toggle">
    <!-- card template -->
  </ng-template>
</div>
```

### Non-collapsible

```html
<div scOrgChart [collapsible]="false">
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

| Input         | Type                         | Default                | Description                 |
| ------------- | ---------------------------- | ---------------------- | --------------------------- |
| `direction`   | `'vertical' \| 'horizontal'` | `'vertical'`           | Layout direction            |
| `collapsible` | `boolean`                    | `true`                 | Allow nodes to be collapsed |
| `compact`     | `boolean`                    | `false`                | Use smaller node cards      |
| `ariaLabel`   | `string`                     | `'Organization chart'` | Accessible label            |
| `class`       | `string`                     | `''`                   | Additional CSS classes      |

#### Outputs

| Output       | Type                        | Description                               |
| ------------ | --------------------------- | ----------------------------------------- |
| `nodeExpand` | `ScOrgChartNodeExpandEvent` | Emitted when a node is expanded/collapsed |

### ScOrgChartNodeDef (`ng-template[scOrgChartNodeDef]`)

Captures the card template. Template context provides:

| Variable      | Type           | Description                        |
| ------------- | -------------- | ---------------------------------- |
| `$implicit`   | `OrgChartNode` | The node data (use `let-node`)     |
| `expanded`    | `boolean`      | Whether the node is expanded       |
| `hasChildren` | `boolean`      | Whether the node has children      |
| `toggle`      | `() => void`   | Function to toggle expand/collapse |

### ScOrgChartNode (`sc-org-chart-node`)

Handles recursion and connector lines. Reads config from the root `ScOrgChart` directive.

#### Inputs

| Input  | Type           | Description          |
| ------ | -------------- | -------------------- |
| `node` | `OrgChartNode` | Node data (required) |

### ScOrgChartCard (`button[scOrgChartCard]`)

Card button styling directive. Reads `compact` from root to toggle min-width.

## Type Definitions

### OrgChartNode

```typescript
interface OrgChartNode {
  id: string;
  name: string;
  title?: string;
  avatar?: string;
  department?: string;
  children?: OrgChartNode[];
  expanded?: boolean;
  data?: Record<string, unknown>;
}
```

### ScOrgChartNodeExpandEvent

```typescript
interface ScOrgChartNodeExpandEvent {
  node: OrgChartNode;
  expanded: boolean;
}
```

### ScOrgChartNodeDefContext

```typescript
interface ScOrgChartNodeDefContext {
  $implicit: OrgChartNode;
  expanded: boolean;
  hasChildren: boolean;
  toggle: () => void;
}
```

### ScOrgChartDirection

```typescript
type ScOrgChartDirection = 'vertical' | 'horizontal';
```

## Accessibility

- Container has `role="tree"` for screen readers
- Nodes support `aria-expanded` attribute when collapsible
- Card buttons support accessible labels via `aria-label`
- Focus indicators for keyboard navigation
- Avatar images include proper alt text
- Initials fallback for nodes without avatars

## Keyboard Navigation

| Key   | Action                                |
| ----- | ------------------------------------- |
| Tab   | Move focus between nodes              |
| Enter | Toggle expand/collapse, trigger click |
| Space | Toggle expand/collapse, trigger click |
