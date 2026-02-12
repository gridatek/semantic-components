import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  effect,
  inject,
  input,
  model,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { cn } from '../../utils';
import { ScNavbar } from './navbar';

@Component({
  selector: 'div[sc-navbar-provider]',
  template: `
    <ng-content />
  `,
  host: {
    'data-slot': 'navbar-provider',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScNavbarProvider {
  readonly classInput = input<string>('', { alias: 'class' });

  /**
   * Logical state: Controls animation state (open/closed)
   * - When true: Triggers entry animation
   * - When false: Triggers exit animation
   */
  readonly open = model<boolean>(false);

  /**
   * Physical state: Controls DOM presence via overlay
   * - When true: Content exists in DOM (can animate)
   * - When false: Content removed from DOM
   * - Stays true during close animation to allow it to complete
   */
  readonly overlayOpen = signal<boolean>(false);

  protected readonly class = computed(() => cn('', this.classInput()));

  private readonly navbar = contentChild(ScNavbar);
  readonly origin = computed(() => this.navbar()?.overlayOrigin);

  private readonly router = inject(Router);

  constructor() {
    // Close mobile menu on navigation
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        filter(() => this.open()),
        takeUntilDestroyed(),
      )
      .subscribe(() => this.open.set(false));

    // Synchronize overlay state with logical state for opening
    effect(() => {
      if (this.open()) {
        // Opening: Mount DOM immediately so animation can start
        this.overlayOpen.set(true);
      }
      // Note: When closing (open = false), overlayOpen stays true
      // until animation completes (handled by onMenuAnimationComplete)
    });
  }

  /**
   * Called by mobile menu when its close animation completes
   */
  onMenuAnimationComplete(): void {
    if (!this.open()) {
      this.overlayOpen.set(false);
    }
  }
}
