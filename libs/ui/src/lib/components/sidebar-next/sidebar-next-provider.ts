import {
  DOCUMENT,
  DestroyRef,
  Directive,
  type OnInit,
  afterNextRender,
  computed,
  effect,
  inject,
  input,
  model,
  signal,
} from '@angular/core';
import { ScStorage } from '../../utilities/storage/storage';
import { cn } from '../../utils';
import { ScSidebarNextState } from './sidebar-next-state';

const MOBILE_QUERY = '(max-width: 767.98px)';

/**
 * Wraps a sidebar and the page beside it (`scSidebarNextInset`): their
 * shared state, `[(open)]`, kept between visits (`storageKey`), and the
 * Ctrl/⌘ + `shortcut` key that opens and closes it. On phones the sidebar is
 * a sheet.
 */
@Directive({
  selector: 'div[scSidebarNextProvider]',
  exportAs: 'scSidebarNextProvider',
  providers: [ScSidebarNextState],
  host: {
    'data-slot': 'sidebar-wrapper',
    '[class]': 'class()',
    '[style.--sidebar-width]': '"16rem"',
    '[style.--sidebar-width-mobile]': '"18rem"',
    '[style.--sidebar-width-icon]': '"3rem"',
    '(window:keydown)': 'onKeydown($event)',
  },
})
export class ScSidebarNextProvider implements OnInit {
  readonly state = inject(ScSidebarNextState);

  readonly classInput = input<string>('', { alias: 'class' });
  /** Open on wide screens. */
  readonly open = model(true);
  /**
   * Where the open state is kept: a cookie (read on the server too, so the
   * page is drawn as left), copied to `localStorage`. Give each sidebar its
   * own key; `null` keeps nothing.
   */
  readonly storageKey = input<string | null>('sc-sidebar-state');
  /** With Ctrl or ⌘, opens and closes the sidebar; `null`: no shortcut. */
  readonly shortcut = input<string | null>('b');

  private readonly storage = inject(ScStorage);
  private readonly window = inject(DOCUMENT).defaultView;
  /** Saved only once the saved state is read: not over it. */
  private readonly restored = signal(false);

  protected readonly class = computed(() =>
    cn(
      'group/sidebar-wrapper flex min-h-svh w-full has-data-[variant=inset]:bg-sidebar',
      this.classInput(),
    ),
  );

  constructor() {
    effect(() => this.state.open.set(this.open()));
    effect(() => this.open.set(this.state.open()));
    effect(() => {
      const name = this.storageKey();
      if (this.restored() && name)
        this.storage.set(name, String(this.state.open()));
    });

    // The screen's size: the browser's, after the first render (the server
    // draws a wide screen).
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      const mobile = this.window?.matchMedia(MOBILE_QUERY);
      if (!mobile) return;
      const update = () => this.state.isMobile.set(mobile.matches);
      update();
      mobile.addEventListener('change', update);
      destroyRef.onDestroy(() => mobile.removeEventListener('change', update));
    });
  }

  ngOnInit(): void {
    const name = this.storageKey();
    const saved = name ? this.storage.get(name) : null;
    if (saved !== null) this.open.set(saved === 'true');
    this.restored.set(true);
  }

  protected onKeydown(event: KeyboardEvent): void {
    const key = this.shortcut();
    if (
      key &&
      (event.metaKey || event.ctrlKey) &&
      !event.altKey &&
      event.key.toLowerCase() === key.toLowerCase()
    ) {
      event.preventDefault();
      this.state.toggle();
    }
  }
}
