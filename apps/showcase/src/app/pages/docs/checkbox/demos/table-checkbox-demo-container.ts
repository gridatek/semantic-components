import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { TableCheckboxDemo } from './table-checkbox-demo';

@Component({
  selector: 'app-table-checkbox-demo-container',
  imports: [DemoContainer, TableCheckboxDemo],
  template: `
    <app-demo-container
      title="Table"
      demoUrl="/demos/checkbox/table-checkbox-demo"
      [code]="code"
    >
      <app-table-checkbox-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class TableCheckboxDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, computed, signal } from '@angular/core';
import {
  ScCheckbox,
  ScTable,
  ScTableBody,
  ScTableCell,
  ScTableContainer,
  ScTableHeader,
  ScTableHeaderCell,
  ScTableRow,
} from '@semantic-components/ui';

/** Rows picked in a table, and all of them from the header: half-ticked when some are. */
@Component({
  selector: 'app-table-checkbox-demo',
  imports: [
    ScCheckbox,
    ScTable,
    ScTableBody,
    ScTableCell,
    ScTableContainer,
    ScTableHeader,
    ScTableHeaderCell,
    ScTableRow,
  ],
  template: \`
    <div scTableContainer class="w-full max-w-2xl">
      <table scTable>
        <thead scTableHeader>
          <tr scTableRow>
            <th scTableHeaderCell class="w-8">
              <input
                scCheckbox
                aria-label="Select all"
                [checked]="allSelected()"
                [indeterminate]="someSelected()"
                (checkedChange)="selectAll($event)"
              />
            </th>
            <th scTableHeaderCell>Name</th>
            <th scTableHeaderCell>Email</th>
            <th scTableHeaderCell>Role</th>
          </tr>
        </thead>
        <tbody scTableBody>
          @for (row of rows; track row.id) {
            <tr
              scTableRow
              [attr.data-state]="selected().has(row.id) ? 'selected' : null"
            >
              <td scTableCell>
                <input
                  scCheckbox
                  [attr.aria-label]="'Select ' + row.name"
                  [checked]="selected().has(row.id)"
                  (checkedChange)="select(row.id, $event)"
                />
              </td>
              <td scTableCell class="font-medium">{{ row.name }}</td>
              <td scTableCell>{{ row.email }}</td>
              <td scTableCell>{{ row.role }}</td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class TableCheckboxDemo {
  protected readonly rows = [
    {
      id: '1',
      name: 'Sarah Chen',
      email: 'sarah.chen@example.com',
      role: 'Admin',
    },
    {
      id: '2',
      name: 'Marcus Rodriguez',
      email: 'marcus.rodriguez@example.com',
      role: 'User',
    },
    {
      id: '3',
      name: 'Priya Patel',
      email: 'priya.patel@example.com',
      role: 'User',
    },
    {
      id: '4',
      name: 'David Kim',
      email: 'david.kim@example.com',
      role: 'Editor',
    },
  ];
  protected readonly selected = signal(new Set(['1']));
  protected readonly allSelected = computed(
    () => this.selected().size === this.rows.length,
  );
  protected readonly someSelected = computed(
    () => this.selected().size > 0 && !this.allSelected(),
  );

  protected selectAll(checked: boolean): void {
    this.selected.set(new Set(checked ? this.rows.map((row) => row.id) : []));
  }

  protected select(id: string, checked: boolean): void {
    const selected = new Set(this.selected());
    if (checked) selected.add(id);
    else selected.delete(id);
    this.selected.set(selected);
  }
}`;
}
