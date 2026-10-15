# Notification Center

Notifications you put together from parts. `scNotificationCenter` holds them and their filter; the parts read and change it; you write everything else — the header, each notification's content, the icons, every text. A popover inbox, a page section or a sidebar are all the same parts.

## Usage

```ts
interface Notice extends ScNotification {
  title: string;
  description?: string;
}

readonly notifications = signal<Notice[]>([
  { id: '1', title: 'New message from Alice', type: 'message', timestamp: new Date(), read: false },
]);
```

```html
<section scNotificationCenter #center="scNotificationCenter" [(notifications)]="notifications" aria-labelledby="inbox-title">
  <div scNotificationCenterHeader>
    <h2 scNotificationCenterTitle id="inbox-title">Notifications</h2>
    <button scNotificationMarkAllRead>Mark all as read</button>
  </div>

  <div scNotificationFilters aria-label="Show">
    <button scNotificationFilter="all">All</button>
    <button scNotificationFilter="unread">Unread</button>
  </div>

  @if (center.visible().length) {
  <ul scNotificationList>
    @for (notice of center.visible(); track notice.id) {
    <li [scNotification]="notice">
      <span scNotificationUnread><span class="sr-only">Unread</span></span>
      <span scNotificationIcon><svg siMessageSquareIcon></svg></span>
      <div scNotificationContent>
        <p scNotificationTitle>{{ notice.title }}</p>
        <time scNotificationTime></time>
        <div scNotificationActions>
          <button scNotificationMarkRead>{{ notice.read ? 'Mark as unread' : 'Mark as read' }}</button>
        </div>
      </div>
      <button scNotificationDismiss>
        <svg siXIcon></svg>
        <span class="sr-only">{{ 'Dismiss ' + notice.title }}</span>
      </button>
    </li>
    }
  </ul>
  } @else {
  <div scNotificationEmpty><p>You're all caught up.</p></div>
  }
</section>
```

## `scNotificationCenter`

| Member                | Does                                                                              |
| --------------------- | --------------------------------------------------------------------------------- |
| `[(notifications)]`   | The notifications — your type, extending `ScNotification`. Every change goes here |
| `[(filter)]`          | `all` (default) or `unread`                                                       |
| `visible()`           | The notifications the filter shows                                                |
| `unreadCount()`       | How many are unread                                                               |
| `markRead(id, read?)` | Marks one read (or unread with `false`)                                           |
| `markAllRead()`       | Marks all read                                                                    |
| `dismiss(id)`         | Removes one                                                                       |
| `clear()`             | Removes all                                                                       |

`ScNotification` is what the center needs — `id`, `read`, `timestamp`, and optionally `type` (`info`, `success`, `warning`, `error`, `message`: the icon's colour). Add your own fields and write them in the template: the center is generic, so `center.visible()` has your type.

There are no outputs: everything the parts do is a change of `notifications` — save it from there (an `effect`, or your store).

## Parts

| Part                         | Selector                            | Does                                                                                                |
| ---------------------------- | ----------------------------------- | --------------------------------------------------------------------------------------------------- |
| `ScNotificationCenterHeader` | `div[scNotificationCenterHeader]`   | The header row                                                                                      |
| `ScNotificationCenterTitle`  | `[scNotificationCenterTitle]`       | Its title (your heading)                                                                            |
| `ScNotificationFilters`      | `div[scNotificationFilters]`        | The filter buttons, a segmented control (`role="group"`: name it)                                   |
| `ScNotificationFilter`       | `button[scNotificationFilter]`      | `scNotificationFilter="unread"`: shows that filter, `aria-pressed` when on                          |
| `ScNotificationMarkAllRead`  | `button[scNotificationMarkAllRead]` | Marks all read; disabled with none unread                                                           |
| `ScNotificationClearAll`     | `button[scNotificationClearAll]`    | Removes all; disabled with none                                                                     |
| `ScNotificationSection`      | `[scNotificationSection]`           | A section (Today, Earlier…): a `group` named by its title                                           |
| `ScNotificationSectionTitle` | `[scNotificationSectionTitle]`      | The section's title (your heading)                                                                  |
| `ScNotificationList`         | `ul[scNotificationList]`            | A list of notifications                                                                             |
| `ScNotificationItem`         | `li[scNotification]`                | `[scNotification]="notice"`: one notification, for its parts. `data-read`, `data-type`              |
| `ScNotificationIcon`         | `[scNotificationIcon]`              | Its icon or avatar (yours inside), coloured by `type`                                               |
| `ScNotificationUnread`       | `[scNotificationUnread]`            | A dot while unread — write what it says to screen readers inside                                    |
| `ScNotificationContent`      | `div[scNotificationContent]`        | Its text, beside the icon                                                                           |
| `ScNotificationTitle`        | `[scNotificationTitle]`             | Its title (bolder while unread)                                                                     |
| `ScNotificationDescription`  | `[scNotificationDescription]`       | Its description, two lines at most                                                                  |
| `ScNotificationTime`         | `time[scNotificationTime]`          | "5 minutes ago", in the app's language (`LOCALE_ID`), kept up to date; the exact time as `datetime` |
| `ScNotificationActions`      | `div[scNotificationActions]`        | Its buttons and links                                                                               |
| `ScNotificationMarkRead`     | `button[scNotificationMarkRead]`    | Marks it read, or unread again                                                                      |
| `ScNotificationDismiss`      | `button[scNotificationDismiss]`     | Removes it                                                                                          |
| `ScNotificationEmpty`        | `div[scNotificationEmpty]`          | The empty state (your icon and text)                                                                |

The buttons style themselves (`ghost`; another look with `variant` and `size`, as on `scButton`): write their icons and texts, and name the icon-only ones (`aria-label`) — in development, an unnamed one warns.

## Sections

Most apps show one list, newest first, often in sections by day. Split `visible()` the way you want — by day, by source — and name each section by its title:

```html
@for (day of byDay(center.visible()); track day.title) {
<div scNotificationSection>
  <h3 scNotificationSectionTitle>{{ day.title }}</h3>
  <ul scNotificationList>
    @for (notice of day.notices; track notice.id) {
    <li [scNotification]="notice">…</li>
    }
  </ul>
</div>
}
```

## In a popover

Put `scNotificationCenter` around the popover, so the trigger can show the count:

```html
<div scNotificationCenter #center="scNotificationCenter" [(notifications)]="notifications">
  <div scPopoverProvider align="end">
    <button scButton variant="outline" size="icon" scPopoverTrigger>
      <svg siBellIcon></svg>
      <span class="sr-only">{{ 'Notifications, ' + center.unreadCount() + ' unread' }}</span>
    </button>
    <ng-template scPopoverPortal>
      <div scPopover aria-label="Notifications" class="w-96 p-0">…</div>
    </ng-template>
  </div>
</div>
```

## Accessibility

- Notifications are a list (`ul` / `li`); a section is a `group` named by its title.
- The unread state is a dot for the eyes and your text for screen readers; the title is bolder too.
- Times are `<time datetime>`, in the app's language.
- The library writes no text: name the filters' group, the icon-only buttons and the popover.
