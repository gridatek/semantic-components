import { _IdGenerator } from '@angular/cdk/a11y';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';
import { SC_FIELD } from '../field';
import { type ScSwitchContext, SC_SWITCH_FIELD } from './switch-types';
import { ScSwitch } from './switch';
import { ScSwitchVisual } from './switch-visual';

@Component({
  selector: 'label[scSwitchField]',
  imports: [ScSwitchVisual],
  providers: [
    { provide: SC_SWITCH_FIELD, useExisting: ScSwitchField },
    { provide: SC_FIELD, useExisting: ScSwitchField },
  ],
  host: {
    'data-slot': 'switch-field',
    '[class]': 'class()',
    '[attr.data-state]': 'dataState()',
    '[attr.data-disabled]': 'disabled() ? "" : null',
  },
  template: `
    <ng-content select="[scSwitch]" />
    <span scSwitchVisual></span>
    <ng-content />
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScSwitchField implements ScSwitchContext {
  private readonly switchInput = contentChild(ScSwitch);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly id = input(inject(_IdGenerator).getId('sc-switch-field-'));

  readonly checked = computed(() => this.switchInput()?.checked() ?? false);
  readonly disabled = computed(
    () => this.switchInput()?.disabledSignal() ?? false,
  );
  readonly dataState = computed((): 'checked' | 'unchecked' =>
    this.checked() ? 'checked' : 'unchecked',
  );

  protected readonly class = computed(() =>
    cn(
      'inline-flex cursor-pointer items-center gap-2 has-[:disabled]:cursor-not-allowed',
      this.classInput(),
    ),
  );
}
