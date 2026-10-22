# Notification Center Next

The notification center, rebuilt: notifications you put together from parts. `scNotificationNextCenter` holds them and their filter; the parts read and change it; you write everything else — the header, each notification's content, the icons, every text. A popover inbox, a page section or a sidebar are all the same parts.

## Usage

```ts
interface Notice extends ScNotificationNext {
  title: string;
  description?: string;
}

readonly notifications = signal<Notice[]>([
  { id: '1', title: 'New message from Alice', type: 'message', timestamp: Temporal.Now.instant(), read: false },
]);
```

```html
<section scNotificationNextCenter #center="scNotificationNextCenter" [(notifications)]="notifications" aria-labelledby="inbox-title">
  <div scNotificationNextCenterHeader>
    <h2 scNotificationNextCenterTitle id="inbox-title">Notifications</h2>
    <button scNotificationNextMarkAllRead>Mark all as read</button>
  </div>

  <div scNotificationNextFilters aria-label="Show">
    <button scNotificationNextFilter="all">All</button>
    <button scNotificationNextFilter="unread">Unread</button>
  </div>

  @if (center.visible().length) {
  <ul scNotificationNextList>
    @for (notice of center.visible(); track notice.id) {
    <li [scNotificationNext]="notice">
      <span scNotificationNextUnread><span class="sr-only">Unread</span></span>
      <span scNotificationNextIcon><svg siMessageSquareIcon></svg></span>
      <div scNotificationNextContent>
        <p scNotificationNextTitle>{{ notice.title }}</p>
        <time scNotificationNextTime></time>
        <div scNotificationNextActions>
          <button scNotificationNextMarkRead>{{ notice.read ? 'Mark as unread' : 'Mark as read' }}</button>
        </div>
      </div>
      <button scNotificationNextDismiss>
        <svg siXIcon></svg>
        <span class="sr-only">{{ 'Dismiss ' + notice.title }}</span>
      </button>
    </li>
    }
  </ul>
  } @else {
  <div scNotificationNextEmpty><p>You're all caught up.</p></div>
  }
</section>
```

## `scNotificationNextCenter`

| Member                | Does                                                                                                 |
| --------------------- | ---------------------------------------------------------------------------------------------------- |
| `[(notifications)]`   | The notifications — your type, extending `ScNotificationNext`. Every change goes here                |
| `[(filter)]`          | `all` (default) or `unread`                                                                          |
| `visible()`           | The notifications the filter shows                                                                   |
| `unreadCount()`       | How many are unread                                                                                  |
| `days()`              | `visible()` by the user's calendar day, latest first: `{ day: Temporal.PlainDate, notifications }[]` |
| `markRead(id, read?)` | Marks one read (or unread with `false`)                                                              |
| `markAllRead()`       | Marks all read                                                                                       |
| `dismiss(id)`         | Removes one                                                                                          |
| `clear()`             | Removes all                                                                                          |

`ScNotificationNext` is what the center needs — `id`, `read`, `timestamp` (a `Temporal.Instant`), and optionally `type` (`info`, `success`, `warning`, `error`, `message`: the icon's colour). Add your own fields and write them in the template: the center is generic, so `center.visible()` has your type.

There are no outputs: everything the parts do is a change of `notifications` — save it from there (an `effect`, or your store).

## Parts

| Part                             | Selector                                | Does                                                                                                                              |
| -------------------------------- | --------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `ScNotificationNextCenterHeader` | `div[scNotificationNextCenterHeader]`   | The header row                                                                                                                    |
| `ScNotificationNextCenterTitle`  | `[scNotificationNextCenterTitle]`       | Its title (your heading)                                                                                                          |
| `ScNotificationNextFilters`      | `div[scNotificationNextFilters]`        | The filter buttons, a segmented control (`role="group"`: name it)                                                                 |
| `ScNotificationNextFilter`       | `button[scNotificationNextFilter]`      | `scNotificationNextFilter="unread"`: shows that filter, `aria-pressed` when on                                                    |
| `ScNotificationNextMarkAllRead`  | `button[scNotificationNextMarkAllRead]` | Marks all read; disabled with none unread                                                                                         |
| `ScNotificationNextClearAll`     | `button[scNotificationNextClearAll]`    | Removes all; disabled with none                                                                                                   |
| `ScNotificationNextSection`      | `[scNotificationNextSection]`           | A section (Today, Earlier…): a `group` named by its title                                                                         |
| `ScNotificationNextSectionTitle` | `[scNotificationNextSectionTitle]`      | The section's title (your heading)                                                                                                |
| `ScNotificationNextDay`          | `time[scNotificationNextDay]`           | `[scNotificationNextDay]="group.day"`: "Today", "Yesterday", the weekday, then the date — in the app's language; follows midnight |
| `ScNotificationNextCount`        | `[scNotificationNextCount]`             | The unread count as a badge, for the bell: hidden at none, `max`+ beyond it (99) — visual only                                    |
| `ScNotificationNextList`         | `ul[scNotificationNextList]`            | A list of notifications                                                                                                           |
| `ScNotificationNextItem`         | `li[scNotificationNext]`                | `[scNotificationNext]="notice"`: one notification, for its parts. `data-read`, `data-type`                                        |
| `ScNotificationNextIcon`         | `[scNotificationNextIcon]`              | Its icon or avatar (yours inside), coloured by `type`                                                                             |
| `ScNotificationNextUnread`       | `[scNotificationNextUnread]`            | A dot while unread — write what it says to screen readers inside                                                                  |
| `ScNotificationNextContent`      | `div[scNotificationNextContent]`        | Its text, beside the icon                                                                                                         |
| `ScNotificationNextTitle`        | `[scNotificationNextTitle]`             | Its title (bolder while unread)                                                                                                   |
| `ScNotificationNextDescription`  | `[scNotificationNextDescription]`       | Its description, two lines at most                                                                                                |
| `ScNotificationNextTime`         | `time[scNotificationNextTime]`          | "5 minutes ago", in the app's language (`LOCALE_ID`), kept up to date; the exact time as `datetime`                               |
| `ScNotificationNextActions`      | `div[scNotificationNextActions]`        | Its buttons and links                                                                                                             |
| `ScNotificationNextMarkRead`     | `button[scNotificationNextMarkRead]`    | Marks it read, or unread again                                                                                                    |
| `ScNotificationNextDismiss`      | `button[scNotificationNextDismiss]`     | Removes it                                                                                                                        |
| `ScNotificationNextEmpty`        | `div[scNotificationNextEmpty]`          | The empty state (your icon and text)                                                                                              |

The buttons style themselves (`ghost`; another look with `variant` and `size`, as on `scButton`): write their icons and texts, and name the icon-only ones (`aria-label`) — in development, an unnamed one warns.

## Sections

Most apps show one list, newest first, in sections by day: `days()` groups what is shown by the user's calendar day, and `scNotificationNextDay` titles each — "Today", "Yesterday", the weekday within a week, then the date — in the app's language, its first letter up. Split `visible()` yourself for other sections (by source).

```html
@for (group of center.days(); track group.day.toString()) {
<div scNotificationNextSection>
  <h3 scNotificationNextSectionTitle><time [scNotificationNextDay]="group.day"></time></h3>
  <ul scNotificationNextList>
    @for (notice of group.notifications; track notice.id) {
    <li [scNotificationNext]="notice">…</li>
    }
  </ul>
</div>
}
```

## In a popover

Put `scNotificationNextCenter` around the popover, so the trigger can show the count — `scNotificationNextCount` for the eyes, your text for screen readers:

```html
<div scNotificationNextCenter #center="scNotificationNextCenter" [(notifications)]="notifications">
  <div scPopoverProvider align="end">
    <button scButton variant="outline" size="icon" scPopoverTrigger>
      <svg siBellIcon></svg>
      <span scNotificationNextCount [max]="9"></span>
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
