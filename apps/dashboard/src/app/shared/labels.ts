/**
 * The words the data holds as values — statuses, categories, roles, plans —
 * translated where they're shown. The data keeps its English values (the
 * code compares them); `label(value)` gives the reader's word, or the value
 * itself when it isn't one of these.
 */
const LABELS: Record<string, string> = {
  // Statuses.
  All: $localize`:@@shared.labels.all:All`,
  Active: $localize`:@@shared.labels.active:Active`,
  Inactive: $localize`:@@shared.labels.inactive:Inactive`,
  VIP: $localize`:@@shared.labels.vip:VIP`,
  Away: $localize`:@@shared.labels.away:Away`,
  Offline: $localize`:@@shared.labels.offline:Offline`,
  'On Leave': $localize`:@@shared.labels.onLeave:On Leave`,
  Terminated: $localize`:@@shared.labels.terminated:Terminated`,
  Pending: $localize`:@@shared.labels.pending:Pending`,
  Processing: $localize`:@@shared.labels.processing:Processing`,
  Shipped: $localize`:@@shared.labels.shipped:Shipped`,
  Delivered: $localize`:@@shared.labels.delivered:Delivered`,
  Cancelled: $localize`:@@shared.labels.cancelled:Cancelled`,
  Paid: $localize`:@@shared.labels.paid:Paid`,
  Overdue: $localize`:@@shared.labels.overdue:Overdue`,
  Draft: $localize`:@@shared.labels.draft:Draft`,
  published: $localize`:@@shared.labels.published:published`,
  draft: $localize`:@@shared.labels.draft2:draft`,
  Low: $localize`:@@shared.labels.low:Low`,
  Medium: $localize`:@@shared.labels.medium:Medium`,
  High: $localize`:@@shared.labels.high:High`,
  Published: $localize`:@@shared.labels.published2:Published`,
  Open: $localize`:@@shared.labels.open:Open`,
  Closed: $localize`:@@shared.labels.closed:Closed`,
  'In Progress': $localize`:@@shared.labels.inProgress:In Progress`,
  // Products.
  Books: $localize`:@@shared.labels.books:Books`,
  Electronics: $localize`:@@shared.labels.electronics:Electronics`,
  Fashion: $localize`:@@shared.labels.fashion:Fashion`,
  Toys: $localize`:@@shared.labels.toys:Toys`,
  // Payments.
  Card: $localize`:@@shared.labels.card:Card`,
  PayPal: $localize`:@@shared.labels.paypal:PayPal`,
  'Bank transfer': $localize`:@@shared.labels.bankTransfer:Bank transfer`,
  // Departments, roles.
  Engineering: $localize`:@@shared.labels.engineering:Engineering`,
  Design: $localize`:@@shared.labels.design:Design`,
  Product: $localize`:@@shared.labels.product:Product`,
  Data: $localize`:@@shared.labels.data:Data`,
  Marketing: $localize`:@@shared.labels.marketing:Marketing`,
  Support: $localize`:@@shared.labels.support:Support`,
  Sales: $localize`:@@shared.labels.sales:Sales`,
  Finance: $localize`:@@shared.labels.finance:Finance`,
  Executive: $localize`:@@shared.labels.executive:Executive`,
  'Human Resources': $localize`:@@shared.labels.humanResources:Human Resources`,
  'Product Development': $localize`:@@shared.labels.productDevelopment:Product Development`,
  'Data Analytics': $localize`:@@shared.labels.dataAnalytics:Data Analytics`,
  'Customer Service': $localize`:@@shared.labels.customerService:Customer Service`,
  Engineer: $localize`:@@shared.labels.engineer:Engineer`,
  Designer: $localize`:@@shared.labels.designer:Designer`,
  'Product Manager': $localize`:@@shared.labels.productManager:Product Manager`,
  Analyst: $localize`:@@shared.labels.analyst:Analyst`,
  Marketer: $localize`:@@shared.labels.marketer:Marketer`,
  'Support Lead': $localize`:@@shared.labels.supportLead:Support Lead`,
  Admin: $localize`:@@shared.labels.admin:Admin`,
  Editor: $localize`:@@shared.labels.editor:Editor`,
  Viewer: $localize`:@@shared.labels.viewer:Viewer`,
  // Kanban tags.
  Development: $localize`:@@shared.labels.development:Development`,
  Research: $localize`:@@shared.labels.research:Research`,
  // Plans.
  Free: $localize`:@@shared.labels.free:Free`,
  Starter: $localize`:@@shared.labels.starter:Starter`,
  Pro: $localize`:@@shared.labels.pro:Pro`,
  Team: $localize`:@@shared.labels.team:Team`,
  Enterprise: $localize`:@@shared.labels.enterprise:Enterprise`,
  // Permissions.
  view: $localize`:@@shared.labels.view:view`,
  edit: $localize`:@@shared.labels.edit:edit`,
  delete: $localize`:@@shared.labels.delete:delete`,
  Dashboards: $localize`:@@shared.labels.dashboards:Dashboards`,
  Orders: $localize`:@@shared.labels.orders:Orders`,
  Customers: $localize`:@@shared.labels.customers:Customers`,
  Invoices: $localize`:@@shared.labels.invoices:Invoices`,
  Blog: $localize`:@@shared.labels.blog:Blog`,
  Billing: $localize`:@@shared.labels.billing:Billing`,
  // Integrations, gallery albums, picture shapes.
  Communication: $localize`:@@shared.labels.communication:Communication`,
  'Project management': $localize`:@@shared.labels.projectManagement:Project management`,
  Nature: $localize`:@@shared.labels.nature:Nature`,
  Work: $localize`:@@shared.labels.work:Work`,
  Travel: $localize`:@@shared.labels.travel:Travel`,
  square: $localize`:@@shared.labels.square:square`,
  portrait: $localize`:@@shared.labels.portrait:portrait`,
  landscape: $localize`:@@shared.labels.landscape:landscape`,
};

// Labels with a number are written where they're shown, with the figures
// formatted there (the Sales Overview's periods).
export function label(value: string): string {
  return LABELS[value] ?? value;
}
