import { cva } from 'class-variance-authority';

// shadcn's input group in mira (shadcn-reference/presets/mira/input-group.tsx), adapted:
// the group gives its input or textarea (`[data-slot=control]`, shadcn's
// `input-group-control`) the classes shadcn's InputGroupInput and
// InputGroupTextarea carry.
export const inputGroup =
  'group/input-group relative flex h-7 w-full min-w-0 items-center rounded-md border border-input bg-input/20 transition-colors outline-none in-data-[slot=combobox-content]:focus-within:border-inherit in-data-[slot=combobox-content]:focus-within:ring-0 has-data-[align=block-end]:rounded-md has-data-[align=block-start]:rounded-md has-[[data-slot=control]:focus-visible]:border-ring has-[[data-slot=control]:focus-visible]:ring-2 has-[[data-slot=control]:focus-visible]:ring-ring/30 has-[[data-slot][aria-invalid=true]]:border-destructive has-[[data-slot][aria-invalid=true]]:ring-2 has-[[data-slot][aria-invalid=true]]:ring-destructive/20 has-[textarea]:rounded-md has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-end]]:flex-col has-[>[data-align=block-start]]:h-auto has-[>[data-align=block-start]]:flex-col has-[>textarea]:h-auto dark:bg-input/30 dark:has-[[data-slot][aria-invalid=true]]:ring-destructive/40 has-[>[data-align=block-end]]:[&>input]:pt-3 has-[>[data-align=block-start]]:[&>input]:pb-3 has-[>[data-align=inline-end]]:[&>input]:pe-1.5 has-[>[data-align=inline-start]]:[&>input]:ps-1.5 has-[[data-slot=segmented-date-input-segment]:focus-visible]:border-ring has-[[data-slot=segmented-date-input-segment]:focus-visible]:ring-2 has-[[data-slot=segmented-date-input-segment]:focus-visible]:ring-ring/30 has-[[data-slot=time-input-segment]:focus-visible]:border-ring has-[[data-slot=time-input-segment]:focus-visible]:ring-2 has-[[data-slot=time-input-segment]:focus-visible]:ring-ring/30 has-[[data-slot=select-trigger]:focus-visible]:border-ring has-[[data-slot=select-trigger]:focus-visible]:ring-2 has-[[data-slot=select-trigger]:focus-visible]:ring-ring/30 has-[[data-slot=multiselect-trigger]:focus-visible]:border-ring has-[[data-slot=multiselect-trigger]:focus-visible]:ring-2 has-[[data-slot=multiselect-trigger]:focus-visible]:ring-ring/30 has-[[data-slot=combobox-trigger]:focus-visible]:border-ring has-[[data-slot=combobox-trigger]:focus-visible]:ring-2 has-[[data-slot=combobox-trigger]:focus-visible]:ring-ring/30 [&>input[data-slot=control]]:flex-1 [&>input[data-slot=control]]:rounded-none [&>input[data-slot=control]]:border-0 [&>input[data-slot=control]]:bg-transparent [&>input[data-slot=control]]:shadow-none [&>input[data-slot=control]]:ring-0 [&>input[data-slot=control]]:focus-visible:ring-0 [&>input[data-slot=control]]:aria-invalid:ring-0 [&>input[data-slot=control]]:dark:bg-transparent [&>textarea[data-slot=control]]:flex-1 [&>textarea[data-slot=control]]:resize-none [&>textarea[data-slot=control]]:rounded-none [&>textarea[data-slot=control]]:border-0 [&>textarea[data-slot=control]]:bg-transparent [&>textarea[data-slot=control]]:py-2 [&>textarea[data-slot=control]]:shadow-none [&>textarea[data-slot=control]]:ring-0 [&>textarea[data-slot=control]]:focus-visible:ring-0 [&>textarea[data-slot=control]]:aria-invalid:ring-0 [&>textarea[data-slot=control]]:dark:bg-transparent';

export const inputGroupAddon = cva(
  "flex h-auto cursor-text items-center justify-center gap-1 py-2 text-xs/relaxed font-medium text-muted-foreground select-none group-data-[disabled=true]/input-group:opacity-50 **:data-[slot=kbd]:rounded-[calc(var(--radius-sm)-2px)] **:data-[slot=kbd]:bg-muted-foreground/10 **:data-[slot=kbd]:px-1 **:data-[slot=kbd]:text-[0.625rem] [&>svg:not([class*='size-'])]:size-3.5",
  {
    variants: {
      align: {
        'inline-start':
          'order-first ps-2 has-[>button]:ms-[-0.275rem] has-[>kbd]:ms-[-0.275rem]',
        'inline-end':
          'order-last pe-2 has-[>button]:me-[-0.275rem] has-[>kbd]:me-[-0.275rem]',
        'block-start':
          'order-first w-full justify-start px-2 pt-2 group-has-[>input]/input-group:pt-2 [.border-b]:pb-2',
        'block-end':
          'order-last w-full justify-start px-2 pb-2 group-has-[>input]/input-group:pb-2 [.border-t]:pt-2',
      },
    },
    defaultVariants: { align: 'inline-start' },
  },
);

/** Over the preset's button: `button[scInputGroupButton]`. */
export const inputGroupButton = cva(
  'flex items-center gap-2 rounded-md text-xs/relaxed shadow-none',
  {
    variants: {
      size: {
        xs: "h-5 gap-1 rounded-[calc(var(--radius-sm)-2px)] px-1 [&>svg:not([class*='size-'])]:size-3",
        sm: 'gap-1',
        'icon-xs': 'size-6 p-0 has-[>svg]:p-0',
        'icon-sm': 'size-7 p-0 has-[>svg]:p-0',
      },
    },
    defaultVariants: { size: 'xs' },
  },
);

export const inputGroupText =
  "flex items-center gap-2 text-xs/relaxed text-muted-foreground [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4";
