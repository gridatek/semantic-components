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
  untracked,
} from '@angular/core';
import type { FormValueControl } from '@angular/forms/signals';
import { cn } from '../../utils';
import { ScPortalOutlet } from '../portal-outlet/portal-outlet';
import { ScMultiselectPortal } from './multiselect-portal';
import { SC_MULTISELECT, SC_MULTISELECT_TRIGGER } from './multiselect-tokens';

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
  selector: 'div[scMultiselect]',
  exportAs: 'scMultiselect',
  imports: [ComboboxPopup, OverlayModule, ScPortalOutlet],
  providers: [{ provide: SC_MULTISELECT, useExisting: ScMultiselect }],
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
          <ng-container [scPortalOutlet]="multiselectPortal()" />
        </ng-template>
      </ng-template>
    }
  `,
  host: {
    'data-slot': 'multiselect',
    '[class]': 'class()',
    '[attr.data-disabled]': 'disabled() || null',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScMultiselect implements FormValueControl<string[]> {
  readonly classInput = input<string>('', { alias: 'class' });

  /** The selected option values. Bind with `[formField]` or `[(value)]`. */
  readonly value = model<string[]>([]);
  readonly placeholder = input('');
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly readonly = input(false, { transform: booleanAttribute });
  readonly required = input(false, { transform: booleanAttribute });
  readonly invalid = input(false, { transform: booleanAttribute });
  readonly touch = output<void>();

  protected readonly positions = positions;
  protected readonly trigger = contentChild(SC_MULTISELECT_TRIGGER);
  protected readonly multiselectPortal =
    contentChild.required(ScMultiselectPortal);

  readonly open = computed(() => this.trigger()?.combobox.expanded() ?? false);
  readonly hasValue = computed(() => this.value().length > 0);

  /**
   * Labels of options seen so far. The popup is rendered lazily, so a label is
   * only known once its option has been rendered; until then the raw value is
   * shown.
   */
  private readonly labels = signal<ReadonlyMap<string, string>>(new Map());
  readonly selectedLabels = computed(() => {
    const labels = this.labels();
    return this.value().map((value) => labels.get(value) || value);
  });

  protected readonly class = computed(() =>
    cn('relative min-w-36 w-fit', this.classInput()),
  );

  registerLabel(value: string, label: string): void {
    // Untracked: items call this from an effect that must not depend on it.
    if (untracked(this.labels).get(value) === label) return;
    this.labels.update((labels) => new Map(labels).set(value, label));
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
