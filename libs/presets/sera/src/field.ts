import type { ScFieldStyles } from '@semantic-components/presets';

// shadcn's field in sera (shadcn-reference/presets/sera/field.tsx): FieldContent is our
// field content wrapper, FieldError our field errors.
export const field: ScFieldStyles = {
  set: 'flex flex-col gap-6 has-[>[data-slot=checkbox-group]]:gap-3 has-[>[data-slot=radio-group]]:gap-3',
  legend:
    'mb-3 font-semibold uppercase data-[variant=label]:text-xs data-[variant=legend]:text-xs',
  group:
    'group/field-group @container/field-group flex w-full flex-col gap-10 data-[slot=checkbox-group]:gap-3 *:data-[slot=field-group]:gap-4',
  field: 'group/field flex w-full gap-3 data-[invalid=true]:text-destructive',
  contentWrapper:
    'group/field-content-wrapper flex flex-1 flex-col gap-1 leading-snug',
  title:
    'flex w-fit items-center gap-2 text-xs font-semibold uppercase group-data-[disabled=true]/field:opacity-50 in-data-[slot=label]:font-semibold',
  description:
    'text-start text-sm leading-normal font-normal tracking-normal text-muted-foreground normal-case group-has-data-[orientation=horizontal]/field:text-balance [[data-variant=legend]+&]:-mt-1.5 last:mt-0 nth-last-2:-mt-1 [&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary',
  separator:
    'relative -my-2 h-5 text-sm group-data-[variant=outline]/field-group:-mb-2',
  error: 'text-sm font-normal text-destructive',
};
