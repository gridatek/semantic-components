import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';

import { DataTable } from './data-table';

@Component({
  selector: 'app-data-table-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [DataTable],
  host: { class: 'block' },
  template: `
    <div class="container mx-auto px-4 py-10">
      <h1 class="mb-6 text-3xl font-bold">TanStack Table Demo</h1>

      <app-data-table />
    </div>
  `,
})
export default class DataTablePage {}
