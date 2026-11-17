/** Support tickets: shadcndashboard's (src/api/ticket/ticket-data.ts). */

export type TicketStatus = 'Open' | 'Pending' | 'Closed';

export interface Ticket {
  readonly id: number;
  readonly title: string;
  readonly description: string;
  readonly status: TicketStatus;
  readonly agent: string;
  readonly avatar: string;
  /** An ISO date (Temporal). */
  readonly date: string;
}

export const TICKET_STATUSES: readonly TicketStatus[] = [
  'Open',
  'Pending',
  'Closed',
];

export const AGENTS: readonly { name: string; avatar: string }[] = [
  { name: 'Liam', avatar: 'images/profile/user-10.png' },
  { name: 'Steve', avatar: 'images/profile/user-2.png' },
  { name: 'Jack', avatar: 'images/profile/user-3.png' },
  { name: 'John', avatar: 'images/profile/user-8.png' },
];

const DESCRIPTION =
  'ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos';

export const TICKETS: readonly Ticket[] = [
  [
    1,
    'Sed ut perspiciatis unde omnis iste',
    'Closed',
    'Liam',
    10,
    '2026-03-14',
  ],
  [
    2,
    'Consequuntur magni dolores eos qui ratione',
    'Pending',
    'Steve',
    2,
    '2026-04-02',
  ],
  [3, 'Exercitationem ullam corporis', 'Open', 'Jack', 3, '2026-04-19'],
  [
    4,
    'Sed ut perspiciatis unde omnis iste',
    'Closed',
    'Steve',
    4,
    '2026-05-07',
  ],
  [5, 'Exercitationem ullam corporis', 'Closed', 'Liam', 5, '2026-05-26'],
  [
    6,
    'Consequuntur magni dolores eos qui ratione',
    'Pending',
    'Jack',
    6,
    '2026-06-11',
  ],
  [7, 'Sed ut perspiciatis unde omnis iste', 'Open', 'Steve', 7, '2026-07-03'],
  [
    8,
    'Consequuntur magni dolores eos qui ratione',
    'Closed',
    'John',
    8,
    '2026-07-22',
  ],
].map(([id, title, status, agent, n, date]) => ({
  id: id as number,
  title: title as string,
  description: DESCRIPTION,
  status: status as TicketStatus,
  agent: agent as string,
  avatar: `images/profile/user-${n}.png`,
  date: date as string,
}));
