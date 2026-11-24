import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { PinnedDataTableDemo } from './pinned-data-table-demo';

@Component({
  selector: 'app-pinned-data-table-demo-container',
  imports: [DemoContainer, PinnedDataTableDemo],
  template: `
    <app-demo-container
      title="Pinned Columns"
      demoUrl="/demos/data-table/pinned-data-table-demo"
      [code]="code"
    >
      <app-pinned-data-table-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class PinnedDataTableDemoContainer {
  private readonly code = `import {
  columnPinningFeature,
  createColumnHelper,
  injectTable,
  tableFeatures,
} from '@tanstack/angular-table';
import { Component, ViewEncapsulation } from '@angular/core';
import { ScBadge, ScButton, ScFrame } from '@semantic-components/ui';
import {
  ScDataTable,
  ScDataTableBody,
  ScDataTableCell,
  ScDataTableContainer,
  ScDataTableHeader,
  ScDataTableHeaderCell,
  ScDataTableRow,
} from '@semantic-components/ui/data-table';
import { SiEllipsisIcon } from '@semantic-icons/lucide-icons';

interface Employee {
  id: string;
  name: string;
  email: string;
  role: string;
  team: string;
  office: string;
  phone: string;
  status: 'Active' | 'Away';
}

const features = tableFeatures({ columnPinningFeature });

const columnHelper = createColumnHelper<typeof features, Employee>();

const columns = columnHelper.columns([
  columnHelper.accessor('name', { header: 'Name' }),
  columnHelper.accessor('email', { header: 'Email' }),
  columnHelper.accessor('role', { header: 'Role' }),
  columnHelper.accessor('team', { header: 'Team' }),
  columnHelper.accessor('office', { header: 'Office' }),
  columnHelper.accessor('phone', { header: 'Phone' }),
  columnHelper.accessor('status', { header: 'Status' }),
  columnHelper.display({ id: 'actions' }),
]);

/** The name pinned to the start and the actions to the end: they stay while the rest scrolls sideways. */
@Component({
  selector: 'app-pinned-data-table-demo',
  imports: [
    ScBadge,
    ScButton,
    ScFrame,
    ScDataTable,
    ScDataTableBody,
    ScDataTableCell,
    ScDataTableContainer,
    ScDataTableHeader,
    ScDataTableHeaderCell,
    ScDataTableRow,
    SiEllipsisIcon,
  ],
  template: \`
    <div
      scDataTableContainer
      scFrame
      tabindex="0"
      role="region"
      aria-label="Employees"
      class="max-w-xl"
    >
      <table scDataTable>
        <thead scDataTableHeader>
          @for (group of table.getHeaderGroups(); track group.id) {
            <tr scDataTableRow>
              @for (header of group.headers; track header.id) {
                <th scDataTableHeaderCell [column]="header.column">
                  @if (header.column.id === 'actions') {
                    <span class="sr-only">Actions</span>
                  } @else {
                    {{ header.column.columnDef.header }}
                  }
                </th>
              }
            </tr>
          }
        </thead>
        <tbody scDataTableBody>
          @for (row of table.getRowModel().rows; track row.id) {
            <tr scDataTableRow [row]="row">
              @for (cell of row.getAllCells(); track cell.id) {
                <td scDataTableCell [column]="cell.column">
                  @switch (cell.column.id) {
                    @case ('name') {
                      <span class="font-medium">{{ row.original.name }}</span>
                    }
                    @case ('status') {
                      <span
                        scBadge
                        [variant]="
                          row.original.status === 'Active'
                            ? 'secondary'
                            : 'outline'
                        "
                      >
                        {{ row.original.status }}
                      </span>
                    }
                    @case ('actions') {
                      <button scButton variant="ghost" size="icon-sm">
                        <svg siEllipsisIcon></svg>
                        <span class="sr-only">
                          {{ 'Actions for ' + row.original.name }}
                        </span>
                      </button>
                    }
                    @default {
                      {{ cell.getValue() }}
                    }
                  }
                </td>
              }
            </tr>
          }
        </tbody>
      </table>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class PinnedDataTableDemo {
  private readonly table = injectTable(() => ({
    features,
    columns,
    data: EMPLOYEES,
    getRowId: (employee) => employee.id,
    initialState: { columnPinning: { start: ['name'], end: ['actions'] } },
  }));
}

const EMPLOYEES: Employee[] = [
  {
    id: '1',
    name: 'Olivia Martin',
    email: 'olivia.martin@example.com',
    role: 'Engineer',
    team: 'Platform',
    office: 'Lisbon',
    phone: '+351 912 345 678',
    status: 'Active',
  },
  {
    id: '2',
    name: 'Jackson Lee',
    email: 'jackson.lee@example.com',
    role: 'Designer',
    team: 'Product',
    office: 'Toronto',
    phone: '+1 416 555 0134',
    status: 'Away',
  },
  {
    id: '3',
    name: 'Isabella Nguyen',
    email: 'isabella.nguyen@example.com',
    role: 'Manager',
    team: 'Sales',
    office: 'Singapore',
    phone: '+65 6123 4567',
    status: 'Active',
  },
  {
    id: '4',
    name: 'William Kim',
    email: 'will.kim@example.com',
    role: 'Engineer',
    team: 'Data',
    office: 'Seoul',
    phone: '+82 2 555 0198',
    status: 'Active',
  },
  {
    id: '5',
    name: 'Sofia Davis',
    email: 'sofia.davis@example.com',
    role: 'Analyst',
    team: 'Finance',
    office: 'Berlin',
    phone: '+49 30 5550 1234',
    status: 'Away',
  },
];`;
}
