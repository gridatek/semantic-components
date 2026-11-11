import type { ScNativeSelectStyles } from '@semantic-components/presets';

// shadcn's native select in sera (shadcn-reference/presets/sera/native-select.tsx): the
// select and the chevron's place. Its wrapper (our container) is the same in every style: in the part.
export const nativeSelect: ScNativeSelectStyles = {
  select:
    'h-10 w-full min-w-0 appearance-none rounded-none border border-transparent border-b-input bg-transparent py-2 pe-8 ps-0 text-sm transition-[color,border-color] outline-none select-none selection:bg-primary selection:text-primary-foreground placeholder:text-muted-foreground focus-visible:border-b-ring disabled:pointer-events-none disabled:cursor-not-allowed aria-invalid:border-b-destructive data-[size=sm]:h-9 dark:aria-invalid:border-b-destructive/50',
  icon: 'pointer-events-none absolute top-1/2 end-0 size-3.5 -translate-y-1/2 text-muted-foreground select-none',
};
