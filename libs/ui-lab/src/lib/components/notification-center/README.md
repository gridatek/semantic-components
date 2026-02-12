# Notification Center

A grouped notification management component with filtering, read states, and action buttons.

## Installation

Import the components from the notification-center module:

```typescript
import { ScNotificationCenter, ScNotificationCenterContainer, type Notification, type NotificationGroup } from '@/ui/notification-center';
```

## Components

- **ScNotificationCenter (Directive)**: State management and business logic
- **ScNotificationCenterContainer**: UI rendering with header, filters, and notification list
- **ScNotificationGroup**: Grouped notification section (used internally)
- **ScNotificationItem**: Individual notification item (used internally)

## Usage

### Basic Usage

```html
<div sc-notification-center [(notifications)]="notifications" (markRead)="onMarkRead($event)" (dismiss)="onDismiss($event)">
  <div sc-notification-center-container></div>
</div>
```

```typescript
import { signal } from '@angular/core';
import type { Notification } from '@/ui/notification-center';

notifications = signal<Notification[]>([
  {
    id: '1',
    title: 'New message',
    description: 'You have a new message from Alice',
    type: 'message',
    timestamp: new Date(),
    read: false,
  },
  {
    id: '2',
    title: 'Build completed',
    type: 'success',
    timestamp: new Date(Date.now() - 3600000),
    read: true,
  },
]);
```

### With Groups

```html
<div sc-notification-center [(notifications)]="notifications" [groups]="groups()">
  <div sc-notification-center-container></div>
</div>
```

```typescript
import type { Notification, NotificationGroup } from '@/ui/notification-center';

groups = signal<NotificationGroup[]>([
  { id: 'messages', title: 'Messages' },
  { id: 'alerts', title: 'Alerts' },
  { id: 'updates', title: 'Updates' },
]);

notifications = signal<Notification[]>([
  {
    id: '1',
    title: 'New message from Alice',
    type: 'message',
    timestamp: new Date(),
    read: false,
    groupId: 'messages', // Links to group
  },
  {
    id: '2',
    title: 'Security alert',
    type: 'warning',
    timestamp: new Date(),
    read: false,
    groupId: 'alerts',
  },
]);
```

### With Actions

```typescript
notifications = signal<Notification[]>([
  {
    id: '1',
    title: 'Payment failed',
    description: 'Your payment method was declined.',
    type: 'error',
    timestamp: new Date(),
    read: false,
    action: {
      label: 'Update payment',
      handler: () => console.log('Navigate to payment settings'),
    },
  },
]);
```

### With Avatars

```typescript
notifications = signal<Notification[]>([
  {
    id: '1',
    title: 'New message from Alice',
    description: 'Hey! Are you available for a call?',
    type: 'message',
    timestamp: new Date(),
    read: false,
    avatar: 'https://example.com/alice.jpg',
  },
]);
```

### Custom Empty State

```html
<div sc-notification-center [(notifications)]="notifications" emptyTitle="All caught up!" emptyDescription="No new notifications to show.">
  <div sc-notification-center-container></div>
</div>
```

### Without Filters

```html
<div sc-notification-center [(notifications)]="notifications" [showFilters]="false">
  <div sc-notification-center-container></div>
</div>
```

### Custom Container Styling

```html
<div sc-notification-center [(notifications)]="notifications" class="max-w-md h-[500px]">
  <div sc-notification-center-container class="h-full"></div>
</div>
```

## API Reference

### ScNotificationCenter (Directive)

The root directive that manages notification state and business logic.

#### Selector

`[sc-notification-center]`

#### Inputs

| Input              | Type                  | Default                   | Description                      |
| ------------------ | --------------------- | ------------------------- | -------------------------------- |
| `notifications`    | `Notification[]`      | `[]`                      | Array of notifications (two-way) |
| `groups`           | `NotificationGroup[]` | `[]`                      | Groups for categorizing          |
| `title`            | `string`              | `'Notifications'`         | Header title                     |
| `showFilters`      | `boolean`             | `true`                    | Show all/unread/read filter tabs |
| `showClearAll`     | `boolean`             | `true`                    | Show clear all button            |
| `showDismiss`      | `boolean`             | `true`                    | Show dismiss button on items     |
| `emptyTitle`       | `string`              | `'No notifications'`      | Empty state title                |
| `emptyDescription` | `string`              | `"You're all caught up!"` | Empty state description          |

#### Outputs

| Output         | Type                       | Description               |
| -------------- | -------------------------- | ------------------------- |
| `markRead`     | `{ notification, read }`   | Read state changed        |
| `markAllRead`  | `void`                     | All marked as read        |
| `dismiss`      | `Notification`             | Notification dismissed    |
| `clearAll`     | `void`                     | All notifications cleared |
| `actionClick`  | `{ notification, action }` | Action button clicked     |
| `itemClick`    | `Notification`             | Notification clicked      |
| `filterChange` | `NotificationFilter`       | Filter changed            |

#### Exported As

`scNotificationCenter` - Access directive instance via template reference variable

```html
<div sc-notification-center #center="scNotificationCenter">
  <!-- Access center.totalUnread(), center.filteredNotifications(), etc. -->
</div>
```

### ScNotificationCenterContainer

The container component that renders the notification center UI.

#### Selector

`[sc-notification-center-container]`

#### Inputs

| Input   | Type     | Default | Description            |
| ------- | -------- | ------- | ---------------------- |
| `class` | `string` | `''`    | Additional CSS classes |

### ScNotificationGroup

Individual group component (used internally by container).

### ScNotificationItem

Individual notification item component (used internally by container).

## Composable Architecture

The notification center follows a composable architecture pattern that separates state management from UI rendering:

### Pattern Overview

1. **Root Directive** (`sc-notification-center`): Manages all state, computed values, and business logic
2. **Container Component** (`sc-notification-center-container`): Renders the UI and delegates actions to the directive
3. **Dependency Injection**: The container accesses the directive's state via the `SC_NOTIFICATION_CENTER` injection token

### Benefits

- **Separation of Concerns**: State management is isolated from UI rendering
- **Flexibility**: You can access directive state via template references for custom implementations
- **Reusability**: The directive can be used with custom containers or UI implementations
- **Testability**: Business logic in the directive is easier to test in isolation

### Example with Template Reference

```html
<div sc-notification-center #center="scNotificationCenter" [(notifications)]="notifications">
  <!-- Access state -->
  <p>Total unread: {{ center.totalUnread() }}</p>
  <p>Filtered: {{ center.filteredNotifications().length }}</p>

  <!-- Use the standard container -->
  <div sc-notification-center-container></div>
</div>
```

### Custom Implementation

You can build custom UIs by accessing the directive's state:

```html
<div sc-notification-center #center="scNotificationCenter" [(notifications)]="notifications">
  <!-- Custom UI using directive state -->
  <div class="custom-header">
    <h2>{{ center.title() }}</h2>
    <span class="badge">{{ center.totalUnread() }}</span>
  </div>

  <!-- Custom notification list -->
  @for (notification of center.filteredNotifications(); track notification.id) {
  <div class="custom-notification">
    {{ notification.title }}
    <button (click)="center.onDismiss(notification)">Dismiss</button>
  </div>
  }
</div>
```

## Type Definitions

### Notification

```typescript
interface Notification {
  id: string;
  title: string;
  description?: string;
  type: NotificationType;
  timestamp: Date;
  read: boolean;
  groupId?: string; // Links to NotificationGroup.id
  avatar?: string; // URL for avatar image
  icon?: string; // Custom SVG icon
  action?: NotificationAction;
  metadata?: Record<string, unknown>;
}
```

### NotificationType

```typescript
type NotificationType = 'info' | 'success' | 'warning' | 'error' | 'message';
```

Each type has a distinct icon and color:

- `info`: Gray info circle
- `success`: Green checkmark
- `warning`: Yellow/orange triangle
- `error`: Red X circle
- `message`: Blue chat bubble

### NotificationAction

```typescript
interface NotificationAction {
  label: string; // Button text
  url?: string; // Optional URL to navigate
  handler?: () => void; // Optional click handler
}
```

### NotificationGroup

```typescript
interface NotificationGroup {
  id: string;
  title: string;
  icon?: string; // Custom SVG icon
  collapsed?: boolean; // Initial collapsed state
}
```

### NotificationFilter

```typescript
type NotificationFilter = 'all' | 'unread' | 'read';
```

## Features

- **Grouped Notifications**: Organize notifications by category
- **Filtering**: Filter by all, unread, or read status
- **Batch Actions**: Mark all as read, clear all, clear group
- **Individual Actions**: Mark read, dismiss, custom action buttons
- **Notification Types**: Visual indicators for info, success, warning, error, message
- **Avatars**: Display user avatars for message-type notifications
- **Timestamps**: Relative time display (5m ago, 2h ago, etc.)
- **Collapsible Groups**: Expand/collapse notification groups
- **Empty State**: Customizable empty state display
- **Two-Way Binding**: Use `[(notifications)]` for automatic state sync

## Accessibility

- Notifications use `role="article"` and are keyboard focusable
- Groups use proper ARIA expanded states
- All interactive elements have descriptive `aria-label` attributes
- Focus indicators are visible for keyboard navigation
- Notifications are contained in `role="feed"` regions

## Styling

The component uses Tailwind CSS classes and supports theming through CSS variables:

- `--background` / `--foreground`: Base colors
- `--muted` / `--muted-foreground`: Secondary colors
- `--primary` / `--primary-foreground`: Accent/unread colors
- `--ring`: Focus ring color

Notification types use semantic colors:

- Success: Green (`green-500`, `green-600`)
- Warning: Yellow/Orange (`yellow-500`, `yellow-600`)
- Error: Red (`red-500`, `red-600`)
- Message: Blue (`blue-500`, `blue-600`)
- Info: Muted gray
