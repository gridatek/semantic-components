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
import { compactMoney, initials } from '../../shared/format';
import { label } from '../../shared/labels';
import { EmployeesTable } from './employees-table';

type Kind = 'basic' | 'hover' | 'striped' | 'checkbox';

/** The tables page: five tables. */
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
    <app-page-header
      i18n-title="@@tables.tables"
      title="Tables"
      [trail]="[{ label: t.tables }]"
    />

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
                        i18n-aria-label="@@tables.selectAll"
                        scCheckbox
                        aria-label="Select all"
                        [checked]="allChecked()"
                        [indeterminate]="someChecked()"
                        (change)="toggleAll()"
                      />
                    </th>
                  }
                  <th i18n="@@tables.assigned" scTableHeaderCell>Assigned</th>
                  <th i18n="@@tables.project" scTableHeaderCell>Project</th>
                  <th i18n="@@tables.priority" scTableHeaderCell>Priority</th>
                  <th i18n="@@tables.budget" scTableHeaderCell class="text-end">
                    Budget
                  </th>
                  @if (table.kind !== 'basic') {
                    <th
                      i18n="@@tables.actions"
                      scTableHeaderCell
                      class="text-end"
                    >
                      Actions
                    </th>
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
                          [attr.aria-label]="t.select + row.name"
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
                            labelOf(row.role)
                          }}</span>
                        </div>
                      </div>
                    </td>
                    <td scTableCell>{{ row.project }}</td>
                    <td scTableCell>
                      <span scBadge [variant]="badge(row.priority)">{{
                        labelOf(row.priority)
                      }}</span>
                    </td>
                    <td scTableCell class="text-end tabular-nums">
                      {{ compactMoneyOf(row.budget) }}
                    </td>
                    @if (table.kind !== 'basic') {
                      <td scTableCell class="text-end">
                        <button scButton variant="ghost" size="icon-sm">
                          <svg siPencilIcon></svg>
                          <span i18n="@@tables.edit" class="sr-only"
                            >Edit {{ row.name }}</span
                          >
                        </button>
                        <button scButton variant="ghost" size="icon-sm">
                          <svg siTrash2Icon></svg>
                          <span i18n="@@tables.delete" class="sr-only"
                            >Delete {{ row.name }}</span
                          >
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
  /** In the user's numbering system. */
  private readonly compactMoneyOf = compactMoney;

  private readonly labelOf = label;
  /** The template's words that sit in bindings, translated. */
  private readonly t = {
    tables: $localize`:@@tables.tables:Tables`,
    select: $localize`:@@tables.select:Select `,
  };

  private readonly rows = PROJECT_ROWS;
  private readonly tables: readonly { kind: Kind; title: string }[] = [
    { kind: 'basic', title: $localize`:@@tables.basicTable:Basic Table` },
    { kind: 'hover', title: $localize`:@@tables.hoverTable:Hover Table` },
    {
      kind: 'striped',
      title: $localize`:@@tables.stripedRowTable:Striped Row Table`,
    },
    {
      kind: 'checkbox',
      title: $localize`:@@tables.checkboxTable:Checkbox Table`,
    },
  ];
  private readonly initialsOf = initials;

  private readonly checked = signal<readonly number[]>([2]);
  private readonly allChecked = computed(
    () => this.checked().length === this.rows.length,
  );
  private readonly someChecked = computed(
    () => this.checked().length > 0 && !this.allChecked(),
  );

  private toggle(id: number): void {
    this.checked.update((ids) =>
      ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id],
    );
  }

  private toggleAll(): void {
    this.checked.set(this.allChecked() ? [] : this.rows.map((row) => row.id));
  }

  private badge(priority: Priority): 'secondary' | 'outline' | 'destructive' {
    if (priority === 'High') return 'destructive';
    if (priority === 'Medium') return 'outline';
    return 'secondary';
  }
}
