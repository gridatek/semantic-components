import {
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
} from '@semantic-components/ui-lab';

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
  template: `
    <div class="rounded-md border">
      <table sc-table>
        <thead sc-table-header>
          <tr sc-table-row>
            <th sc-table-header-cell>Name</th>
            <th sc-table-header-cell>Email</th>
            <th sc-table-header-cell>Role</th>
            <th sc-table-header-cell class="text-right">Actions</th>
          </tr>
        </thead>
        <tbody sc-table-body>
          <tr sc-table-row>
            <td sc-table-cell>
              <div class="font-medium">John Doe</div>
              <div class="text-sm text-muted-foreground">Engineer</div>
            </td>
            <td sc-table-cell>john&#64;example.com</td>
            <td sc-table-cell>
              <span
                class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold"
              >
                Admin
              </span>
            </td>
            <td sc-table-cell class="text-right">
              <button
                class="text-sm text-muted-foreground hover:text-foreground"
              >
                Edit
              </button>
            </td>
          </tr>
          <tr sc-table-row>
            <td sc-table-cell>
              <div class="font-medium">Jane Smith</div>
              <div class="text-sm text-muted-foreground">Designer</div>
            </td>
            <td sc-table-cell>jane&#64;example.com</td>
            <td sc-table-cell>
              <span
                class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold"
              >
                Member
              </span>
            </td>
            <td sc-table-cell class="text-right">
              <button
                class="text-sm text-muted-foreground hover:text-foreground"
              >
                Edit
              </button>
            </td>
          </tr>
          <tr sc-table-row>
            <td sc-table-cell>
              <div class="font-medium">Bob Johnson</div>
              <div class="text-sm text-muted-foreground">Manager</div>
            </td>
            <td sc-table-cell>bob&#64;example.com</td>
            <td sc-table-cell>
              <span
                class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold"
              >
                Owner
              </span>
            </td>
            <td sc-table-cell class="text-right">
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
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersTableDemo {}
