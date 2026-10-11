import { type Signal, computed } from '@angular/core';
import type { DataTableHeadColumn } from './data-table-types';

/** Classes for a pinned header or body cell (`data-pinned="start|end"`). */
export const dataTablePinnedClasses =
  'data-pinned:sticky data-pinned:z-10 data-pinned:bg-background data-[pinned=start]:start-0 data-[pinned=end]:end-0';

/**
 * Pinning state of a cell's column: the logical position, and the inline
 * offset when several columns are pinned to the same side (needs TanStack's
 * column sizing feature; without it, offsets are 0).
 */
export function dataTablePinning(
  column: Signal<DataTableHeadColumn | undefined>,
) {
  const pinned = computed(() => column()?.getIsPinned?.() || false);
  const offsetStart = computed(() =>
    pinned() === 'start' ? (column()?.getStart?.('start') ?? null) : null,
  );
  const offsetEnd = computed(() =>
    pinned() === 'end' ? (column()?.getAfter?.('end') ?? null) : null,
  );
  return { pinned, offsetStart, offsetEnd };
}
