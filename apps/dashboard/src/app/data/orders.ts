/** The shop's orders and customers: the eCommerce dashboard, Orders, Customers. */

export type OrderStatus =
  'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';

export interface Order {
  readonly id: string;
  readonly customerId: number;
  readonly productId: number;
  readonly quantity: number;
  readonly total: number;
  readonly date: string;
  readonly status: OrderStatus;
  readonly payment: 'Card' | 'PayPal' | 'Bank transfer';
}

export const ORDER_STATUSES: readonly OrderStatus[] = [
  'Pending',
  'Processing',
  'Shipped',
  'Delivered',
  'Cancelled',
];

const o = (
  n: number,
  customerId: number,
  productId: number,
  quantity: number,
  total: number,
  date: string,
  status: OrderStatus,
  payment: Order['payment'] = 'Card',
): Order => ({
  id: `#${3200 + n}`,
  customerId,
  productId,
  quantity,
  total,
  date,
  status,
  payment,
});

export const ORDERS: readonly Order[] = [
  o(28, 2, 4, 1, 249, '2026-04-28', 'Pending'),
  o(27, 6, 10, 2, 64, '2026-04-27', 'Processing', 'PayPal'),
  o(26, 3, 3, 3, 48, '2026-04-26', 'Shipped'),
  o(25, 8, 6, 1, 129, '2026-04-25', 'Delivered', 'PayPal'),
  o(24, 4, 7, 1, 98, '2026-04-24', 'Delivered'),
  o(23, 5, 5, 2, 118, '2026-04-22', 'Cancelled', 'Bank transfer'),
  o(22, 9, 1, 1, 18, '2026-04-21', 'Delivered'),
  o(21, 10, 9, 4, 96, '2026-04-20', 'Shipped', 'PayPal'),
  o(20, 7, 8, 1, 45, '2026-04-18', 'Delivered'),
  o(19, 2, 11, 5, 60, '2026-04-17', 'Delivered'),
  o(18, 3, 4, 1, 249, '2026-04-15', 'Delivered', 'Bank transfer'),
  o(17, 6, 2, 2, 44, '2026-04-14', 'Processing'),
  o(16, 8, 3, 1, 16, '2026-04-12', 'Delivered'),
  o(15, 4, 10, 1, 32, '2026-04-10', 'Shipped', 'PayPal'),
  o(14, 9, 6, 1, 129, '2026-04-08', 'Delivered'),
  o(13, 5, 9, 2, 48, '2026-04-06', 'Delivered'),
];

export interface Customer {
  readonly personId: number;
  readonly orders: number;
  readonly spent: number;
  readonly since: string;
  readonly status: 'Active' | 'Inactive' | 'VIP';
}

export const CUSTOMERS: readonly Customer[] = [
  { personId: 2, orders: 14, spent: 2840, since: '2024-03-12', status: 'VIP' },
  { personId: 3, orders: 6, spent: 760, since: '2025-01-08', status: 'Active' },
  {
    personId: 4,
    orders: 9,
    spent: 1120,
    since: '2024-11-21',
    status: 'Active',
  },
  {
    personId: 5,
    orders: 2,
    spent: 166,
    since: '2025-09-30',
    status: 'Inactive',
  },
  { personId: 6, orders: 11, spent: 1930, since: '2024-06-02', status: 'VIP' },
  { personId: 7, orders: 4, spent: 310, since: '2025-04-17', status: 'Active' },
  {
    personId: 8,
    orders: 8,
    spent: 1405,
    since: '2024-08-25',
    status: 'Active',
  },
  {
    personId: 9,
    orders: 3,
    spent: 240,
    since: '2025-12-03',
    status: 'Inactive',
  },
  {
    personId: 10,
    orders: 7,
    spent: 890,
    since: '2025-02-14',
    status: 'Active',
  },
];
