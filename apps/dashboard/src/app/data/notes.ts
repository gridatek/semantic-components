/** Notes. */

/** A note's colour: one of the theme's tokens, as the reference's. */
export type NoteColor =
  'primary' | 'destructive' | 'chart-2' | 'chart-4' | 'chart-1';

export interface Note {
  readonly id: number;
  readonly color: NoteColor;
  readonly text: string;
  /** When it was written: an ISO date and time (Temporal). */
  readonly date: string;
}

export const NOTE_COLORS: readonly { value: NoteColor; label: string }[] = [
  { value: 'primary', label: 'Primary' },
  { value: 'destructive', label: 'Red' },
  { value: 'chart-2', label: 'Teal' },
  { value: 'chart-4', label: 'Yellow' },
  { value: 'chart-1', label: 'Orange' },
];

export const NOTES: readonly Note[] = [
  {
    id: 1,
    color: 'primary',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    date: '2026-06-03T23:28',
  },
  {
    id: 2,
    color: 'destructive',
    text: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit,',
    date: '2026-06-02T23:28',
  },
  {
    id: 3,
    color: 'chart-4',
    text: 'consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?',
    date: '2026-06-01T23:28',
  },
  {
    id: 4,
    color: 'chart-2',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    date: '2026-06-03T23:28',
  },
];
