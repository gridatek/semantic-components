import type { ScSwitchStyles } from '@semantic-components/presets';

// shadcn's switch in sera (shadcn-reference/presets/sera/switch.tsx): our switch is a
// native checkbox drawing itself — the track is the input (:checked, :not(:checked), :disabled
// for Base UI's data-checked, data-unchecked, data-disabled), the thumb its ::before (its
// size from the input's data-size).
export const switchStyles: ScSwitchStyles = {
  track:
    'peer group/switch relative inline-flex shrink-0 items-center rounded-none border transition-all outline-none group-has-[:focus-visible]/field-label:ring-0 after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30 aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20 data-[size=default]:h-4.5 data-[size=default]:w-8.25 data-[size=sm]:h-3.5 data-[size=sm]:w-6.25 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 checked:border-primary checked:bg-primary group-has-[:focus-visible]/field-label:checked:border-primary not-checked:border-input/50 not-checked:bg-input group-has-[:focus-visible]/field-label:not-checked:border-input/50 disabled:cursor-not-allowed disabled:opacity-50',
  thumb:
    'before:pointer-events-none before:bg-background before:ring-0 before:transition-transform data-[size=default]:before:size-3.5 data-[size=sm]:before:size-2.5 checked:before:translate-x-[calc(100%+2px)] rtl:checked:before:-translate-x-[calc(100%+2px)] dark:checked:before:bg-primary-foreground not-checked:before:translate-x-0.25 rtl:not-checked:before:-translate-x-0.25 dark:not-checked:before:bg-foreground',
};
