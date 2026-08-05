import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import {
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { SiChevronDownIcon } from '@semantic-icons/lucide-icons';
import { cn } from '../../utils';
import { ScNavigationMenuItem } from './navigation-menu-item';
import { ScNavigationMenuTriggerIcon } from './navigation-menu-trigger-icon';

@Component({
  selector: 'button[scNavigationMenuTrigger]',
  imports: [SiChevronDownIcon, ScNavigationMenuTriggerIcon],
  hostDirectives: [CdkOverlayOrigin],
  template: `
    <ng-content />
    <svg siChevronDownIcon scNavigationMenuTriggerIcon></svg>
  `,
  host: {
    type: 'button',
    '[class]': 'class()',
    '[attr.aria-expanded]': 'menuItem.open()',
    '[attr.data-state]': 'menuItem.open() ? "open" : "closed"',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScNavigationMenuTrigger {
  readonly menuItem = inject(ScNavigationMenuItem);
  readonly overlayOrigin = inject(CdkOverlayOrigin);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'group inline-flex w-max items-center justify-center rounded-lg px-2.5 py-1.5 text-sm font-medium',
      'hover:bg-muted focus:bg-muted',
      'disabled:pointer-events-none disabled:opacity-50',
      'data-[state=open]:hover:bg-muted data-[state=open]:focus:bg-muted data-[state=open]:bg-muted/50',
      'focus-visible:ring-ring/50 outline-none transition-all focus-visible:ring-3 focus-visible:outline-1',
      '[&_svg]:pointer-events-none',
      this.classInput(),
    ),
  );
}
