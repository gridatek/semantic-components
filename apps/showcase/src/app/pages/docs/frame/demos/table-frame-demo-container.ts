import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { TableFrameDemo } from './table-frame-demo';

@Component({
  selector: 'app-table-frame-demo-container',
  imports: [DemoContainer, TableFrameDemo],
  template: `
    <app-demo-container
      title="Table"
      demoUrl="/demos/frame/table-frame-demo"
      [code]="code"
    >
      <app-table-frame-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class TableFrameDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScFrame,
  ScTable,
  ScTableBody,
  ScTableCell,
  ScTableContainer,
  ScTableHeader,
  ScTableHeaderCell,
  ScTableRow,
} from '@semantic-components/ui';

/** A framed table: the frame round its container, which still scrolls. */
@Component({
  selector: 'app-table-frame-demo',
  imports: [
    ScFrame,
    ScTable,
    ScTableBody,
    ScTableCell,
    ScTableContainer,
    ScTableHeader,
    ScTableHeaderCell,
    ScTableRow,
  ],
  template: \`
    <div scTableContainer scFrame class="w-full max-w-md">
      <table scTable>
        <thead scTableHeader>
          <tr scTableRow>
            <th scTableHeaderCell>Plan</th>
            <th scTableHeaderCell>Seats</th>
            <th scTableHeaderCell class="text-end">Price</th>
          </tr>
        </thead>
        <tbody scTableBody>
          @for (plan of plans; track plan.name) {
            <tr scTableRow>
              <td scTableCell class="font-medium">{{ plan.name }}</td>
              <td scTableCell>{{ plan.seats }}</td>
              <td scTableCell class="text-end">{{ plan.price }}</td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class TableFrameDemo {
  protected readonly plans = [
    { name: 'Starter', seats: '1', price: '$0' },
    { name: 'Team', seats: '10', price: '$49' },
    { name: 'Business', seats: '50', price: '$199' },
  ];
}`;
}
