import {
  Component,
  ElementRef,
  ViewEncapsulation,
  computed,
  inject,
  input,
  numberAttribute,
} from '@angular/core';
import { cn, ɵwarnIfUnnamed } from '../../utils';

/** The fill of each strength, from weak to strong — 3:1 on the background. */
const COLORS = [
  '',
  'bg-destructive',
  'bg-orange-600',
  'bg-amber-600',
  'bg-green-600',
];

/**
 * How strong the password is: a `score` from 0 (nothing yet) to 4 (strong),
 * as four segments — from your rules, or an estimator such as zxcvbn-ts (its
 * 0–4 as at least 1 once there is a password). A meter for screen readers:
 * name it (`aria-label`); its label (`scPasswordStrengthLabel`) is its
 * value in words.
 */
@Component({
  selector: 'div[scPasswordStrength]',
  template: `
    <div class="flex gap-1" aria-hidden="true">
      @for (segment of segments; track segment) {
        <span
          data-slot="password-strength-segment"
          class="h-1 flex-1 rounded-full transition-colors"
          [class]="segment <= score() ? color() : 'bg-muted'"
        ></span>
      }
    </div>
    <ng-content />
  `,
  host: {
    'data-slot': 'password-strength',
    role: 'meter',
    'aria-valuemin': '0',
    'aria-valuemax': '4',
    '[attr.aria-valuenow]': 'score()',
    '[attr.data-score]': 'score()',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScPasswordStrength {
  readonly element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  readonly classInput = input<string>('', { alias: 'class' });
  /** 0: nothing yet; 1 weak, 2 fair, 3 good, 4 strong. */
  readonly score = input(0, {
    transform: (value: unknown) =>
      Math.min(Math.max(Math.round(numberAttribute(value, 0)), 0), 4),
  });

  protected readonly segments = [1, 2, 3, 4];
  protected readonly color = computed(() => COLORS[this.score()]);

  protected readonly class = computed(() =>
    cn('grid gap-1.5', this.classInput()),
  );

  constructor() {
    ɵwarnIfUnnamed('scPasswordStrength');
  }
}
