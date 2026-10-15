export type ScToastPosition =
  | 'top-start'
  | 'top-center'
  | 'top-end'
  | 'bottom-start'
  | 'bottom-center'
  | 'bottom-end';

export type ScToastVariant =
  'default' | 'success' | 'info' | 'warning' | 'error' | 'loading';

export interface ScToastData {
  id: string;
  /** Where it shows: its own, or the toaster's default. */
  position: ScToastPosition;
  title?: string;
  description?: string;
  variant?: ScToastVariant;
  action?: {
    label: string;
    onClick: () => void;
  };
  duration?: number;
}

export interface ScToastConfig {
  /** Where it shows (the toaster's default when left out — `setPosition`). */
  position?: ScToastPosition;
  title?: string;
  description?: string;
  variant?: ScToastVariant;
  action?: {
    label: string;
    onClick: () => void;
  };
  duration?: number;
}

/** The toasts `ScToaster.promise` shows: while it runs, then when it settles. */
export interface ScToastPromiseConfig<T> {
  loading: Omit<ScToastConfig, 'variant'>;
  success:
    | Omit<ScToastConfig, 'variant'>
    | ((value: T) => Omit<ScToastConfig, 'variant'>);
  error:
    | Omit<ScToastConfig, 'variant'>
    | ((error: unknown) => Omit<ScToastConfig, 'variant'>);
}

/** How a position's toasts are laid out. */
export type ScToasterLayout = 'stacked' | 'list';

/** The toaster's settings, in `provideScConfig({ toaster })`. */
export interface ScToasterConfig {
  /** Where toasts show when `show` gives no `position`. Default `bottom-end`. */
  position?: ScToastPosition;
  /** How long a toast stays, in ms, when `show` gives no `duration`; 0 keeps it. Default 5000. */
  duration?: number;
  /** How many show in a stack, stacked. Default 3. */
  visibleToasts?: number;
  /** How many are kept; the oldest goes past it. Default 5. */
  maxToasts?: number;
  /**
   * `stacked`: the newest in front, the others behind it, spread out while
   * hovered or focused. `list`: always spread out. Default `stacked`.
   */
  layout?: ScToasterLayout;
  /**
   * The keys that move focus to the toasts: `KeyboardEvent` codes and
   * modifiers, e.g. `['altKey', 'KeyT']`. Write them in your template's
   * `label`. None by default.
   */
  hotkey?: readonly string[];
}
