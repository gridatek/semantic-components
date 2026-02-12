# Card

Displays a card with header, content, and footer.

## Components

- `ScCard` - Container with border, background, and shadow
- `ScCardHeader` - Header section with flex column layout
- `ScCardTitle` - Large semibold title text
- `ScCardDescription` - Muted description text
- `ScCardContent` - Main content area
- `ScCardFooter` - Footer section with flex row layout

## Usage

```html
<div sc-card>
  <div sc-card-header>
    <h3 sc-card-title>Card Title</h3>
    <p sc-card-description>Card description goes here.</p>
  </div>
  <div sc-card-content>
    <p>Card content goes here.</p>
  </div>
  <div sc-card-footer>
    <p>Card footer</p>
  </div>
</div>
```

## Card with Form

```html
<div sc-card class="w-[350px]">
  <div sc-card-header>
    <h3 sc-card-title>Create project</h3>
    <p sc-card-description>Deploy your new project in one-click.</p>
  </div>
  <div sc-card-content>
    <div class="grid gap-4">
      <div class="flex flex-col space-y-1.5">
        <label sc-label for="name">Name</label>
        <input sc-input id="name" placeholder="Project name" />
      </div>
    </div>
  </div>
  <div sc-card-footer class="flex justify-between">
    <button>Cancel</button>
    <button>Deploy</button>
  </div>
</div>
```

## Stats Card

```html
<div sc-card>
  <div sc-card-header class="pb-2">
    <p sc-card-description>Total Revenue</p>
    <h3 sc-card-title class="text-4xl">$45,231.89</h3>
  </div>
  <div sc-card-content>
    <p class="text-xs text-muted-foreground">+20.1% from last month</p>
  </div>
</div>
```

## Component Inputs

All card components accept a `class` input for additional CSS classes.

| Component           | Default Styling                                            |
| ------------------- | ---------------------------------------------------------- |
| `ScCard`            | `rounded-lg border bg-card text-card-foreground shadow-sm` |
| `ScCardHeader`      | `flex flex-col space-y-1.5 p-6`                            |
| `ScCardTitle`       | `text-2xl font-semibold leading-none tracking-tight`       |
| `ScCardDescription` | `text-sm text-muted-foreground`                            |
| `ScCardContent`     | `p-6 pt-0`                                                 |
| `ScCardFooter`      | `flex items-center p-6 pt-0`                               |

## Accessibility

- Uses semantic HTML structure
- Card components are simple styling containers
- Content should use appropriate heading levels
- Interactive elements inside cards should be keyboard accessible
