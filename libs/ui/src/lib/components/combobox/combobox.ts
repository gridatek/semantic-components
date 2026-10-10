import { Combobox, ComboboxPopup } from '@angular/aria/combobox';
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
import { ScSelectPortalOutlet } from '../select/select-portal-outlet';
import { ScComboboxPortal } from './combobox-portal';
import { SC_COMBOBOX, SC_COMBOBOX_TRIGGER } from './combobox-tokens';

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

/**
 * A select with a search box: the trigger opens a dialog popup that holds a
 * search input and a filtered listbox.
 */
@Component({
  selector: 'div[scCombobox]',
  exportAs: 'scCombobox',
  imports: [ComboboxPopup, OverlayModule, ScSelectPortalOutlet],
  providers: [{ provide: SC_COMBOBOX, useExisting: ScCombobox }],
  template: `
    <ng-content />
    @if (trigger(); as trigger) {
      <ng-template
        ngComboboxPopup
        [combobox]="trigger.combobox"
        popupType="dialog"
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
          <ng-container [scSelectPortalOutlet]="comboboxPortal()" />
        </ng-template>
      </ng-template>
    }
  `,
  host: {
    'data-slot': 'combobox',
    '[class]': 'class()',
    '[attr.data-disabled]': 'disabled() || null',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScCombobox implements FormValueControl<string> {
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
  readonly trigger = contentChild(SC_COMBOBOX_TRIGGER);
  protected readonly comboboxPortal = contentChild.required(ScComboboxPortal);

  /** The search box's combobox inside the popup, once rendered. */
  readonly search = signal<Combobox | undefined>(undefined);

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

  /** Values of the options currently rendered in the popup. */
  private readonly renderedValues = signal<ReadonlySet<string>>(new Set());
  readonly rendered = this.renderedValues.asReadonly();

  setRendered(value: string, rendered: boolean): void {
    // Read untracked: callers run inside effects that must not depend on it.
    if (untracked(this.renderedValues).has(value) === rendered) return;
    this.renderedValues.update((values) => {
      const next = new Set(values);
      if (rendered) next.add(value);
      else next.delete(value);
      return next;
    });
  }

  registerLabel(value: string, label: string): void {
    if (untracked(this.labels).get(value) === label) return;
    this.labels.update((labels) => new Map(labels).set(value, label));
  }

  /** Selects a value, closes the popup and returns focus to the trigger. */
  select(value: string): void {
    this.value.set(value);
    this.close();
  }

  clear(): void {
    this.value.set('');
    this.focus();
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
