import { ComboboxPopup } from '@angular/aria/combobox';
import { Directionality } from '@angular/cdk/bidi';
import {
  CdkConnectedOverlay,
  type ConnectedOverlayPositionChange,
  type ConnectedPosition,
  OverlayModule,
} from '@angular/cdk/overlay';
import {
  Component,
  ViewEncapsulation,
  afterRenderEffect,
  booleanAttribute,
  computed,
  contentChild,
  input,
  model,
  output,
  signal,
  untracked,
  viewChild,
} from '@angular/core';
import type { FormValueControl } from '@angular/forms/signals';
import { cn } from '../../utils';
import { ScElementDirectionality } from '../../utils/element-directionality';
import { ScPortalOutlet } from '../portal-outlet/portal-outlet';
import { ScSelectNextLabel } from './select-next-label';
import { ScSelectNextPortal } from './select-next-portal';
import {
  SC_SELECT_NEXT,
  SC_SELECT_NEXT_TRIGGER,
  type ScSelectNextItemData,
  type ScSelectNextSide,
} from './select-next-tokens';

// The gap from the trigger is the preset's (Radix's popper translate).
const below: ConnectedPosition = {
  originX: 'start',
  originY: 'bottom',
  overlayX: 'start',
  overlayY: 'top',
};
const above: ConnectedPosition = {
  originX: 'start',
  originY: 'top',
  overlayX: 'start',
  overlayY: 'bottom',
};

/**
 * A choice among a short list of options, as Base UI's Select: a trigger
 * showing the value, a list in a popup. Its value is a string, bound with
 * `[formField]` or `[(value)]`. The popup opens below the trigger, or over it
 * with the selected item where the value is (`alignItemWithTrigger` on the
 * popup). For a long list to filter, use a
 * Combobox.
 */
@Component({
  selector: 'div[scSelectNext]',
  exportAs: 'scSelectNext',
  imports: [ComboboxPopup, OverlayModule, ScPortalOutlet],
  providers: [
    { provide: Directionality, useClass: ScElementDirectionality },
    { provide: SC_SELECT_NEXT, useExisting: ScSelectNext },
  ],
  template: `
    <ng-content />
    @if (trigger(); as trigger) {
      <ng-template
        ngComboboxPopup
        [combobox]="trigger.combobox"
        popupType="listbox"
      >
        <ng-template
          [cdkConnectedOverlay]="{
            origin: trigger.elementRef,
            usePopover: 'inline',
            matchWidth: true,
          }"
          [cdkConnectedOverlayOpen]="open()"
          [cdkConnectedOverlayPositions]="positions()"
          (positionChange)="onPositionChange($event)"
          (detach)="opened.set(false)"
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
export class ScSelectNext implements FormValueControl<string> {
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
  readonly items = input<readonly ScSelectNextItemData[]>([]);

  readonly trigger = contentChild(SC_SELECT_NEXT_TRIGGER);
  private readonly label = contentChild(ScSelectNextLabel);
  /** The label's id: it names the trigger and the list. */
  readonly labelId = computed(() => this.label()?.id() ?? null);
  protected readonly portal = contentChild.required(ScSelectNextPortal);

  readonly open = computed(() => this.trigger()?.combobox.expanded() ?? false);
  readonly hasValue = computed(() => this.value() !== '');

  /** Set by the popup: whether it opens over the trigger. */
  readonly alignItemWithTrigger = signal(false);
  /** Whether the popup was last opened by touch: never over the trigger then. */
  readonly openedByTouch = signal(false);
  /** The popup's offset over the trigger, measured once it has rendered. */
  readonly alignOffset = signal(0);
  /** Where the popup opened. */
  readonly side = signal<ScSelectNextSide>('bottom');
  /** Whether the popup is attached. */
  readonly opened = signal(false);

  /** Opens over the trigger when asked and not by touch; else below, or above. */
  readonly aligned = computed(
    () => this.alignItemWithTrigger() && !this.openedByTouch(),
  );
  protected readonly positions = computed<ConnectedPosition[]>(() =>
    this.aligned()
      ? [
          {
            originX: 'start',
            originY: 'top',
            overlayX: 'start',
            overlayY: 'top',
            offsetY: this.alignOffset(),
          },
          below,
          above,
        ]
      : [below, above],
  );

  private readonly overlay = viewChild(CdkConnectedOverlay);

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
    // No box of its own, as Base UI's root: its label and trigger are
    // laid out by their container (a field).
    cn('contents', this.classInput()),
  );

  constructor() {
    // CDK takes new positions without moving an open overlay: once the
    // popup has measured where the selected item is, move it there.
    afterRenderEffect({
      write: () => {
        this.positions();
        untracked(() => this.overlay()?.overlayRef?.updatePosition());
      },
    });
  }

  registerLabel(value: string, label: string): void {
    // Untracked: items call this from an effect that must not depend on it.
    if (untracked(this.labels).get(value) === label) return;
    this.labels.update((labels) => new Map(labels).set(value, label));
  }

  protected onPositionChange(change: ConnectedOverlayPositionChange): void {
    this.opened.set(true);
    const { originY, overlayY } = change.connectionPair;
    this.side.set(
      originY === overlayY ? 'none' : originY === 'bottom' ? 'bottom' : 'top',
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
