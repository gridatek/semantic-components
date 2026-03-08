import { _IdGenerator } from '@angular/cdk/a11y';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewEncapsulation,
  booleanAttribute,
  computed,
  contentChild,
  inject,
  input,
  signal,
} from '@angular/core';
import { cn } from '../../utils';
import { SC_FIELD } from '../field';
import { ScSwitch } from './switch';
import { SC_SWITCH_FIELD, type ScSwitchContext } from './switch-types';
import { ScSwitchVisual } from './switch-visual';

@Component({
  selector: 'div[scSwitchField], label[scSwitchField]',
  imports: [ScSwitchVisual],
  providers: [
    { provide: SC_SWITCH_FIELD, useExisting: ScSwitchField },
    { provide: SC_FIELD, useExisting: ScSwitchField },
  ],
  host: {
    'data-slot': 'switch-field',
    '[attr.role]': 'role()',
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
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly switchInput = contentChild(ScSwitch);

  protected readonly role = computed(() => {
    const tagName = this.elementRef.nativeElement.tagName;
    return tagName === 'LABEL' ? null : 'group';
  });

  readonly classInput = input<string>('', { alias: 'class' });
  readonly reversed = input(false, { transform: booleanAttribute });
  readonly id = input(inject(_IdGenerator).getId('sc-switch-field-'));
  readonly descriptionIds = signal<string[]>([]);

  readonly checked = computed(() => this.switchInput()?.checked() ?? false);
  readonly disabled = computed(
    () => this.switchInput()?.disabledSignal() ?? false,
  );
  readonly dataState = computed((): 'checked' | 'unchecked' =>
    this.checked() ? 'checked' : 'unchecked',
  );

  protected readonly class = computed(() =>
    cn(
      'grid cursor-pointer items-center gap-x-3 gap-y-0.5 text-sm leading-none font-medium',
      'has-disabled:cursor-not-allowed has-disabled:text-muted-foreground',
      'has-[>[data-slot=field-description]]:*:data-[slot=inline-label]:font-medium',
      'has-[>[data-slot=field-description]]:*:data-[slot=switch-visual]:row-span-2 has-[>[data-slot=field-description]]:*:data-[slot=switch-visual]:self-center',
      this.reversed()
        ? [
            'w-full grid-cols-[1fr_2.75rem]',
            '*:data-[slot=switch-visual]:col-start-2 *:data-[slot=switch-visual]:row-start-1',
            '*:data-[slot=inline-label]:col-start-1 *:data-[slot=inline-label]:row-start-1',
            '*:data-[slot=field-description]:col-start-1 *:data-[slot=field-description]:row-start-2',
          ]
        : [
            'grid-cols-[2.75rem_1fr]',
            '*:data-[slot=switch-visual]:col-start-1 *:data-[slot=switch-visual]:row-start-1',
            '*:data-[slot=inline-label]:col-start-2 *:data-[slot=inline-label]:row-start-1',
            '*:data-[slot=field-description]:col-start-2 *:data-[slot=field-description]:row-start-2',
          ],
      this.classInput(),
    ),
  );
}
