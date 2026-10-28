import { createColumnHelper } from '@tanstack/angular-table';
import type { DataTableFeatures } from './data-table-features';
import type { User } from './user.service';

const columnHelper = createColumnHelper<DataTableFeatures, User>();

export const columns = columnHelper.columns([
  columnHelper.display({
    id: 'select',
    header: $localize`:@@dataTable.column.select:Select`,
    enableSorting: false,
    enableColumnFilter: false,
  }),
  columnHelper.display({
    id: 'expand',
    header: '',
    enableSorting: false,
    enableColumnFilter: false,
  }),
  columnHelper.accessor('id', {
    header: $localize`:@@dataTable.column.id:ID`,
    enableColumnFilter: false,
  }),
  columnHelper.accessor('username', {
    header: $localize`:@@dataTable.column.username:Username`,
    enableSorting: true,
    enableColumnFilter: true,
  }),
  columnHelper.accessor('firstName', {
    header: $localize`:@@dataTable.column.firstName:First Name`,
    enableSorting: true,
    enableColumnFilter: true,
  }),
  columnHelper.accessor('lastName', {
    header: $localize`:@@dataTable.column.lastName:Last Name`,
    enableSorting: true,
    enableColumnFilter: true,
  }),
  columnHelper.accessor('email', {
    header: $localize`:@@dataTable.column.email:Email`,
    enableSorting: true,
    enableColumnFilter: false,
  }),
  columnHelper.accessor('role', {
    header: $localize`:@@dataTable.column.role:Role`,
    enableSorting: true,
    enableColumnFilter: true,
    enableGrouping: true,
  }),
  columnHelper.accessor('plan', {
    header: $localize`:@@dataTable.column.plan:Plan`,
    enableSorting: true,
    enableColumnFilter: true,
    enableGrouping: true,
  }),
  columnHelper.accessor('status', {
    header: $localize`:@@dataTable.column.status:Status`,
    enableSorting: true,
    enableColumnFilter: true,
  }),
  columnHelper.accessor('joinedAt', {
    header: $localize`:@@dataTable.column.joined:Joined`,
    enableSorting: true,
    enableColumnFilter: false,
  }),
  columnHelper.accessor('lastLoginAt', {
    header: $localize`:@@dataTable.column.lastLogin:Last Login`,
    enableSorting: true,
    enableColumnFilter: false,
  }),
  columnHelper.accessor('storageUsed', {
    header: $localize`:@@dataTable.column.storage:Storage (MB)`,
    enableSorting: true,
    enableColumnFilter: false,
    aggregationFn: 'mean',
  }),
  columnHelper.accessor('apiCalls', {
    header: $localize`:@@dataTable.column.apiCalls:API Calls`,
    enableSorting: true,
    enableColumnFilter: false,
    aggregationFn: 'sum',
  }),
]);
