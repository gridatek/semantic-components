import {
  createColumnHelper,
  createExpandedRowModel,
  injectTable,
  rowExpandingFeature,
  tableFeatures,
} from '@tanstack/angular-table';
import { Dir } from '@angular/cdk/bidi';
import { Component, LOCALE_ID, ViewEncapsulation, signal } from '@angular/core';
import { ScFrame } from '@semantic-components/ui';
import {
  ScDataTableBody,
  ScDataTableCell,
  ScDataTableHeader,
  ScDataTableHeaderCell,
  ScDataTableProvider,
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
    ScDataTableProvider,
    ScFrame,
    Dir,
    ScDataTableRow,
    ScDataTableTreeGrid,
    ScGantt,
    ScGanttBar,
    ScGanttLinks,
    ScGanttScale,
    ScGanttTimeline,
    ScDataTableHeader,
    ScDataTableBody,
    ScDataTableHeaderCell,
    ScDataTableCell,
  ],
  template: `
    <div
      scGantt
      scDataTableProvider
      [table]="table"
      dir="rtl"
      lang="ar"
      [from]="from"
      [to]="to"
      scFrame
    >
      <table scDataTableTreeGrid aria-label="الخطة">
        <thead scDataTableHeader>
          <tr scDataTableRow>
            <th scDataTableHeaderCell class="align-bottom">المهمة</th>
            <th scDataTableHeaderCell scGanttTimeline>
              <span class="sr-only">الجدول الزمني</span>
              <div scGanttScale>
                <svg scGanttLinks></svg>
              </div>
            </th>
          </tr>
        </thead>
        <tbody scDataTableBody>
          @for (row of table.getRowModel().rows; track row.id) {
            <tr scDataTableRow [row]="row">
              <td scDataTableCell>{{ row.original.name }}</td>
              <td scDataTableCell scGanttTimeline>
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
  providers: [{ provide: LOCALE_ID, useValue: 'ar' }],
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlGanttDemo {
  private readonly from = date('2026-10-30');
  private readonly to = date('2026-11-29');

  private readonly tasks = signal(TASKS);

  private readonly table = injectTable(() => ({
    features,
    columns,
    data: this.tasks(),
    getRowId: (task) => task.id,
  }));

  private move(task: Task, dates: ScGanttDates): void {
    this.tasks.update((tasks) =>
      tasks.map((t) => (t.id === task.id ? { ...t, ...dates } : t)),
    );
  }

  private advance(task: Task, progress: number): void {
    this.tasks.update((tasks) =>
      tasks.map((t) => (t.id === task.id ? { ...t, progress } : t)),
    );
  }
}
