import { _IdGenerator } from '@angular/cdk/a11y';
import {
  computed,
  contentChild,
  DestroyRef,
  Directive,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs';
import { cn } from '../../utils';
import { ScNavigationMenu } from './navigation-menu';
import { ScNavigationMenuTrigger } from './navigation-menu-trigger';

@Directive({
  selector: 'li[sc-navigation-menu-item]',
  host: {
    'data-slot': 'navigation-menu-item',
    '[class]': 'class()',
    '(mouseenter)': 'onMouseEnter()',
    '(mouseleave)': 'onMouseLeave()',
  },
})
export class ScNavigationMenuItem implements OnInit {
  readonly navigationMenu = inject(ScNavigationMenu);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  readonly classInput = input<string>('', { alias: 'class' });

  readonly itemId = inject(_IdGenerator).getId('sc-navigation-menu-item-');

  /** Whether this item's content is open */
  readonly open = signal<boolean>(false);

  private readonly triggerChild = contentChild(ScNavigationMenuTrigger);

  readonly origin = computed(() => this.triggerChild()?.overlayOrigin);

  protected readonly class = computed(() => cn('relative', this.classInput()));

  private hideTimeout: ReturnType<typeof setTimeout> | null = null;

  ngOnInit(): void {
    // Close the menu when navigation starts
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationStart),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => {
        this.open.set(false);
        if (this.navigationMenu.activeItem() === this.itemId) {
          this.navigationMenu.setActiveItem(null);
        }
      });
  }

  onMouseEnter(): void {
    this.cancelHide();
    this.open.set(true);
    this.navigationMenu.setActiveItem(this.itemId);
  }

  onMouseLeave(): void {
    this.scheduleHide();
  }

  private scheduleHide(): void {
    this.cancelHide();
    this.hideTimeout = setTimeout(() => {
      this.open.set(false);
      if (this.navigationMenu.activeItem() === this.itemId) {
        this.navigationMenu.setActiveItem(null);
      }
    }, 100);
  }

  cancelHide(): void {
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
      this.hideTimeout = null;
    }
  }
}
