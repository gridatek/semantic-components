import type { ScToggleGroupStyles } from '@semantic-components/presets';

// shadcn's toggle group in rhea (shadcn-reference/presets/rhea/toggle-group.tsx): the group,
// and an item's place in it (its look is the toggle key's). They read the group's data-orientation
// (data-horizontal / data-vertical), data-size, data-spacing, and the item's data-variant.
export const toggleGroup: ScToggleGroupStyles = {
  group:
    'group/toggle-group flex w-fit flex-row items-center gap-[--spacing(var(--gap))] data-[spacing=0]:data-[variant=outline]:rounded-2xl data-vertical:flex-col data-vertical:items-stretch',
  item: 'shrink-0 group-data-[spacing=0]/toggle-group:rounded-none group-data-[spacing=0]/toggle-group:px-2 group-data-[spacing=0]/toggle-group:shadow-none focus:z-10 focus-visible:z-10 group-data-[spacing=0]/toggle-group:has-data-[icon=inline-end]:pe-1.5 group-data-[spacing=0]/toggle-group:has-data-[icon=inline-start]:ps-1.5 group-data-horizontal/toggle-group:data-[spacing=0]:first:rounded-s-2xl group-data-vertical/toggle-group:data-[spacing=0]:first:rounded-t-2xl group-data-horizontal/toggle-group:data-[spacing=0]:last:rounded-e-2xl group-data-vertical/toggle-group:data-[spacing=0]:last:rounded-b-2xl data-[state=on]:bg-muted group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:border-s-0 group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:border-t-0 group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-s group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-t',
};
