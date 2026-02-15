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

type ScDrawerState = 'open' | 'closed';

const directionBaseClasses: Record<DrawerDirection, string> = {
  top: 'inset-x-0 top-0 border-b rounded-b-[10px]',
  right: 'inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm',
  bottom: 'inset-x-0 bottom-0 border-t rounded-t-[10px]',
  left: 'inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm',
};

const directionAnimationClasses: Record<DrawerDirection, string> = {
  top: 'slide-in-from-top data-[state=closed]:slide-out-to-top',
  right: 'slide-in-from-right data-[state=closed]:slide-out-to-right',
  bottom: 'slide-in-from-bottom data-[state=closed]:slide-out-to-bottom',
  left: 'slide-in-from-left data-[state=closed]:slide-out-to-left',
};

@Directive({
  selector: 'div[sc-drawer]',
  host: {
    'data-slot': 'drawer',
    role: 'dialog',
    'aria-modal': 'true',
    '[attr.data-state]': 'state()',
    '[class]': 'class()',
    '(animationend)': 'onAnimationEnd($event)',
  },
})
export class ScDrawer {
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  readonly drawer = inject(ScDrawerProvider);
  readonly classInput = input<string>('', { alias: 'class' });
  readonly state = signal<ScDrawerState>('closed');

  protected readonly class = computed(() => {
    const direction = this.drawer.direction();

    return cn(
      'fixed z-50 flex flex-col bg-background',
      directionBaseClasses[direction],
      'animate-in fade-in-0 duration-300',
      directionAnimationClasses[direction],
      'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:duration-300',
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
      this.drawer.onDrawerAnimationComplete();
    }
  }
}
