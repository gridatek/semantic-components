import type { ScToastVariant } from './toast-types';

/**
 * Each variant's text colour, for its title, description and icon (the Alert's
 * way: the whole message in the colour); `info` and the rest keep the
 * popover's, their icon telling them apart.
 */
export const toastColors: Partial<Record<ScToastVariant, string>> = {
  success: 'text-success',
  warning: 'text-warning',
  error: 'text-destructive',
};
