/** The people the apps share: contacts, chats, mail, followers, customers. */

export interface Person {
  readonly id: number;
  readonly name: string;
  readonly email: string;
  readonly phone: string;
  readonly role: string;
  readonly company: string;
  readonly city: string;
  readonly country: string;
  readonly avatar: string;
  readonly online: boolean;
}

const avatar = (n: number) => `images/profile/user-${n}.png`;

export const PEOPLE: readonly Person[] = [
  {
    id: 1,
    name: 'Mathew Anderson',
    email: 'mathew.anderson@gmail.com',
    phone: '+1 (555) 201-4410',
    role: 'Designer',
    company: 'Dashboard Inc.',
    city: 'New York',
    country: 'United States',
    avatar: avatar(1),
    online: true,
  },
  {
    id: 2,
    name: 'Emily Carter',
    email: 'emily.carter@northwind.io',
    phone: '+1 (555) 348-1902',
    role: 'Product Manager',
    company: 'Northwind',
    city: 'Seattle',
    country: 'United States',
    avatar: avatar(2),
    online: true,
  },
  {
    id: 3,
    name: 'James Johnson',
    email: 'james.johnson@acme.com',
    phone: '+44 20 7946 0321',
    role: 'Frontend Engineer',
    company: 'Acme',
    city: 'London',
    country: 'United Kingdom',
    avatar: avatar(3),
    online: false,
  },
  {
    id: 4,
    name: 'Maria Hernandez',
    email: 'maria.hernandez@globex.es',
    phone: '+34 912 345 678',
    role: 'Marketing Lead',
    company: 'Globex',
    city: 'Madrid',
    country: 'Spain',
    avatar: avatar(4),
    online: true,
  },
  {
    id: 5,
    name: 'David Kim',
    email: 'david.kim@initech.kr',
    phone: '+82 2 3210 4455',
    role: 'Data Analyst',
    company: 'Initech',
    city: 'Seoul',
    country: 'South Korea',
    avatar: avatar(5),
    online: false,
  },
  {
    id: 6,
    name: 'Sophia Rossi',
    email: 'sophia.rossi@umbrella.it',
    phone: '+39 06 4521 9876',
    role: 'UX Researcher',
    company: 'Umbrella',
    city: 'Rome',
    country: 'Italy',
    avatar: avatar(6),
    online: true,
  },
  {
    id: 7,
    name: 'Liam Smith',
    email: 'liam.smith@hooli.com',
    phone: '+1 (555) 772-0918',
    role: 'Backend Engineer',
    company: 'Hooli',
    city: 'Austin',
    country: 'United States',
    avatar: avatar(7),
    online: false,
  },
  {
    id: 8,
    name: 'Olivia Brown',
    email: 'olivia.brown@vandelay.ca',
    phone: '+1 (604) 555-0144',
    role: 'Sales Director',
    company: 'Vandelay',
    city: 'Vancouver',
    country: 'Canada',
    avatar: avatar(8),
    online: true,
  },
  {
    id: 9,
    name: 'Noah Müller',
    email: 'noah.mueller@stark.de',
    phone: '+49 30 901820',
    role: 'DevOps Engineer',
    company: 'Stark',
    city: 'Berlin',
    country: 'Germany',
    avatar: avatar(9),
    online: false,
  },
  {
    id: 10,
    name: 'Ava Martin',
    email: 'ava.martin@wayne.fr',
    phone: '+33 1 42 68 53 00',
    role: 'Support Lead',
    company: 'Wayne',
    city: 'Paris',
    country: 'France',
    avatar: avatar(10),
    online: true,
  },
];

/** The signed-in user. */
export const ME = PEOPLE[0];

export function personById(id: number): Person {
  return PEOPLE.find((person) => person.id === id) ?? ME;
}
