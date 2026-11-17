import { Component, ViewEncapsulation, computed, signal } from '@angular/core';
import {
  ScAvatar,
  ScAvatarFallback,
  ScAvatarImage,
  ScBadge,
  ScButton,
  ScCard,
  ScCardBody,
  ScCardHeader,
  ScCardTitle,
  ScCheckbox,
  ScTable,
  ScTableBody,
  ScTableCell,
  ScTableContainer,
  ScTableHeader,
  ScTableHeaderCell,
  ScTableRow,
} from '@semantic-components/ui';
import { SiPencilIcon, SiTrash2Icon } from '@semantic-icons/lucide-icons';
import { PROJECT_ROWS, type Priority } from '../../data/tables';
import { PageHeader } from '../../layout/page-header';
import { initials } from '../../shared/format';
import { EmployeesTable } from './employees-table';

type Kind = 'basic' | 'hover' | 'striped' | 'checkbox';

/** The tables page: shadcndashboard's five tables. */
@Component({
  selector: 'app-tables-page',
  imports: [
    ScAvatar,
    ScAvatarFallback,
    ScAvatarImage,
    ScBadge,
    ScButton,
    ScCard,
    ScCardBody,
    ScCardHeader,
    ScCardTitle,
    ScCheckbox,
    ScTable,
    ScTableBody,
    ScTableCell,
    ScTableContainer,
    ScTableHeader,
    ScTableHeaderCell,
    ScTableRow,
    SiPencilIcon,
    SiTrash2Icon,
    PageHeader,
    EmployeesTable,
  ],
  template: `
    <app-page-header title="Tables" [trail]="[{ label: 'Tables' }]" />

    @for (table of tables; track table.kind) {
      @if (table.kind === 'hover') {
        <app-employees-table />
      }
      <div scCard>
        <div scCardHeader>
          <h2 scCardTitle [id]="table.kind + '-title'">{{ table.title }}</h2>
        </div>
        <div scCardBody>
          <div scTableContainer>
            <table scTable>
              <thead scTableHeader>
                <tr scTableRow>
                  @if (table.kind === 'checkbox') {
                    <th scTableHeaderCell class="w-10">
                      <input
                        scCheckbox
                        aria-label="Select all"
                        [checked]="allChecked()"
                        [indeterminate]="someChecked()"
                        (change)="toggleAll()"
                      />
                    </th>
                  }
                  <th scTableHeaderCell>Assigned</th>
                  <th scTableHeaderCell>Project</th>
                  <th scTableHeaderCell>Priority</th>
                  <th scTableHeaderCell class="text-end">Budget</th>
                  @if (table.kind !== 'basic') {
                    <th scTableHeaderCell class="text-end">Actions</th>
                  }
                </tr>
              </thead>
              <tbody scTableBody>
                @for (row of rows; track row.id; let odd = $odd) {
                  <tr
                    scTableRow
                    [class.bg-muted]="table.kind === 'striped' && odd"
                    [attr.data-state]="
                      table.kind === 'checkbox' && checked().includes(row.id)
                        ? 'selected'
                        : null
                    "
                  >
                    @if (table.kind === 'checkbox') {
                      <td scTableCell>
                        <input
                          scCheckbox
                          [attr.aria-label]="'Select ' + row.name"
                          [checked]="checked().includes(row.id)"
                          (change)="toggle(row.id)"
                        />
                      </td>
                    }
                    <td scTableCell>
                      <div class="flex items-center gap-3">
                        <span scAvatar class="size-8">
                          <img scAvatarImage [src]="row.avatar" alt="" />
                          <span scAvatarFallback>{{
                            initialsOf(row.name)
                          }}</span>
                        </span>
                        <div class="flex flex-col">
                          <span class="font-medium">{{ row.name }}</span>
                          <span class="text-muted-foreground text-xs">{{
                            row.role
                          }}</span>
                        </div>
                      </div>
                    </td>
                    <td scTableCell>{{ row.project }}</td>
                    <td scTableCell>
                      <span scBadge [variant]="badge(row.priority)">{{
                        row.priority
                      }}</span>
                    </td>
                    <td scTableCell class="text-end tabular-nums">
                      \${{ row.budget }}
                    </td>
                    @if (table.kind !== 'basic') {
                      <td scTableCell class="text-end">
                        <button scButton variant="ghost" size="icon-sm">
                          <svg siPencilIcon></svg>
                          <span class="sr-only">Edit {{ row.name }}</span>
                        </button>
                        <button scButton variant="ghost" size="icon-sm">
                          <svg siTrash2Icon></svg>
                          <span class="sr-only">Delete {{ row.name }}</span>
                        </button>
                      </td>
                    }
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    }
  `,
  host: { class: 'flex flex-col gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class TablesPage {
  protected readonly rows = PROJECT_ROWS;
  protected readonly tables: readonly { kind: Kind; title: string }[] = [
    { kind: 'basic', title: 'Basic Table' },
    { kind: 'hover', title: 'Hover Table' },
    { kind: 'striped', title: 'Striped Row Table' },
    { kind: 'checkbox', title: 'Checkbox Table' },
  ];
  protected readonly initialsOf = initials;

  protected readonly checked = signal<readonly number[]>([2]);
  protected readonly allChecked = computed(
    () => this.checked().length === this.rows.length,
  );
  protected readonly someChecked = computed(
    () => this.checked().length > 0 && !this.allChecked(),
  );

  protected toggle(id: number): void {
    this.checked.update((ids) =>
      ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id],
    );
  }

  protected toggleAll(): void {
    this.checked.set(this.allChecked() ? [] : this.rows.map((row) => row.id));
  }

  protected badge(priority: Priority): 'secondary' | 'outline' | 'destructive' {
    if (priority === 'High') return 'destructive';
    if (priority === 'Medium') return 'outline';
    return 'secondary';
  }
}
