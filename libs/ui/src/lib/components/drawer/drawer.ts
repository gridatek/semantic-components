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
import { DrawerDirection, ScDrawerProvider } from './drawer-provider';

type ScDrawerState = 'idle' | 'open' | 'closed';

const directionBaseClasses: Record<DrawerDirection, string> = {
  top: 'inset-x-0 top-0 border-b rounded-b-[10px]',
  right: 'inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm',
  bottom: 'inset-x-0 bottom-0 border-t rounded-t-[10px]',
  left: 'inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm',
};

const directionAnimationClasses: Record<DrawerDirection, string> = {
  top: 'data-open:slide-in-from-top data-closed:slide-out-to-top',
  right: 'data-open:slide-in-from-right data-closed:slide-out-to-right',
  bottom: 'data-open:slide-in-from-bottom data-closed:slide-out-to-bottom',
  left: 'data-open:slide-in-from-left data-closed:slide-out-to-left',
};

@Directive({
  selector: 'div[sc-drawer]',
  host: {
    'data-slot': 'drawer',
    role: 'dialog',
    'aria-modal': 'true',
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

  protected readonly class = computed(() => {
    const direction = this.drawer.direction();

    return cn(
      'fixed z-50 flex flex-col bg-background duration-300',
      directionBaseClasses[direction],
      'data-idle:opacity-0',
      'data-open:animate-in data-open:fade-in-0',
      directionAnimationClasses[direction],
      'data-closed:animate-out data-closed:fade-out-0',
      this.classInput(),
    );
  });

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
