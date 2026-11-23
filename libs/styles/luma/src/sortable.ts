import type { ScSortableStyles } from '@semantic-components/styles';

// Ours (shadcn has no sortable), in luma: an item's moments — dragged
// (raised), lifted by the keyboard (the focus ring's colour), just dropped.
export const sortable: ScSortableStyles = {
  dragging: 'shadow-xl',
  lifted: 'ring-2 ring-primary shadow-md',
  dropped: 'bg-accent',
};
