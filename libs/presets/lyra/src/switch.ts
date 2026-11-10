import type { ScSwitchStyles } from '@semantic-components/presets';

// shadcn's switch in lyra (shadcn-reference/presets/lyra/switch.tsx): our switch is a
// native checkbox drawing itself — the track is the input (:checked, :not(:checked), :disabled
// for Base UI's data-checked, data-unchecked, data-disabled), the thumb its ::before (its
// size from the input's data-size).
// Square here: sera's switch (its square track, the thumb inset 1px on every side), with
// lyra's own focus ring — shadcn's lyra switch is nova's, round; ours follows lyra's other
// parts (the user: a deliberate divergence, docs/shadcn-style-reference.md).
export const switchStyles: ScSwitchStyles = {
  track:
    'peer group/switch relative inline-flex shrink-0 items-center rounded-none border transition-all outline-none group-has-[:focus-visible]/field-label:ring-0 after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-1 aria-invalid:ring-destructive/20 data-[size=default]:h-4.5 data-[size=default]:w-8.25 data-[size=sm]:h-3.5 data-[size=sm]:w-6.25 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 checked:border-primary checked:bg-primary group-has-[:focus-visible]/field-label:checked:border-primary not-checked:border-input/50 not-checked:bg-input group-has-[:focus-visible]/field-label:not-checked:border-input/50 disabled:cursor-not-allowed disabled:opacity-50',
  thumb:
    'before:pointer-events-none before:bg-background before:ring-0 before:transition-transform data-[size=default]:before:size-3.5 data-[size=sm]:before:size-2.5 checked:before:translate-x-[calc(100%+2px)] rtl:checked:before:-translate-x-[calc(100%+2px)] dark:checked:before:bg-primary-foreground not-checked:before:translate-x-0.25 rtl:not-checked:before:-translate-x-0.25 dark:not-checked:before:bg-foreground',
};
