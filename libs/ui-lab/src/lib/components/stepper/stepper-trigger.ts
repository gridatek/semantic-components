import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';
import { SC_STEPPER, SC_STEPPER_ITEM } from './stepper-types';

@Component({
  selector: 'button[sc-stepper-trigger]',
  template: `
    @if (stepperItem.state() === 'complete') {
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="size-4"
      >
        <path d="M20 6 9 17l-5-5" />
      </svg>
    } @else {
      <span>{{ stepperItem.step() + 1 }}</span>
    }
  `,
  host: {
    'data-slot': 'stepper-trigger',
    type: 'button',
    role: 'tab',
    '[class]': 'class()',
    '[attr.aria-selected]': 'stepperItem.state() === "active"',
    '[attr.data-state]': 'stepperItem.state()',
    '(click)': 'onClick()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScStepperTrigger {
  private readonly stepper = inject(SC_STEPPER);
  readonly stepperItem = inject(SC_STEPPER_ITEM);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'inline-flex size-10 items-center justify-center rounded-full border-2 text-sm font-medium',
      'transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      'disabled:pointer-events-none disabled:opacity-50',
      'data-[state=complete]:border-primary data-[state=complete]:bg-primary data-[state=complete]:text-primary-foreground',
      'data-[state=active]:border-primary data-[state=active]:text-primary',
      'data-[state=inactive]:border-muted data-[state=inactive]:text-muted-foreground',
      this.classInput(),
    ),
  );

  onClick(): void {
    this.stepper.goToStep(this.stepperItem.step());
  }
}
