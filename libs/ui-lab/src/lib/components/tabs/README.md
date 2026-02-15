# Tabs

A set of layered sections of content, known as tab panels, that are displayed one at a time.

Built on `@angular/aria/tabs` directives with shadcn styling.

## Components

| Component      | Selector                    | Role                                                                                                                                                                        |
| -------------- | --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ScTabs`       | `[scTabs]`                  | Root container. Inputs: `orientation` (`horizontal` \| `vertical`)                                                                                                          |
| `ScTabList`    | `[scTabList]`               | Tab button container. Inputs: `selectedTab`, `selectionMode`, `orientation`, `disabled`, `wrap`, `focusMode`, `variant` (`default` \| `line`). Outputs: `selectedTabChange` |
| `ScTab`        | `[scTab]`                   | Individual tab trigger (directive). Inputs: `value`, `disabled`, `id`                                                                                                       |
| `ScTabPanel`   | `[scTabPanel]`              | Content container. Inputs: `value`, `id`                                                                                                                                    |
| `ScTabContent` | `ng-template[scTabContent]` | Lazy content — only instantiated when the panel is active                                                                                                                   |

## Usage

```html
<div scTabs>
  <div scTabList selectedTab="account" selectionMode="follow">
    <button scTab value="account">Account</button>
    <button scTab value="password">Password</button>
  </div>
  <div scTabPanel value="account">
    <ng-template scTabContent>Account content here.</ng-template>
  </div>
  <div scTabPanel value="password">
    <ng-template scTabContent>Password content here.</ng-template>
  </div>
</div>
```

### Line variant

```html
<div scTabList variant="line" selectedTab="overview" selectionMode="follow">...</div>
```

### Vertical orientation

```html
<div scTabs orientation="vertical">
  <div scTabList selectedTab="profile" selectionMode="follow" orientation="vertical">...</div>
  ...
</div>
```

### Disabled tab

```html
<button scTab value="notifications" disabled>Notifications</button>
```
