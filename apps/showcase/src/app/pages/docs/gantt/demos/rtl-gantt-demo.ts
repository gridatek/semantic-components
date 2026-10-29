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
  ScDataTableRow,
  ScDataTableTreeGrid,
} from '@semantic-components/ui/data-table';
import {
  ScGantt,
  ScGanttBar,
  type ScGanttDates,
  ScGanttLinks,
  ScGanttScale,
  ScGanttTimeline,
} from '@semantic-components/ui/gantt';

interface Task {
  id: string;
  name: string;
  start: Temporal.PlainDate;
  end: Temporal.PlainDate;
  progress: number;
  dependsOn?: string[];
}

const date = (text: string) => Temporal.PlainDate.from(text);

const TASKS: Task[] = [
  {
    id: 'plan',
    name: 'التخطيط',
    start: date('2026-11-02'),
    end: date('2026-11-06'),
    progress: 100,
  },
  {
    id: 'design',
    name: 'التصميم',
    start: date('2026-11-09'),
    end: date('2026-11-13'),
    progress: 50,
    dependsOn: ['plan'],
  },
  {
    id: 'build',
    name: 'التطوير',
    start: date('2026-11-16'),
    end: date('2026-11-25'),
    progress: 0,
    dependsOn: ['design'],
  },
];

const features = tableFeatures({
  rowExpandingFeature,
  expandedRowModel: createExpandedRowModel(),
});

const columnHelper = createColumnHelper<typeof features, Task>();

const columns = columnHelper.columns([
  columnHelper.accessor('name', { header: 'المهمة' }),
]);

@Component({
  selector: 'app-rtl-gantt-demo',
  imports: [
    ScTable,
    ScTableBody,
    ScTableCell,
    ScTableHeader,
    ScTableHeaderCell,
    ScTableRow,
    ScDataTableRow,
    ScDataTableTreeGrid,
    ScGantt,
    ScGanttBar,
    ScGanttLinks,
    ScGanttScale,
    ScGanttTimeline,
  ],
  template: `
    <div
      scGantt
      dir="rtl"
      lang="ar"
      [from]="from"
      [to]="to"
      class="rounded-md border"
    >
      <table scTable scDataTableTreeGrid [table]="table" aria-label="الخطة">
        <thead scTableHeader>
          <tr scTableRow>
            <th scTableHeaderCell class="align-bottom">المهمة</th>
            <th scTableHeaderCell scGanttTimeline>
              <span class="sr-only">الجدول الزمني</span>
              <div scGanttScale>
                <svg scGanttLinks></svg>
              </div>
            </th>
          </tr>
        </thead>
        <tbody scTableBody>
          @for (row of table.getRowModel().rows; track row.id) {
            <tr scTableRow scDataTableRow [row]="row">
              <td scTableCell>{{ row.original.name }}</td>
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
export class RtlGanttDemo {
  readonly from = date('2026-10-30');
  readonly to = date('2026-11-29');

  readonly tasks = signal(TASKS);

  readonly table = injectTable(() => ({
    features,
    columns,
    data: this.tasks(),
    getRowId: (task) => task.id,
  }));

  move(task: Task, dates: ScGanttDates): void {
    this.tasks.update((tasks) =>
      tasks.map((t) => (t.id === task.id ? { ...t, ...dates } : t)),
    );
  }

  advance(task: Task, progress: number): void {
    this.tasks.update((tasks) =>
      tasks.map((t) => (t.id === task.id ? { ...t, progress } : t)),
    );
  }
}
