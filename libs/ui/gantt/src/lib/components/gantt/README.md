# Gantt

A Gantt chart is a Data Table with a timeline column: each row's bar runs from its start to its end, with its progress, and arrows lead to the tasks that follow it. The rows on the left are yours — a tree grid (`scDataTableTreeGrid`) with its keyboard, sorting, filtering, any columns — and the Gantt adds the timeline.

## Features

- **Bars** from `start` to `end` (Temporal dates, both days included), **progress** filled in
- **Summaries** (a row with children: a bracket) and **milestones** (a diamond)
- **Links**: finish-to-start arrows from a bar's `dependencies`
- **Markers**: today, a launch — a line down the rows, your label
- **Scales**: days, weeks (from Monday) or months; the header in the page's locale
- **Editing**: drag a bar, its ends or its progress handle; or from the keyboard on its row. A change is a proposal (`dateChange`, `progressChange`): your data applies it — or refuses it.
- **Read out**: a bar's dates and progress, with its row; each change announced
- **RTL**: the timeline runs from the right; the arrow keys follow it

## Quick Start

```html
<div scGantt [from]="from" [to]="to" scale="day">
  <table scTable scDataTableTreeGrid [table]="table" aria-label="Plan">
    <thead scTableHeader>
      <tr scTableRow>
        <th scTableHeaderCell class="align-bottom">Task</th>
        <th scTableHeaderCell scGanttTimeline>
          <span class="sr-only">Timeline</span>
          <div scGanttScale>
            <svg scGanttLinks></svg>
            <div scGanttMarker [date]="today">Today</div>
          </div>
        </th>
      </tr>
    </thead>
    <tbody scTableBody>
      @for (row of table.getRowModel().rows; track row.id) {
      <tr scTableRow scDataTableRow [row]="row">
        <td scTableCell>{{ row.original.name }}</td>
        <td scTableCell scGanttTimeline>
          <div scGanttBar [id]="row.original.id" [start]="row.original.start" [end]="row.original.end" [progress]="row.original.progress" [dependencies]="row.original.dependsOn" (dateChange)="move(row.original, $event)" (progressChange)="advance(row.original, $event)">{{ row.original.name }}</div>
        </td>
      </tr>
      }
    </tbody>
  </table>
</div>
```

```typescript
move(task: Task, dates: ScGanttDates): void {
  this.tasks.update((tasks) => tasks.map((t) => (t.id === task.id ? { ...t, ...dates } : t)));
}
```

**Rules**

- Give the timeline's header cell a name (`sr-only`): the scale is seen, not read.
- A summary's dates are yours: set them from its children (the Project Plan demo's `summarise`).
- With rows that change, keep them open: TanStack's `autoResetExpanded: false`.
- Dragging needs a pointer; the keyboard does the same. If your users must change dates without either (WCAG 2.5.7), also offer a form — a dialog with date pickers, say.

## Keyboard

On a focused row (the tree grid's own keys stay: arrows, Home/End, Enter, Space):

| Key                 | Action                              |
| ------------------- | ----------------------------------- |
| `Alt+→` / `Alt+←`   | Moves the bar a day later / earlier |
| `Alt+Shift+→` / `←` | Moves its end a day later / earlier |
| `Alt+↑` / `Alt+↓`   | Its progress up / down 10 points    |

`→` and `←` follow the timeline: reversed in right-to-left. Summaries don't move; a read-only Gantt ignores these keys.

## API

### ScGantt — `div[scGantt]`

Wraps the table and scrolls it. `exportAs: 'scGantt'`.

| Input      | Type                         | Default  | Description                                |
| ---------- | ---------------------------- | -------- | ------------------------------------------ |
| `from`     | `Temporal.PlainDate`         | —        | The timeline's first day                   |
| `to`       | `Temporal.PlainDate`         | —        | Its last day                               |
| `scale`    | `'day' \| 'week' \| 'month'` | `'day'`  | What a column of the scale stands for      |
| `dayWidth` | `number`                     | by scale | px a day: 32 (day), 12 (week), 4 (month)   |
| `readonly` | `boolean`                    | `false`  | Bars can't be moved, resized or progressed |
| `class`    | `string`                     | `''`     | Additional CSS classes                     |

### ScGanttTimeline — `th[scGanttTimeline]`, `td[scGanttTimeline]`

The timeline column's cells: as wide as the timeline, no padding. Body cells draw a line a column (days, or weeks from Monday).

### ScGanttScale — `div[scGanttScale]`

The scale, in the header cell: months over days or weeks, years over months. Holds the links and the markers.

### ScGanttBar — `div[scGanttBar]`

| Input          | Type                 | Default | Description                           |
| -------------- | -------------------- | ------- | ------------------------------------- |
| `start`        | `Temporal.PlainDate` | —       | Its first day                         |
| `end`          | `Temporal.PlainDate` | —       | Its last day (included)               |
| `progress`     | `number`             | —       | Done, 0–100; none: no fill, no handle |
| `id`           | `string`             | —       | Its name, for links                   |
| `dependencies` | `string[]`           | `[]`    | The bars it follows (their `id`)      |
| `milestone`    | `boolean`            | `false` | A diamond on `start`                  |

| Output           | Type           | Description                                |
| ---------------- | -------------- | ------------------------------------------ |
| `dateChange`     | `ScGanttDates` | New `{ start, end }`, proposed             |
| `progressChange` | `number`       | New progress, proposed (by 5 when dragged) |

A row with children (`getCanExpand()`) makes its bar a summary. The bar's label (your content) is seen, not read: the row's cells say it.

### ScGanttMarker — `div[scGanttMarker]`

A date marked down the timeline: `[date]`, your label inside. In `scGanttScale`.

### ScGanttLinks — `svg[scGanttLinks]`

The arrows, finish to start. Drawn, not read: say the dependencies in a cell if they matter. In `scGanttScale`.

## Styling

- `[data-slot=gantt-bar]`: `data-kind="task|summary|milestone"`, `data-dragging`
- `[data-slot=gantt-bar-progress]`, `[data-slot=gantt-bar-label]`, `[data-handle=start|end|progress]`
- `[data-slot=gantt-marker]`, `[data-slot=gantt-links]`, `[data-slot=gantt-scale]`, `[data-slot=gantt-timeline]`

## Accessibility

- The rows are the tree grid's: one tab stop, levels, open and closed.
- Each bar reads its dates and progress in the page's locale ("Nov 3 – 14, 2026, 60%"), with no words of the library's.
- Keyboard moves are announced (`role="status"`).
- Colour is not the only cue: summaries and milestones have their own shapes.

## Left out

- Link types other than finish-to-start, scheduling (moving the followers), critical path, baselines, resources.
- Drawing a link or a task by drag.
