import {
  aggregationFn_mean,
  aggregationFn_sum,
  columnFilteringFeature,
  columnGroupingFeature,
  columnPinningFeature,
  columnVisibilityFeature,
  createExpandedRowModel,
  createFilteredRowModel,
  createGroupedRowModel,
  createPaginatedRowModel,
  createSortedRowModel,
  filterFn_inNumberRange,
  filterFn_includesString,
  globalFilteringFeature,
  rowAggregationFeature,
  rowExpandingFeature,
  rowPaginationFeature,
  rowPinningFeature,
  rowSelectionFeature,
  rowSortingFeature,
  sortFn_alphanumeric,
  sortFn_datetime,
  sortFn_text,
  tableFeatures,
} from '@tanstack/angular-table';

/**
 * Every table feature the data table uses (TanStack only exposes registered
 * features). Prerequisites come before what depends on them.
 */
export const features = tableFeatures({
  columnFilteringFeature,
  globalFilteringFeature,
  rowSortingFeature,
  rowPaginationFeature,
  columnVisibilityFeature,
  rowSelectionFeature,
  rowExpandingFeature,
  columnGroupingFeature,
  rowAggregationFeature,
  columnPinningFeature,
  rowPinningFeature,

  filteredRowModel: createFilteredRowModel(),
  sortedRowModel: createSortedRowModel(),
  groupedRowModel: createGroupedRowModel(),
  expandedRowModel: createExpandedRowModel(),
  paginatedRowModel: createPaginatedRowModel(),

  // The built-ins resolved by `'auto'` for this data, and the named
  // aggregations used by the columns.
  filterFns: {
    includesString: filterFn_includesString,
    inNumberRange: filterFn_inNumberRange,
  },
  sortFns: {
    alphanumeric: sortFn_alphanumeric,
    text: sortFn_text,
    datetime: sortFn_datetime,
  },
  aggregationFns: { mean: aggregationFn_mean, sum: aggregationFn_sum },
});

export type DataTableFeatures = typeof features;
