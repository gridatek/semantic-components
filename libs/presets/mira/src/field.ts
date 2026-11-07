import type { ScFieldStyles } from '@semantic-components/presets';

// shadcn's field in mira (shadcn-reference/presets/mira/field.tsx): FieldContent is our
// field body, FieldError our field errors.
export const field: ScFieldStyles = {
  set: 'flex flex-col gap-4 has-[>[data-slot=checkbox-group]]:gap-3 has-[>[data-slot=radio-group]]:gap-3',
  legend:
    'mb-2 font-medium data-[variant=label]:text-xs/relaxed data-[variant=legend]:text-sm',
  group:
    'group/field-group @container/field-group flex w-full flex-col gap-4 data-[slot=checkbox-group]:gap-3 *:data-[slot=field-group]:gap-4',
  field: 'group/field flex w-full gap-2 data-[invalid=true]:text-destructive',
  body: 'group/field-body flex flex-1 flex-col gap-0.5 leading-snug',
  title:
    'flex w-fit items-center gap-2 text-xs/relaxed font-medium group-data-[disabled=true]/field:opacity-50',
  description:
    'text-start text-xs/relaxed leading-normal font-normal text-muted-foreground group-has-data-[orientation=horizontal]/field:text-balance [[data-variant=legend]+&]:-mt-1.5 last:mt-0 nth-last-2:-mt-1 [&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary',
  separator:
    'relative -my-2 h-5 text-xs/relaxed group-data-[variant=outline]/field-group:-mb-2',
  error: 'text-xs/relaxed font-normal text-destructive',
};
