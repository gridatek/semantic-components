# Timeline

Display a sequence of events or activities in chronological order.

## Components

- `ScTimeline` - Container for timeline items
- `ScTimelineItem` - Individual timeline entry
- `ScTimelineConnector` - Vertical line connecting items
- `ScTimelineDot` - Circle indicator with optional icon
- `ScTimelineContent` - Content container
- `ScTimelineTitle` - Title text
- `ScTimelineDescription` - Description text
- `ScTimelineTime` - Timestamp text

## Usage

```html
<div sc-timeline>
  <div sc-timeline-item>
    <div sc-timeline-connector></div>
    <div sc-timeline-dot></div>
    <div sc-timeline-content>
      <h4 sc-timeline-title>Event Title</h4>
      <p sc-timeline-description>Event description goes here.</p>
      <span sc-timeline-time>January 2024</span>
    </div>
  </div>

  <div sc-timeline-item>
    <div sc-timeline-dot></div>
    <div sc-timeline-content>
      <h4 sc-timeline-title>Last Event</h4>
      <p sc-timeline-description>No connector for the last item.</p>
    </div>
  </div>
</div>
```

## API

### ScTimeline

| Input   | Type     | Default | Description            |
| ------- | -------- | ------- | ---------------------- |
| `class` | `string` | `''`    | Additional CSS classes |

### ScTimelineItem

| Input   | Type     | Default | Description            |
| ------- | -------- | ------- | ---------------------- |
| `class` | `string` | `''`    | Additional CSS classes |

### ScTimelineDot

| Input     | Type                                                          | Default     | Description            |
| --------- | ------------------------------------------------------------- | ----------- | ---------------------- |
| `class`   | `string`                                                      | `''`        | Additional CSS classes |
| `variant` | `'default' \| 'outline' \| 'success' \| 'warning' \| 'error'` | `'default'` | Visual variant         |
| `size`    | `'sm' \| 'default' \| 'lg'`                                   | `'default'` | Size of the dot        |

### ScTimelineConnector

| Input   | Type     | Default | Description            |
| ------- | -------- | ------- | ---------------------- |
| `class` | `string` | `''`    | Additional CSS classes |

### ScTimelineContent

| Input   | Type     | Default | Description            |
| ------- | -------- | ------- | ---------------------- |
| `class` | `string` | `''`    | Additional CSS classes |

### ScTimelineTitle

| Input   | Type     | Default | Description            |
| ------- | -------- | ------- | ---------------------- |
| `class` | `string` | `''`    | Additional CSS classes |

### ScTimelineDescription

| Input   | Type     | Default | Description            |
| ------- | -------- | ------- | ---------------------- |
| `class` | `string` | `''`    | Additional CSS classes |

### ScTimelineTime

| Input   | Type     | Default | Description            |
| ------- | -------- | ------- | ---------------------- |
| `class` | `string` | `''`    | Additional CSS classes |

## Dot Variants

| Variant   | Description                          |
| --------- | ------------------------------------ |
| `default` | Primary background color             |
| `outline` | Border only, transparent background  |
| `success` | Green background for completed items |
| `warning` | Yellow background for in-progress    |
| `error`   | Red background for failed items      |

## Dot Sizes

| Size      | Dimensions |
| --------- | ---------- |
| `sm`      | 16px       |
| `default` | 24px       |
| `lg`      | 32px       |

## Examples

### With Status Icons

```html
<div sc-timeline-item>
  <div sc-timeline-connector></div>
  <div sc-timeline-dot variant="success">
    <svg class="size-3"><!-- check icon --></svg>
  </div>
  <div sc-timeline-content>
    <h4 sc-timeline-title>Completed</h4>
  </div>
</div>
```

### Activity Feed

```html
<div sc-timeline>
  <div sc-timeline-item class="pb-4">
    <div sc-timeline-connector></div>
    <div sc-timeline-dot size="sm"></div>
    <div sc-timeline-content class="space-y-0">
      <p class="text-sm">
        <span class="font-medium">John Doe</span>
        created a new project
      </p>
      <span sc-timeline-time>2 hours ago</span>
    </div>
  </div>
</div>
```

### Order Tracking

```html
<div sc-timeline>
  <div sc-timeline-item>
    <div sc-timeline-connector></div>
    <div sc-timeline-dot variant="success" size="lg">
      <svg class="size-4"><!-- package icon --></svg>
    </div>
    <div sc-timeline-content>
      <h4 sc-timeline-title>Shipped</h4>
      <p sc-timeline-description>Your package is on its way.</p>
      <span sc-timeline-time>Jan 16, 2024</span>
    </div>
  </div>
</div>
```

## Structure

The timeline uses absolute positioning for the dot and connector elements:

```
Timeline
├── TimelineItem (relative, left padding)
│   ├── TimelineConnector (absolute, vertical line)
│   ├── TimelineDot (absolute, circle)
│   └── TimelineContent
│       ├── TimelineTitle
│       ├── TimelineDescription
│       └── TimelineTime
```

The connector should be omitted from the last timeline item to avoid an orphaned line.
