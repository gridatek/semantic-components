import {
  createColumnHelper,
  createExpandedRowModel,
  injectTable,
  rowExpandingFeature,
  tableFeatures,
} from '@tanstack/angular-table';
import { Component, ViewEncapsulation, computed, signal } from '@angular/core';
import {
  ScFrame,
  ScToggleGroup,
  ScToggleGroupItem,
} from '@semantic-components/ui';
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
  ScGanttScale,
  type ScGanttScaleUnit,
  ScGanttTimeline,
} from '@semantic-components/ui/gantt';

interface Release {
  id: string;
  name: string;
  start: Temporal.PlainDate;
  end: Temporal.PlainDate;
}

const date = (text: string) => Temporal.PlainDate.from(text);

const RELEASES: Release[] = [
  {
    id: 'alpha',
    name: 'Alpha',
    start: date('2027-01-04'),
    end: date('2027-02-12'),
  },
  {
    id: 'beta',
    name: 'Beta',
    start: date('2027-02-15'),
    end: date('2027-04-02'),
  },
  {
    id: 'rc',
    name: 'Release candidate',
    start: date('2027-04-05'),
    end: date('2027-05-14'),
  },
  {
    id: 'ga',
    name: 'General availability',
    start: date('2027-05-17'),
    end: date('2027-06-25'),
  },
];

const features = tableFeatures({
  rowExpandingFeature,
  expandedRowModel: createExpandedRowModel(),
});

const columnHelper = createColumnHelper<typeof features, Release>();

const columns = columnHelper.columns([
  columnHelper.accessor('name', { header: 'Release' }),
]);

@Component({
  selector: 'app-scales-gantt-demo',
  imports: [
    ScDataTableProvider,
    ScFrame,
    ScToggleGroup,
    ScToggleGroupItem,
    ScDataTableRow,
    ScDataTableTreeGrid,
    ScGantt,
    ScGanttBar,
    ScGanttScale,
    ScGanttTimeline,
    ScDataTableHeader,
    ScDataTableBody,
    ScDataTableHeaderCell,
    ScDataTableCell,
  ],
  template: `
    <div scToggleGroup variant="outline" aria-label="Scale" [(value)]="choice">
      <button scToggleGroupItem value="day">Days</button>
      <button scToggleGroupItem value="week">Weeks</button>
      <button scToggleGroupItem value="month">Months</button>
    </div>
    <div
      scGantt
      scDataTableProvider
      [table]="table"
      [from]="from"
      [to]="to"
      [scale]="scale()"
      scFrame
    >
      <table scDataTableTreeGrid aria-label="Releases">
        <thead scDataTableHeader>
          <tr scDataTableRow>
            <th scDataTableHeaderCell class="align-bottom">Release</th>
            <th scDataTableHeaderCell scGanttTimeline>
              <span class="sr-only">Timeline</span>
              <div scGanttScale></div>
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
                  [start]="row.original.start"
                  [end]="row.original.end"
                  (dateChange)="move(row.original, $event)"
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
  host: { class: 'flex w-full flex-col items-start gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class ScalesGanttDemo {
  private readonly from = date('2027-01-01');
  private readonly to = date('2027-06-30');

  private readonly choice = signal<ScGanttScaleUnit[]>(['week']);
  /** The toggle group can be emptied: weeks then. */
  private readonly scale = computed<ScGanttScaleUnit>(
    () => this.choice()[0] ?? 'week',
  );

  private readonly releases = signal(RELEASES);

  private readonly table = injectTable(() => ({
    features,
    columns,
    data: this.releases(),
    getRowId: (release) => release.id,
  }));

  private move(release: Release, dates: ScGanttDates): void {
    this.releases.update((releases) =>
      releases.map((r) => (r.id === release.id ? { ...r, ...dates } : r)),
    );
  }
}
