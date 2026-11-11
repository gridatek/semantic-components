import type { ScNativeSelectStyles } from '@semantic-components/presets';

// shadcn's native select in luma (shadcn-reference/presets/luma/native-select.tsx): the
// select and the chevron's place. Its wrapper (our container) is the same in every style: in the part.
export const nativeSelect: ScNativeSelectStyles = {
  select:
    'h-9 w-full min-w-0 appearance-none rounded-3xl border border-transparent bg-input/50 py-1 pe-8 ps-3 text-sm transition-[color,box-shadow,background-color] outline-none select-none selection:bg-primary selection:text-primary-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 disabled:pointer-events-none disabled:cursor-not-allowed aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 data-[size=sm]:h-8 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40',
  icon: 'pointer-events-none absolute top-1/2 end-2.5 size-4 -translate-y-1/2 text-muted-foreground select-none',
};
