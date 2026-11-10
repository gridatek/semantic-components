import type { ScSwitchStyles } from '@semantic-components/presets';

// shadcn's switch in luma (shadcn-reference/presets/luma/switch.tsx): our switch is a
// native checkbox drawing itself — the track is the input (:checked, :not(:checked), :disabled
// for Base UI's data-checked, data-unchecked, data-disabled), the thumb its ::before (its
// size from the input's data-size).
export const switchStyles: ScSwitchStyles = {
  track:
    'peer group/switch relative inline-flex shrink-0 items-center rounded-full border-2 transition-all outline-none group-has-[:focus-visible]/field-label:ring-0 after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 data-[size=default]:h-5 data-[size=default]:w-11 data-[size=sm]:h-4 data-[size=sm]:w-7 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 checked:border-primary checked:bg-primary group-has-[:focus-visible]/field-label:checked:border-primary not-checked:border-transparent not-checked:bg-input/90 group-has-[:focus-visible]/field-label:not-checked:border-transparent disabled:cursor-not-allowed disabled:opacity-50',
  thumb:
    'before:pointer-events-none before:rounded-full before:bg-background before:shadow-sm before:ring-0 before:transition-transform not-dark:before:bg-clip-padding data-[size=default]:before:h-4 data-[size=default]:before:w-6 data-[size=sm]:before:h-3 data-[size=sm]:before:w-4 checked:before:translate-x-[calc(100%-8px)] rtl:checked:before:-translate-x-[calc(100%-8px)] dark:checked:before:bg-primary-foreground not-checked:before:translate-x-0 rtl:not-checked:before:-translate-x-0 dark:not-checked:before:bg-foreground',
};
