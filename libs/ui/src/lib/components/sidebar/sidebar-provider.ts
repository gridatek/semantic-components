import { DOCUMENT } from '@angular/common';
import {
  Component,
  DestroyRef,
  ViewEncapsulation,
  afterNextRender,
  computed,
  effect,
  inject,
  input,
  model,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { cn } from '../../utils';
import { ScSidebarState } from './sidebar-state';

const SIDEBAR_STORAGE_KEY = 'sc-sidebar-state';
const SIDEBAR_KEYBOARD_SHORTCUT = 'b';
const MOBILE_QUERY = '(max-width: 767.98px)';

@Component({
  selector: 'div[scSidebarProvider]',
  template: '<ng-content />',
  providers: [ScSidebarState],
  host: {
    '[class]': 'class()',
    '[style.--sidebar-width]': '"16rem"',
    '[style.--sidebar-width-mobile]': '"18rem"',
    '[style.--sidebar-width-icon]': '"3rem"',
    '(window:keydown)': 'onKeydown($event)',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScSidebarProvider {
  readonly state = inject(ScSidebarState);

  readonly classInput = input<string>('', { alias: 'class' });

  // Two-way binding support
  readonly open = model<boolean>(true);

  /**
   * localStorage key the open state is persisted under. Give each independent
   * sidebar its own key; `null` disables persistence.
   */
  readonly storageKey = input<string | null>(SIDEBAR_STORAGE_KEY);

  protected readonly class = computed(() =>
    cn(
      'group/sidebar-wrapper flex min-h-svh w-full has-data-[variant=inset]:bg-sidebar',
      this.classInput(),
    ),
  );

  private readonly router = inject(Router);
  private readonly window = inject(DOCUMENT).defaultView;
  /** Saved only once the saved state is read: not over it. */
  private readonly restored = signal(false);

  constructor() {
    // Sync model with state
    effect(() => this.state.setOpen(this.open()));
    effect(() => this.open.set(this.state.open()));

    // Save to localStorage when state changes
    effect(() => {
      if (this.restored()) this.saveToStorage(this.state.open());
    });

    // Close mobile sidebar on navigation
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        filter(() => this.state.isMobile() && this.state.openMobile()),
        takeUntilDestroyed(),
      )
      .subscribe(() => this.state.setOpenMobile(false));

    // The saved state and the screen size: the browser's, so after the
    // first render (the server renders the sidebar open, on a wide screen).
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      const savedState = this.loadFromStorage();
      if (savedState !== null) this.open.set(savedState);
      this.restored.set(true);

      const mobile = this.window?.matchMedia(MOBILE_QUERY);
      if (!mobile) return;
      const update = () => this.state.setIsMobile(mobile.matches);
      update();
      mobile.addEventListener('change', update);
      destroyRef.onDestroy(() => mobile.removeEventListener('change', update));
    });
  }

  // Cmd/Ctrl + B
  protected onKeydown(event: KeyboardEvent): void {
    if (
      (event.metaKey || event.ctrlKey) &&
      event.key === SIDEBAR_KEYBOARD_SHORTCUT
    ) {
      event.preventDefault();
      this.state.toggle();
    }
  }

  private saveToStorage(open: boolean): void {
    const key = this.storageKey();
    if (!key) return;
    try {
      this.window?.localStorage.setItem(key, String(open));
    } catch (error) {
      // localStorage unavailable
      console.warn('Unable to save sidebar state to localStorage:', error);
    }
  }

  private loadFromStorage(): boolean | null {
    const key = this.storageKey();
    if (!key) return null;
    try {
      const value = this.window?.localStorage.getItem(key) ?? null;
      return value !== null ? value === 'true' : null;
    } catch (error) {
      console.warn('Unable to load sidebar state from localStorage:', error);
      return null;
    }
  }
}
