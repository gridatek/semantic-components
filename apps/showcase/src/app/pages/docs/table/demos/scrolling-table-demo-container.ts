import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ScrollingTableDemo } from './scrolling-table-demo';

@Component({
  selector: 'app-scrolling-table-demo-container',
  imports: [DemoContainer, ScrollingTableDemo],
  template: `
    <app-demo-container
      title="Scrolling"
      demoUrl="/demos/table/scrolling-table-demo"
      [code]="code"
    >
      <app-scrolling-table-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class ScrollingTableDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScTable,
  ScTableBody,
  ScTableCell,
  ScTableContainer,
  ScTableHeader,
  ScTableHeaderCell,
  ScTableRow,
} from '@semantic-components/ui';

/**
 * Wider than its place: the container scrolls sideways, not the page. A
 * region you can scroll is focusable and named, so the keyboard reaches it.
 */
@Component({
  selector: 'app-scrolling-table-demo',
  imports: [
    ScTable,
    ScTableBody,
    ScTableCell,
    ScTableContainer,
    ScTableHeader,
    ScTableHeaderCell,
    ScTableRow,
  ],
  template: \`
    <div
      scTableContainer
      tabindex="0"
      role="region"
      aria-label="Orders"
      class="max-w-md rounded-md border"
    >
      <table scTable>
        <thead scTableHeader>
          <tr scTableRow>
            <th scTableHeaderCell>Order</th>
            <th scTableHeaderCell>Customer</th>
            <th scTableHeaderCell>Email</th>
            <th scTableHeaderCell>Date</th>
            <th scTableHeaderCell>Status</th>
            <th scTableHeaderCell class="text-end">Amount</th>
          </tr>
        </thead>
        <tbody scTableBody>
          @for (order of orders; track order.id) {
            <tr scTableRow>
              <td scTableCell class="font-medium">{{ order.id }}</td>
              <td scTableCell>{{ order.customer }}</td>
              <td scTableCell>{{ order.email }}</td>
              <td scTableCell>{{ order.date }}</td>
              <td scTableCell>{{ order.status }}</td>
              <td scTableCell class="text-end">{{ order.amount }}</td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ScrollingTableDemo {
  protected readonly orders = [
    {
      id: 'ORD-1042',
      customer: 'Olivia Martin',
      email: 'olivia.martin@example.com',
      date: '2026-10-28',
      status: 'Shipped',
      amount: '$1,999.00',
    },
    {
      id: 'ORD-1043',
      customer: 'Jackson Lee',
      email: 'jackson.lee@example.com',
      date: '2026-10-29',
      status: 'Processing',
      amount: '$39.00',
    },
    {
      id: 'ORD-1044',
      customer: 'Isabella Nguyen',
      email: 'isabella.nguyen@example.com',
      date: '2026-10-30',
      status: 'Delivered',
      amount: '$299.00',
    },
  ];
}`;
}
