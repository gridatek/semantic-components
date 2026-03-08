# Table

A set of directives for building accessible, styled data tables using native HTML table elements.

## Usage

```typescript
import { ScTable, ScTableBody, ScTableCaption, ScTableCell, ScTableFooter, ScTableHeader, ScTableHeaderCell, ScTableRow } from '@semantic-components/ui';
```

```html
<table scTable>
  <caption scTableCaption>A list of recent invoices.</caption>
  <thead scTableHeader>
    <tr scTableRow>
      <th scTableHeaderCell>Invoice</th>
      <th scTableHeaderCell>Status</th>
      <th scTableHeaderCell>Amount</th>
    </tr>
  </thead>
  <tbody scTableBody>
    <tr scTableRow>
      <td scTableCell>INV-001</td>
      <td scTableCell>Paid</td>
      <td scTableCell>$250.00</td>
    </tr>
  </tbody>
  <tfoot scTableFooter>
    <tr scTableRow>
      <td scTableCell colspan="2">Total</td>
      <td scTableCell>$250.00</td>
    </tr>
  </tfoot>
</table>
```

## Components

All directives accept a `class` input for merging additional CSS classes via the `cn` utility.

### ScTable

| Property        | Details                         |
| --------------- | ------------------------------- |
| Selector        | `table[scTable]`                |
| Data attribute  | `data-slot="table"`             |
| Default classes | `w-full caption-bottom text-sm` |

### ScTableHeader

| Property        | Details                    |
| --------------- | -------------------------- |
| Selector        | `thead[scTableHeader]`     |
| Data attribute  | `data-slot="table-header"` |
| Default classes | `[&_tr]:border-b`          |

### ScTableBody

| Property        | Details                      |
| --------------- | ---------------------------- |
| Selector        | `tbody[scTableBody]`         |
| Data attribute  | `data-slot="table-body"`     |
| Default classes | `[&_tr:last-child]:border-0` |

### ScTableFooter

| Property        | Details                                                   |
| --------------- | --------------------------------------------------------- |
| Selector        | `tfoot[scTableFooter]`                                    |
| Data attribute  | `data-slot="table-footer"`                                |
| Default classes | `border-t bg-muted/50 font-medium [&>tr]:last:border-b-0` |

### ScTableRow

| Property        | Details                                                                       |
| --------------- | ----------------------------------------------------------------------------- |
| Selector        | `tr[scTableRow]`                                                              |
| Data attribute  | `data-slot="table-row"`                                                       |
| Default classes | `border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted` |

Rows support a `data-state="selected"` attribute for highlighting selected rows.

### ScTableHeaderCell

| Property        | Details                                                                                            |
| --------------- | -------------------------------------------------------------------------------------------------- |
| Selector        | `th[scTableHeaderCell]`                                                                            |
| Data attribute  | `data-slot="table-header-cell"`                                                                    |
| Default classes | `h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0` |

### ScTableCell

| Property        | Details                                          |
| --------------- | ------------------------------------------------ |
| Selector        | `td[scTableCell]`                                |
| Data attribute  | `data-slot="table-cell"`                         |
| Default classes | `p-4 align-middle [&:has([role=checkbox])]:pr-0` |

### ScTableCaption

| Property        | Details                              |
| --------------- | ------------------------------------ |
| Selector        | `caption[scTableCaption]`            |
| Data attribute  | `data-slot="table-caption"`          |
| Default classes | `mt-4 text-sm text-muted-foreground` |

## Examples

### Selected row

Add `data-state="selected"` to a row to apply the selected background:

```html
<tr scTableRow data-state="selected">
  <td scTableCell>Selected item</td>
</tr>
```

### Row with checkbox

Cells containing a checkbox automatically reduce right padding:

```html
<tr scTableRow>
  <td scTableCell>
    <input type="checkbox" role="checkbox" />
  </td>
  <td scTableCell>Row content</td>
</tr>
```

### Custom class overrides

Pass additional classes via the `class` input:

```html
<table scTable class="rounded-md border">
  <tbody scTableBody>
    <tr scTableRow class="bg-accent">
      <td scTableCell class="font-bold">Custom styled cell</td>
    </tr>
  </tbody>
</table>
```

## Accessibility

- Uses native HTML table elements (`<table>`, `<thead>`, `<tbody>`, `<tfoot>`, `<tr>`, `<th>`, `<td>`, `<caption>`), which provide built-in semantics and screen reader support.
- Use `<caption scTableCaption>` to provide a visible, accessible description of the table's purpose.
- Header cells (`<th scTableHeaderCell>`) are automatically associated with their columns by the browser.
- Use `scope="col"` or `scope="row"` on header cells when the table structure requires disambiguation.
