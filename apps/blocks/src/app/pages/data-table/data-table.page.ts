import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  ViewEncapsulation,
} from '@angular/core';

import { DataTable } from './data-table';
import { columns } from './data-table-columns';
import type { User } from './user.service';
import { UserService } from './user.service';

@Component({
  selector: 'app-data-table-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [DataTable],
  host: { class: 'block' },
  template: `
    <div class="container mx-auto px-4 py-10">
      <h1 class="mb-6 text-3xl font-bold">TanStack Table Demo</h1>

      <app-data-table
        [columns]="columns"
        [data]="data()"
        (editSave)="onEditSave($event)"
      />
    </div>
  `,
})
export default class DataTablePage {
  private readonly userService = inject(UserService);

  readonly columns = columns;
  readonly data = signal<User[]>(this.userService.getUsers());

  onEditSave(event: { row: User; columnId: string; value: string }): void {
    this.data.set(
      this.userService.updateUser(event.row.id, {
        [event.columnId]: event.value,
      }),
    );
  }
}
