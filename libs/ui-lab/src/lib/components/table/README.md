# Table

A responsive table component.

## Components

- `ScTable` - Main table element
- `ScTableHeader` - Table header (thead)
- `ScTableBody` - Table body (tbody)
- `ScTableFooter` - Table footer (tfoot)
- `ScTableRow` - Table row (tr)
- `ScTableHeaderCell` - Table header cell (th)
- `ScTableCell` - Table data cell (td)
- `ScTableCaption` - Table caption

## Usage

```html
<table sc-table>
  <thead sc-table-header>
    <tr sc-table-row>
      <th sc-table-header-cell>Column 1</th>
      <th sc-table-header-cell>Column 2</th>
    </tr>
  </thead>
  <tbody sc-table-body>
    <tr sc-table-row>
      <td sc-table-cell>Data 1</td>
      <td sc-table-cell>Data 2</td>
    </tr>
  </tbody>
</table>
```

## With Caption

```html
<table sc-table>
  <caption sc-table-caption>A list of your recent invoices.</caption>
  <thead sc-table-header>
    <!-- ... -->
  </thead>
  <tbody sc-table-body>
    <!-- ... -->
  </tbody>
</table>
```

## With Footer

```html
<table sc-table>
  <thead sc-table-header>
    <!-- ... -->
  </thead>
  <tbody sc-table-body>
    <!-- ... -->
  </tbody>
  <tfoot sc-table-footer>
    <tr sc-table-row>
      <td sc-table-cell colspan="3">Total</td>
      <td sc-table-cell class="text-right">$750.00</td>
    </tr>
  </tfoot>
</table>
```

## With Border Container

```html
<div class="rounded-md border">
  <table sc-table>
    <!-- ... -->
  </table>
</div>
```

## Component Inputs

All table components accept a `class` input for additional CSS classes.

| Component           | Default Styling                                                               |
| ------------------- | ----------------------------------------------------------------------------- |
| `ScTable`           | `w-full caption-bottom text-sm`                                               |
| `ScTableHeader`     | `[&_tr]:border-b`                                                             |
| `ScTableBody`       | `[&_tr:last-child]:border-0`                                                  |
| `ScTableFooter`     | `border-t bg-muted/50 font-medium [&>tr]:last:border-b-0`                     |
| `ScTableRow`        | `border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted` |
| `ScTableHeaderCell` | `h-12 px-4 text-left align-middle font-medium text-muted-foreground`          |
| `ScTableCell`       | `p-4 align-middle`                                                            |
| `ScTableCaption`    | `mt-4 text-sm text-muted-foreground`                                          |

## Features

- Hover state on rows (`hover:bg-muted/50`)
- Selected state support (`data-[state=selected]:bg-muted`)
- Checkbox column support (`[&:has([role=checkbox])]:pr-0`)
- Responsive text sizing

## Accessibility

- Uses native HTML table elements for built-in accessibility
- Screen readers can navigate using table navigation commands
- Caption provides table description
- Header cells associate with data cells
