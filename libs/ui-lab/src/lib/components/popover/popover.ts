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
    tabindex: '-1',
    'data-slot': 'popover',
    '[attr.data-state]': 'state()',
    '[class]': 'class()',
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
      'bg-popover text-popover-foreground z-50 w-72 rounded-md border p-4 shadow-md outline-none',
      'animate-in fade-in-0 zoom-in-95 duration-200',
      'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=closed]:duration-200',
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
