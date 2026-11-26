/** The dashboard's figures. */

export type SalesPoint = {
  readonly date: string;
  readonly newUser: number;
  readonly existingUser: number;
};

export type SalesPeriod = 'Last 7 Days' | 'Last 30 Days' | 'Last 90 Days';

export const SALES_PERIODS: readonly SalesPeriod[] = [
  'Last 30 Days',
  'Last 7 Days',
  'Last 90 Days',
];

const p = (date: string, newUser: number, existingUser: number) => ({
  date,
  newUser,
  existingUser,
});

export const SALES: Record<SalesPeriod, readonly SalesPoint[]> = {
  'Last 30 Days': [
    p('Mar 30', 12, 20),
    p('Apr 1', 18, 25),
    p('Apr 2', 14, 22),
    p('Apr 4', 22, 30),
    p('Apr 5', 16, 18),
    p('Apr 7', 20, 24),
    p('Apr 9', 18, 32),
    p('Apr 11', 26, 22),
    p('Apr 12', 20, 26),
    p('Apr 14', 30, 20),
    p('Apr 15', 22, 28),
    p('Apr 17', 26, 22),
    p('Apr 19', 28, 18),
    p('Apr 20', 24, 24),
    p('Apr 22', 38, 18),
    p('Apr 23', 22, 26),
    p('Apr 24', 20, 22),
    p('Apr 26', 24, 20),
    p('Apr 27', 18, 24),
    p('Apr 29', 22, 20),
    p('May 1', 20, 18),
    p('May 4', 24, 22),
  ],
  'Last 7 Days': [
    p('Apr 28', 18, 22),
    p('Apr 29', 22, 20),
    p('Apr 30', 20, 28),
    p('May 1', 30, 18),
    p('May 2', 24, 26),
    p('May 3', 32, 20),
    p('May 4', 22, 28),
  ],
  'Last 90 Days': [
    p('Feb 1', 14, 22),
    p('Feb 15', 20, 28),
    p('Mar 1', 18, 24),
    p('Mar 15', 26, 20),
    p('Mar 30', 22, 30),
    p('Apr 14', 32, 22),
    p('Apr 22', 38, 18),
    p('Apr 29', 24, 26),
    p('May 4', 28, 20),
  ],
};

export interface Asset {
  readonly title: string;
  readonly value: number;
  readonly icon: 'users' | 'file' | 'briefcase' | 'bookmark';
}

export const ASSETS: readonly Asset[] = [
  {
    title: $localize`:@@data.dashboard.employees:Employees`,
    value: 96,
    icon: 'users',
  },
  {
    title: $localize`:@@data.dashboard.projects:Projects`,
    value: 356,
    icon: 'file',
  },
  {
    title: $localize`:@@data.dashboard.clients:Clients`,
    value: 3650,
    icon: 'briefcase',
  },
  {
    title: $localize`:@@data.dashboard.events:Events`,
    value: 86,
    icon: 'bookmark',
  },
];

export interface Kpi {
  readonly title: string;
  /** Written compact: 714K. */
  readonly value: number;
  /** A share: 0.4 is 40%. */
  readonly change: number;
  /** Up (good) or down (bad): the badge's variant. */
  readonly trend: 'up' | 'down';
  readonly icon: 'handbag' | 'users' | 'box';
}

export const KPIS: readonly Kpi[] = [
  {
    title: $localize`:@@data.dashboard.weeklySales:Weekly sales`,
    value: 714_000,
    change: 0.4,
    trend: 'up',
    icon: 'handbag',
  },
  {
    title: $localize`:@@data.dashboard.newUsers:New users`,
    value: 1_350_000,
    change: 0.2,
    trend: 'down',
    icon: 'users',
  },
  {
    title: $localize`:@@data.dashboard.purchaseOrders:Purchase Orders`,
    value: 1_720_000,
    change: 0.4,
    trend: 'up',
    icon: 'box',
  },
];

export type OrderStatus = 'Processing' | 'Delayed' | 'Delivered' | 'Cancelled';

export interface Order {
  readonly id: string;
  readonly project: string;
  readonly name: string;
  readonly role: string;
  readonly avatar: string;
  readonly status: OrderStatus;
  /** In US dollars. */
  readonly price: number;
  /** An ISO date (Temporal). */
  readonly deadline: string;
}

export const ORDERS: readonly Order[] = [
  {
    id: 'SD-2026-001',
    project: 'Modernize',
    name: 'Emily Carter',
    role: 'Project Manager',
    avatar: 'images/profile/user-2.png',
    status: 'Processing',
    price: 2499,
    deadline: '2026-06-14',
  },
  {
    id: 'SD-2026-002',
    project: 'Spike Admin',
    name: 'Jason Miller',
    role: 'Web Developer',
    avatar: 'images/profile/user-3.png',
    status: 'Delayed',
    price: 1348,
    deadline: '2026-05-10',
  },
  {
    id: 'SD-2026-003',
    project: 'Material Pro',
    name: 'Ryan Scott',
    role: 'UI/UX Designer',
    avatar: 'images/profile/user-7.png',
    status: 'Delivered',
    price: 1198,
    deadline: '2026-07-02',
  },
  {
    id: 'SD-2026-004',
    project: 'Xtreme Admin',
    name: 'Olivia Williams',
    role: 'Frontend Developer',
    avatar: 'images/profile/user-6.png',
    status: 'Delivered',
    price: 799,
    deadline: '2026-05-30',
  },
  {
    id: 'SD-2026-005',
    project: 'Nova Suite',
    name: 'Lisa Park',
    role: 'Frontend Developer',
    avatar: 'images/profile/user-4.png',
    status: 'Cancelled',
    price: 599,
    deadline: '2026-07-15',
  },
  {
    id: 'SD-2026-006',
    project: 'Pulse CRM',
    name: 'David Kim',
    role: 'Backend Developer',
    avatar: 'images/profile/user-9.png',
    status: 'Processing',
    price: 5498,
    deadline: '2026-06-05',
  },
  {
    id: 'SD-2026-007',
    project: 'Vertex UI',
    name: 'Anna Martinez',
    role: 'UI/UX Designer',
    avatar: 'images/profile/user-1.png',
    status: 'Delivered',
    price: 1199,
    deadline: '2026-06-18',
  },
];

/** The header's messages and notifications (src/layouts/full/vertical/header/data.ts). */
export const MESSAGES: readonly {
  name: string;
  text: string;
  avatar: string;
}[] = [
  {
    name: 'Michell Flintoff',
    text: $localize`:@@data.dashboard.youYesterdayWasGreat:You: Yesterday was great...`,
    avatar: 'images/profile/user-2.png',
  },
  {
    name: 'Bianca Anderson',
    text: $localize`:@@data.dashboard.niceLookingDressYou:Nice looking dress you...`,
    avatar: 'images/profile/user-3.png',
  },
  {
    name: 'Andrew Johnson',
    text: $localize`:@@data.dashboard.sentAPhoto:Sent a photo`,
    avatar: 'images/profile/user-4.png',
  },
  {
    name: 'Jolly Cummins',
    text: $localize`:@@data.dashboard.ifIDonTLike:If I don't like something`,
    avatar: 'images/profile/user-5.png',
  },
  {
    name: 'Josh Macklow',
    text: $localize`:@@data.dashboard.n230DeductedFromAccount:$230 deducted from account`,
    avatar: 'images/profile/user-6.png',
  },
];

export const NOTIFICATIONS: readonly { title: string; text: string }[] = [
  {
    title: $localize`:@@data.dashboard.eventToday:Event Today`,
    text: $localize`:@@data.dashboard.justAReminderThatYou:Just a reminder that you have event`,
  },
  {
    title: $localize`:@@data.dashboard.settings:Settings`,
    text: $localize`:@@data.dashboard.youCanCustomizeThisTemplate:You can customize this template as you want`,
  },
  {
    title: $localize`:@@data.dashboard.launchAdmin:Launch Admin`,
    text: $localize`:@@data.dashboard.justSeeTheMyNew:Just see the my new admin!`,
  },
];
