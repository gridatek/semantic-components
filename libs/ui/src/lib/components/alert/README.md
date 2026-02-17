# Alert

Displays a callout for important information.

## Components

- `ScAlert` - Container with variant styling and icon support
- `ScAlertTitle` - Bold title text
- `ScAlertDescription` - Description text
- `ScAlertAction` - Action button or link

## Usage

```html
<div scAlert>
  <svg class="size-4"><!-- icon --></svg>
  <h5 scAlertTitle>Heads up!</h5>
  <div scAlertDescription>You can add components using the cli.</div>
  <button scAlertAction>Action</button>
</div>
```

## Variants

### Default

```html
<div scAlert>
  <h5 scAlertTitle>Note</h5>
  <div scAlertDescription>This is an informational alert.</div>
  <button scAlertAction>Action</button>
</div>
```

### Destructive

```html
<div scAlert variant="destructive">
  <h5 scAlertTitle>Error</h5>
  <div scAlertDescription>Your session has expired.</div>
  <button scAlertAction>Action</button>
</div>
```

## With Icon

Icons are automatically positioned using CSS selectors:

```html
<div scAlert>
  <svg class="size-4"><!-- icon --></svg>
  <h5 scAlertTitle>Title</h5>
  <div scAlertDescription>Description with icon offset.</div>
  <button scAlertAction>Action</button>
</div>
```

## Custom Variants

Use the `class` input for custom styling:

```html
<!-- Success -->
<div scAlert class="border-green-500/50 text-green-600 [&>svg]:text-green-600">
  <h5 scAlertTitle>Success!</h5>
  <div scAlertDescription>Changes saved.</div>
  <button scAlertAction>Action</button>
</div>

<!-- Warning -->
<div scAlert class="border-yellow-500/50 text-yellow-600 [&>svg]:text-yellow-600">
  <h5 scAlertTitle>Warning</h5>
  <div scAlertDescription>Account expiring soon.</div>
  <button scAlertAction>Action</button>
</div>
```

## ScAlert Inputs

| Input     | Type                         | Default     | Description            |
| --------- | ---------------------------- | ----------- | ---------------------- |
| `variant` | `'default' \| 'destructive'` | `'default'` | Alert variant          |
| `class`   | `string`                     | `''`        | Additional CSS classes |

## ScAlertTitle Inputs

| Input   | Type     | Default | Description            |
| ------- | -------- | ------- | ---------------------- |
| `class` | `string` | `''`    | Additional CSS classes |

## ScAlertDescription Inputs

| Input   | Type     | Default | Description            |
| ------- | -------- | ------- | ---------------------- |
| `class` | `string` | `''`    | Additional CSS classes |

## ScAlertAction Inputs

| Input   | Type     | Default | Description            |
| ------- | -------- | ------- | ---------------------- |
| `class` | `string` | `''`    | Additional CSS classes |

## Styling

The alert uses CSS selectors to position icons:

- `[&>svg~*]:pl-7` - Adds left padding to siblings after SVG
- `[&>svg+div]:translate-y-[-3px]` - Adjusts vertical alignment
- `[&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4` - Positions icon

## Accessibility

- Uses `role="alert"` for screen reader announcements
- Semantic heading structure with alert title
- Sufficient color contrast for both variants
- Icons are decorative (content is in title/description)
- Action is a `button` or `a` element for keyboard accessibility.
