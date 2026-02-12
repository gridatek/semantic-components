import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { SiChevronDownIcon } from '@semantic-icons/lucide-icons';
import { cn } from '../../utils';
import { ScNavigationMenuItem } from './navigation-menu-item';

@Component({
  selector: 'button[sc-navigation-menu-trigger]',
  imports: [SiChevronDownIcon],
  hostDirectives: [CdkOverlayOrigin],
  template: `
    <ng-content />
    <svg
      si-chevron-down-icon
      class="relative top-[1px] ml-1 size-3 transition duration-300 group-data-[state=open]:rotate-180"
    ></svg>
  `,
  host: {
    'data-slot': 'navigation-menu-trigger',
    type: 'button',
    '[class]': 'class()',
    '[attr.aria-expanded]': 'menuItem.open()',
    '[attr.data-state]': 'menuItem.open() ? "open" : "closed"',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScNavigationMenuTrigger {
  readonly menuItem = inject(ScNavigationMenuItem);
  readonly overlayOrigin = inject(CdkOverlayOrigin);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium',
      'hover:bg-accent hover:text-accent-foreground',
      'focus:bg-accent focus:text-accent-foreground',
      'disabled:pointer-events-none disabled:opacity-50',
      'data-[state=open]:hover:bg-accent data-[state=open]:text-accent-foreground data-[state=open]:focus:bg-accent data-[state=open]:bg-accent/50',
      'focus-visible:ring-ring/50 outline-none transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1',
      '[&_svg]:pointer-events-none',
      this.classInput(),
    ),
  );
}
