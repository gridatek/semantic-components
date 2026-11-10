import type { ScToggleGroupStyles } from '@semantic-components/presets';

// shadcn's toggle group in maia (shadcn-reference/presets/maia/toggle-group.tsx): the group,
// and an item's place in it (its look is the toggle key's). They read the group's data-orientation
// (data-horizontal / data-vertical), data-size, data-spacing, and the item's data-variant.
export const toggleGroup: ScToggleGroupStyles = {
  group:
    'group/toggle-group flex w-fit flex-row items-center gap-[--spacing(var(--gap))] data-[spacing=0]:data-[variant=outline]:rounded-4xl data-vertical:flex-col data-vertical:items-stretch',
  item: 'shrink-0 group-data-[spacing=0]/toggle-group:rounded-none group-data-[spacing=0]/toggle-group:px-3 group-data-[spacing=0]/toggle-group:shadow-none focus:z-10 focus-visible:z-10 group-data-[spacing=0]/toggle-group:has-data-[icon=inline-end]:pe-2.5 group-data-[spacing=0]/toggle-group:has-data-[icon=inline-start]:ps-2.5 group-data-horizontal/toggle-group:data-[spacing=0]:first:rounded-s-3xl group-data-vertical/toggle-group:data-[spacing=0]:first:rounded-t-3xl group-data-horizontal/toggle-group:data-[spacing=0]:last:rounded-e-3xl group-data-vertical/toggle-group:data-[spacing=0]:last:rounded-b-3xl data-[state=on]:bg-muted group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:border-s-0 group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:border-t-0 group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-s group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-t',
};
