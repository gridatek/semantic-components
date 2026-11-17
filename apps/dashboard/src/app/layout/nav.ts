/** The sidebar's links: shadcndashboard's (sidebar/sidebaritems.ts), its free screens. */

export type NavIcon =
  | 'dashboard'
  | 'table'
  | 'form'
  | 'profile'
  | 'notes'
  | 'blog'
  | 'tickets'
  | 'icons'
  | 'error'
  | 'login'
  | 'register'
  | 'forgot'
  | 'two-steps'
  | 'maintenance';

export interface NavLink {
  readonly label: string;
  readonly url: string;
  readonly icon: NavIcon;
  /** Its own pages, in a submenu. */
  readonly children?: readonly { label: string; url: string }[];
}

export interface NavSection {
  readonly heading: string;
  readonly links: readonly NavLink[];
}

export const NAV: readonly NavSection[] = [
  {
    heading: 'Dashboard',
    links: [{ label: 'Modern', url: '/', icon: 'dashboard' }],
  },
  {
    heading: 'Pages',
    links: [
      { label: 'Table', url: '/pages/tables', icon: 'table' },
      { label: 'Form', url: '/pages/form', icon: 'form' },
      { label: 'User Profile', url: '/pages/user-profile', icon: 'profile' },
    ],
  },
  {
    heading: 'Apps',
    links: [
      { label: 'Notes', url: '/apps/notes', icon: 'notes' },
      {
        label: 'Blogs',
        url: '/apps/blog/post',
        icon: 'blog',
        children: [
          { label: 'Blog Listing', url: '/apps/blog/post' },
          {
            label: 'Blog Detail',
            url: '/apps/blog/detail/streaming-video-way-before-it-was-cool-go-dark-tomorrow',
          },
          { label: 'Blog Edit', url: '/apps/blog/edit/5' },
          { label: 'Blog Create', url: '/apps/blog/create' },
          { label: 'Manage Blog', url: '/apps/blog/manage-blog' },
        ],
      },
      { label: 'Tickets', url: '/apps/tickets', icon: 'tickets' },
    ],
  },
  {
    heading: 'Icons',
    links: [{ label: 'Lucide Icons', url: '/icons', icon: 'icons' }],
  },
  {
    heading: 'Auth',
    links: [
      { label: 'Error', url: '/auth/404', icon: 'error' },
      { label: 'Login', url: '/auth/login', icon: 'login' },
      { label: 'Register', url: '/auth/register', icon: 'register' },
      {
        label: 'Forgot Password',
        url: '/auth/forgot-password',
        icon: 'forgot',
      },
      { label: 'Two Steps', url: '/auth/two-steps', icon: 'two-steps' },
      { label: 'Maintenance', url: '/auth/maintenance', icon: 'maintenance' },
    ],
  },
];
