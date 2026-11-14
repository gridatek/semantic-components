import type { ScFieldStyles } from '@semantic-components/presets';

// shadcn's field in nova (shadcn-reference/presets/nova/field.tsx): FieldContent is our
// field content wrapper, FieldError our field errors.
export const field: ScFieldStyles = {
  set: 'flex flex-col gap-4 has-[>[data-slot=checkbox-group]]:gap-3 has-[>[data-slot=radio-group]]:gap-3',
  legend:
    'mb-1.5 font-medium data-[variant=label]:text-sm data-[variant=legend]:text-base',
  group:
    'group/field-group @container/field-group flex w-full flex-col gap-5 data-[slot=checkbox-group]:gap-3 *:data-[slot=field-group]:gap-4',
  field: 'group/field flex w-full gap-2 data-[invalid=true]:text-destructive',
  contentWrapper:
    'group/field-content-wrapper flex flex-1 flex-col gap-0.5 leading-snug',
  title:
    'flex w-fit items-center gap-2 text-sm font-medium group-data-[disabled=true]/field:opacity-50',
  description:
    'text-start text-sm leading-normal font-normal text-muted-foreground group-has-data-[orientation=horizontal]/field:text-balance [[data-variant=legend]+&]:-mt-1.5 last:mt-0 nth-last-2:-mt-1 [&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary',
  separator:
    'relative -my-2 h-5 text-sm group-data-[variant=outline]/field-group:-mb-2',
  error: 'text-sm font-normal text-destructive',
};
