import { ComboboxPopup } from '@angular/aria/combobox';
import { OverlayModule } from '@angular/cdk/overlay';
import {
  Component,
  ElementRef,
  ViewEncapsulation,
  booleanAttribute,
  computed,
  contentChild,
  inject,
  input,
  model,
  output,
  signal,
} from '@angular/core';
import type { FormValueControl } from '@angular/forms/signals';
import { cn } from '../../utils';
import { ScSelectPortalOutlet } from '../select/select-portal-outlet';
import { ScAutocompletePortal } from './autocomplete-portal';
import { SC_AUTOCOMPLETE, SC_AUTOCOMPLETE_INPUT } from './autocomplete-tokens';

@Component({
  selector: 'div[scAutocomplete]',
  exportAs: 'scAutocomplete',
  imports: [ComboboxPopup, OverlayModule, ScSelectPortalOutlet],
  providers: [{ provide: SC_AUTOCOMPLETE, useExisting: ScAutocomplete }],
  template: `
    <ng-content />
    @if (control(); as control) {
      <ng-template
        ngComboboxPopup
        [combobox]="control.combobox"
        popupType="listbox"
      >
        <ng-template
          [cdkConnectedOverlay]="{
            origin: elementRef,
            usePopover: 'inline',
            matchWidth: true,
          }"
          [cdkConnectedOverlayOpen]="open()"
        >
          <ng-container [scSelectPortalOutlet]="autocompletePortal()" />
        </ng-template>
      </ng-template>
    }
  `,
  host: {
    'data-slot': 'autocomplete',
    '[class]': 'class()',
    '[attr.data-disabled]': 'disabled() || null',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScAutocomplete implements FormValueControl<string> {
  protected readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  readonly classInput = input<string>('', { alias: 'class' });

  /** The input's text. Bind with `[formField]` or `[(value)]`. */
  readonly value = model('');
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly readonly = input(false, { transform: booleanAttribute });
  readonly required = input(false, { transform: booleanAttribute });
  readonly invalid = input(false, { transform: booleanAttribute });
  readonly touch = output<void>();

  protected readonly control = contentChild(SC_AUTOCOMPLETE_INPUT);
  protected readonly autocompletePortal =
    contentChild.required(ScAutocompletePortal);

  readonly open = computed(() => this.control()?.combobox.expanded() ?? false);

  /** Labels of options seen so far, written into the input on selection. */
  private readonly labels = signal<ReadonlyMap<string, string>>(new Map());

  protected readonly class = computed(() => cn('relative', this.classInput()));

  /** The value of the option whose label is `text`, if one has been seen. */
  optionValueFor(text: string): string | undefined {
    for (const [value, label] of this.labels()) {
      if (label === text) return value;
    }
    return undefined;
  }

  labelFor(value: string): string {
    return this.labels().get(value) || value;
  }

  registerLabel(value: string, label: string): void {
    if (this.labels().get(value) === label) return;
    this.labels.update((labels) => new Map(labels).set(value, label));
  }

  /** Writes the option's label into the input and closes the popup. */
  select(value: string): void {
    this.value.set(this.labelFor(value));
    this.close();
  }

  /** Empties the input, closes the popup and keeps focus in the input. */
  clear(): void {
    this.value.set('');
    this.close();
  }

  close(): void {
    const control = this.control();
    if (!control) return;
    control.combobox.expanded.set(false);
    control.elementRef.nativeElement.focus();
  }

  focus(options?: FocusOptions): void {
    this.control()?.elementRef.nativeElement.focus(options);
  }
}
