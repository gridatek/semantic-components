import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { UsersTableDemo } from './users-table-demo';

@Component({
  selector: 'app-users-table-demo-container',
  imports: [DemoContainer, UsersTableDemo],
  template: `
    <app-demo-container
      title="Users Table"
      demoUrl="/demos/table/users-table-demo"
      [code]="code"
    >
      <app-users-table-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class UsersTableDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScTable,
  ScTableBody,
  ScTableCell,
  ScTableHeaderCell,
  ScTableHeader,
  ScTableRow,
} from '@semantic-components/ui';

@Component({
  selector: 'app-users-table-demo',
  imports: [
    ScTable,
    ScTableBody,
    ScTableCell,
    ScTableHeaderCell,
    ScTableHeader,
    ScTableRow,
  ],
  template: \`
    <div class="rounded-md border">
      <table scTable>
        <thead scTableHeader>
          <tr scTableRow>
            <th scTableHeaderCell>Name</th>
            <th scTableHeaderCell>Email</th>
            <th scTableHeaderCell>Role</th>
            <th scTableHeaderCell class="text-right">Actions</th>
          </tr>
        </thead>
        <tbody scTableBody>
          <tr scTableRow>
            <td scTableCell>
              <div class="font-medium">John Doe</div>
              <div class="text-sm text-muted-foreground">Engineer</div>
            </td>
            <td scTableCell>john&#64;example.com</td>
            <td scTableCell>
              <span
                class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold"
              >
                Admin
              </span>
            </td>
            <td scTableCell class="text-right">
              <button
                class="text-sm text-muted-foreground hover:text-foreground"
              >
                Edit
              </button>
            </td>
          </tr>
          <tr scTableRow>
            <td scTableCell>
              <div class="font-medium">Jane Smith</div>
              <div class="text-sm text-muted-foreground">Designer</div>
            </td>
            <td scTableCell>jane&#64;example.com</td>
            <td scTableCell>
              <span
                class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold"
              >
                Member
              </span>
            </td>
            <td scTableCell class="text-right">
              <button
                class="text-sm text-muted-foreground hover:text-foreground"
              >
                Edit
              </button>
            </td>
          </tr>
          <tr scTableRow>
            <td scTableCell>
              <div class="font-medium">Bob Johnson</div>
              <div class="text-sm text-muted-foreground">Manager</div>
            </td>
            <td scTableCell>bob&#64;example.com</td>
            <td scTableCell>
              <span
                class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold"
              >
                Owner
              </span>
            </td>
            <td scTableCell class="text-right">
              <button
                class="text-sm text-muted-foreground hover:text-foreground"
              >
                Edit
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersTableDemo {}`;
}
