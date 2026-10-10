import { Directive, type OnInit, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { ScAriaStepperTab } from './aria-stepper-tab';
import { SC_STEPPER_ITEM } from './stepper-types';

@Directive({
  selector: 'button[scStepperTrigger]',
  exportAs: 'scStepperTrigger',
  hostDirectives: [ScAriaStepperTab],
  host: {
    type: 'button',
    '[class]': 'class()',
    '[attr.data-state]': 'stepperItem.state()',
  },
})
export class ScStepperTrigger implements OnInit {
  private readonly tab = inject(ScAriaStepperTab);
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

  ngOnInit(): void {
    // The step is known now (the item's inputs are set), and aria only reads
    // the tab's value later, lazily.
    this.tab.setValue(String(this.stepperItem.step()));
  }
}
