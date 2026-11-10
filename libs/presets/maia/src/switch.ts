import type { ScSwitchStyles } from '@semantic-components/presets';

// shadcn's switch in maia (shadcn-reference/presets/maia/switch.tsx): our switch is a
// native checkbox drawing itself — the track is the input (:checked, :not(:checked), :disabled
// for Base UI's data-checked, data-unchecked, data-disabled), the thumb its ::before (its
// size from the input's data-size).
export const switchStyles: ScSwitchStyles = {
  track:
    'peer group/switch relative inline-flex shrink-0 items-center rounded-full border border-transparent transition-all outline-none group-has-[:focus-visible]/field-label:border-transparent group-has-[:focus-visible]/field-label:ring-0 after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-[3px] aria-invalid:ring-destructive/20 data-[size=default]:h-[18.4px] data-[size=default]:w-[32px] data-[size=sm]:h-[14px] data-[size=sm]:w-[24px] dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 checked:bg-primary not-checked:bg-input dark:not-checked:bg-input/80 disabled:cursor-not-allowed disabled:opacity-50',
  thumb:
    'before:pointer-events-none before:rounded-full before:bg-background before:ring-0 before:transition-transform data-[size=default]:before:size-4 data-[size=sm]:before:size-3 data-[size=default]:checked:before:translate-x-[calc(100%-2px)] rtl:data-[size=default]:checked:before:-translate-x-[calc(100%-2px)] data-[size=sm]:checked:before:translate-x-[calc(100%-2px)] rtl:data-[size=sm]:checked:before:-translate-x-[calc(100%-2px)] dark:checked:before:bg-primary-foreground data-[size=default]:not-checked:before:translate-x-0 rtl:data-[size=default]:not-checked:before:-translate-x-0 data-[size=sm]:not-checked:before:translate-x-0 rtl:data-[size=sm]:not-checked:before:-translate-x-0 dark:not-checked:before:bg-foreground',
};
