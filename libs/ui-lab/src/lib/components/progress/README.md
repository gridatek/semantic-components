# Progress

Displays an indicator showing the completion progress of a task.

## Components

| Component             | Selector                | Role                                                                    |
| --------------------- | ----------------------- | ----------------------------------------------------------------------- |
| `ScProgress`          | `[scProgress]`          | Progress bar with `role="progressbar"`. Inputs: `value`, `max`, `class` |
| `ScProgressIndicator` | `[scProgressIndicator]` | Internal indicator element (used inside `ScProgress` template)          |

## Usage

```html
<div scProgress [value]="33"></div>
```

### Custom Max

```html
<div scProgress [value]="50" [max]="200"></div>
```

### Custom Styling

```html
<div scProgress [value]="66" class="h-4 w-[60%]"></div>
```

### With Signal Forms

`ScProgress` implements `FormValueControl<number | null>` for form integration:

```html
<div scProgress [value]="completionPercentage()"></div>
```

## Data Attributes

| Attribute    | Values                                 | Description   |
| ------------ | -------------------------------------- | ------------- |
| `data-state` | `indeterminate`, `loading`, `complete` | Current state |
