import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  input,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';
import { ScPopoverProvider } from './popover-provider';

type ScPopoverState = 'open' | 'closed';

@Component({
  selector: 'div[sc-popover]',
  template: `
    <ng-content />
  `,
  host: {
    role: 'dialog',
    'data-slot': 'popover',
    '[class]': 'class()',
    '[attr.data-open]': 'state() === "open" ? true : null',
    '[attr.data-closed]': 'state() === "closed" ? true : null',
    '[attr.data-side]': 'popover.side()',
    '(animationend)': 'onAnimationEnd($event)',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScPopover {
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  readonly popover = inject(ScPopoverProvider);
  readonly classInput = input<string>('', { alias: 'class' });
  readonly state = signal<ScPopoverState>('closed');

  protected readonly class = computed(() =>
    cn(
      'bg-popover text-popover-foreground z-50 w-72 rounded-lg ring-1 ring-foreground/10 flex flex-col gap-2.5 p-2.5 text-sm shadow-md outline-hidden',
      'data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 duration-100',
      'data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95',
      'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
      this.classInput(),
    ),
  );

  constructor() {
    // Sync state with provider's open signal
    effect(() => {
      const isOpen = this.popover.open();
      this.state.set(isOpen ? 'open' : 'closed');
    });
  }

  protected onAnimationEnd(event: AnimationEvent): void {
    // Only trigger cleanup when close animation completes
    if (
      this.state() === 'closed' &&
      event.target === this.elementRef.nativeElement
    ) {
      this.popover.onPopoverAnimationComplete();
    }
  }
}
