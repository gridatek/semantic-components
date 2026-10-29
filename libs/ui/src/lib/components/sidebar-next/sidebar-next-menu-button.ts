import {
  Directive,
  booleanAttribute,
  computed,
  inject,
  input,
} from '@angular/core';
import { type VariantProps, cva } from 'class-variance-authority';
import { bindInput, cn } from '../../utils';
import { ScSidebarNextMenuTooltip } from './sidebar-next-menu-tooltip';
import { ScSidebarNextState } from './sidebar-next-state';

const sidebarMenuButtonVariants = cva(
  'peer/menu-button group/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-start text-sm ring-sidebar-ring outline-hidden transition-[width,height,padding] group-has-data-[slot=sidebar-menu-action]/menu-item:pe-8 group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 aria-expanded:hover:bg-sidebar-accent aria-expanded:hover:text-sidebar-accent-foreground data-active:bg-sidebar-accent data-active:font-medium data-active:text-sidebar-accent-foreground [&_svg]:size-4 [&_svg]:shrink-0 [&>span:last-child]:truncate',
  {
    variants: {
      variant: {
        default: 'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
        outline:
          'bg-background shadow-[0_0_0_1px_var(--sidebar-border)] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_var(--sidebar-accent)]',
      },
      size: {
        default: 'h-8 text-sm',
        sm: 'h-7 text-xs',
        lg: 'h-12 text-sm group-data-[collapsible=icon]:p-0!',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  },
);

export type ScSidebarNextMenuButtonVariants = VariantProps<
  typeof sidebarMenuButtonVariants
>;

/**
 * A menu item's button or link: your icon, then its text (in a `span`, kept
 * as its name when collapsed to icons). `active` for the page shown
 * (`aria-current="page"`). `tooltip`: shown (our Tooltip) only while
 * collapsed to icons. On phones, following a link closes the sheet.
 */
@Directive({
  selector: 'a[scSidebarNextMenuButton], button[scSidebarNextMenuButton]',
  hostDirectives: [
    {
      directive: ScSidebarNextMenuTooltip,
      inputs: ['scTooltipTrigger: tooltip'],
    },
  ],
  host: {
    'data-slot': 'sidebar-menu-button',
    '[attr.data-active]': 'active() ? "" : null',
    '[attr.aria-current]': 'active() ? "page" : null',
    '[attr.data-size]': 'size()',
    '[class]': 'class()',
    '(click)': 'onClick($event)',
  },
})
export class ScSidebarNextMenuButton {
  private readonly state = inject(ScSidebarNextState, { optional: true });
  private readonly tooltip = inject(ScSidebarNextMenuTooltip);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant =
    input<ScSidebarNextMenuButtonVariants['variant']>('default');
  readonly size = input<ScSidebarNextMenuButtonVariants['size']>('default');
  /** The page shown. */
  readonly active = input(false, { transform: booleanAttribute });

  protected readonly class = computed(() =>
    cn(
      sidebarMenuButtonVariants({ variant: this.variant(), size: this.size() }),
      this.classInput(),
    ),
  );

  constructor() {
    // Only collapsed to icons, beside the page: there the text is hidden.
    bindInput(
      this.tooltip.disabled,
      computed(
        () =>
          !this.tooltip.content() ||
          this.state?.state() !== 'collapsed' ||
          !!this.state?.isMobile(),
      ),
    );
    bindInput(this.tooltip.position, 'right');
  }

  protected onClick(event: Event): void {
    // A link followed on a phone: the sheet goes.
    if (
      this.state?.isMobile() &&
      (event.currentTarget as HTMLElement).tagName === 'A'
    )
      this.state.openMobile.set(false);
  }
}
