import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScTable,
  ScTableBody,
  ScTableCaption,
  ScTableCell,
  ScTableContainer,
  ScTableHeader,
  ScTableHeaderCell,
  ScTableRow,
} from '@semantic-components/ui';

/** Right to left: the first column on the right, amounts at the end (left). */
@Component({
  selector: 'app-rtl-table-demo',
  imports: [
    ScTable,
    ScTableBody,
    ScTableCaption,
    ScTableCell,
    ScTableContainer,
    ScTableHeader,
    ScTableHeaderCell,
    ScTableRow,
  ],
  template: `
    <div dir="rtl" lang="ar" class="w-full">
      <div scTableContainer>
        <table scTable>
          <caption scTableCaption>
            قائمة بفواتيرك الأخيرة.
          </caption>
          <thead scTableHeader>
            <tr scTableRow>
              <th scTableHeaderCell>الفاتورة</th>
              <th scTableHeaderCell>الحالة</th>
              <th scTableHeaderCell>طريقة الدفع</th>
              <th scTableHeaderCell class="text-end">المبلغ</th>
            </tr>
          </thead>
          <tbody scTableBody>
            @for (invoice of invoices; track invoice.id) {
              <tr scTableRow>
                <td scTableCell class="font-medium">{{ invoice.id }}</td>
                <td scTableCell>{{ invoice.status }}</td>
                <td scTableCell>{{ invoice.method }}</td>
                <td scTableCell class="text-end">{{ invoice.amount }}</td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </div>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlTableDemo {
  protected readonly invoices = [
    {
      id: 'INV001',
      status: 'مدفوعة',
      method: 'بطاقة ائتمان',
      amount: '250.00 $',
    },
    { id: 'INV002', status: 'معلقة', method: 'PayPal', amount: '150.00 $' },
    {
      id: 'INV003',
      status: 'غير مدفوعة',
      method: 'تحويل بنكي',
      amount: '350.00 $',
    },
  ];
}
