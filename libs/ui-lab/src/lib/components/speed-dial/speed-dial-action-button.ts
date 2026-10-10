import { MenuItem } from '@angular/aria/menu';
import {
  Directive,
  ElementRef,
  HostAttributeToken,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn, setInput } from '@semantic-components/ui';
import { SC_SPEED_DIAL } from './speed-dial-types';

/**
 * An action (`role="menuitem"` via aria `MenuItem`). Enter/Space fire the
 * button's own `click`, so `(click)` handlers work from the keyboard too; aria
 * then closes the dial and returns focus to the trigger.
 *
 * A `disabled` attribute disables the item but keeps it focusable
 * (`aria-disabled`), as menu items should be.
 */
@Directive({
  selector: 'button[scSpeedDialActionButton]',
  hostDirectives: [MenuItem],
  host: {
    type: 'button',
    // A native disabled button can't take focus, which breaks the menu's
    // roving focus; aria sets aria-disabled instead.
    '[attr.disabled]': 'null',
    '[class]': 'class()',
    '(keydown.enter)': 'activate($event)',
    '(keydown.space)': 'activate($event)',
  },
})
export class ScSpeedDialActionButton {
  private readonly speedDial = inject(SC_SPEED_DIAL);
  private readonly menuItem = inject(MenuItem);
  private readonly element = inject<ElementRef<HTMLButtonElement>>(ElementRef);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'inline-flex items-center justify-center rounded-full',
      'bg-secondary text-secondary-foreground',
      'shadow-md hover:shadow-lg',
      'transition-all duration-200',
      'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      'aria-disabled:opacity-50 aria-disabled:cursor-not-allowed aria-disabled:hover:shadow-md',
      this.sizeClasses(),
      this.classInput(),
    ),
  );

  constructor() {
    const disabled = inject(new HostAttributeToken('disabled'), {
      optional: true,
    });
    if (disabled !== null) setInput(this.menuItem.disabled, true);
  }

  protected activate(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    if (this.menuItem.disabled()) return;
    this.element.nativeElement.click();
  }

  private sizeClasses(): string {
    const sizes = {
      sm: 'h-10 w-10',
      md: 'h-12 w-12',
      lg: 'h-14 w-14',
    };
    return sizes[this.speedDial.size()];
  }
}
