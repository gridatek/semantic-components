import type { ScSwitchStyles } from '@semantic-components/presets';

// shadcn's switch in lyra (shadcn-reference/presets/lyra/switch.tsx): our switch is a
// native checkbox drawing itself — the track is the input (:checked, :not(:checked), :disabled
// for Base UI's data-checked, data-unchecked, data-disabled), the thumb its ::before (its
// size from the input's data-size).
// Square here, track and thumb: shadcn's lyra switch is round (nova's); ours follows lyra's
// other parts — a deliberate divergence (docs/shadcn-style-reference.md). The track's inside
// is exactly two thumbs (16×32, 12×24 small), the thumb moving its own width: true squares.
export const switchStyles: ScSwitchStyles = {
  track:
    'peer group/switch relative inline-flex shrink-0 items-center rounded-none border border-transparent transition-all outline-none group-has-[:focus-visible]/field-label:border-transparent group-has-[:focus-visible]/field-label:ring-0 after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-1 aria-invalid:ring-destructive/20 data-[size=default]:h-5 data-[size=default]:w-[38px] data-[size=sm]:h-4 data-[size=sm]:w-[30px] dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 checked:bg-primary not-checked:bg-input dark:not-checked:bg-input/80 disabled:cursor-not-allowed disabled:opacity-50',
  thumb:
    'before:pointer-events-none before:rounded-none before:bg-background before:ring-0 before:transition-transform data-[size=default]:before:size-[18px] data-[size=sm]:before:size-3.5 data-[size=default]:checked:before:translate-x-full rtl:data-[size=default]:checked:before:-translate-x-full data-[size=sm]:checked:before:translate-x-full rtl:data-[size=sm]:checked:before:-translate-x-full dark:checked:before:bg-primary-foreground data-[size=default]:not-checked:before:translate-x-0 rtl:data-[size=default]:not-checked:before:-translate-x-0 data-[size=sm]:not-checked:before:translate-x-0 rtl:data-[size=sm]:not-checked:before:-translate-x-0 dark:not-checked:before:bg-foreground',
};
