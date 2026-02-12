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
import { ScNavbarProvider } from './navbar-provider';

type ScNavbarMobileMenuState = 'open' | 'closed';

@Component({
  selector: 'div[sc-navbar-mobile-menu]',
  template: `
    <ng-content />
  `,
  host: {
    'data-slot': 'navbar-mobile-menu',
    id: 'navbar-mobile-menu',
    role: 'navigation',
    '[attr.aria-label]': '"Mobile navigation"',
    '[attr.data-state]': 'state()',
    '[class]': 'class()',
    '[tabindex]': '-1',
    '(animationend)': 'onAnimationEnd($event)',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScNavbarMobileMenu {
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly provider = inject(ScNavbarProvider);
  readonly classInput = input<string>('', { alias: 'class' });
  readonly state = signal<ScNavbarMobileMenuState>('closed');

  protected readonly class = computed(() =>
    cn(
      'md:hidden',
      'fixed inset-x-0 top-[calc(var(--navbar-height,57px))] bottom-0',
      'z-50',
      'flex flex-col gap-2 p-6',
      'bg-background border-t border-border',
      'animate-in fade-in-0 slide-in-from-top duration-300',
      'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:slide-out-to-top data-[state=closed]:duration-300',
      this.classInput(),
    ),
  );

  constructor() {
    // Sync state with provider's open signal
    effect(() => {
      const isOpen = this.provider.open();
      this.state.set(isOpen ? 'open' : 'closed');
    });
  }

  protected onAnimationEnd(event: AnimationEvent): void {
    // Only trigger cleanup when close animation completes
    if (
      this.state() === 'closed' &&
      event.target === this.elementRef.nativeElement
    ) {
      this.provider.onMenuAnimationComplete();
    }
  }
}
