import type { OrderStatus } from '../data/orders';

export type BadgeVariant = 'default' | 'secondary' | 'outline' | 'destructive';

/** An order's badge: done is quiet, waiting is outlined, cancelled stands out. */
export function orderBadge(status: OrderStatus): BadgeVariant {
  switch (status) {
    case 'Delivered':
      return 'secondary';
    case 'Cancelled':
      return 'destructive';
    case 'Shipped':
      return 'default';
    default:
      return 'outline';
  }
}
