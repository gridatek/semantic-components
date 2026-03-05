import { Combobox, ComboboxPopupContainer } from '@angular/aria/combobox';
import { OverlayModule } from '@angular/cdk/overlay';
import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  contentChild,
  effect,
  inject,
  input,
  model,
} from '@angular/core';
import { SIGNAL, signalSetFn } from '@angular/core/primitives/signals';
import type { FormValueControl } from '@angular/forms/signals';
import { cn } from '../../utils';
import { ScSelectInputGroup } from './select-input-group';
import { ScSelectList } from './select-list';
import { ScSelectPortal } from './select-portal';

@Component({
  selector: 'div[scSelect]',
  exportAs: 'scSelect',
  imports: [Combobox, ComboboxPopupContainer, OverlayModule, NgTemplateOutlet],
  hostDirectives: [
    {
      directive: Combobox,
      inputs: ['disabled'],
    },
  ],
  template: `
    <ng-content />
    <ng-template ngComboboxPopupContainer>
      @if (origin(); as origin) {
        <ng-template
          [cdkConnectedOverlay]="{
            origin,
            usePopover: 'inline',
            matchWidth: true,
          }"
          [cdkConnectedOverlayOpen]="true"
        >
          <ng-container [ngTemplateOutlet]="selectPortal().templateRef" />
        </ng-template>
      }
    </ng-template>
  `,
  host: {
    'data-slot': 'select',
    '[class]': 'class()',
    '[attr.aria-disabled]': 'combobox.disabled() || null',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScSelect implements FormValueControl<unknown> {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly value = model<unknown>(undefined);

  private readonly trigger = contentChild(ScSelectInputGroup);
  private readonly content = contentChild(ScSelectList, {
    descendants: true,
  });
  protected readonly selectPortal = contentChild.required(ScSelectPortal);

  readonly origin = computed(() => this.trigger()?.elementRef);
  readonly values = computed(() => this.content()?.values() ?? []);
  readonly label = computed(() => {
    const value = this.value();
    if (value == null) return '';
    const list = this.content();
    if (list) {
      return list.labelForValue(value);
    }
    return String(value);
  });
  protected readonly class = computed(() =>
    cn('relative min-w-36 w-fit', this.classInput()),
  );

  protected readonly combobox = inject(Combobox);

  constructor() {
    effect(() => signalSetFn(this.combobox.readonly[SIGNAL], true));

    // Sync listbox selection → model
    effect(() => {
      const vals = this.values();
      const selected = vals.length > 0 ? vals[0] : undefined;
      this.value.set(selected);
    });
  }
}
