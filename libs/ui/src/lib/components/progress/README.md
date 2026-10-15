# Progress

Displays an indicator showing the completion progress of a task.

## Components

| Component             | Selector                | Role                                                                    |
| --------------------- | ----------------------- | ----------------------------------------------------------------------- |
| `ScProgress`          | `[scProgress]`          | Progress bar with `role="progressbar"`. Inputs: `value`, `max`, `class` |
| `ScProgressIndicator` | `[scProgressIndicator]` | Internal indicator element (used inside `ScProgress` template)          |

## Usage

Name every progress bar — `aria-label` or `aria-labelledby`: the library adds no text.

```html
<div scProgress [value]="33" aria-label="Upload"></div>
```

### Custom Max

```html
<div scProgress [value]="50" [max]="200" aria-label="Steps done"></div>
```

### Custom Styling

```html
<div scProgress [value]="66" class="h-4 w-[60%]" aria-label="Upload"></div>
```

### With Signal Forms

`ScProgress` implements `FormValueControl<number | null>` for form integration:

```html
<div scProgress [value]="completionPercentage()" aria-label="Form completion"></div>
```

## Data Attributes

| Attribute    | Values                                 | Description   |
| ------------ | -------------------------------------- | ------------- |
| `data-state` | `indeterminate`, `loading`, `complete` | Current state |
