import { cva } from 'class-variance-authority';

// shadcn's input group in sera (shadcn-reference/presets/sera/input-group.tsx), adapted:
// the group gives its input or textarea (`[data-slot=control]`, shadcn's
// `input-group-control`) the classes shadcn's InputGroupInput and
// InputGroupTextarea carry.
export const inputGroup =
  'group/input-group relative flex h-10 w-full min-w-0 items-center rounded-none border border-transparent border-b-input bg-transparent transition-[color,border-color] outline-none in-data-[slot=combobox-content]:focus-within:border-inherit in-data-[slot=combobox-content]:focus-within:ring-0 has-data-[align=block-end]:rounded-none has-data-[align=block-start]:rounded-none has-[[data-slot=control]:focus-visible]:border-b-ring has-[[data-slot][aria-invalid=true]]:border-b-destructive has-[textarea]:rounded-none has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-end]]:flex-col has-[>[data-align=block-start]]:h-auto has-[>[data-align=block-start]]:flex-col has-[>textarea]:h-auto dark:has-[[data-slot][aria-invalid=true]]:border-b-destructive/50 has-[>[data-align=block-end]]:[&>input]:pt-3 has-[>[data-align=block-start]]:[&>input]:pb-3 has-[[data-slot=segmented-date-input-segment]:focus-visible]:border-b-ring has-[[data-slot=time-input-segment]:focus-visible]:border-b-ring has-[[data-slot=select-trigger]:focus-visible]:border-b-ring has-[[data-slot=multiselect-trigger]:focus-visible]:border-b-ring has-[[data-slot=combobox-trigger]:focus-visible]:border-b-ring [&>input[data-slot=control]]:flex-1 [&>input[data-slot=control]]:border-0 [&>input[data-slot=control]]:bg-transparent [&>input[data-slot=control]]:ring-0 [&>input[data-slot=control]]:group-has-[>[data-align=inline-end]]/input-group:pe-2 [&>input[data-slot=control]]:group-has-[>[data-align=inline-start]]/input-group:ps-2 [&>input[data-slot=control]]:focus-visible:ring-0 [&>input[data-slot=control]]:aria-invalid:ring-0 [&>input[data-slot=control]]:dark:bg-transparent [&>textarea[data-slot=control]]:flex-1 [&>textarea[data-slot=control]]:resize-none [&>textarea[data-slot=control]]:border-0 [&>textarea[data-slot=control]]:bg-transparent [&>textarea[data-slot=control]]:py-2.5 [&>textarea[data-slot=control]]:ring-0 [&>textarea[data-slot=control]]:focus-visible:ring-0 [&>textarea[data-slot=control]]:aria-invalid:ring-0 [&>textarea[data-slot=control]]:dark:bg-transparent';

export const inputGroupAddon = cva(
  "flex h-auto cursor-text items-center justify-center gap-2 py-2 text-sm font-medium text-muted-foreground select-none group-data-[disabled=true]/input-group:opacity-50 **:data-[slot=kbd]:rounded-none **:data-[slot=kbd]:bg-muted-foreground/10 **:data-[slot=kbd]:px-1.5 [&>svg:not([class*='size-'])]:size-3.5",
  {
    variants: {
      align: {
        'inline-start': 'order-first',
        'inline-end': 'order-last',
        'block-start':
          'order-first w-full justify-start pt-3 group-has-[>input]/input-group:pt-3.5 [.border-b]:pb-3.5',
        'block-end':
          'order-last w-full justify-start pb-3 group-has-[>input]/input-group:pb-3.5 [.border-t]:pt-3.5',
      },
    },
    defaultVariants: { align: 'inline-start' },
  },
);

/** Over the preset's button: `button[scInputGroupButton]`. */
export const inputGroupButton = cva(
  'flex items-center gap-2 rounded-none text-sm shadow-none',
  {
    variants: {
      size: {
        xs: "h-6 gap-1 rounded-none px-1.5 text-xs [&>svg:not([class*='size-'])]:size-3.5",
        sm: '',
        'icon-xs': 'size-6 p-0 text-xs has-[>svg]:p-0',
        'icon-sm': 'size-8 p-0 has-[>svg]:p-0',
      },
    },
    defaultVariants: { size: 'xs' },
  },
);

export const inputGroupText =
  "flex items-center gap-2 text-sm text-muted-foreground [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-3.5";
