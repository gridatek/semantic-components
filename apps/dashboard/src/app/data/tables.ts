/** The tables page's rows: shadcndashboard's (src/components/tables). */

export type Priority = 'Low' | 'Medium' | 'High';

/** A project row: the basic, hover, striped and checkbox tables. */
export interface ProjectRow {
  readonly id: number;
  readonly name: string;
  readonly role: string;
  readonly avatar: string;
  readonly project: string;
  readonly priority: Priority;
  readonly budget: string;
}

export const PROJECT_ROWS: readonly ProjectRow[] = [
  {
    id: 1,
    name: 'Sunil Joshi',
    role: 'Web Designer',
    avatar: 'images/profile/user-1.png',
    project: 'Elite Admin',
    priority: 'Low',
    budget: '3.9k',
  },
  {
    id: 2,
    name: 'John Deo',
    role: 'Web Developer',
    avatar: 'images/profile/user-2.png',
    project: 'Flexy Admin',
    priority: 'Medium',
    budget: '24.5k',
  },
  {
    id: 3,
    name: 'Nirav Joshi',
    role: 'Web Manager',
    avatar: 'images/profile/user-3.png',
    project: 'Material Pro',
    priority: 'High',
    budget: '12.8k',
  },
  {
    id: 4,
    name: 'Yuvraj Sheth',
    role: 'Project Manager',
    avatar: 'images/profile/user-4.png',
    project: 'Xtreme Admin',
    priority: 'Low',
    budget: '4.8k',
  },
  {
    id: 5,
    name: 'Micheal Doe',
    role: 'Content Writer',
    avatar: 'images/profile/user-5.png',
    project: 'Helping Hands WP Theme',
    priority: 'High',
    budget: '9.3k',
  },
];

export type EmployeeStatus = 'Active' | 'On Leave' | 'Terminated';

/** An employee: the data table (search, sort, pages). */
export interface Employee {
  readonly id: number;
  readonly name: string;
  readonly avatar: string;
  readonly position: string;
  readonly department: string;
  readonly salary: number;
  readonly status: EmployeeStatus;
}

export const EMPLOYEES: readonly Employee[] = (
  [
    [
      'Alice Johnson',
      'Senior Software Engineer',
      120000,
      'Engineering',
      'Active',
    ],
    ['Bob Williams', 'Marketing Manager', 95000, 'Marketing', 'Active'],
    ['Carol Davis', 'HR Specialist', 70000, 'Human Resources', 'On Leave'],
    ['David Brown', 'Product Owner', 110000, 'Product Development', 'Active'],
    ['Eve Green', 'Junior Software Engineer', 80000, 'Engineering', 'Active'],
    ['Frank White', 'Sales Representative', 65000, 'Sales', 'Active'],
    ['Grace Black', 'Financial Analyst', 88000, 'Finance', 'Active'],
    ['Henry King', 'CEO', 250000, 'Executive', 'Active'],
    ['Ivy Lee', 'Data Scientist', 130000, 'Data Analytics', 'Active'],
    [
      'Jack Miller',
      'Customer Support Specialist',
      55000,
      'Customer Service',
      'Terminated',
    ],
  ] as const
).map(([name, position, salary, department, status], index) => ({
  id: index + 1,
  name,
  avatar: `images/profile/user-${index + 1}.png`,
  position,
  department,
  salary,
  status,
}));
