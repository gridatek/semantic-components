/** The data tables' rows: 24 people, written out from a few lists (no randomness). */

export type StaffStatus = 'Active' | 'Away' | 'Offline';

export interface StaffMember {
  id: number;
  name: string;
  email: string;
  role: string;
  department: string;
  location: string;
  salary: number;
  joined: string;
  status: StaffStatus;
  avatar: string;
  /** The projects they're on: the Expanding table's detail. */
  projects: readonly { name: string; progress: number }[];
}

const FIRST = [
  'Alice',
  'Bob',
  'Carol',
  'David',
  'Eve',
  'Frank',
  'Grace',
  'Henry',
  'Ivy',
  'Jack',
  'Kara',
  'Leo',
];
const LAST = [
  'Johnson',
  'Williams',
  'Davis',
  'Brown',
  'Green',
  'White',
  'Black',
  'King',
  'Lee',
  'Miller',
  'Moreau',
  'Rossi',
];
const ROLES = [
  'Engineer',
  'Designer',
  'Product Manager',
  'Analyst',
  'Marketer',
  'Support Lead',
];
const DEPARTMENTS = [
  'Engineering',
  'Design',
  'Product',
  'Data',
  'Marketing',
  'Support',
];
const LOCATIONS = [
  'New York',
  'London',
  'Berlin',
  'Paris',
  'Madrid',
  'Seoul',
  'Toronto',
  'Remote',
];
const STATUSES: readonly StaffStatus[] = [
  'Active',
  'Active',
  'Away',
  'Active',
  'Offline',
];
const PROJECTS = [
  'Dashboard',
  'Mobile app',
  'Billing',
  'Onboarding',
  'Analytics',
  'Website',
];

export const STAFF: readonly StaffMember[] = Array.from(
  { length: 24 },
  (_, i) => {
    const first = FIRST[i % FIRST.length];
    const last = LAST[(i * 5) % LAST.length];
    const role = ROLES[i % ROLES.length];
    return {
      id: i + 1,
      name: `${first} ${last}`,
      email: `${first}.${last}@company.example`.toLowerCase(),
      role,
      department: DEPARTMENTS[i % DEPARTMENTS.length],
      location: LOCATIONS[(i * 3) % LOCATIONS.length],
      salary: 52000 + ((i * 7919) % 90) * 1000,
      joined: Temporal.PlainDate.from('2019-01-15')
        .add({ days: i * 97 })
        .toString(),
      status: STATUSES[i % STATUSES.length],
      avatar: `images/profile/user-${(i % 10) + 1}.png`,
      projects: [0, 1, 2].slice(0, (i % 3) + 1).map((n) => ({
        name: PROJECTS[(i + n * 2) % PROJECTS.length],
        progress: ((i + 1) * (n + 3) * 7) % 100,
      })),
    };
  },
);

export function statusBadge(
  status: StaffStatus,
): 'secondary' | 'outline' | 'destructive' {
  return status === 'Active'
    ? 'secondary'
    : status === 'Away'
      ? 'outline'
      : 'destructive';
}
