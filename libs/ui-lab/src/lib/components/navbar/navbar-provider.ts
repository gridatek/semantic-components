import { _IdGenerator } from '@angular/cdk/a11y';
import {
  Component,
  ElementRef,
  ViewEncapsulation,
  computed,
  contentChild,
  inject,
  input,
  model,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { cn } from '@semantic-components/ui';
import { filter } from 'rxjs';
import { ScNavbar } from './navbar';

@Component({
  selector: 'div[scNavbarProvider]',
  template: ` <ng-content /> `,
  host: {
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScNavbarProvider {
  readonly classInput = input<string>('', { alias: 'class' });

  /** Whether the mobile menu is shown; it animates in and out (`animate.enter` / `animate.leave`). */
  readonly open = model<boolean>(false);

  protected readonly class = computed(() => cn('', this.classInput()));

  /** Id of the mobile menu, referenced by the trigger's `aria-controls`. */
  readonly menuId = inject(_IdGenerator).getId('sc-navbar-mobile-menu-');

  /** The mobile trigger, registered by `ScNavbarMobileTrigger`. */
  readonly trigger = signal<ElementRef<HTMLElement> | undefined>(undefined);

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
  }

  /** Closes the mobile menu and returns focus to its trigger (Escape). */
  closeAndRestoreFocus(): void {
    this.open.set(false);
    this.trigger()?.nativeElement.focus();
  }
}
