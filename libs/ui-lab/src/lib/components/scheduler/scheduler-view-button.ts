import { Directive, computed, inject, input } from '@angular/core';
import {
  type ScButtonVariants,
  cn,
  injectPreset,
} from '@semantic-components/ui';
import { ScScheduler } from './scheduler';
import type { ScSchedulerView } from './scheduler-types';

/**
 * Switches to its view (`scSchedulerViewButton="month"`), pressed while it is
 * shown. Write its text; put the buttons in a group you name.
 */
@Directive({
  selector: 'button[scSchedulerViewButton]',
  host: {
    type: 'button',
    'data-slot': 'scheduler-view-button',
    '[attr.aria-pressed]': 'pressed()',
    '[class]': 'class()',
    '(click)': 'scheduler.view.set(viewName())',
  },
})
export class ScSchedulerViewButton {
  private readonly buttonStyles = injectPreset().button;

  protected readonly scheduler = inject(ScScheduler);

  readonly viewName = input.required<ScSchedulerView>({
    alias: 'scSchedulerViewButton',
  });
  readonly classInput = input<string>('', { alias: 'class' });
  readonly size = input<ScButtonVariants['size']>('sm');

  protected readonly pressed = computed(
    () => this.scheduler.view() === this.viewName(),
  );

  protected readonly class = computed(() =>
    cn(
      this.buttonStyles({
        variant: this.pressed() ? 'secondary' : 'ghost',
        size: this.size(),
      }),
      this.classInput(),
    ),
  );
}
