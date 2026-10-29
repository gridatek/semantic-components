import { Directive, ElementRef, computed, inject, input } from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn, ɵwarnIfUnnamed } from '../../utils';
import { ScButtonVariants } from '../button/button';
import { ScMessageScrollerState } from './message-scroller-state';

/**
 * Jumps to the end (or the start), shown when there is more that way — inert
 * and out of the tab order when not. Your arrow (pointing down) and its name
 * inside; turned up for `start`.
 */
@Directive({
  selector: 'button[scMessageScrollerButton]',
  host: {
    'data-slot': 'message-scroller-button',
    type: 'button',
    '[attr.data-direction]': 'direction()',
    '[attr.data-active]': 'active() ? "true" : "false"',
    '[attr.inert]': 'active() ? null : ""',
    '[attr.tabindex]': 'active() ? null : -1',
    '[class]': 'class()',
    '(click)': 'onClick()',
  },
})
export class ScMessageScrollerButton {
  private readonly buttonStyles = injectPreset().button;
  private readonly state = inject(ScMessageScrollerState);
  private readonly element = inject<ElementRef<HTMLButtonElement>>(ElementRef);

  constructor() {
    ɵwarnIfUnnamed('scMessageScrollerButton');
  }

  readonly classInput = input<string>('', { alias: 'class' });
  readonly direction = input<'start' | 'end'>('end');
  readonly behavior = input<ScrollBehavior>('smooth');
  readonly variant = input<ScButtonVariants['variant']>('secondary');
  readonly size = input<ScButtonVariants['size']>('icon-sm');

  protected readonly active = computed(() =>
    this.direction() === 'start'
      ? this.state.scrollable().start
      : this.state.scrollable().end,
  );

  protected readonly class = computed(() =>
    cn(
      this.buttonStyles({ variant: this.variant(), size: this.size() }),
      'border-border bg-background text-foreground hover:bg-muted hover:text-foreground absolute inset-s-1/2 -translate-x-1/2 transition-[translate,scale,opacity] duration-200 data-[active=false]:pointer-events-none data-[active=false]:scale-95 data-[active=false]:opacity-0 data-[active=false]:duration-400 data-[active=false]:ease-[cubic-bezier(0.7,0,0.84,0)] data-[active=true]:translate-y-0 data-[active=true]:scale-100 data-[active=true]:opacity-100 data-[active=true]:ease-[cubic-bezier(0.23,1,0.32,1)] data-[direction=end]:bottom-4 data-[direction=end]:data-[active=false]:translate-y-full data-[direction=start]:top-4 data-[direction=start]:data-[active=false]:-translate-y-full rtl:translate-x-1/2 data-[direction=start]:[&_svg]:rotate-180',
      this.classInput(),
    ),
  );

  protected onClick(): void {
    if (!this.active()) return;
    this.element.nativeElement.blur();
    const behavior = this.behavior();
    if (this.direction() === 'start') this.state.scrollToStart({ behavior });
    else this.state.scrollToEnd({ behavior });
  }
}
