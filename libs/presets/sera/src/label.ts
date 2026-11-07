import type { ScLabelStyles } from '@semantic-components/presets';

// shadcn's label in sera (shadcn-reference/presets/sera/label.tsx, and FieldLabel in field.tsx).
export const label: ScLabelStyles = {
  label:
    'flex items-center gap-2 text-xs font-semibold tracking-wide uppercase select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50 peer-data-[slot=checkbox]:text-sm peer-data-[slot=checkbox]:font-normal peer-data-[slot=checkbox]:tracking-normal peer-data-[slot=checkbox]:normal-case peer-data-[slot=radio]:text-sm peer-data-[slot=radio]:font-normal peer-data-[slot=radio]:tracking-normal peer-data-[slot=radio]:normal-case peer-data-[slot=switch]:text-sm peer-data-[slot=switch]:font-normal peer-data-[slot=switch]:tracking-normal peer-data-[slot=switch]:normal-case',
  field:
    'group/field-label peer/field-label flex w-fit gap-2 leading-relaxed group-data-[disabled=true]/field:opacity-50 has-checked:border-primary/30 has-checked:bg-primary/5 has-[>[data-slot=field]]:rounded-none has-[>[data-slot=field]]:border has-[>[data-slot=field]]:not-has-[:disabled,[data-disabled]]:hover:bg-muted/50 has-[>[data-slot=field]]:has-[:focus-visible]:ring-2 has-[>[data-slot=field]]:has-[:focus-visible]:ring-ring/30 *:data-[slot=field]:p-4 dark:has-checked:border-primary/20 dark:has-checked:bg-primary/10 has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col',
};
