/**
 * The words the data holds as values — statuses, categories, roles, plans —
 * translated where they're shown. The data keeps its English values (the
 * code compares them); `label(value)` gives the reader's word, or the value
 * itself when it isn't one of these.
 */
const LABELS: Record<string, string> = {
  // Statuses.
  All: $localize`All`,
  Active: $localize`Active`,
  Inactive: $localize`Inactive`,
  VIP: $localize`VIP`,
  Away: $localize`Away`,
  Offline: $localize`Offline`,
  'On Leave': $localize`On Leave`,
  Terminated: $localize`Terminated`,
  Pending: $localize`Pending`,
  Processing: $localize`Processing`,
  Shipped: $localize`Shipped`,
  Delivered: $localize`Delivered`,
  Cancelled: $localize`Cancelled`,
  Paid: $localize`Paid`,
  Overdue: $localize`Overdue`,
  Draft: $localize`Draft`,
  published: $localize`published`,
  draft: $localize`draft`,
  Low: $localize`Low`,
  Medium: $localize`Medium`,
  High: $localize`High`,
  Published: $localize`Published`,
  Open: $localize`Open`,
  Closed: $localize`Closed`,
  'In Progress': $localize`In Progress`,
  // Products.
  Books: $localize`Books`,
  Electronics: $localize`Electronics`,
  Fashion: $localize`Fashion`,
  Toys: $localize`Toys`,
  // Payments.
  Card: $localize`Card`,
  PayPal: $localize`PayPal`,
  'Bank transfer': $localize`Bank transfer`,
  // Departments, roles.
  Engineering: $localize`Engineering`,
  Design: $localize`Design`,
  Product: $localize`Product`,
  Data: $localize`Data`,
  Marketing: $localize`Marketing`,
  Support: $localize`Support`,
  Sales: $localize`Sales`,
  Finance: $localize`Finance`,
  Executive: $localize`Executive`,
  'Human Resources': $localize`Human Resources`,
  'Product Development': $localize`Product Development`,
  'Data Analytics': $localize`Data Analytics`,
  'Customer Service': $localize`Customer Service`,
  Engineer: $localize`Engineer`,
  Designer: $localize`Designer`,
  'Product Manager': $localize`Product Manager`,
  Analyst: $localize`Analyst`,
  Marketer: $localize`Marketer`,
  'Support Lead': $localize`Support Lead`,
  Admin: $localize`Admin`,
  Editor: $localize`Editor`,
  Viewer: $localize`Viewer`,
  // Kanban tags.
  Development: $localize`Development`,
  Research: $localize`Research`,
  // Plans.
  Free: $localize`Free`,
  Starter: $localize`Starter`,
  Pro: $localize`Pro`,
  Team: $localize`Team`,
  Enterprise: $localize`Enterprise`,
  // Permissions.
  view: $localize`view`,
  edit: $localize`edit`,
  delete: $localize`delete`,
  Dashboards: $localize`Dashboards`,
  Orders: $localize`Orders`,
  Customers: $localize`Customers`,
  Invoices: $localize`Invoices`,
  Blog: $localize`Blog`,
  Billing: $localize`Billing`,
  // Integrations, gallery albums, picture shapes.
  Communication: $localize`Communication`,
  'Project management': $localize`Project management`,
  Nature: $localize`Nature`,
  Work: $localize`Work`,
  Travel: $localize`Travel`,
  square: $localize`square`,
  portrait: $localize`portrait`,
  landscape: $localize`landscape`,
  // The Modern dashboard's periods.
  'Last 7 Days': $localize`Last 7 Days`,
  'Last 30 Days': $localize`Last 30 Days`,
  'Last 90 Days': $localize`Last 90 Days`,
};

export function label(value: string): string {
  return LABELS[value] ?? value;
}
