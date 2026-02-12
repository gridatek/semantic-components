import {
  Component,
  computed,
  effect,
  inject,
  input,
  model,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { cn } from '../../utils';
import { ScSidebarState } from './sidebar-state.service';

const SIDEBAR_STORAGE_KEY = 'sc-sidebar-state';
const SIDEBAR_KEYBOARD_SHORTCUT = 'b';
const MOBILE_BREAKPOINT = 768;

@Component({
  selector: 'div[sc-sidebar-provider]',
  template: '<ng-content />',
  providers: [ScSidebarState],
  host: {
    'data-slot': 'sidebar-wrapper',
    '[class]': 'class()',
    '[style.--sidebar-width]': '"16rem"',
    '[style.--sidebar-width-mobile]': '"18rem"',
    '[style.--sidebar-width-icon]': '"3rem"',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScSidebarProvider implements OnInit, OnDestroy {
  readonly state = inject(ScSidebarState);

  readonly classInput = input<string>('', { alias: 'class' });

  // Two-way binding support
  readonly open = model<boolean>(true);

  protected readonly class = computed(() =>
    cn(
      'group/sidebar-wrapper flex min-h-svh w-full has-[[data-variant=inset]]:bg-sidebar',
      this.classInput(),
    ),
  );

  private keydownHandler?: (event: KeyboardEvent) => void;
  private resizeHandler?: () => void;

  private readonly router = inject(Router);

  constructor() {
    // Sync model with state
    effect(() => this.state.setOpen(this.open()));
    effect(() => this.open.set(this.state.open()));

    // Save to localStorage when state changes
    effect(() => {
      this.saveToStorage(this.state.open());
    });

    // Close mobile sidebar on navigation
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        filter(() => this.state.isMobile() && this.state.openMobile()),
        takeUntilDestroyed(),
      )
      .subscribe(() => this.state.setOpenMobile(false));
  }

  ngOnInit(): void {
    // Load initial state from localStorage
    const savedState = this.loadFromStorage();
    if (savedState !== null) {
      this.open.set(savedState);
    }

    // Setup keyboard shortcut (Cmd/Ctrl + B)
    this.keydownHandler = (event: KeyboardEvent) => {
      if (
        (event.metaKey || event.ctrlKey) &&
        event.key === SIDEBAR_KEYBOARD_SHORTCUT
      ) {
        event.preventDefault();
        this.state.toggle();
      }
    };
    window.addEventListener('keydown', this.keydownHandler);

    // Setup mobile detection
    this.resizeHandler = () => {
      const isMobile = window.innerWidth < MOBILE_BREAKPOINT;
      this.state.setIsMobile(isMobile);
    };
    this.resizeHandler(); // Initial check
    window.addEventListener('resize', this.resizeHandler);
  }

  ngOnDestroy(): void {
    if (this.keydownHandler) {
      window.removeEventListener('keydown', this.keydownHandler);
    }
    if (this.resizeHandler) {
      window.removeEventListener('resize', this.resizeHandler);
    }
  }

  private saveToStorage(open: boolean): void {
    try {
      localStorage.setItem(SIDEBAR_STORAGE_KEY, String(open));
    } catch {
      // localStorage unavailable
    }
  }

  private loadFromStorage(): boolean | null {
    try {
      const value = localStorage.getItem(SIDEBAR_STORAGE_KEY);
      return value !== null ? value === 'true' : null;
    } catch {
      return null;
    }
  }
}
