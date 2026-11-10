import type { ScSwitchStyles } from '@semantic-components/presets';

// shadcn's switch in rhea (shadcn-reference/presets/rhea/switch.tsx): our switch is a
// native checkbox drawing itself — the track is the input (:checked, :not(:checked), :disabled
// for Base UI's data-checked, data-unchecked, data-disabled), the thumb its ::before (its
// size from the input's data-size).
export const switchStyles: ScSwitchStyles = {
  track:
    'peer group/switch relative inline-flex shrink-0 items-center rounded-2xl border-2 transition-all outline-none group-has-[:focus-visible]/field-label:ring-0 after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 data-[size=default]:h-5 data-[size=default]:w-8 data-[size=sm]:h-4 data-[size=sm]:w-6 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 checked:border-primary checked:bg-primary group-has-[:focus-visible]/field-label:checked:border-primary not-checked:border-transparent not-checked:bg-input/90 group-has-[:focus-visible]/field-label:not-checked:border-transparent disabled:cursor-not-allowed disabled:opacity-50',
  thumb:
    'before:pointer-events-none before:rounded-2xl before:bg-background before:shadow-sm before:ring-0 before:transition-transform not-dark:before:bg-clip-padding data-[size=default]:before:size-4 data-[size=sm]:before:size-3 checked:before:translate-x-[calc(100%-4px)] rtl:checked:before:-translate-x-[calc(100%-4px)] dark:checked:before:bg-primary-foreground not-checked:before:translate-x-0 rtl:not-checked:before:-translate-x-0 dark:not-checked:before:bg-foreground',
};
