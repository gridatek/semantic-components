import { ComboboxPopup } from '@angular/aria/combobox';
import { Directionality } from '@angular/cdk/bidi';
import {
  type ConnectedOverlayPositionChange,
  type ConnectedPosition,
  OverlayModule,
} from '@angular/cdk/overlay';
import {
  Component,
  ViewEncapsulation,
  booleanAttribute,
  computed,
  contentChild,
  input,
  model,
  output,
  signal,
  untracked,
} from '@angular/core';
import type { FormValueControl } from '@angular/forms/signals';
import { cn } from '../../utils';
import { ScElementDirectionality } from '../../utils/element-directionality';
import { ScPortalOutlet } from '../portal-outlet/portal-outlet';
import { ScSelectLabel } from './select-label';
import { ScSelectPortal } from './select-portal';
import {
  SC_SELECT,
  SC_SELECT_TRIGGER,
  type ScSelectItemData,
  type ScSelectSide,
} from './select-tokens';

// Below the trigger, or above it without room. The gap from the trigger is the
// preset's (Radix's popper translate).
const positions: ConnectedPosition[] = [
  {
    originX: 'start',
    originY: 'bottom',
    overlayX: 'start',
    overlayY: 'top',
  },
  {
    originX: 'start',
    originY: 'top',
    overlayX: 'start',
    overlayY: 'bottom',
  },
];

/**
 * A choice among a short list of options, as Base UI's Select: a trigger
 * showing the value, a list in a popup. Its value is a string, bound with
 * `[formField]` or `[(value)]`. The popup opens below the trigger — above it
 * without room — as wide as the trigger. For a long list to filter, use a
 * Combobox.
 */
@Component({
  selector: 'div[scSelect]',
  exportAs: 'scSelect',
  imports: [ComboboxPopup, OverlayModule, ScPortalOutlet],
  providers: [
    { provide: Directionality, useClass: ScElementDirectionality },
    { provide: SC_SELECT, useExisting: ScSelect },
  ],
  template: `
    <ng-content />
    @if (trigger(); as trigger) {
      <ng-template
        ngComboboxPopup
        [combobox]="trigger.combobox"
        popupType="listbox"
      >
        <!--
          The CDK sizes the overlay — the trigger's width, the room in the
          viewport as its height, both of which the popup takes — and sets
          the popup's transform origin by where it opened.
        -->
        <ng-template
          [cdkConnectedOverlay]="{
            origin: trigger.elementRef,
            usePopover: 'inline',
            matchWidth: true,
            transformOriginSelector: '[scSelectPopup]',
            flexibleDimensions: true,
            viewportMargin: 8,
          }"
          [cdkConnectedOverlayOpen]="open()"
          [cdkConnectedOverlayPositions]="positions"
          (positionChange)="onPositionChange($event)"
        >
          <ng-container [scPortalOutlet]="portal()" />
        </ng-template>
      </ng-template>
    }
  `,
  host: {
    // Read by the control group and the input group (a select in them).
    'data-slot': 'select',
    '[class]': 'class()',
    '[attr.data-disabled]': 'disabled() || null',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScSelect implements FormValueControl<string> {
  readonly classInput = input<string>('', { alias: 'class' });

  /** The selected option's value. Bind with `[formField]` or `[(value)]`. */
  readonly value = model('');
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly readonly = input(false, { transform: booleanAttribute });
  readonly required = input(false, { transform: booleanAttribute });
  readonly invalid = input(false, { transform: booleanAttribute });
  readonly touch = output<void>();
  /**
   * The options' labels, for showing the value before the list has first
   * opened (the options render only then). Optional.
   */
  readonly items = input<readonly ScSelectItemData[]>([]);

  readonly trigger = contentChild(SC_SELECT_TRIGGER);
  private readonly label = contentChild(ScSelectLabel);
  /** The label's id: it names the trigger and the list. */
  readonly labelId = computed(() => this.label()?.id() ?? null);
  protected readonly portal = contentChild.required(ScSelectPortal);

  readonly open = computed(() => this.trigger()?.combobox.expanded() ?? false);
  readonly hasValue = computed(() => this.value() !== '');

  /** Where the popup opened: below the trigger, or above it. */
  readonly side = signal<ScSelectSide>('bottom');
  protected readonly positions = positions;

  /** Labels of options seen so far, or given by `items`. */
  private readonly labels = signal<ReadonlyMap<string, string>>(new Map());
  readonly selectedLabel = computed(() => {
    const value = this.value();
    return (
      this.items().find((item) => item.value === value)?.label ||
      this.labels().get(value) ||
      value
    );
  });

  protected readonly class = computed(() =>
    // It sets the width — its content's by default; the trigger fills it,
    // the list matches the trigger. Its label above its trigger.
    cn('flex w-fit flex-col gap-2', this.classInput()),
  );

  registerLabel(value: string, label: string): void {
    // Untracked: items call this from an effect that must not depend on it.
    if (untracked(this.labels).get(value) === label) return;
    this.labels.update((labels) => new Map(labels).set(value, label));
  }

  protected onPositionChange(change: ConnectedOverlayPositionChange): void {
    this.side.set(
      change.connectionPair.originY === 'bottom' ? 'bottom' : 'top',
    );
  }

  /** Selects a value, closes the popup and returns focus to the trigger. */
  select(value: string): void {
    this.value.set(value);
    this.close();
  }

  close(): void {
    const trigger = this.trigger();
    if (!trigger) return;
    trigger.combobox.expanded.set(false);
    trigger.elementRef.nativeElement.focus();
  }

  focus(options?: FocusOptions): void {
    this.trigger()?.elementRef.nativeElement.focus(options);
  }
}
