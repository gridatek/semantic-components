import { cva } from 'class-variance-authority';

// shadcn's input group in maia (shadcn-reference/presets/maia/input-group.tsx), adapted:
// the group gives its input or textarea (`[data-slot=control]`, shadcn's
// `input-group-control`) the classes shadcn's InputGroupInput and
// InputGroupTextarea carry.
export const inputGroup =
  'group/input-group relative flex h-9 w-full min-w-0 items-center rounded-4xl border border-input bg-input/30 transition-colors outline-none in-data-[slot=combobox-content]:focus-within:border-inherit in-data-[slot=combobox-content]:focus-within:ring-0 has-data-[align=block-end]:rounded-2xl has-data-[align=block-start]:rounded-2xl has-[[data-slot=control]:focus-visible]:border-ring has-[[data-slot=control]:focus-visible]:ring-[3px] has-[[data-slot=control]:focus-visible]:ring-ring/50 has-[[data-slot][aria-invalid=true]]:border-destructive has-[[data-slot][aria-invalid=true]]:ring-[3px] has-[[data-slot][aria-invalid=true]]:ring-destructive/20 has-[textarea]:rounded-xl has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-end]]:flex-col has-[>[data-align=block-start]]:h-auto has-[>[data-align=block-start]]:flex-col has-[>textarea]:h-auto dark:has-[[data-slot][aria-invalid=true]]:ring-destructive/40 has-[>[data-align=block-end]]:[&>input]:pt-3 has-[>[data-align=block-start]]:[&>input]:pb-3 has-[>[data-align=inline-end]]:[&>input]:pe-1.5 has-[>[data-align=inline-start]]:[&>input]:ps-1.5 has-[[data-slot=segmented-date-input-segment]:focus-visible]:border-ring has-[[data-slot=segmented-date-input-segment]:focus-visible]:ring-[3px] has-[[data-slot=segmented-date-input-segment]:focus-visible]:ring-ring/50 has-[[data-slot=time-input-segment]:focus-visible]:border-ring has-[[data-slot=time-input-segment]:focus-visible]:ring-[3px] has-[[data-slot=time-input-segment]:focus-visible]:ring-ring/50 has-[[data-slot=select-trigger]:focus-visible]:border-ring has-[[data-slot=select-trigger]:focus-visible]:ring-[3px] has-[[data-slot=select-trigger]:focus-visible]:ring-ring/50 has-[[data-slot=multiselect-trigger]:focus-visible]:border-ring has-[[data-slot=multiselect-trigger]:focus-visible]:ring-[3px] has-[[data-slot=multiselect-trigger]:focus-visible]:ring-ring/50 has-[[data-slot=combobox-trigger]:focus-visible]:border-ring has-[[data-slot=combobox-trigger]:focus-visible]:ring-[3px] has-[[data-slot=combobox-trigger]:focus-visible]:ring-ring/50 [&>input[data-slot=control]]:flex-1 [&>input[data-slot=control]]:rounded-none [&>input[data-slot=control]]:border-0 [&>input[data-slot=control]]:bg-transparent [&>input[data-slot=control]]:shadow-none [&>input[data-slot=control]]:ring-0 [&>input[data-slot=control]]:focus-visible:ring-0 [&>input[data-slot=control]]:aria-invalid:ring-0 [&>input[data-slot=control]]:dark:bg-transparent [&>textarea[data-slot=control]]:flex-1 [&>textarea[data-slot=control]]:resize-none [&>textarea[data-slot=control]]:rounded-none [&>textarea[data-slot=control]]:border-0 [&>textarea[data-slot=control]]:bg-transparent [&>textarea[data-slot=control]]:py-2 [&>textarea[data-slot=control]]:shadow-none [&>textarea[data-slot=control]]:ring-0 [&>textarea[data-slot=control]]:focus-visible:ring-0 [&>textarea[data-slot=control]]:aria-invalid:ring-0 [&>textarea[data-slot=control]]:dark:bg-transparent';

export const inputGroupAddon = cva(
  "flex h-auto cursor-text items-center justify-center gap-2 py-2 text-sm font-medium text-muted-foreground select-none group-data-[disabled=true]/input-group:opacity-50 **:data-[slot=kbd]:rounded-4xl **:data-[slot=kbd]:bg-muted-foreground/10 **:data-[slot=kbd]:px-1.5 [&>svg:not([class*='size-'])]:size-4",
  {
    variants: {
      align: {
        'inline-start':
          'order-first ps-3 has-[>button]:-ms-1 has-[>kbd]:ms-[-0.15rem]',
        'inline-end':
          'order-last pe-3 has-[>button]:-me-1 has-[>kbd]:me-[-0.15rem]',
        'block-start':
          'order-first w-full justify-start px-3 pt-3 group-has-[>input]/input-group:pt-3 [.border-b]:pb-3',
        'block-end':
          'order-last w-full justify-start px-3 pb-3 group-has-[>input]/input-group:pb-3 [.border-t]:pt-3',
      },
    },
    defaultVariants: { align: 'inline-start' },
  },
);

/** Over the preset's button: `button[scInputGroupButton]`. */
export const inputGroupButton = cva(
  'flex items-center gap-2 rounded-4xl text-sm shadow-none',
  {
    variants: {
      size: {
        xs: "h-6 gap-1 px-1.5 [&>svg:not([class*='size-'])]:size-3.5",
        sm: '',
        'icon-xs': 'size-6 p-0 has-[>svg]:p-0',
        'icon-sm': 'size-8 p-0 has-[>svg]:p-0',
      },
    },
    defaultVariants: { size: 'xs' },
  },
);

export const inputGroupText =
  "flex items-center gap-2 text-sm text-muted-foreground [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4";
