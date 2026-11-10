import type { ScRadioGroupStyles } from '@semantic-components/presets';

// shadcn's radio group in mira (shadcn-reference/presets/mira/radio-group.tsx): our radio
// is a native input — :checked for Base UI's data-checked; its dot is the ::before.
export const radioGroup: ScRadioGroupStyles = {
  group: 'grid w-full gap-3',
  item: 'group/radio-group-item peer relative flex aspect-square size-4 shrink-0 rounded-full border border-input outline-none group-has-[:focus-visible]/field-label:ring-0 group-has-[:focus-visible]/field-label:not-checked:border-input after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 aria-invalid:checked:border-primary dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 checked:border-primary checked:bg-primary checked:text-primary-foreground group-has-[:focus-visible]/field-label:checked:border-primary dark:checked:bg-primary',
  dot: 'checked:before:absolute checked:before:top-1/2 checked:before:start-1/2 checked:before:size-2 checked:before:-translate-x-1/2 rtl:checked:before:translate-x-1/2 checked:before:-translate-y-1/2 checked:before:rounded-full checked:before:bg-primary-foreground',
};
