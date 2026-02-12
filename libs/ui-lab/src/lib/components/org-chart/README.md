# Org Chart

A hierarchical organization chart component for visualizing company structures and reporting relationships.

## Installation

Import the components from the org-chart module:

```typescript
import { ScOrgChart } from '@/ui/org-chart';
import type { OrgChartNode, OrgChartNodeClickEvent } from '@/ui/org-chart';
```

## Usage

### Basic Usage

```html
<sc-org-chart [data]="orgData" (nodeClick)="onNodeClick($event)" />
```

```typescript
orgData: OrgChartNode = {
  id: '1',
  name: 'John Smith',
  title: 'CEO',
  children: [
    {
      id: '2',
      name: 'Jane Doe',
      title: 'CTO',
      children: [
        { id: '3', name: 'Bob Wilson', title: 'Developer' },
        { id: '4', name: 'Alice Brown', title: 'Designer' },
      ],
    },
    {
      id: '5',
      name: 'Mike Johnson',
      title: 'CFO',
    },
  ],
};

onNodeClick(event: OrgChartNodeClickEvent): void {
  console.log('Clicked:', event.node.name);
}
```

### Horizontal Layout

```html
<sc-org-chart [data]="orgData" direction="horizontal" />
```

### With Avatars

```typescript
orgData: OrgChartNode = {
  id: '1',
  name: 'Sarah Johnson',
  title: 'CEO',
  avatar: 'https://example.com/sarah.jpg',
  children: [
    {
      id: '2',
      name: 'Michael Chen',
      title: 'CTO',
      avatar: 'https://example.com/michael.jpg',
    },
  ],
};
```

### With Departments

```typescript
orgData: OrgChartNode = {
  id: '1',
  name: 'John Smith',
  title: 'CEO',
  department: 'Executive',
  children: [
    {
      id: '2',
      name: 'Jane Doe',
      title: 'Engineering Manager',
      department: 'Engineering',
    },
  ],
};
```

### Compact Mode

```html
<sc-org-chart [data]="orgData" [compact]="true" />
```

### Non-collapsible

```html
<sc-org-chart [data]="orgData" [collapsible]="false" />
```

### Initial Expanded State

```typescript
orgData: OrgChartNode = {
  id: '1',
  name: 'John Smith',
  title: 'CEO',
  expanded: false, // Start collapsed
  children: [...],
};
```

## API Reference

### ScOrgChart

The main organization chart component.

#### Inputs

| Input         | Type                         | Default                | Description                   |
| ------------- | ---------------------------- | ---------------------- | ----------------------------- |
| `data`        | `OrgChartNode \| null`       | `null`                 | Root node of the organization |
| `direction`   | `'vertical' \| 'horizontal'` | `'vertical'`           | Layout direction              |
| `collapsible` | `boolean`                    | `true`                 | Allow nodes to be collapsed   |
| `compact`     | `boolean`                    | `false`                | Use smaller node cards        |
| `ariaLabel`   | `string`                     | `'Organization chart'` | Accessible label              |
| `class`       | `string`                     | `''`                   | Additional CSS classes        |

#### Outputs

| Output       | Type                      | Description                               |
| ------------ | ------------------------- | ----------------------------------------- |
| `nodeClick`  | `OrgChartNodeClickEvent`  | Emitted when a node is clicked            |
| `nodeExpand` | `OrgChartNodeExpandEvent` | Emitted when a node is expanded/collapsed |

### ScOrgChartNode

Individual node component (used internally, can also be used directly for custom layouts).

#### Inputs

| Input         | Type                | Default      | Description           |
| ------------- | ------------------- | ------------ | --------------------- |
| `node`        | `OrgChartNode`      | (required)   | Node data to display  |
| `direction`   | `OrgChartDirection` | `'vertical'` | Layout direction      |
| `collapsible` | `boolean`           | `true`       | Allow collapse        |
| `compact`     | `boolean`           | `false`      | Use compact card size |

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

### OrgChartNodeClickEvent

```typescript
interface OrgChartNodeClickEvent {
  node: OrgChartNode;
  event: MouseEvent;
}
```

### OrgChartNodeExpandEvent

```typescript
interface OrgChartNodeExpandEvent {
  node: OrgChartNode;
  expanded: boolean;
}
```

### OrgChartDirection

```typescript
type OrgChartDirection = 'vertical' | 'horizontal';
```

## Node Properties

| Property     | Type                      | Required | Description                      |
| ------------ | ------------------------- | -------- | -------------------------------- |
| `id`         | `string`                  | Yes      | Unique identifier for the node   |
| `name`       | `string`                  | Yes      | Person's full name               |
| `title`      | `string`                  | No       | Job title or position            |
| `avatar`     | `string`                  | No       | URL to profile image             |
| `department` | `string`                  | No       | Department or team name          |
| `children`   | `OrgChartNode[]`          | No       | Direct reports (child nodes)     |
| `expanded`   | `boolean`                 | No       | Initial expanded state           |
| `data`       | `Record<string, unknown>` | No       | Custom data attached to the node |

## Accessibility

The Org Chart component follows accessibility best practices:

- Container has `role="tree"` for screen readers
- Nodes have `aria-expanded` attribute when collapsible
- Each node has accessible label combining name and title
- Focus indicators for keyboard navigation
- Avatar images include proper alt text
- Initials fallback for nodes without avatars

## Keyboard Navigation

| Key   | Action                                |
| ----- | ------------------------------------- |
| Tab   | Move focus between nodes              |
| Enter | Toggle expand/collapse, trigger click |
| Space | Toggle expand/collapse, trigger click |

## Styling

The component uses Tailwind CSS classes and supports theming:

- Node cards use `bg-card` and `border` colors
- Connectors use `bg-border` color
- Avatar fallback uses `bg-primary/10` with `text-primary`
- Hover states include shadow transitions

### Custom Styling

```html
<sc-org-chart [data]="orgData" class="[&_button]:shadow-lg" />
```

## Features

- Hierarchical tree structure visualization
- Vertical and horizontal layout options
- Collapsible nodes with smooth expand/collapse
- Avatar support with initials fallback
- Department and title display
- Compact mode for dense hierarchies
- Connector lines between nodes
- Click and expand event handlers
- Custom data attachment
- Recursive rendering
- Full keyboard and screen reader support

## Use Cases

- Company organization charts
- Team hierarchy visualization
- Management reporting structures
- Department org charts
- Project team structures
- Family trees
- Any hierarchical relationship visualization
