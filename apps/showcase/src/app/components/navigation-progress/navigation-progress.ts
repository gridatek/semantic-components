import {
  Component,
  DestroyRef,
  ViewEncapsulation,
  afterNextRender,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationSkipped,
  NavigationStart,
  Router,
} from '@angular/router';
import { cn } from 'cn';

type State = 'hidden' | 'starting' | 'loading' | 'done';

/** A navigation shorter than this shows nothing (ms). */
const SHOW_AFTER = 150;
/** Done: how long the full bar fades before it's gone (ms). */
const FADE = 300;

/**
 * A thin bar at the top of the page while a navigation runs — a slow one
 * only: it shows after 150ms, grows toward 80% while the page loads, fills
 * and fades when it's there. The page you leave may show meanwhile (a link
 * closes its popup at once, docs/component-design-principles.md): the bar says
 * the click was heard. Decorative (`aria-hidden`); listens in the browser
 * only, after the first render.
 */
@Component({
  selector: 'app-navigation-progress',
  template: '',
  host: {
    'aria-hidden': 'true',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class NavigationProgress {
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly state = signal<State>('hidden');

  private readonly class = computed(() =>
    cn(
      // From the reading start: right to left, from the right.
      'bg-primary pointer-events-none fixed inset-x-0 top-0 z-[100] block h-0.5 ltr:origin-left rtl:origin-right',
      {
        hidden: 'scale-x-0 opacity-0',
        starting: 'scale-x-0',
        // Slower and slower, never quite there: the page decides the end.
        loading:
          'scale-x-[0.8] transition-transform duration-[8000ms] ease-out motion-reduce:transition-none',
        done: 'scale-x-100 opacity-0 transition-[transform,opacity] duration-300 motion-reduce:transition-none',
      }[this.state()],
      this.classInput(),
    ),
  );

  constructor() {
    const router = inject(Router);
    const destroyRef = inject(DestroyRef);
    let timer: ReturnType<typeof setTimeout> | undefined;

    afterNextRender(() => {
      const subscription = router.events.subscribe((event) => {
        if (event instanceof NavigationStart) {
          clearTimeout(timer);
          if (this.state() === 'hidden' || this.state() === 'done')
            timer = setTimeout(() => this.start(), SHOW_AFTER);
        } else if (
          event instanceof NavigationEnd ||
          event instanceof NavigationCancel ||
          event instanceof NavigationError ||
          event instanceof NavigationSkipped
        ) {
          clearTimeout(timer);
          if (this.state() === 'starting' || this.state() === 'loading') {
            this.state.set('done');
            timer = setTimeout(() => this.state.set('hidden'), FADE);
          }
        }
      });
      destroyRef.onDestroy(() => {
        subscription.unsubscribe();
        clearTimeout(timer);
      });
    });
  }

  /** At 0 for a frame, then growing: the transition needs a start. */
  private start(): void {
    this.state.set('starting');
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        if (this.state() === 'starting') this.state.set('loading');
      }),
    );
  }
}
