import {
  computed,
  Directive,
  effect,
  ElementRef,
  inject,
  input,
  signal,
} from '@angular/core';
import { cn } from '../../utils';
import { ScDrawerProvider } from './drawer-provider';

type ScDrawerState = 'idle' | 'open' | 'closed';

@Directive({
  selector: 'div[scDrawer]',
  host: {
    'data-slot': 'drawer',
    role: 'dialog',
    'aria-modal': 'true',
    '[attr.data-direction]': 'drawer.direction()',
    '[attr.data-idle]': 'state() === "idle" ? "" : null',
    '[attr.data-open]': 'state() === "open" ? "" : null',
    '[attr.data-closed]': 'state() === "closed" ? "" : null',
    '[class]': 'class()',
    '(animationend)': 'onAnimationEnd($event)',
  },
})
export class ScDrawer {
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  readonly drawer = inject(ScDrawerProvider);
  readonly classInput = input<string>('', { alias: 'class' });
  protected readonly state = signal<ScDrawerState>('idle');

  protected readonly class = computed(() =>
    cn(
      'bg-background flex h-auto flex-col text-sm fixed z-50 group/drawer',
      // Position and border based on direction
      'data-[direction=bottom]:inset-x-0 data-[direction=bottom]:bottom-0 data-[direction=bottom]:mt-24 data-[direction=bottom]:max-h-[80vh] data-[direction=bottom]:rounded-t-xl data-[direction=bottom]:border-t',
      'data-[direction=left]:inset-y-0 data-[direction=left]:left-0 data-[direction=left]:w-3/4 data-[direction=left]:rounded-r-xl data-[direction=left]:border-r',
      'data-[direction=right]:inset-y-0 data-[direction=right]:right-0 data-[direction=right]:w-3/4 data-[direction=right]:rounded-l-xl data-[direction=right]:border-l',
      'data-[direction=top]:inset-x-0 data-[direction=top]:top-0 data-[direction=top]:mb-24 data-[direction=top]:max-h-[80vh] data-[direction=top]:rounded-b-xl data-[direction=top]:border-b',
      'data-[direction=left]:sm:max-w-sm data-[direction=right]:sm:max-w-sm',
      // Animations
      'data-idle:opacity-0',
      'data-open:animate-in data-open:fade-in-0',
      'data-[direction=top]:data-open:slide-in-from-top data-[direction=top]:data-closed:slide-out-to-top',
      'data-[direction=right]:data-open:slide-in-from-right data-[direction=right]:data-closed:slide-out-to-right',
      'data-[direction=bottom]:data-open:slide-in-from-bottom data-[direction=bottom]:data-closed:slide-out-to-bottom',
      'data-[direction=left]:data-open:slide-in-from-left data-[direction=left]:data-closed:slide-out-to-left',
      'data-closed:animate-out data-closed:fade-out-0',
      this.classInput(),
    ),
  );

  constructor() {
    // Sync state with provider's open signal
    effect(() => {
      const isOpen = this.drawer.open();
      this.state.set(isOpen ? 'open' : 'closed');
    });
  }

  protected onAnimationEnd(event: AnimationEvent): void {
    // Only trigger cleanup when close animation completes
    if (
      this.state() === 'closed' &&
      event.target === this.elementRef.nativeElement
    ) {
      this.state.set('idle');
      this.drawer.onDrawerAnimationComplete();
    }
  }
}
