import {
  createColumnHelper,
  createExpandedRowModel,
  injectTable,
  rowExpandingFeature,
  tableFeatures,
} from '@tanstack/angular-table';
import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScTable,
  ScTableBody,
  ScTableCell,
  ScTableHeader,
  ScTableHeaderCell,
  ScTableRow,
} from '@semantic-components/ui';
import {
  ScDataTableExpand,
  ScDataTableRow,
  ScDataTableTreeCell,
  ScDataTableTreeGrid,
} from '@semantic-components/ui/data-table';
import {
  ScGantt,
  ScGanttBar,
  type ScGanttDates,
  ScGanttLinks,
  ScGanttMarker,
  ScGanttScale,
  ScGanttTimeline,
} from '@semantic-components/ui/gantt';
import { SiChevronRightIcon } from '@semantic-icons/lucide-icons';

interface Task {
  id: string;
  name: string;
  start: Temporal.PlainDate;
  end: Temporal.PlainDate;
  progress?: number;
  dependsOn?: string[];
  children?: Task[];
}

const date = (text: string) => Temporal.PlainDate.from(text);

/** A parent runs from its first child's start to its last child's end. */
function summarise(tasks: Task[]): Task[] {
  return tasks.map((task) => {
    if (!task.children) return task;
    const children = summarise(task.children);
    const starts = children.map((child) => child.start);
    const ends = children.map((child) => child.end);
    return {
      ...task,
      children,
      start: starts.reduce((a, b) =>
        Temporal.PlainDate.compare(a, b) <= 0 ? a : b,
      ),
      end: ends.reduce((a, b) =>
        Temporal.PlainDate.compare(a, b) >= 0 ? a : b,
      ),
    };
  });
}

/** A copy of the tree with one task changed. */
function update(tasks: Task[], id: string, change: Partial<Task>): Task[] {
  return tasks.map((task) =>
    task.id === id
      ? { ...task, ...change }
      : task.children
        ? { ...task, children: update(task.children, id, change) }
        : task,
  );
}

const PLAN: Task[] = [
  {
    id: 'design',
    name: 'Design',
    start: date('2026-11-02'),
    end: date('2026-11-13'),
    children: [
      {
        id: 'research',
        name: 'Research',
        start: date('2026-11-02'),
        end: date('2026-11-05'),
        progress: 100,
      },
      {
        id: 'wireframes',
        name: 'Wireframes',
        start: date('2026-11-06'),
        end: date('2026-11-10'),
        progress: 60,
        dependsOn: ['research'],
      },
      {
        id: 'review',
        name: 'Design review',
        start: date('2026-11-11'),
        end: date('2026-11-13'),
        progress: 0,
        dependsOn: ['wireframes'],
      },
    ],
  },
  {
    id: 'build',
    name: 'Build',
    start: date('2026-11-16'),
    end: date('2026-11-27'),
    children: [
      {
        id: 'frontend',
        name: 'Front end',
        start: date('2026-11-16'),
        end: date('2026-11-25'),
        progress: 20,
        dependsOn: ['review'],
      },
      {
        id: 'backend',
        name: 'Back end',
        start: date('2026-11-16'),
        end: date('2026-11-27'),
        progress: 10,
        dependsOn: ['review'],
      },
    ],
  },
  {
    id: 'launch',
    name: 'Launch',
    start: date('2026-11-30'),
    end: date('2026-12-02'),
    progress: 0,
    dependsOn: ['frontend', 'backend'],
  },
];

/** Register the TanStack features the table uses: here, rows that open. */
const features = tableFeatures({
  rowExpandingFeature,
  expandedRowModel: createExpandedRowModel(),
});

const columnHelper = createColumnHelper<typeof features, Task>();

const columns = columnHelper.columns([
  columnHelper.accessor('name', { header: 'Task' }),
]);

@Component({
  selector: 'app-basic-gantt-demo',
  imports: [
    ScTable,
    ScTableBody,
    ScTableCell,
    ScTableHeader,
    ScTableHeaderCell,
    ScTableRow,
    ScDataTableExpand,
    ScDataTableRow,
    ScDataTableTreeCell,
    ScDataTableTreeGrid,
    ScGantt,
    ScGanttBar,
    ScGanttLinks,
    ScGanttMarker,
    ScGanttScale,
    ScGanttTimeline,
    SiChevronRightIcon,
  ],
  template: `
    <div scGantt [from]="from" [to]="to" class="rounded-md border">
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
              <td scTableCell>
                <div scDataTableTreeCell [row]="row">
                  <button scDataTableExpand [row]="row">
                    <svg siChevronRightIcon></svg>
                    <span class="sr-only">Open {{ row.original.name }}</span>
                  </button>
                  <span class="truncate">{{ row.original.name }}</span>
                </div>
              </td>
              <td scTableCell scGanttTimeline>
                <div
                  scGanttBar
                  [id]="row.original.id"
                  [start]="row.original.start"
                  [end]="row.original.end"
                  [progress]="row.original.progress"
                  [dependencies]="row.original.dependsOn ?? []"
                  (dateChange)="move(row.original, $event)"
                  (progressChange)="advance(row.original, $event)"
                >
                  {{ row.original.name }}
                </div>
              </td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class BasicGanttDemo {
  readonly from = date('2026-10-30');
  readonly to = date('2026-12-06');
  /** A fixed day, so the demo looks the same any day: use Temporal.Now.plainDateISO(). */
  readonly today = date('2026-11-09');

  readonly tasks = signal(summarise(PLAN));

  readonly table = injectTable(() => ({
    features,
    columns,
    data: this.tasks(),
    getRowId: (task) => task.id,
    getSubRows: (task) => task.children,
    // Moving a bar changes the data: keep the rows open.
    autoResetExpanded: false,
  }));

  constructor() {
    // The whole plan, open.
    this.table.toggleAllRowsExpanded(true);
  }

  /** The bar proposes, the data follows — and the parents with it. */
  move(task: Task, dates: ScGanttDates): void {
    this.tasks.update((tasks) => summarise(update(tasks, task.id, dates)));
  }

  advance(task: Task, progress: number): void {
    this.tasks.update((tasks) => update(tasks, task.id, { progress }));
  }
}
