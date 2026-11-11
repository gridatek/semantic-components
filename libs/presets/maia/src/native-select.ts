import type { ScNativeSelectStyles } from '@semantic-components/presets';

// shadcn's native select in maia (shadcn-reference/presets/maia/native-select.tsx): the
// select and the chevron's place. Its wrapper (our container) is the same in every style: in the part.
export const nativeSelect: ScNativeSelectStyles = {
  select:
    'h-9 w-full min-w-0 appearance-none rounded-4xl border border-input bg-input/30 py-1 pe-8 ps-3 text-sm transition-colors outline-none select-none selection:bg-primary selection:text-primary-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed aria-invalid:border-destructive aria-invalid:ring-[3px] aria-invalid:ring-destructive/20 data-[size=sm]:h-8 dark:bg-input/30 dark:hover:bg-input/50 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40',
  icon: 'pointer-events-none absolute top-1/2 end-3.5 size-4 -translate-y-1/2 text-muted-foreground select-none',
};
