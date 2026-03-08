import { _IdGenerator } from '@angular/cdk/a11y';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewEncapsulation,
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
    <ng-content />
    <span scSwitchVisual></span>
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
      // Switch first: input is the first child → switch col-1, content col-2
      'has-[>:first-child[data-slot=switch]]:grid-cols-[2.75rem_1fr]',
      'has-[>:first-child[data-slot=switch]]:*:data-[slot=switch-visual]:col-start-1 has-[>:first-child[data-slot=switch]]:*:data-[slot=switch-visual]:row-start-1',
      'has-[>:first-child[data-slot=switch]]:*:data-[slot=inline-label]:col-start-2 has-[>:first-child[data-slot=switch]]:*:data-[slot=inline-label]:row-start-1',
      'has-[>:first-child[data-slot=switch]]:*:data-[slot=field-description]:col-start-2 has-[>:first-child[data-slot=switch]]:*:data-[slot=field-description]:row-start-2',
      // Switch last: input is not the first child → content col-1, switch col-2
      'has-[>:not(:first-child)[data-slot=switch]]:w-full has-[>:not(:first-child)[data-slot=switch]]:grid-cols-[1fr_2.75rem]',
      'has-[>:not(:first-child)[data-slot=switch]]:*:data-[slot=switch-visual]:col-start-2 has-[>:not(:first-child)[data-slot=switch]]:*:data-[slot=switch-visual]:row-start-1',
      'has-[>:not(:first-child)[data-slot=switch]]:*:data-[slot=inline-label]:col-start-1 has-[>:not(:first-child)[data-slot=switch]]:*:data-[slot=inline-label]:row-start-1',
      'has-[>:not(:first-child)[data-slot=switch]]:*:data-[slot=field-description]:col-start-1 has-[>:not(:first-child)[data-slot=switch]]:*:data-[slot=field-description]:row-start-2',
      this.classInput(),
    ),
  );
}
