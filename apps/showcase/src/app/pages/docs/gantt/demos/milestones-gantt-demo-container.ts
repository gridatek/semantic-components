import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { MilestonesGanttDemo } from './milestones-gantt-demo';

@Component({
  selector: 'app-milestones-gantt-demo-container',
  imports: [DemoContainer, MilestonesGanttDemo],
  template: `
    <app-demo-container
      title="Milestones, Read Only"
      demoUrl="/demos/gantt/milestones-gantt-demo"
      [code]="code"
    >
      <app-milestones-gantt-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class MilestonesGanttDemoContainer {
  private readonly code = `import {
  createColumnHelper,
  createExpandedRowModel,
  injectTable,
  rowExpandingFeature,
  tableFeatures,
} from '@tanstack/angular-table';
import { Component, ViewEncapsulation } from '@angular/core';
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
  ScGanttLinks,
  ScGanttMarker,
  ScGanttScale,
  ScGanttTimeline,
} from '@semantic-components/ui/gantt';

interface Step {
  id: string;
  name: string;
  owner: string;
  start: Temporal.PlainDate;
  end: Temporal.PlainDate;
  milestone?: boolean;
  dependsOn?: string[];
}

const date = (text: string) => Temporal.PlainDate.from(text);

const STEPS: Step[] = [
  {
    id: 'kickoff',
    name: 'Kick-off',
    owner: 'Ada',
    start: date('2026-11-02'),
    end: date('2026-11-02'),
    milestone: true,
  },
  {
    id: 'spec',
    name: 'Specification',
    owner: 'Grace',
    start: date('2026-11-03'),
    end: date('2026-11-09'),
    dependsOn: ['kickoff'],
  },
  {
    id: 'sign-off',
    name: 'Sign-off',
    owner: 'Ada',
    start: date('2026-11-10'),
    end: date('2026-11-10'),
    milestone: true,
    dependsOn: ['spec'],
  },
  {
    id: 'pilot',
    name: 'Pilot',
    owner: 'Alan',
    start: date('2026-11-11'),
    end: date('2026-11-20'),
    dependsOn: ['sign-off'],
  },
  {
    id: 'go-live',
    name: 'Go-live',
    owner: 'Ada',
    start: date('2026-11-23'),
    end: date('2026-11-23'),
    milestone: true,
    dependsOn: ['pilot'],
  },
];

const features = tableFeatures({
  rowExpandingFeature,
  expandedRowModel: createExpandedRowModel(),
});

const columnHelper = createColumnHelper<typeof features, Step>();

const columns = columnHelper.columns([
  columnHelper.accessor('name', { header: 'Step' }),
  columnHelper.accessor('owner', { header: 'Owner' }),
]);

@Component({
  selector: 'app-milestones-gantt-demo',
  imports: [
    ScDataTableProvider,
    ScFrame,
    ScDataTableRow,
    ScDataTableTreeGrid,
    ScGantt,
    ScGanttBar,
    ScGanttLinks,
    ScGanttMarker,
    ScGanttScale,
    ScGanttTimeline,
    ScDataTableHeader,
    ScDataTableBody,
    ScDataTableHeaderCell,
    ScDataTableCell,
  ],
  template: \`
    <div
      scGantt
      scDataTableProvider
      [table]="table"
      readonly
      [from]="from"
      [to]="to"
      scFrame
    >
      <table scDataTableTreeGrid aria-label="Rollout">
        <thead scDataTableHeader>
          <tr scDataTableRow>
            <th scDataTableHeaderCell class="align-bottom">Step</th>
            <th scDataTableHeaderCell class="align-bottom">Owner</th>
            <th scDataTableHeaderCell scGanttTimeline>
              <span class="sr-only">Timeline</span>
              <div scGanttScale>
                <svg scGanttLinks></svg>
                <div scGanttMarker [date]="freeze">Code freeze</div>
              </div>
            </th>
          </tr>
        </thead>
        <tbody scDataTableBody>
          @for (row of table.getRowModel().rows; track row.id) {
            <tr scDataTableRow [row]="row">
              <td scDataTableCell>{{ row.original.name }}</td>
              <td scDataTableCell>{{ row.original.owner }}</td>
              <td scDataTableCell scGanttTimeline>
                <div
                  scGanttBar
                  [id]="row.original.id"
                  [start]="row.original.start"
                  [end]="row.original.end"
                  [milestone]="!!row.original.milestone"
                  [dependencies]="row.original.dependsOn ?? []"
                >
                  {{ row.original.name }}
                </div>
              </td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  \`,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class MilestonesGanttDemo {
  private readonly from = date('2026-10-30');
  private readonly to = date('2026-11-27');
  private readonly freeze = date('2026-11-18');

  private readonly table = injectTable(() => ({
    features,
    columns,
    data: STEPS,
    getRowId: (step) => step.id,
  }));
}`;
}
