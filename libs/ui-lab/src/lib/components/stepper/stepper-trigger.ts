import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SiCheckIcon } from '@semantic-icons/lucide-icons';
import { SC_STEPPER, SC_STEPPER_ITEM } from './stepper-types';

@Component({
  selector: 'button[scStepperTrigger]',
  imports: [SiCheckIcon],
  template: `
    @if (stepperItem.state() === 'complete') {
      <svg siCheckIcon class="size-4"></svg>
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
