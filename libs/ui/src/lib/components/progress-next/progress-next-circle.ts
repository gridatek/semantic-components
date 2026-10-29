import {
  Component,
  ViewEncapsulation,
  booleanAttribute,
  computed,
  effect,
  inject,
  input,
  numberAttribute,
  signal,
} from '@angular/core';
import { cn } from '../../utils';
import { ScProgressNext } from './progress-next';

/**
 * The progress as a circle: its track, and an arc from the top, clockwise
 * (counter-clockwise in right-to-left), to the value. Indeterminate, a quarter
 * arc turns — still when motion is reduced. Sized by the progress (`size-16`
 * by default); `thickness` in hundredths of its width.
 */
@Component({
  selector: 'svg[scProgressNextCircle]',
  template: `
    <svg:circle
      data-slot="progress-circle-track"
      class="stroke-muted"
      cx="50"
      cy="50"
      fill="none"
      [attr.r]="radius()"
      [attr.stroke-width]="thickness()"
    />
    <svg:circle
      data-slot="progress-circle-range"
      class="stroke-primary transition-[stroke-dashoffset] duration-300"
      cx="50"
      cy="50"
      fill="none"
      pathLength="100"
      stroke-dasharray="100"
      stroke-linecap="round"
      transform="rotate(-90 50 50)"
      [attr.r]="radius()"
      [attr.stroke-width]="thickness()"
      [attr.stroke-dashoffset]="offset()"
      [attr.visibility]="empty() ? 'hidden' : null"
    />
  `,
  host: {
    'data-slot': 'progress-circle',
    viewBox: '0 0 100 100',
    'aria-hidden': 'true',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScProgressNextCircle {
  private readonly progress = inject(ScProgressNext);

  readonly classInput = input<string>('', { alias: 'class' });
  /** The ring's width, in hundredths of the circle's. */
  readonly thickness = input(8, { transform: numberAttribute });
  /**
   * A spinner's look while loading — the turning arc — the value still known
   * (your text says it). Done, the full ring; motion reduced, the arc to the
   * value.
   */
  readonly spin = input(false, { transform: booleanAttribute });

  private readonly reducedMotion = signal(
    typeof matchMedia !== 'undefined' &&
      matchMedia('(prefers-reduced-motion: reduce)').matches,
  );

  /** Drawn as the turning quarter arc. */
  private readonly turning = computed(
    () =>
      this.progress.indeterminate() ||
      (this.spin() &&
        this.progress.state() === 'loading' &&
        !this.reducedMotion()),
  );

  protected readonly radius = computed(() => 50 - this.thickness() / 2);
  /** What is left undrawn, out of 100 — three quarters while turning. */
  protected readonly offset = computed(() =>
    this.turning() ? 75 : 100 - this.progress.fraction() * 100,
  );
  /** At 0, nothing: a round cap would draw a dot. */
  protected readonly empty = computed(
    () => !this.turning() && this.progress.fraction() === 0,
  );

  protected readonly class = computed(() =>
    cn(
      'size-full rtl:-scale-x-100',
      this.turning() && 'animate-spin motion-reduce:animate-none',
      this.classInput(),
    ),
  );

  constructor() {
    effect((onCleanup) => {
      this.progress.shape.set('circle');
      onCleanup(() => this.progress.shape.set('bar'));
    });
  }
}
