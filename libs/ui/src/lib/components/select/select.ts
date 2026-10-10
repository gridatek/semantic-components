import { ComboboxPopup } from '@angular/aria/combobox';
import { OverlayModule } from '@angular/cdk/overlay';
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
} from '@angular/core';
import type { FormValueControl } from '@angular/forms/signals';
import { cn } from '../../utils';
import { ScSelectPortal } from './select-portal';
import { ScSelectPortalOutlet } from './select-portal-outlet';
import { SC_SELECT, SC_SELECT_TRIGGER } from './select-tokens';

const positions = [
  {
    originX: 'start' as const,
    originY: 'bottom' as const,
    overlayX: 'start' as const,
    overlayY: 'top' as const,
    offsetY: 4,
  },
  {
    originX: 'start' as const,
    originY: 'top' as const,
    overlayX: 'start' as const,
    overlayY: 'bottom' as const,
    offsetY: -4,
  },
];

@Component({
  selector: 'div[scSelect]',
  exportAs: 'scSelect',
  imports: [ComboboxPopup, OverlayModule, ScSelectPortalOutlet],
  providers: [{ provide: SC_SELECT, useExisting: ScSelect }],
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
          [cdkConnectedOverlayPositions]="positions"
        >
          <ng-container [scSelectPortalOutlet]="selectPortal()" />
        </ng-template>
      </ng-template>
    }
  `,
  host: {
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
  readonly placeholder = input('');
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly readonly = input(false, { transform: booleanAttribute });
  readonly required = input(false, { transform: booleanAttribute });
  readonly invalid = input(false, { transform: booleanAttribute });
  readonly touch = output<void>();

  protected readonly positions = positions;
  protected readonly trigger = contentChild(SC_SELECT_TRIGGER);
  protected readonly selectPortal = contentChild.required(ScSelectPortal);

  readonly open = computed(() => this.trigger()?.combobox.expanded() ?? false);
  readonly hasValue = computed(() => this.value() !== '');

  /**
   * Labels of options seen so far. The popup is rendered lazily, so a label is
   * only known once its option has been rendered; until then the raw value is
   * shown.
   */
  private readonly labels = signal<ReadonlyMap<string, string>>(new Map());
  readonly selectedLabel = computed(() => {
    const value = this.value();
    return this.labels().get(value) || value;
  });

  protected readonly class = computed(() =>
    cn('relative min-w-36 w-fit', this.classInput()),
  );

  registerLabel(value: string, label: string): void {
    if (this.labels().get(value) === label) return;
    this.labels.update((labels) => new Map(labels).set(value, label));
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
