import { type ColumnDef, createColumnHelper } from '@tanstack/angular-table';
import type { User } from './user.service';

const columnHelper = createColumnHelper<User>();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const columns: ColumnDef<User, any>[] = [
  {
    id: 'select',
    header: 'Select',
    enableSorting: false,
    enableColumnFilter: false,
  },
  {
    id: 'expand',
    header: '',
    enableSorting: false,
    enableColumnFilter: false,
  },
  columnHelper.accessor('id', {
    header: 'ID',
    enableColumnFilter: false,
  }),
  columnHelper.accessor('username', {
    header: 'Username',
    enableSorting: true,
    enableColumnFilter: true,
  }),
  columnHelper.accessor('firstName', {
    header: 'First Name',
    enableSorting: true,
    enableColumnFilter: true,
  }),
  columnHelper.accessor('lastName', {
    header: 'Last Name',
    enableSorting: true,
    enableColumnFilter: true,
  }),
  columnHelper.accessor('email', {
    header: 'Email',
    enableSorting: true,
    enableColumnFilter: false,
  }),
  columnHelper.accessor('role', {
    header: 'Role',
    enableSorting: true,
    enableColumnFilter: true,
    enableGrouping: true,
  }),
  columnHelper.accessor('plan', {
    header: 'Plan',
    enableSorting: true,
    enableColumnFilter: true,
    enableGrouping: true,
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    enableSorting: true,
    enableColumnFilter: true,
  }),
  columnHelper.accessor('joinedAt', {
    header: 'Joined',
    enableSorting: true,
    enableColumnFilter: false,
  }),
  columnHelper.accessor('lastLoginAt', {
    header: 'Last Login',
    enableSorting: true,
    enableColumnFilter: false,
  }),
  columnHelper.accessor('storageUsed', {
    header: 'Storage (MB)',
    enableSorting: true,
    enableColumnFilter: false,
    aggregationFn: 'mean',
  }),
  columnHelper.accessor('apiCalls', {
    header: 'API Calls',
    enableSorting: true,
    enableColumnFilter: false,
    aggregationFn: 'sum',
  }),
];
