# Table

A table of data: the native table elements, in the look of the app's preset. For sorting, filtering, selection and pages, use a Data Table.

## Usage

```html
<div scTableContainer>
  <table scTable>
    <caption scTableCaption>
      A list of your recent invoices.
    </caption>
    <thead scTableHeader>
      <tr scTableRow>
        <th scTableHeaderCell>Invoice</th>
        <th scTableHeaderCell class="text-end">Amount</th>
      </tr>
    </thead>
    <tbody scTableBody>
      @for (invoice of invoices; track invoice.id) {
      <tr scTableRow>
        <td scTableCell>{{ invoice.id }}</td>
        <td scTableCell class="text-end">{{ invoice.amount }}</td>
      </tr>
      }
    </tbody>
    <tfoot scTableFooter>
      <tr scTableRow>
        <td scTableCell>Total</td>
        <td scTableCell class="text-end">$2,500.00</td>
      </tr>
    </tfoot>
  </table>
</div>
```

## Anatomy

shadcn's parts, each a directive on the native element, so the table stays a table to screen readers. shadcn's `Table` renders its scrolling wrapper itself; here it is a part of its own (`scTableContainer`), since a directive on `table` cannot add one.

- The caption names the table; header cells name their columns (`scope="row"` for a row's).
- The container scrolls a wide table sideways instead of the page. When it may scroll, make it focusable and name it (`tabindex="0" role="region" aria-label="…"`) so the keyboard reaches what is hidden.
- A row is highlighted on hover, while it holds an expanded control (`aria-expanded`, an open menu) and with `data-state="selected"`.
- Align numbers with `text-end`: it follows the reading direction.

## API reference

Each part takes `class`, merged over the preset.

| Part                | Selector                  | Description                                                                |
| ------------------- | ------------------------- | -------------------------------------------------------------------------- |
| `ScTableContainer`  | `div[scTableContainer]`   | Scrolls a wide table sideways. Framed: add `scFrame`.                      |
| `ScTable`           | `table[scTable]`          | Full width; its text size from the preset.                                 |
| `ScTableCaption`    | `caption[scTableCaption]` | Names the table; shown below it.                                           |
| `ScTableHeader`     | `thead[scTableHeader]`    | The header rows, a line below.                                             |
| `ScTableBody`       | `tbody[scTableBody]`      | The rows; no line below the last.                                          |
| `ScTableFooter`     | `tfoot[scTableFooter]`    | Totals: muted, a line above.                                               |
| `ScTableRow`        | `tr[scTableRow]`          | A line below; highlighted on hover, with an expanded control, or selected. |
| `ScTableHeaderCell` | `th[scTableHeaderCell]`   | Names its column.                                                          |
| `ScTableCell`       | `td[scTableCell]`         | A cell; no padding at the end beside a checkbox.                           |

## Styles

From the preset (`table`): the table's text size (`text-xs` in lyra and mira), the header cell (taller and wider in maia, luma and sera; small uppercase muted in sera), the cell's padding and the caption. A frame round the container is `scFrame` (the preset's `frame`), not the table's. The rest is the same in every style.
