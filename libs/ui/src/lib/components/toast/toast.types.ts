export type ScToastPosition =
  | 'top-start'
  | 'top-center'
  | 'top-end'
  | 'bottom-start'
  | 'bottom-center'
  | 'bottom-end';

export type ScToastVariant =
  | 'default'
  | 'destructive'
  | 'success'
  | 'info'
  | 'warning'
  | 'error'
  | 'loading';

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
