import { DOCUMENT } from '@angular/common';
import {
  Component,
  DestroyRef,
  type OnInit,
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
import { ScCookies } from '../../utilities/cookies/cookies';
import { cn } from '../../utils';
import { ScSidebarState } from './sidebar-state';

const SIDEBAR_COOKIE = 'sc-sidebar-state';
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
export class ScSidebarProvider implements OnInit {
  readonly state = inject(ScSidebarState);

  readonly classInput = input<string>('', { alias: 'class' });

  // Two-way binding support
  readonly open = model<boolean>(true);

  /**
   * The cookie the open state is kept in — read on the server too, so the page
   * is drawn as left. Give each independent sidebar its own; `null` keeps
   * nothing.
   */
  readonly cookie = input<string | null>(SIDEBAR_COOKIE);

  protected readonly class = computed(() =>
    cn(
      'group/sidebar-wrapper flex min-h-svh w-full has-data-[variant=inset]:bg-sidebar',
      this.classInput(),
    ),
  );

  private readonly router = inject(Router);
  private readonly window = inject(DOCUMENT).defaultView;
  private readonly cookies = inject(ScCookies);
  /** Saved only once the saved state is read: not over it. */
  private readonly restored = signal(false);

  constructor() {
    // Sync model with state
    effect(() => this.state.setOpen(this.open()));
    effect(() => this.open.set(this.state.open()));

    // Saved when it changes, once read (ngOnInit).
    effect(() => {
      if (this.restored()) this.saveState(this.state.open());
    });

    // Close mobile sidebar on navigation
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        filter(() => this.state.isMobile() && this.state.openMobile()),
        takeUntilDestroyed(),
      )
      .subscribe(() => this.state.setOpenMobile(false));

    // The screen size: the browser's, so after the first render (the server
    // renders a wide screen).
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
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

  /** The saved state, once the inputs are set — on the server too, so the page is drawn as left. */
  ngOnInit(): void {
    const saved = this.loadState();
    if (saved !== null) this.open.set(saved);
    this.restored.set(true);
  }

  private saveState(open: boolean): void {
    const name = this.cookie();
    if (name) this.cookies.set(name, String(open));
  }

  private loadState(): boolean | null {
    const name = this.cookie();
    const value = name ? this.cookies.get(name) : null;
    return value === null ? null : value === 'true';
  }
}
